"use client";

import React, { useEffect, useState } from "react";
import classes from "./styles.module.scss";
import { PopupProps } from "./types";
import { ButtonMain } from "../btn-main";
import cn from "classnames";
import { createPortal } from "react-dom";

export const Popup: React.FC<PopupProps> = (props) => {
  const { children, onClose } = props;
  const [isActive, setIsActive] = useState(false);
  const popupRef = React.useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState<boolean>(true);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setIsActive(true);
  }, []);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === popupRef.current) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return isMounted
    ? createPortal(
        <div
          className={cn(classes.overlay, { [classes.active]: isActive })}
          ref={popupRef}
          onClick={handleOverlayClick}
        >
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
        </div>,
        document.body,
      )
    : null;
};
