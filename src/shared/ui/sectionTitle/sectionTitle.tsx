"use client";

import React from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { typeSectionTitleProps } from "./types";
import categoryName from './images/for-home.svg';

export const SectionTitle: React.FC<typeSectionTitleProps> = (props) => {
  const { src, alt } = props;

  return (
    <div className={cn(classes.categoryName)}>
      <img className={cn(classes.categoryImage)} src={categoryName} alt={alt} />
    </div>
  );
};
