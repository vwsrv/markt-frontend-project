"use client";

import React from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { typeCategoryLiistProps } from "./types";
import { CategoryIcon } from "../category-icon";

export const CategoryList: React.FC<typeCategoryLiistProps> = (props) => {
  const { categoryData } = props;

  return (
    <section className={cn(classes.sectionCategories)}>
      {categoryData.map((category, index) => (
        <CategoryIcon key={index} link={category.link} name={category.name} />
      ))}
    </section>
  );
};
