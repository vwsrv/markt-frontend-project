"use client";

import React from "react";
import { PromoBanner } from "../../shared/ui/promo-banner";
import { MainPageProps } from "./types";
import { CategoryList } from "../../shared/ui/category-list/category-list";
import promoImage from "../../shared/images/for-promo-banner/promo-banner.svg";
import { ProductCard } from "../../shared/ui/product-card/productCard";

type ImageData = Array<{
  src: string; // Предполагаем, что структура данных такая
}>;

export const MainPage: React.FC<MainPageProps> = (props) => {
  const [images, setImages] = React.useState<ImageData | null>(null);
  const [categoryImages, setCategoryImages] = React.useState<ImageData | null>(
    null
  );

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

  React.useEffect(() => {
    fetchData("/src/utils/resource-images/resource-images.json", setImages);
    fetchData(
      "/src/utils/category-images/category-images.json",
      setCategoryImages
    );
  }, []);

  return (
    <div>
      <PromoBanner imageLink={promoImage} />
      <CategoryList categoryData={categoryImages || []} />
      <ProductCard
        goodsData={images || []}
        saleName="Осенний Сейл"
        saleValue="50%"
      />
    </div>
  );
};
