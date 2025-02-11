"use client";

import React from "react";
import cn from "classnames";
import classes from "./styles.module.scss";
import { ProfileBankCard } from "../../features/profile-bank-card";
import { ProfileInfo } from "../../features/profile-info";

export const ProfilePage: React.FC = () => {
  return (
    <div className={cn(classes.profilePage)}>
      <ProfileInfo />
      <ProfileBankCard />
    </div>
  );
};
