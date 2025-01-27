"use client";

import React from "react";
import classes from "./styles.module.scss";
import { PopupProps } from "./types";
import { ButtonMain } from "../btn-main";

export const Popup: React.FC<PopupProps> = (props) => {
  const { children, onClose } = props;

  return (
    <div className={classes.overlay}>
      <div className={classes.popup}>
        <ButtonMain
          className={classes.popupButton}
          type="button"
          variant="remove"
          aria-label="Закрыть"
          disabled={false}
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};
