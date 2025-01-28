"use client";

import { forwardRef } from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { InputProps } from "./types";

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    name,
    value,
    required,
    onChange,
    type = "text",
    placeholder,
    onFocus,
  } = props;

  return (
    <label className={cn(classes.inputContainer)}>
      <input
        className={classes.inputArea}
        ref={ref}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={onFocus}
      />
    </label>
  );
});
