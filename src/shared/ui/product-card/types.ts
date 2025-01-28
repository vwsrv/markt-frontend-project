import { typeProductInfoProps } from "../product-info/types";
import { BaseProductProps } from "../../../types/productTypes";

export type typeProductCardProps = {
  type: typeProductInfoProps["type"];
  productData: BaseProductProps;
};
