"use client";

import React from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { typeCategoryIconProps } from "./types";

export const CategoryIcon: React.FC<typeCategoryIconProps> = (props) => {
  const {
    imageUrl,
    name,
    handler,
  } = props;

  return (
    <div className={cn(classes.container)} onClick={handler}>
      <img className={cn(classes.image)} src={imageUrl} alt={name} />
      <p className="small">{name}</p>
    </div>
  );
};
