"use client";

import React from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { typeFooterProps } from "./types";
import { Icon } from "../icon";
import dzenImage from "./images/Dzen.svg";
import telegramImage from "./images/telegram.svg";
import youtubeImage from "./images//YT.svg";
import { useMediaQuery } from "../../lib/useMediaQuery.js";
import cartLogo from "./images/cart.svg";
import profileLogo from "./images/profile.svg";
import favoritesLogo from "./images/favorites.svg";
import deliveryLogo from "./images/delivery.svg";

export const Footer: React.FC<typeFooterProps> = (props) => {
  const { companyName, companyEmail } = props;
  const isMobile = useMediaQuery("(max-width: 720px)");

  return (
    <footer className={cn(classes.footer)}>
      <div className={cn(classes.companyDetails)}>
        <p className="medium">&copy; {companyName}</p>
      </div>
      <div className={cn(classes.companyContacts)}>
        <p className="medium">{companyEmail}</p>
        <div className={cn(classes.companySocial)}>
          <Icon src={telegramImage} alt="Телеграм" />
          <Icon src={dzenImage} alt="Дзен" />
          <Icon src={youtubeImage} alt="Youtube" />
        </div>
      </div>
      {isMobile && (
        <nav className={cn(classes.footerNav)}>
          <Icon src={cartLogo} alt="Корзина" />
          <Icon src={deliveryLogo} alt="Доставки" />
          <Icon src={favoritesLogo} alt="Избранное" />
          <Icon src={profileLogo} alt="Личный кабинет" />
        </nav>
      )}
    </footer>
  );
};
