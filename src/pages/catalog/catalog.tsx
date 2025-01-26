"use client";

import React from "react";
import cn from "classnames";
import classes from "./styles.module.scss";
import { DropdownMenu } from "../../shared/ui/dropdown-menu/dropdownMenu";
import { PopupFormProduct } from "../../features/PopupFormProduct";

export const Catalog: React.FC = () => {
  const data = [
    { value: "1", label: "Предметы искусства", color: "red" },
    { value: "2", label: "Помощь психолога", color: "orange" },
    { value: "3", label: "Гаджеты", color: "pure-yellow" },
    { value: "4", label: "Джиуджиииииииитсу", color: "green" },
    { value: "5", label: "Джиуджиииииииитсу", color: "light-green" },
    { value: "6", label: "Джиуджиииииииитсу" },
  ];

  const productData = [
    {
      id: 14,
      title:
        "Столовая вилка, великоустюгский завод «Северная чернь», серебро 925 пробы",
      price: 4499,
      oldprice: 8998,
      rating: 4.8,
      likes: 8492,
      images: {
        "1": "/images/resource-images/69.png",
      },
      variant: "yellow",
      layout: "ten",
      colors: [
        {
          id: 1,
          name: "красивый",
          icon: "/images/icons/beautiful.png",
        },
        {
          id: 2,
          name: "подшофе",
          icon: "/images/icons/tipsy.png",
        },
        {
          id: 3,
          name: "паладиновый",
          icon: "/images/icons/paladin.png",
        },
        {
          id: 4,
          name: "артериальный",
          icon: "/images/icons/arterial.png",
        },
        {
          id: 5,
          name: "спорный",
          icon: "/images/icons/controversial.png",
        },
      ],
    },
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
      <PopupFormProduct
        onClose={() => console.log("Открыто")}
        productData={productData}
      />
    </div>
  );
};
