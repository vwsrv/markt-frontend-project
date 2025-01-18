"use client";

import React, { useState, useEffect } from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { typePromoBannerProps } from "./types";

export const PromoBanner: React.FC<typePromoBannerProps> = (props) => {
  const { handler, imageLink, imageLinkMobile } = props;
  const [currentImage, setCurrentImage] = useState(imageLink);

  useEffect(() => {
    const updateImage = () => {
      if (window.innerWidth <= 725) {
        setCurrentImage(imageLinkMobile);
      } else {
        setCurrentImage(imageLink);
      }
    };
    updateImage();

    window.addEventListener("resize", updateImage);

    return () => {
      window.removeEventListener("resize", updateImage);
    };
  }, [imageLink, imageLinkMobile]);

  return (
    <section className={cn(classes.promoBanner)}>
      <img
        className={cn(classes.container)}
        src={currentImage}
        alt="Рекламный баннер"
        onClick={handler}
      ></img>
    </section>
  );
};
