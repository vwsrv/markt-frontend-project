export type typeProductCardProps = {
  goodsData: Array<{
    id: number;
    images:
      | Array<{
          src: string;
        }>
      | string;
    title?: string;
    subtitle?: string;
    price: number;
    oldprice: number;
    rating: number;
    likes: number;
  }>;
  handler: ((id: number) => void) | (() => void) | string;
  variant?: "red" | "yellow" | "blue" | "grey" | "blueGradient";
  saleName?: string;
  saleValue?: string;
  layout?: "one" | "two" | "ten" | "four" | "wideAndShort";
  isLiked?: boolean;
};
