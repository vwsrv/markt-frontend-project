"use client";

import React from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { typePromoBannerProps } from "./types";

export const PromoBanner: React.FC<typePromoBannerProps> = (props) => {
  const {
    handler,
  } = props;

  return (
    <div className={cn(classes.container)} onClick={handler}></div>
  );
};
