export type typeCategoryLiistProps = {
  categoryData: {
    link: string;
    name: string;
    handler: ((id: number) => void) | (() => void) | string;
  };
};
