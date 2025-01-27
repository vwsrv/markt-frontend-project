"use client";

import React from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { typeButtonProps } from "./types";

export const ButtonMain: React.FC<typeButtonProps> = (props) => {
  const {
    variant = "like",
    children,
    disabled,
    className,
    isActive,
    ...otherProps
  } = props;

  return (
    <button
      disabled={disabled}
      className={cn(className, classes.button, classes[variant], {
        [classes.active]: isActive,
      })}
      {...otherProps}
    >
      <p className="inter">{children}</p>
    </button>
  );
};
