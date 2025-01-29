"use client";

import React, { useState } from "react";
import { ProductImage } from "../product-image";
import { ProductInfo } from "../product-info";
import { typeProductCardProps } from "./types";
import cn from "classnames";
import classes from "./styles.module.scss";
import { PopupFormProduct } from "../../../features/PopupFormProduct";

export const ProductCard: React.FC<typeProductCardProps> = (props) => {
  const { productData, type } = props;
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddToCartClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <article className={cn(classes.card)}>
      <ProductImage productData={[productData]} />
      <ProductInfo
        productData={[productData]}
        type={type}
        onAddToCartClick={handleAddToCartClick}
      />
      {isPopupOpen && (
        <PopupFormProduct
          productData={[productData]}
          onClose={handleClosePopup}
        />
      )}
    </article>
  );
};
