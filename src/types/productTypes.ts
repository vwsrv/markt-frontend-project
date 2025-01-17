export type BaseProductProps = {
  id?: number;
  images?: Record<string, string>;
  title?: string;
  subtitle?: string;
  src: string;
  price?: number;
  oldprice?: number;
  rating?: number;
  likes?: number;
  isLiked?: boolean;
  variant: 'red' | 'yellow' | 'blue' | 'grey' | 'blueGradient';
  layout:
    | 'one'
    | 'two'
    | 'ten'
    | 'four'
    | 'wideAndShort'
    | 'two-tshirts'
    | 'two-fake-rings'
    | 'four-rings'
    | 'one-fork'
    | 'two-frodo';
};
