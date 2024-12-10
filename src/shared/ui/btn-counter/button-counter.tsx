"use client";

import React from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { CounterButtonProps } from "./types";

export const ButtonCounter: React.FC<CounterButtonProps> = (props) => {
  const { quantity, onIncrease, onDecrease } = props;

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
