"use client";

import React from "react";
import cn from "classnames";
import classes from "./styles.module.scss";
import { typeOrderImageProps } from "./types";

export const OrderImage: React.FC<typeOrderImageProps> = (props) => {
  const { image, name, variant } = props;

  return (
    <div className={cn(classes.orderImageContainer, classes[variant])}>
      <img
        className={cn(classes.orderImage, classes[variant])}
        src={image}
        alt={name}
      />
    </div>
  );
};
