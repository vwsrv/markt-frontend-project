export type typeImageBackgroundProps = {
  handler: ((id: number) => void) | (() => void) | string;
  variant?: "red" | "yellow" | "blue" | "grey" | "blueGradient";
  saleName?: string;
  saleValue?: string;
};
