"use client";

import React from "react";
import styles from "./styles.module.scss";
import { FilterProps } from "./types";
import { ButtonMain } from "../btn-main";
import cn from "classnames";

export const ProductFilter: React.FC<FilterProps> = (props) => {
  const {
    onSortByPopularity,
    onSortByRating,
    onSortByPriceLowToHigh,
    onSortByPriceHighToLow,
  } = props;
  const [activeFilter, setActiveFilter] = React.useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const handleFilterClick = (filterType: string, onClick: () => void) => {
    setActiveFilter(filterType);
    onClick();
    setIsDropdownOpen(false);
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
      <div className={styles.desktopFilters}>
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
      <div
        className={cn(styles.mobileDropdownContainer, {
          [styles.open]: isDropdownOpen,
        })}
      >
        <ButtonMain
          variant="dropdown"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={cn(styles.mobileDropdown, {
            [styles.open]: isDropdownOpen,
          })}
        >
          {activeFilter
            ? filterButtons.find((option) => option.filterType === activeFilter)
                ?.label
            : filterButtons[0].label}
        </ButtonMain>

        <div
          className={cn(styles.mobileOptions, {
            [styles.open]: isDropdownOpen,
          })}
        >
          {filterButtons.map((button, index) => (
            <div
              key={index}
              className={cn(styles.mobileOption, {
                [styles.active]: activeFilter === button.filterType,
              })}
              onClick={() =>
                handleFilterClick(button.filterType, button.onClick)
              }
            >
              <p className="small">{button.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
