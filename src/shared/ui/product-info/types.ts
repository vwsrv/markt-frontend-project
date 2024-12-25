export type typeProductInfoProps = {
  id: number;
  title?: string;
  subtitle?: string;
  price?: number;
  oldprice?: number;
  rating?: number;
  likes?: number;
  isLiked?: boolean;
  type?: 'small' | 'default';
};
