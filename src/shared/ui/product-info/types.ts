import { BaseProductProps } from "../../../types/productTypes";

export type typeProductInfoProps = {
  productData: BaseProductProps[];
  type: "default" | "small";
  onAddToCartClick: () => void;
};
