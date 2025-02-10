import { BaseProductProps } from "../types/productTypes";

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

export const fetchAllProductsData = async (): Promise<BaseProductProps[]> => {
  return fetchData("data/server-data.json");
};

export const fetchAllData = async () => {
  try {
    const [allProductsData] = await Promise.all([fetchAllProductsData()]);

    return {
      allProductsData,
    };
  } catch (err) {
    console.error("Ошибка при загрузке всех данных", err);
    return {
      allProductsData: [],
    };
  }
};
