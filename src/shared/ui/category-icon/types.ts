export type typeCategoryIconProps = {
  link: string;
  name: string;
  handler: ((id: number) => void) | (() => void) | string;
};
