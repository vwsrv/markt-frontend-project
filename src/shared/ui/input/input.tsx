"use client";

import React from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { InputProps } from "./types";

export const Input: React.FC<InputProps> = (props) => {
  const { name, value, required, onChange, type = "text", placeholder } = props;

  return (
    <label className={cn(classes.inputContainer)}>
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <span></span>
    </label>
  );
};
