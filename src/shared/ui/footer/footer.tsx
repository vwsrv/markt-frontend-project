"use client";

import React from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { typeFooterProps } from "./types";
import { Icon } from "../icon";
import dzenImage from "./images/Dzen.svg";
import telegramImage from "./images/telegram.svg";
import youtubeImage from "./images//YT.svg";

export const Footer: React.FC<typeFooterProps> = (props) => {
  const { companyName, companyEmail } = props;

  return (
    <footer className={cn(classes.footer)}>
      <div className={cn(classes.companyDetails)}>
        <p>&copy; {companyName}</p>
      </div>
      <div className={cn(classes.companyContacts)}>
        <p className={cn(classes.companyEmail)}>{companyEmail}</p>
        <div className={cn(classes.companySocial)}>
          <Icon src={dzenImage} alt="Дзен" />
          <Icon src={telegramImage} alt="Телеграм" />
          <Icon src={youtubeImage} alt="Youtube" />
        </div>
      </div>
    </footer>
  );
};
