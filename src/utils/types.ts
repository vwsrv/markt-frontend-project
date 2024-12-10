export type typeItemIconProps = {
  id?: number;
  imageUrl: string;
  name: string;
  handler: ((id: number) => void) | (() => void) | string;
};
