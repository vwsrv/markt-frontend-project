"use client";

import React from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { typeHeaderProps } from "./types";
import { Input } from "../input";
import companyLogo from "../../images/for-header/company-logo.svg";
import { Icon } from "../icon";
import cartLogo from "../../images/for-icon/cart.svg";
import profileLogo from "../../images/for-icon/profile.svg";
import favoritesLogo from "../../images/for-icon/favorites.svg";
import deliveryLogo from "../../images/for-icon/delivery.svg";

export const Header: React.FC<typeHeaderProps> = (props) => {
  const { companyName } = props;

  return (
    <header className={cn(classes.header)}>
      <img className={cn(classes.headerLogo)} src={companyLogo} alt={companyName} />
      <Input />
      <nav className={cn(classes.headerNav)}>
        <Icon src={cartLogo} alt="Корзина" />
        <Icon src={deliveryLogo} alt="Доставки" />
        <Icon src={favoritesLogo} alt="Избранное" />
        <Icon src={profileLogo} alt="Личный кабинет" />
      </nav>
    </header>
  );
};
