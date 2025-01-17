export type typeProductImageProps = {
  goodsData: Array<{
    id: number;
    title?: string;
    src?: string;
    images?: Record<string, string>;
    variant?: 'red' | 'yellow' | 'blue' | 'grey' | 'blueGradient';
    layout?:
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
  }>;
  saleName?: string;
  saleValue?: string;
};
