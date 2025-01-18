import { typeProductInfoProps } from "../product-info/types";
import { BaseProductProps } from "../../../types/productTypes";

export type typeProductCardProps = {
  saleName: string;
  saleValue: string;
  type: typeProductInfoProps["type"];
  productData: BaseProductProps;
};
