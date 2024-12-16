"use client";

import React from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { typeHeaderProps } from "./types";
import { Input } from "../input";
import { ButtonMain } from "../btn-main";
import companyLogo from "../../images/for-header/company-logo.svg";

export const Header: React.FC<typeHeaderProps> = (props) => {
  const { companyName } = props;

  return (
    <header className={cn(classes.header)}>
      <img src={companyLogo} alt={companyName} />
      <Input />
      <div className={cn(classes.headerNav)}>
        <ButtonMain variant="cart" />
        <ButtonMain variant="delivery" />
        <ButtonMain variant="favorites" />
        <ButtonMain variant="profile" />
      </div>
    </header>
  );
};
