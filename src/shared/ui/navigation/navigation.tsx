"use client";

import React from "react";
import cn from "classnames";
import { Icon } from "../icon";
import { typeNavigationProps } from "./types";
import cartLogo from "./images/cart.svg";
import profileLogo from "./images/profile.svg";
import favoritesLogo from "./images/favorites.svg";
import deliveryLogo from "./images/delivery.svg";
import classes from "./styles.module.scss";

export const Navigation: React.FC<typeNavigationProps> = (props) => {
  const { type } = props;
  return (
    <>
      <nav className={cn(classes.navigation, classes[type])}>
        <Icon src={profileLogo} alt="Личный кабинет" />
        <Icon src={deliveryLogo} alt="Доставки" />
        <Icon src={favoritesLogo} alt="Избранное" />
        <Icon src={cartLogo} alt="Корзина" />
      </nav>
    </>
  );
};
