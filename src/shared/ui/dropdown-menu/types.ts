import { SelectHTMLAttributes } from "react";

export interface Option {
  value: string;
  label: string;
  color?: string;
}

export interface typeDropdownProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  variant: "default" | "colorSelector";
  dataList: Option[];
  setValue: (selectedValue: string) => void;
  value: string;
}
