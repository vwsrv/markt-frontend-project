"use client";

import React from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { typePromoBannerProps } from "./types";

export const PromoBanner: React.FC<typePromoBannerProps> = (props) => {
  const { handler, imageLink } = props;

  return (
    <div className={cn(classes.promoBanner)}>
      <img
        className={cn(classes.container)}
        src={imageLink}
        alt="Рекламный баннер"
        onClick={handler}
      ></img>
    </div>
  );
};
