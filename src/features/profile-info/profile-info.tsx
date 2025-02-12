"use client";

import React from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { ProfileForm } from "../../shared/ui/profile-form/profileOwner";

export const ProfileInfo: React.FC = () => {
  const [name, setName] = React.useState("");
  const [tel, setTel] = React.useState("");
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    const savedName = localStorage.getItem("profileName");
    const savedTel = localStorage.getItem("profileTel");
    const savedEmail = localStorage.getItem("profileEmail");

    if (savedName && savedTel && savedEmail) {
      setName(savedName);
      setTel(savedTel);
      setEmail(savedEmail);
    } else {
      fetch("/data/profile.json")
        .then((response) => response.json())
        .then((data) => {
          setName(data.profile.name);
          setTel(data.profile.tel);
          setEmail(data.profile.email);
        })
        .catch((error) => {
          console.error("Ошибка при загрузке данных:", error);
        });
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("profileName", name);
  }, [name]);

  React.useEffect(() => {
    localStorage.setItem("profileTel", tel);
  }, [tel]);

  React.useEffect(() => {
    localStorage.setItem("profileEmail", email);
  }, [email]);

  return (
    <ProfileForm title="Профиль">
      <div className={cn(classes.profileInfo)}>
        <label htmlFor="profile-name">
          <input
            type="text"
            id="profile-name"
            className={cn(classes.profileName)}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите имя"
          />
        </label>
        <label htmlFor="profile-tel">
          <input
            type="text"
            className={cn(classes.profileTelephone)}
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            placeholder="Введите номер телефона"
          ></input>
        </label>
        <label htmlFor="profile-email">
          <input
            type="text"
            className={cn(classes.profileEmail)}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите email"
          ></input>
        </label>
      </div>
    </ProfileForm>
  );
};
