export type Color = {
  label: string;
  icon?: string;
  color: string;
};

export type Category = {
  id?: number;
  name: string;
  link: string;
};

export type BaseProductProps = {
  id?: number | string;
  images?: Record<string, string>;
  title?: string;
  subtitle?: string;
  src: string;
  price: number;
  oldprice?: number;
  rating: number;
  likes?: number;
  isLiked?: boolean;
  variant: "red" | "yellow" | "blue" | "grey" | "blueGradient";
  layout:
    | "one"
    | "two"
    | "ten"
    | "four"
    | "wideAndShort"
    | "two-tshirts"
    | "two-fake-rings"
    | "four-rings"
    | "one-fork"
    | "two-frodo";
  colors?: Array<Color>;
  saleName?: string;
  saleValue?: string;
  category?: Array<Category>;
  brand?: string;
  style?: string;
  popularity: string;
};
