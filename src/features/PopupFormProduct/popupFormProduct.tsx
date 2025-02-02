"use client";

import React, { useState } from "react";
import classes from "./styles.module.scss";
import { ButtonMain } from "../../shared/ui/btn-main";
import { PopupProps } from "./types";
import { Popup } from "../../shared/ui/popup";
import cn from "classnames";

export const PopupFormProduct: React.FC<PopupProps> = (props) => {
  const { productData, onClose } = props;
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleColorClick = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName)
        ? prev.filter((color) => color !== colorName)
        : [...prev, colorName],
    );
    setError(null);
  };

  const handleAddToCart = () => {
    if (selectedColors.length === 0) {
      setError("Пожалуйста, выберите цвет");
      return;
    }

    const product = productData[0];
    const cartItem = {
      productId: product.id,
      selectedColors,
    };
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = [...cart, cartItem];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    console.log("Товар добавлен в корзину:", cartItem);
    onClose();
  };

  return (
    <Popup onClose={onClose} isMounted={true}>
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
        {productData[0].colors?.map((item, id) => (
          <div
            key={id}
            className={cn(classes.colorItem, {
              [classes.selected]: selectedColors.includes(item.label),
            })}
            onClick={() => handleColorClick(item.label)}
          >
            <div className={cn(classes.colorIcon, classes[item.color])}>
              <img src={item.icon} alt={item.label} />
            </div>
            <p className="small">{item.label}</p>
          </div>
        ))}
      </div>
      {error && <p className={classes.error}>{error}</p>}
      <div className={classes.buttonWrapper}>
        <ButtonMain variant="red" onClick={handleAddToCart}>
          Добавить в корзину
        </ButtonMain>
      </div>
    </Popup>
  );
};
