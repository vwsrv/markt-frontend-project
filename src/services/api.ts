import { BaseProductProps } from "../types/productTypes";
import { typeCategoryListProps } from "../shared/ui/category-list/types";

export const fetchData = async <T>(url: string): Promise<T[]> => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Ошибка загрузки данных с ${url}`);
    }
    const data: T[] = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchCategories = async (): Promise<
  typeCategoryListProps["categoryData"]
> => {
  return fetchData("data/category-images.json");
};

export const fetchImages = async (): Promise<BaseProductProps[]> => {
  return fetchData("data/resource-images.json");
};

export const fetchForHomeImage = async (): Promise<BaseProductProps[]> => {
  return fetchData("data/resource-images-2.json");
};

export const fetchForSleepImage = async (): Promise<BaseProductProps[]> => {
  return fetchData("data/resource-images-3.json");
};

export const fetchGoodsImages = async (): Promise<BaseProductProps[]> => {
  return fetchData("data/resource-images-4.json");
};

export const fetchCategoryImages = async (): Promise<BaseProductProps[]> => {
  return fetchData("data/resource-images-categories.json");
};

export const fetchAllProductsData = async (): Promise<BaseProductProps[]> => {
  return fetchData("data/server-data.json");
};

export const fetchAllData = async () => {
  try {
    const [
      categories,
      images,
      homeImages,
      sleepImages,
      goodsImages,
      categoryImages,
      allProductsData,
    ] = await Promise.all([
      fetchCategories(),
      fetchImages(),
      fetchForHomeImage(),
      fetchForSleepImage(),
      fetchGoodsImages(),
      fetchCategoryImages(),
      fetchAllProductsData(),
    ]);

    return {
      categories,
      images,
      homeImages,
      sleepImages,
      goodsImages,
      categoryImages,
      allProductsData,
    };
  } catch (err) {
    console.error("Ошибка при загрузке всех данных", err);
    return {
      categories: [],
      images: [],
      homeImages: [],
      sleepImages: [],
      goodsImages: [],
      categoryImages: [],
      allProductsData: [],
    };
  }
};
