export type typeProductInfoProps = {
  goods: Array<{
    id: number;
    title: string;
    subtitle?: string;
    price: number;
    oldprice: number;
    rating: number;
    likes: number;
  }>;
  isLiked?: boolean;
};
