import { Category } from "../../../types/productTypes";

export type typeCategoryListProps = {
  categoryData: Array<Category>;
  handler: () => void;
};
