"use client";

import React from "react";
import cn from "classnames";
import classes from "./styles.module.scss";
import { PromoBanner } from "../../shared/ui/promo-banner";
import { CategoryList } from "../../shared/ui/category-list/category-list";
import { CardList } from "../../shared/ui/card-list";
import { SectionTitle } from "../../shared/ui/sectionTitle";
import {
  fetchCategories,
  fetchImages,
  fetchForHomeImage,
  fetchForSleepImage,
  fetchGoodsImages,
  fetchAllData,
  fetchAllProductsData,
} from "../../services/api";
import { BaseProductProps } from "../../types/productTypes";
import forHomeImage from "../../shared/ui/sectionTitle/images/for-home.svg";
import forSleepImage from "../../shared/ui/sectionTitle/images/for-sleep.svg";
import saleImage from "../../shared/ui/sectionTitle/images/sale.svg";
import goodsImage from "../../shared/ui/sectionTitle/images/goods.svg";
import promoImage from "../../shared/ui/promo-banner/images/promo-banner.svg";
import promoImageMobile from "../../shared/ui/promo-banner/images/promo-banner-small.svg";
import { useNavigate } from "react-router-dom";

export const MainPage: React.FC = () => {
  const [images, setImages] = React.useState<BaseProductProps[]>([]);
  const [categories, setCategories] = React.useState<BaseProductProps[]>([]);
  const [forHomeImages, setForHomeImages] = React.useState<BaseProductProps[]>(
    [],
  );
  const [promoImages, setPromoImages] = React.useState<BaseProductProps[]>([]);
  const [goodsImages, setGoodsImages] = React.useState<BaseProductProps[]>([]);
  const [allProducts, setAllProductsData] = React.useState<BaseProductProps[]>(
    [],
  );
  const navigate = useNavigate();

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const productsData = await fetchImages();
        setImages(productsData);

        const forHomeData = await fetchForHomeImage();
        setForHomeImages(forHomeData);

        const promoData = await fetchForSleepImage();
        setPromoImages(promoData);

        const goodsData = await fetchGoodsImages();
        setGoodsImages(goodsData);

        const allProducts = await fetchAllProductsData();
        setAllProductsData(allProducts);

        // организовать получение из общего массива json
        const categories = allProducts.map((item) => ({
          name: item.category.name,
          link: item.category.link,
        }));
        const uniqueCategoriesSet = new Set(
          categories.map((category) => JSON.stringify(category)),
        );
        const uniqueCategories = Array.from(uniqueCategoriesSet).map(
          (category) => JSON.parse(category),
        );

        const getFirstThreeItems = (allProducts) => {
          return setImages(allProducts.slice(0, 3));
        };

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div className={cn(classes.mainPage)}>
      <PromoBanner
        imageLink={promoImage}
        imageLinkMobile={promoImageMobile}
        handler={() => {
          console.log("Клик на баннер");
        }}
      />
      <CategoryList
        categoryData={categories || []}
        handler={() => {
          navigate("/catalog");
        }}
      />
      <CardList goodsData={images || []} style="default" type="default" />
      <SectionTitle
        src={forHomeImage}
        alt="Товары для дома"
        variant="category"
      />
      <CardList goodsData={forHomeImages || []} style="ten" type="small" />
      <SectionTitle src={saleImage} alt="Скидка" variant="sale" />
      <CardList goodsData={promoImages || []} style="default" type="default" />
      <SectionTitle
        src={forSleepImage}
        alt="Товары для сна"
        variant="category-sleep"
      />
      <CardList goodsData={forHomeImages || []} style="ten" type="small" />
      <SectionTitle src={goodsImage} alt="Сокровища" variant="treasures" />
      <CardList goodsData={goodsImages || []} style="default" type="default" />
    </div>
  );
};
