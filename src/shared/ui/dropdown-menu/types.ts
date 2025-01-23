import { SelectHTMLAttributes } from "react";

export interface Option {
  value: string;
  label: string;
}

export interface typeDropdownProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  variant: "light-gray" | "blue";
  dataList: Option[];
  setValue: (selectedValue: string) => void;
  value: string;
}
