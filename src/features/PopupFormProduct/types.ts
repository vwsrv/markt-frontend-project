import { BaseProductProps } from "../../types/productTypes";

export interface PopupProps {
  productData: Array<BaseProductProps>;
  onClose: () => void;
}
