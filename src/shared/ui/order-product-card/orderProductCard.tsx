"use client";

import React from "react";
import cn from "classnames";
import classes from "./styles.module.scss";
import { typeOrderProductCardProps } from "./types";
import { OrderImage } from "../order-image";

export const OrderProductCard: React.FC<typeOrderProductCardProps> = (
  props,
) => {
  const { variant, orderImages, orderNumber, status, orderCount, sum, date } =
    props;

  return (
    <div className={cn(classes.orderCard, classes[variant])}>
      <div className={cn(classes.orderCardContainer, classes[variant])}>
        {orderImages.map((item, index) => (
          <OrderImage
            key={index}
            link={classes.link}
            name={item.name}
            variant={variant}
          />
        ))}
      </div>
      <div className={cn(classes.orderNumberContainer)}>
        <p className={cn(classes.orderNumber)}> {orderNumber}</p>
        <span className={cn(classes.orderStatus, classes[status])} />
      </div>
      <div className={cn(classes.orderDate)}>
        <p>{date}</p>
        <p>{orderCount}</p>
        <p>{sum}</p>
      </div>
    </div>
  );
};
