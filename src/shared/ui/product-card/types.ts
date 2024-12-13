export type typeCategoryIconProps = {
  imageUrl: string;
  name: string;
  handler: ((id: number) => void) | (() => void) | string;
};
