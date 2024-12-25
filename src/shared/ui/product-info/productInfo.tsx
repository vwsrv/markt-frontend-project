"use client";

import React from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { typeProductInfoProps } from "./types";
import { ButtonMain } from "../btn-main";

export const ProductInfo: React.FC<typeProductInfoProps> = (props) => {
  const { title, subtitle, price, oldprice, rating, likes, type } = props;

  return (
    <div className={cn(classes.productInfo)}>
      {type !== "small" ? (
        <div className={cn(classes.productText)}>
          <div className={cn(classes.titleContainer)}>
            <h1 className="inter">{title}</h1>
            <ButtonMain variant="like" />
          </div>
          <p className={cn(classes.productSubTitle, "inter")}>{subtitle}</p>
        </div>
      ) : null}
      <div className={cn(classes.productNumbers, classes[type])}>
        <div className={cn(classes.productNumbersContainer, classes[type])}>
          <div className={cn(classes.productPriceInfo, classes[type])}>
            <p className={cn(classes.price, "price", classes[type])}>
              {price} &#8381;
            </p>
            {oldprice && (
              <span className={cn(classes.oldPrice, classes[type])}>
                {oldprice} &#8381;
              </span>
            )}
          </div>
          <div className={cn(classes.productQuality, classes[type])}>
            <p className={cn(classes.productRating, classes[type])}>
              {rating.toFixed(1)}
            </p>
            <span className={cn(classes.productLikes, classes[type])}>
              {likes}
            </span>
          </div>
        </div>
        {type === "small" ? (
          <h1 className={classes.titleTypeSmall}>{title}</h1>
        ) : null}
        <div className={cn(classes.buttonContainer, classes[type])}>
          <ButtonMain variant="red">В корзину</ButtonMain>
        </div>
      </div>
    </div>
  );
};
