'use client';

import React from 'react';
import classes from './styles.module.scss';
import cn from 'classnames';
import { typeCategoryIconProps } from './types';

export const CategoryIcon: React.FC<typeCategoryIconProps> = (props) => {
  const { link, name } = props;

  return (
    <div className={cn(classes.container)}>
      <img className={cn(classes.image)} src={link} alt={name} />
      <p className="small">{name}</p>
    </div>
  );
};
