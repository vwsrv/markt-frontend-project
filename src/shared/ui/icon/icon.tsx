"use client";

import React from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { typeIconProps } from "./types";

export const Icon: React.FC<typeIconProps> = (props) => {
  const { src, alt } = props;

  return (
    <img src={src} alt={alt} className={cn(classes.icon)} />
  );
};
