"use client";

import React, { useState } from "react";
import classes from "./styles.module.scss";
import { ButtonMain } from "../../shared/ui/btn-main";
import { PopupProps } from "./types";
import { Popup } from "../../shared/ui/popup";
import cn from "classnames";

export const PopupFormProduct: React.FC<PopupProps> = (props) => {
  const { productData, onClose } = props;
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleColorClick = (colorId: string, colorName: string) => {
    setSelectedColor(colorId);
    console.log("Выбранный цвет:", colorName, "ID:", colorId);
  };

  const handleAddToCart = () => {
    const product = productData[0];
    const cartItem = {
      productId: product.id,
      selectedColor,
    };
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = [...cart, cartItem];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    console.log("Товар добавлен в корзину:", cartItem);
    onClose();
  };

  return (
    <Popup onClose={onClose}>
      <div
        className={cn(classes.imageContainer, classes[productData[0].variant])}
      >
        <img
          src={
            productData[0].images
              ? Object.values(productData[0].images)[0]
              : "no-image"
          }
          alt={productData[0].title || "Изображение товара"}
          className={classes.image}
        />
      </div>
      <h2 className={classes.title}>Цвет</h2>
      <div className={classes.colorsList}>
        {productData[0].colors?.map((color) => (
          <div
            key={color.id}
            className={cn(classes.colorItem, {
              [classes.selected]: selectedColor === color.id,
            })}
            onClick={() => handleColorClick(color.id as string, color.name)}
          >
            <img
              src={color.icon}
              alt={color.name}
              className={classes.colorIcon}
            />
            <p className="small">{color.name}</p>
          </div>
        ))}
      </div>

      <div className={classes.buttonWrapper}>
        <ButtonMain variant="red" onClick={handleAddToCart}>
          Добавить в корзину
        </ButtonMain>
      </div>
    </Popup>
  );
};
