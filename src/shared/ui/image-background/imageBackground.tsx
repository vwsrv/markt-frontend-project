"use client";

import React from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { typeImageBackgroundProps } from "./types";
import image1 from "../../../utils/resource-images/54.png";

export const ImageBackground: React.FC<typeImageBackgroundProps> = (props) => {
  const { handler, variant, saleName, saleValue, layout, images } = props;

  const imageData = [
    {
      id: 1,
      name: "Томас Шелбик",
      src: image1,
    },
    {
      id: 2,
      name: "Томас Шелбик",
      src: image1,
    },
  ];

  return (
    <div
      className={cn(classes.layoutContainer, classes[layout], classes[variant])}
    >
      {imageData.map((image, index) => (
        <div
          key={image.id}
          className={cn(
            classes.imageContainer,
            classes[variant],
            classes[layout]
          )}
          onClick={handler}
        >
          <img src={image.src} alt={image.name} />
          {index === 0 && (
            <>
              <span className={cn(classes.saleValue)}>
                <p>&ndash; {saleValue}</p>
              </span>
              <span className={cn(classes.saleImage)}>
                <p className="small">{saleName}</p>
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
