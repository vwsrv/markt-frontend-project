import React from "react";
import { ProductImage } from "../product-image";
import { ProductInfo } from "../product-info";
import { typeProductCardProps } from "./types";
import cn from "classnames";
import classes from './styles.module.scss';

export const ProductCard: React.FC<typeProductCardProps> = (props) => {
  const { saleName, saleValue, layout, productData, variant, type } = props;

  return (
    <article key={productData.id} className={cn(classes.card, classes[variant], classes[layout])}>
      <ProductImage
        saleName={saleName}
        saleValue={saleValue}
        layout={layout}
        goodsData={[productData]}
      />
      <ProductInfo
        title={productData.title}
        subtitle={productData.subtitle}
        price={productData.price}
        oldprice={productData.oldprice}
        rating={productData.rating}
        likes={productData.likes}
        type={type}
      />
    </article>
  );
};
