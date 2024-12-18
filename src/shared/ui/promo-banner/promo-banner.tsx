"use client";

import React from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import promoImage from '../../images/for-promo-banner/promo-banner.svg'
import { typePromoBannerProps } from "./types";

export const PromoBanner: React.FC<typePromoBannerProps> = (props) => {
  const {
    handler,
  } = props;

  return (
    <img className={cn(classes.container)} src={promoImage} onClick={handler}></img>
  );
};
