/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { typeProductInfoProps } from "./types";
import { ButtonMain } from "../btn-main";
import { ButtonCounter } from "../btn-counter";

export const ProductInfo: React.FC<typeProductInfoProps> = (props) => {
  const { productData, type } = props;

  const [clickedItems, setClickedItems] = React.useState<{
    [id: string]: number;
  }>({});

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1160);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleAddToCart = (id: string) => {
    setClickedItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleIncrease = (id: string) => {
    setClickedItems((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const handleDecrease = (id: string) => {
    setClickedItems((prev) => {
      const updatedQuantity = prev[id] - 1;
      if (updatedQuantity <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [id]: updatedQuantity,
      };
    });
  };

  return productData.map((item) => {
    const isClicked = !!clickedItems[item.id as string];
    const quantity = clickedItems[item.id as number] || 0;

    return (
      <div key={item.id} className={cn(classes.productInfo)}>
        {type !== "small" && !isMobile && (
          <div className={cn(classes.productText)}>
            <div className={cn(classes.titleContainer)}>
              <h1 className={cn(classes.productTitle)}>
                {item.title}
                {type !== "default" && !isMobile && (
                  <ButtonMain variant="like" className="likeButton" />
                )}
              </h1>
            </div>
            <p className={cn(classes.productSubTitle, "inter")}>
              {item.subtitle}
            </p>
          </div>
        )}
        <div className={cn(classes.productNumbers, classes[type])}>
          <div className={cn(classes.productNumbersContainer, classes[type])}>
            <div className={cn(classes.productPriceInfo, classes[type])}>
              <p className={cn(classes.price, "price", classes[type])}>
                {item.price} &#8381;
              </p>
              {item.oldprice && (
                <span className={cn(classes.oldPrice, classes[type])}>
                  {item.oldprice}&#8381;
                </span>
              )}
            </div>
            {isMobile && type === "small" && (
              <h1 className={classes.titleTypeSmall}>{item.title}</h1>
            )}
            <div className={cn(classes.productQuality, classes[type])}>
              <p className={cn(classes.productRating, classes[type])}>
                {item.rating?.toFixed(1)}
              </p>
              <span className={cn(classes.productLikes, classes[type])}>
                {item.likes}
              </span>
            </div>
          </div>
          {!isMobile && type === "small" && (
            <h1 className={classes.titleTypeSmall}>{item.title}</h1>
          )}
          {isMobile && type !== "small" && (
            <div className={cn(classes.titleContainer)}>
              <h1 className={cn(classes.productTitle)}>{item.title}</h1>
              <p className={cn(classes.productSubTitle, "inter")}>
                {item.subtitle}
              </p>
            </div>
          )}
          <div className={cn(classes.buttonContainer, classes[type])}>
            {isMobile && type !== "small" && (
              <ButtonMain variant="like" className={cn(classes.like)} />
            )}
            {isClicked ? (
              <ButtonCounter
                quantity={quantity}
                onIncrease={() => handleIncrease(item.id as string)}
                onDecrease={() => handleDecrease(item.id as string)}
              />
            ) : (
              <ButtonMain
                variant="red"
                onClick={() => handleAddToCart(item.id as string)}
              >
                В корзину
              </ButtonMain>
            )}
          </div>
        </div>
      </div>
    );
  });
};
