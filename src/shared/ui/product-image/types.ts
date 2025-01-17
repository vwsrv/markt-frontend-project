import { BaseProductProps } from '../../../types/productTypes';

export type typeProductImageProps = {
  productData: BaseProductProps[];
  saleName?: string | null;
  saleValue?: string | null;
};
