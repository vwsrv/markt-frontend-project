"use client";

import React from "react";
import cn from "classnames";
import classes from "./styles.module.scss";
import { DropdownMenu } from "../../shared/ui/dropdown-menu/dropdownMenu";

export const Catalog: React.FC = () => {
  const data = [
    { value: "1", label: "Предметы искусства", color: "red" },
    { value: "2", label: "Помощь психолога", color: "orange" },
    { value: "3", label: "Гаджеты", color: "pure-yellow" },
    { value: "4", label: "Джиуджиииииииитсу", color: "green" },
    { value: "5", label: "Джиуджиииииииитсу", color: "light-green" },
    { value: "6", label: "Джиуджиииииииитсу" },
  ];

  const handleSetValue = (selectedValues: string) => {
    console.log("Выбранные значения:", selectedValues);
  };

  return (
    <div className={cn(classes.catalog)}>
      <DropdownMenu
        variant="default"
        dataList={data}
        setValue={handleSetValue}
        value={"Категории"}
      />
      <DropdownMenu
        variant="colorSelector"
        dataList={data}
        setValue={handleSetValue}
        value={"Категории"}
      />
    </div>
  );
};
