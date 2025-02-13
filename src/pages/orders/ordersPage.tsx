"use client";

import React from "react";
import cn from "classnames";
import classes from "./styles.module.scss";
import { OrderProductCard } from "../../shared/ui/order-product-card/orderProductCard";

export const OrdersPage: React.FC = () => {
  const [ordersData, setOrdersData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data/profile.json");
        if (!res.ok) {
          throw new Error("Ошибка загрузки данных о заказе");
        }
        const profileData = await res.json();

        setOrdersData(profileData.orders);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={cn(classes.ordersPage)}>
      {ordersData.map((order, index) => {
        const orderImages = order.items.flatMap((item) => item);
        console.log(orderImages);

        return (
          <OrderProductCard
            key={index}
            orderImages={orderImages}
            variant={order.variant}
            orderNumber={order.orderNumber}
            status={order.status}
            orderCount={order.items.length}
            sum={order.totalAmount}
            date={order.date}
          />
        );
      })}
    </div>
  );
};
