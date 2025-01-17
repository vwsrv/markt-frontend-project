"use client";

import React from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { typeSectionTitleProps } from "./types";

export const SectionTitle: React.FC<typeSectionTitleProps> = (props) => {
  const { src, alt, variant } = props;

  return (
    <div className={cn(classes.categoryName, classes[variant])}>
      <img className={cn(classes.categoryImage, classes[variant])} src={src} alt={alt} />
    </div>
  );
};
