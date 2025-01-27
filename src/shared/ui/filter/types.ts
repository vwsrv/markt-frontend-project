export interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  popularity: number;
}

export interface FilterProps {
  onSortByPopularity: () => void;
  onSortByRating: () => void;
  onSortByPriceLowToHigh: () => void;
  onSortByPriceHighToLow: () => void;
}
