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
    ...otherProps
  } = props;

  return (
    <button
      disabled={disabled}
      className={cn(className, classes.button, classes[variant])}
      {...otherProps}
    >
      <p className="inter">{children}</p>
    </button>
  );
};
