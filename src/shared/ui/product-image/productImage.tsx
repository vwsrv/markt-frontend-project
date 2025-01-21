"use client";

import React from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { typeProductImageProps } from "./types";
import { ButtonMain } from "../btn-main";

export const ProductImage: React.FC<typeProductImageProps> = (props) => {
  const { saleName, saleValue, productData } = props;

  return (
    <>
      {productData.map((item, index) => {
        const imageLinks = Object.values(item.images || {});

        return (
          <div
            key={index}
            className={cn(
              classes.layoutContainer,
              classes[item.layout],
              classes[item.variant],
            )}
          >
            {imageLinks.length > 0 ? (
              imageLinks.map((link, imgIndex) => (
                <div
                  key={imgIndex}
                  className={cn(
                    classes.imageContainer,
                    classes[item.variant],
                    classes[item.layout],
                  )}
                >
                  <img
                    src={link}
                    alt={item.title}
                    className={cn(classes.productImage)}
                  />
                  {item.layout === "ten" && (
                    <div className={cn(classes.buttonContainer)}>
                      <ButtonMain variant="like-red" disabled={false} />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div
                className={cn(
                  classes.imageContainer,
                  classes[item.variant],
                  classes[item.layout],
                )}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className={cn(classes.productImage)}
                />
                {item.layout === "ten" && (
                  <div className={cn(classes.buttonContainer)}>
                    <ButtonMain variant="like" disabled={false} />
                  </div>
                )}
              </div>
            )}
            {saleValue && (
              <span className={cn(classes.saleValue)}>
                <p className="inter">&ndash; {saleValue}%</p>
              </span>
            )}
            {saleName && (
              <span className={cn(classes.saleImage)}>
                <p className="inter">{saleName}</p>
              </span>
            )}
          </div>
        );
      })}
    </>
  );
};
