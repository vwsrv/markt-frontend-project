"use client";

import React from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { typeHeaderProps } from "./types";
import { Input } from "../input";
import companyLogo from "./images/company-logo.svg";
import { Icon } from "../icon";
import cartLogo from "./images/cart.svg";
import profileLogo from "./images/profile.svg";
import favoritesLogo from "./images/favorites.svg";
import deliveryLogo from "./images/delivery.svg";

export const Header: React.FC<typeHeaderProps> = (props) => {
  const { companyName } = props;

  return (
    <header className={cn(classes.header)}>
      <img
        className={cn(classes.headerLogo)}
        src={companyLogo}
        alt={companyName}
      />
      <Input name="Поиск" placeholder="Поиск товаров"/>
      <nav className={cn(classes.headerNav)}>
        <Icon src={cartLogo} alt="Корзина" />
        <Icon src={deliveryLogo} alt="Доставки" />
        <Icon src={favoritesLogo} alt="Избранное" />
        <Icon src={profileLogo} alt="Личный кабинет" />
      </nav>
    </header>
  );
};
