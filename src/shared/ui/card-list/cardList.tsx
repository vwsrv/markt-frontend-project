import React from "react";
import cn from "classnames";
import classes from "./styles.module.scss";
import { ProductCard } from "../product-card/productCard";
import { typeProductCardListProps } from "./types";

export const CardList: React.FC<typeProductCardListProps> = (props) => {
  const { saleName, saleValue, goodsData, style, type } = props;

  return (
    <>
      <section className={cn(classes.cardList, classes[style])}>
        {goodsData.map((item) => (
          <ProductCard
            key={item.id}
            saleName={saleName}
            saleValue={saleValue}
            productData={item}
            type={type}
          />
        ))}
      </section>
    </>
  );
};
