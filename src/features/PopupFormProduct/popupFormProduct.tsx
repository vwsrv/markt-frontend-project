"use client";

import React from "react";
import classes from "./styles.module.scss";
import { ButtonMain } from "../../shared/ui/btn-main";
import { PopupProps } from "./types";
import cn from "classnames";

export const PopupFormProduct: React.FC<PopupProps> = (props) => {
  const { productData, onClose } = props;

  return (
    <div className={classes.overlay}>
      <div className={classes.popup}>
        <div
          className={cn(
            classes.imageContainer,
            classes[productData[0].variant],
          )}
        >
          <img
            src={
              productData[0].images
                ? Object.values(productData[0].images)[0]
                : ""
            }
            alt={productData[0].title || "Изображение товара"}
            className={classes.image}
          />
        </div>
        <div className={classes.closePopupBtn} onClick={onClose}>
          <ButtonMain variant="remove"></ButtonMain>
        </div>
        <h2 className={classes.title}>Цвет</h2>
        <div className={classes.colorsList}>
          {productData[0].colors?.map((color) => (
            <div key={color.id} className={classes.colorItem}>
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
          <ButtonMain variant="red">
            <p className="medium">Добавить в корзину</p>
          </ButtonMain>
        </div>
      </div>
    </div>
  );
};
