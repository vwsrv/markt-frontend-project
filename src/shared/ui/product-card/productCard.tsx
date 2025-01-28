"use client";

import React from "react";
import { ProductImage } from "../product-image";
import { ProductInfo } from "../product-info";
import { typeProductCardProps } from "./types";
import cn from "classnames";
import classes from "./styles.module.scss";

export const ProductCard: React.FC<typeProductCardProps> = (props) => {
  const { productData, type } = props;

  return (
    <article className={cn(classes.card)}>
      <ProductImage productData={[productData]} />
      <ProductInfo productData={[productData]} type={type} />
    </article>
  );
};
