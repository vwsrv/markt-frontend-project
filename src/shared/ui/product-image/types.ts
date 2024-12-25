export type typeProductImageProps = {
  goodsData: Array<{
    id: number;
    title?: string;
    src?: string;
    images?: Record<string, string>;
    variant?: "red" | "yellow" | "blue" | "grey" | "blueGradient";
    layout?: "one" | "two" | "ten" | "four" | "wideAndShort";
  }>;
  saleName?: string;
  saleValue?: string;
};
