export type typeImageBackgroundProps = {
  images: Array<{
    id: number;
    src: string;
    name?: string;
  }>;
  handler: ((id: number) => void) | (() => void) | string;
  variant?: "red" | "yellow" | "blue" | "grey" | "blueGradient";
  saleName?: string;
  saleValue?: string;
  layout?: "one" | "two" | "ten" | "four" | "wideAndShort";
};
