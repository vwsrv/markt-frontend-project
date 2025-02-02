"use client";

import React from "react";
import { DropdownMenu } from "../../shared/ui/dropdown-menu/dropdownMenu";
import { Popup } from "../../shared/ui/popup";
import { typePopupFormFilterProps } from "./types";
import cn from "classnames";
import classes from "./styles.module.scss";

export const PopupFormFilter: React.FC<typePopupFormFilterProps> = (props) => {
  const { onClose, filters, onFilterChange } = props;
  const handleFilterChange = (filterType: string) => (value: string[]) => {
    onFilterChange(filterType, value);
  };

  return (
    <Popup onClose={onClose} isMounted={true} title="Фильтры">
      <div className={cn(classes.popupContainer)}>
        <DropdownMenu
          variant="popup"
          dataList={filters.category}
          setValue={handleFilterChange("category")}
          title="Категории"
        />
        <DropdownMenu
          variant="price"
          dataList={filters.price}
          setValue={handleFilterChange("price")}
          title="Цена"
        />
        <DropdownMenu
          variant="popup"
          dataList={filters.brand}
          setValue={handleFilterChange("brand")}
          title="Бренды"
        />
        <DropdownMenu
          variant="popup"
          dataList={filters.style}
          setValue={handleFilterChange("style")}
          title="Стили"
        />
        <DropdownMenu
          variant="popupColor"
          dataList={filters.color}
          setValue={handleFilterChange("color")}
          title="Цвета"
        />
      </div>
    </Popup>
  );
};
