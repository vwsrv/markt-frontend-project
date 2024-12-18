"use client";

import React from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { typeProductInfoProps } from "./types";
import { ButtonMain } from "../btn-main";

export const ProductInfo: React.FC<typeProductInfoProps> = (props) => {
  const { title, subtitle, price, oldprice, rating, likes } = props;

  return (
    <div className={cn(classes.productInfo)}>
      <div className={cn(classes.productText)}>
        <div className={cn(classes.titleContainer)}>
          <h1 className={cn(classes.productTitle)}>{title}</h1>
          <ButtonMain variant="like" />
        </div>
        <p className={cn(classes.productSubTitle)}>{subtitle}</p>
      </div>
      <div className={cn(classes.productNumbers)}>
        <div className={cn(classes.productNumbersContainer)}>
          <div className={cn(classes.productPriceInfo)}>
            <p className={cn(classes.price)}>{price} &#8381;</p>
            <span className={cn(classes.oldPrice)}>{oldprice} &#8381;</span>
          </div>
          <div className={cn(classes.productQuality)}>
            <p className={cn(classes.productRating)}>{rating.toFixed(1)}</p>
            <span className={cn(classes.productLikes)}>{likes}</span>
          </div>
        </div>
        <ButtonMain variant="red">В корзину</ButtonMain>
      </div>
    </div>
  );
};
