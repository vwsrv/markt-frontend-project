"use client";

import React from "react";
import cn from "classnames";
import classes from "./styles.module.scss";
import { PromoBanner } from "../../shared/ui/promo-banner";
import { CategoryList } from "../../shared/ui/category-list/category-list";
import { CardList } from "../../shared/ui/card-list";
import { SectionTitle } from "../../shared/ui/sectionTitle";
import forHomeImage from "../../shared/ui/sectionTitle/images/for-home.svg";
import forSleepImage from "../../shared/ui/sectionTitle/images/for-sleep.svg";
import saleImage from "../../shared/ui/sectionTitle/images/sale.svg";
import goodsImage from "../../shared/ui/sectionTitle/images/goods.svg";
import promoImage from "../../shared/ui/promo-banner/images/promo-banner.svg";
import promoImageMobile from "../../shared/ui/promo-banner/images/promo-banner-small.svg";
import { BaseProductProps } from "../../types/productTypes";
import { typeCategoryListProps } from "../../shared/ui/category-list/types";

export const MainPage: React.FC = () => {
  const [images, setImages] = React.useState<BaseProductProps[]>([]);
  const [categoryIcons, setCategoryIcons] = React.useState<
    typeCategoryListProps["categoryData"]
  >([]);
  const [forHomeImages, setForHomeImages] = React.useState<BaseProductProps[]>(
    [],
  );
  const [promoImages, setPromoImages] = React.useState<BaseProductProps[]>([]);
  const [goodsImages, setGoodsImages] = React.useState<BaseProductProps[]>([]);

  const fetchData = async <T,>(
    url: string,
    setData: React.Dispatch<React.SetStateAction<T[]>>,
  ) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Ошибка загрузки данных");
      }
      const data: T[] = await res.json();

      const updatedData = data.map((item, index) => ({
        ...item,
        id: index,
      }));
      setData(updatedData);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategoryIcons = async (
    url: string,
    setData: React.Dispatch<
      React.SetStateAction<typeCategoryListProps["categoryData"]>
    >,
  ) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Ошибка загрузки категорий");
      }
      const data: typeCategoryListProps["categoryData"] = await res.json();
      setData(data);
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    fetchData<BaseProductProps>("data/resource-images.json", setImages);

    fetchCategoryIcons("data/category-images.json", setCategoryIcons);
    fetchData<BaseProductProps>(
      "data/resource-images-2.json",
      setForHomeImages,
    );
    fetchData<BaseProductProps>("data/resource-images-3.json", setPromoImages);
    fetchData<BaseProductProps>("data/resource-images-4.json", setGoodsImages);
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
        categoryData={categoryIcons || []}
        handler={() => {
          console.log("Клик на категорию");
        }}
      />
      <CardList
        goodsData={images || []}
        saleName="Осенний Сейл"
        saleValue="50"
        style="default"
        type="default"
      />
      <SectionTitle
        src={forHomeImage}
        alt="Товары для дома"
        variant="category"
      />
      <CardList
        goodsData={forHomeImages || []}
        style="ten"
        type="small"
        saleName=""
        saleValue=""
      />
      <SectionTitle src={saleImage} alt="Скидка" variant="sale" />
      <CardList
        goodsData={promoImages || []}
        style="default"
        type="default"
        saleName="Осенний Сейл"
        saleValue="50"
      />
      <SectionTitle
        src={forSleepImage}
        alt="Товары для сна"
        variant="category-sleep"
      />
      <CardList
        goodsData={forHomeImages || []}
        style="ten"
        type="small"
        saleName=""
        saleValue=""
      />
      <SectionTitle src={goodsImage} alt="Сокровища" variant="treasures" />
      <CardList
        goodsData={goodsImages || []}
        style="default"
        type="default"
        saleName="Осенний Сейл"
        saleValue="50"
      />
    </div>
  );
};
