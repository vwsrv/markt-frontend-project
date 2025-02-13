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

  const getProductWord = (count: number) => {
    if (count % 10 === 1 && count % 100 !== 11) {
      return "товар";
    } else if (
      [2, 3, 4].includes(count % 10) &&
      ![12, 13, 14].includes(count % 100)
    ) {
      return "товара";
    } else {
      return "товаров";
    }
  };

  return (
    <div className={cn(classes.orderCard, classes[variant], classes[status])}>
      <div className={cn(classes.orderCardContainer, classes[variant])}>
        {orderImages.map((item, index) => (
          <OrderImage
            key={index}
            image={item.image}
            name={item.name}
            variant={item.variant}
          />
        ))}
      </div>
      <div className={cn(classes.orderNumberContainer)}>
        <h3 className={cn(classes.orderNumber)}> {orderNumber}</h3>
        <span className={cn(classes.orderStatus, classes[status])} />
      </div>
      <div className={cn(classes.orderDate)}>
        <p>{date}</p>
        <p>
          {orderCount} {getProductWord(orderCount)}
        </p>
        <p>{sum}</p>
      </div>
    </div>
  );
};
