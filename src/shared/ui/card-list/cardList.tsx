import React from "react";
import cn from "classnames";
import classes from "./styles.module.scss";
import { ProductCard } from "../product-card/productCard";
import { typeProductCardListProps } from "./types";

export const CardList: React.FC<typeProductCardListProps> = (props) => {
  const { variant, saleName, saleValue, layout, goodsData, style, type } = props;

  return (
    <section
      className={cn(
        classes.cardList,
        classes[layout],
        classes[variant],
        classes[style]
      )}
    >
      {goodsData.map((item) => (
        <ProductCard
          key={item.id}
          variant={variant}
          saleName={saleName}
          saleValue={saleValue}
          layout={layout}
          productData={item}
          type={type}
        />
      ))}
    </section>
  );
};
