import cn from "classnames";
import classes from "./styles.module.scss";
import { ProductImage } from "../product-image";
import { ProductInfo } from "../product-info";
import { typeProductCardProps } from "./types";

export const ProductCard: React.FC<typeProductCardProps> = (props) => {
  const { variant, saleName, saleValue, layout, goodsData } = props;

  return (
    <>
    <section className={cn(classes.cardList)}>
      {goodsData.map((item) => (
        <article
          key={item.id}
          className={cn(classes.card, classes[layout], classes[variant])}
        >
          <ProductImage
            saleName={saleName}
            saleValue={saleValue}
            layout={layout}
            goodsData={[item]}
          />
          <ProductInfo
            title={item.title}
            subtitle={item.subtitle}
            price={item.price}
            oldprice={item.oldprice}
            rating={item.rating}
            likes={item.likes}
          />
        </article>
      ))}
      </section>
    </>
  );
};
