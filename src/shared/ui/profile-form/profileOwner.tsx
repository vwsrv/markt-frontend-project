"use client";

import React from "react";
import classes from "./styles.module.scss";
import { typeProfileOwnerProps } from "./types";
import cn from "classnames";

export const ProfileForm: React.FC<typeProfileOwnerProps> = (props) => {
  const { title, children } = props;

  return (
    <form className={cn(classes.profileForm)}>
      <h1 className={cn(classes.profileFormTitle)}>{title}</h1>
      <div className={cn(classes.profileFormContainer)}>{children}</div>
    </form>
  );
};
