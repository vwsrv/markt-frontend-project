export type DropdownOption = {
  label: string;
  color?: string;
};

export type typeDropdownProps = {
  variant: "default" | "popupColor" | "popup" | "price";
  dataList: DropdownOption[];
  setValue: (value: string[]) => void;
  title?: string;
};
