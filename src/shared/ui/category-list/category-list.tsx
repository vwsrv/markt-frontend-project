"use client";

import React from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { typeCategoryListProps } from "./types";
import { CategoryIcon } from "../category-icon";

export const CategoryList: React.FC<typeCategoryListProps> = (props) => {
  const { categoryData, handler } = props;

  return (
    <section className={cn(classes.sectionCategories)}>
      {Array.isArray(categoryData) && categoryData.length > 0 ? (
        categoryData.map((category, index) => (
          <CategoryIcon
            key={index}
            link={category.link}
            name={category.name}
            handler={handler}
          />
        ))
      ) : (
        <p>No categories available</p>
      )}
    </section>
  );
};
