"use client";

import React from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { typeItemIconProps } from "./types";

export const itemIcon: React.FC<typeItemIconProps> = (props) => {
  const {
    id,
    imageUrl,
    name,
    handler,
    ...otherProps
  } = props;

  return (
    <div className={cn(classes.)}></div>
  );
};
