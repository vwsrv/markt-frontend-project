import { BaseProductProps } from "../../../types/productTypes";
import { typeProductInfoProps } from "../product-info/types";

export type typeProductCardListProps = {
  type: typeProductInfoProps["type"];
  goodsData: Array<BaseProductProps>;
  style: "default" | "ten" | "category";
};
