"use client";

import React from "react";
import styles from "./styles.module.scss";
import { FilterProps } from "./types";
import { ButtonMain } from "../btn-main";

export const ProductFilter: React.FC<FilterProps> = (props) => {
  const {
    onSortByPopularity,
    onSortByRating,
    onSortByPriceLowToHigh,
    onSortByPriceHighToLow,
  } = props;
  const [activeFilter, setActiveFilter] = React.useState<string | null>(null);

  const handleFilterClick = (filterType: string, onClick: () => void) => {
    setActiveFilter(filterType);
    onClick();
  };

  const filterButtons = [
    {
      label: "Популярные",
      onClick: onSortByPopularity,
      filterType: "popularity",
    },
    {
      label: "С высоким рейтингом",
      onClick: onSortByRating,
      filterType: "rating",
    },
    {
      label: "Подешевле",
      onClick: onSortByPriceLowToHigh,
      filterType: "priceLowToHigh",
    },
    {
      label: "Подороже",
      onClick: onSortByPriceHighToLow,
      filterType: "priceHighToLow",
    },
  ];

  return (
    <div className={styles.filterContainer}>
      {filterButtons.map((button, index) => (
        <ButtonMain
          key={index}
          variant="filter"
          onClick={() => handleFilterClick(button.filterType, button.onClick)}
          isActive={activeFilter === button.filterType}
        >
          {button.label}
        </ButtonMain>
      ))}
    </div>
  );
};
