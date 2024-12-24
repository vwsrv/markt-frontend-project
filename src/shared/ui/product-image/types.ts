export type typeProductImageProps = {
  goodsData: Array<{
    id: number;

    title?: string;
    images:
      | Array<{
          src: string;
        }>
      | string;
  }>;
  saleName?: string;
  saleValue?: string;
  variant?: "red" | "yellow" | "blue" | "grey" | "blueGradient";
  layout?: "one" | "two" | "ten" | "four" | "wideAndShort";
};
