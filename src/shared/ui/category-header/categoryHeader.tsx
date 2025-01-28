"use client";

import React from "react";
import cn from "classnames";
import classes from "./styles.module.scss";
import { typeCategoryHeaderProps } from "./types";

export const CategoryHeader: React.FC<typeCategoryHeaderProps> = (props) => {
  const { title, productQuantity, children } = props;

  const getProductWord = (quantity: number): string => {
    if (quantity === 1) {
      return "товар";
    } else if (quantity >= 2 && quantity <= 4) {
      return "товара";
    } else {
      return "товаров";
    }
  };

  return (
    <div className={cn(classes.categoryHeader)}>
      <div className={cn(classes.titleContainer)}>
        <h2 className={cn(classes.categoryTitle)}>{title}</h2>
        <p
          className={cn(classes.categorySubTitle, "medium")}
        >{`${productQuantity} ${getProductWord(productQuantity)}`}</p>
      </div>
      {children}
    </div>
  );
};
