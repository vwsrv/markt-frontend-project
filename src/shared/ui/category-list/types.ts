import { typeCategoryIconProps } from "../category-icon/types";

export type typeCategoryListProps = {
  categoryData: Array<{
    link: string;
    name: string;
  }>;
  handler: typeCategoryIconProps["handler"];
};
