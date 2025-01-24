"use client";

import React from "react";
import cn from "classnames";
import classes from "./styles.module.scss";
import { DropdownMenu } from "../../shared/ui/dropdown-menu/dropdownMenu";

export const Catalog: React.FC = () => {
  const data = [
    { value: "1", label: "Предметы искусства" },
    { value: "2", label: "Помощь психолога" },
    { value: "3", label: "Гаджеты" },
    { value: "4", label: "Джиуджиииииииитсу" },
    { value: "5", label: "Джиуджиииииииитсу" },
    { value: "6", label: "Джиуджиииииииитсу" },
  ];

  const handleSetValue = (selectedValues: string) => {
    console.log("Выбранные значения:", selectedValues);
  };

  return (
    <div className={cn(classes.catalog)}>
      <DropdownMenu
        variant="light-gray"
        dataList={data}
        setValue={handleSetValue}
        value={"Категории"}
      />
    </div>
  );
};
