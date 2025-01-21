import { typeCategoryIconProps } from "../category-icon/types";

export type typeCategoryListProps = {
  categoryData: Array<{
    name: string;
    link: string;
  }>;
  handler: typeCategoryIconProps["handler"];
};
