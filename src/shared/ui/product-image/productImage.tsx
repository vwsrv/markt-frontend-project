'use client';

import React from 'react';
import classes from './styles.module.scss';
import cn from 'classnames';
import { typeProductImageProps } from './types';
import { ButtonMain } from '../btn-main';

export const ProductImage: React.FC<typeProductImageProps> = (props) => {
  const { saleName, saleValue, goodsData } = props;

  return (
    <>
      {goodsData.map((item, index) => {
        const imageLinks = Object.values(item.images || {});
        const variant = item.variant;
        const layout = item.layout;

        return (
          <div
            key={index}
            className={cn(
              classes.layoutContainer,
              classes[layout],
              classes[variant],
            )}
          >
            {imageLinks.length > 0 ? (
              imageLinks.map((link, imgIndex) => (
                <div
                  className={cn(
                    classes.imageContainer,
                    classes[variant],
                    classes[layout],
                  )}
                >
                  <img
                    key={imgIndex}
                    src={link}
                    alt={item.title}
                    className={cn(classes.productImage)}
                  />
                  {layout === 'ten' && (
                    <div className={cn(classes.buttonContainer)}>
                      <ButtonMain variant="like" disabled={false} />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div
                className={cn(
                  classes.imageContainer,
                  classes[variant],
                  classes[layout],
                )}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className={cn(classes.productImage)}
                />
                {layout === 'ten' && (
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
