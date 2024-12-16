"use client";

import React from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { CounterButtonProps } from "./types";

export const MainPage: React.FC<CounterButtonProps> = (props) => {
  const { quantity, onIncrease, onDecrease } = props;
  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    const localDataRequest = async () => {
      try {
        const res = await fetch("/src/utils/images/images.json"); // Убедитесь, что путь корректен
        if (!res.ok) {
          throw new Error("Ошибка");
        }
        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.log(err);
      }
    };

    localDataRequest();
  }, []);

  return (
    <div className={cn(classes.buttonCounter)}>
      <button
        aria-label="Убавить"
        className={cn(classes.minus)}
        onClick={onDecrease}
      ></button>
      <span>
        <p className="inter">{quantity}</p>
      </span>
      <button
        aria-label="Добавить"
        className={cn(classes.plus)}
        onClick={onIncrease}
      ></button>
    </div>
  );
};
