type DropdownOption = {
  label: string;
  color?: string;
};

export type typeDropdownProps = {
  variant: "default" | "colorSelector";
  dataList: DropdownOption[];
  setValue: (value: string) => void;
  title: string;
};
