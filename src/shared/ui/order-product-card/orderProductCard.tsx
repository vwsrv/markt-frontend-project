"use client";

import React from "react";
import cn from "classnames";
import classes from "./styles.module.scss";
import { typeOrderProductCard } from "./types";

export const OrderProductCard: React.FC<typeOrderProductCard> = (props) => {
  const { link, name, variant } = props;

  return (
    <div className={cn(classes.orderCard, classes[variant])}>
      <img src={link} alt={name} />
    </div>
  );
};
