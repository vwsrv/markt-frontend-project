import { typeCategoryIconProps } from "../category-icon/types";
import { Category } from "../../../types/productTypes";

export type typeCategoryListProps = {
  categoryData: Array<Category>;
  handler: typeCategoryIconProps["handler"];
};
