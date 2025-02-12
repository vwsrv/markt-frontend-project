import { BaseProductProps } from "../../../types/productTypes";
import { typeOrderImageProps } from "../order-image/types";

export type typeOrderProductCardProps = {
  orderImages: typeOrderImageProps[];
  variant: BaseProductProps["variant"];
  orderNumber: string;
  status: "ready" | "ship" | "received" | "assembly";
  orderCount: string;
  sum: string;
  date: string;
};
