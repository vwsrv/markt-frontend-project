"use client";

import React from "react";
import { PromoBanner } from "../../shared/ui/promo-banner";
import { MainPageProps } from "./types";
import { CategoryList } from "../../shared/ui/category-list/category-list";
import promoImage from "../../shared/ui/promo-banner/images/promo-banner.svg";
import { ProductCardList } from "../../shared/ui/product-card-list/productCardList";

type ImageData = Array<{
  src: string;
}>;

export const MainPage: React.FC<MainPageProps> = () => {
  const [images, setImages] = React.useState<ImageData | null>(null);
  const [categoryIcons, setCategoryIcons] = React.useState<ImageData | null>(
    null
  );
  const [forHomeImages, setForHomeImages] = React.useState<ImageData | null>(null);

  const fetchData = async (
    url: string,
    setData: React.Dispatch<React.SetStateAction<ImageData | null>>
  ) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Ошибка загрузки данных");
      }
      const data = await res.json();
      setData(data);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(forHomeImages);
  

  React.useEffect(() => {
    fetchData("/src/utils/resource-images/resource-images.json", setImages);
    fetchData(
      "/src/utils/category-images/category-images.json",
      setCategoryIcons
    );
    fetchData(
      "/src/utils/resource-images/resource-images-2.json",
      setForHomeImages
    );
  }, []);

  return (
    <div>
      <PromoBanner imageLink={promoImage} />
      <CategoryList categoryData={categoryIcons || []} />
      <ProductCardList
        goodsData={images || []}
        saleName="Осенний Сейл"
        saleValue="50%"
      />
      <ProductCardList goodsData={forHomeImages || []} />
    </div>
  );
};
