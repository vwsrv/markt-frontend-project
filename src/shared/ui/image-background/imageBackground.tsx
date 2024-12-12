"use client";

import React from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { typeImageBackgroundProps } from "./types";

export const ImageBackground: React.FC<typeImageBackgroundProps> = (props) => {
  const { handler, variant, saleName, saleValue } = props;

  return (
    <div
      className={cn(classes.imageContainer, classes[variant])}
      onClick={handler}
    >
      <span className={cn(classes.saleValue)}>
        <p>&ndash; {saleValue}</p>
      </span>
      <span className={cn(classes.saleImage)}>
        <p>{saleName}</p>
      </span>
    </div>
  );
};
