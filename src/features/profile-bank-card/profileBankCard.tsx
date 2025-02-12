"use client";

import React from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { ProfileForm } from "../../shared/ui/profile-form/profileOwner";
import { ButtonMain } from "../../shared/ui/btn-main";

export const ProfileBankCard = () => {
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardDate, setCardDate] = React.useState("");
  const [cardSecret, setCardSecret] = React.useState("");
  const isFormValid = cardNumber && cardDate && cardSecret;

  React.useEffect(() => {
    if (!cardNumber && !cardDate && !cardSecret) {
      const savedCardNumber = localStorage.getItem("cardNumber");
      const savedCardDate = localStorage.getItem("cardDate");
      const savedCardSecret = localStorage.getItem("cardSecret");

      if (savedCardNumber) setCardNumber(savedCardNumber);
      if (savedCardDate) setCardDate(savedCardDate);
      if (savedCardSecret) setCardSecret(savedCardSecret);
    }
  }, [cardNumber, cardDate, cardSecret]);

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1-");
    return formatted.slice(0, 19);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  const formatCardDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const formatted = cleaned.replace(/(\d{2})(?=\d)/g, "$1/");
    return formatted.slice(0, 5);
  };

  const handleCardDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardDate(e.target.value);
    setCardDate(formattedValue);
  };

  const handleCardSecretChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCardSecret(cleaned);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }
    localStorage.setItem("cardNumber", cardNumber);
    localStorage.setItem("cardDate", cardDate);
    localStorage.setItem("cardSecret", cardSecret);
    alert("Данные карты успешно сохранены!");
  };

  return (
    <ProfileForm title="Карта">
      <div className={cn(classes.profileCard)}>
        <label htmlFor="card-number">
          <input
            type="text"
            id="card-number"
            placeholder="0000-0000-0000-0000"
            className={cn(classes.cardNumber)}
            value={cardNumber}
            onChange={handleCardNumberChange}
          />
        </label>
        <div className={cn(classes.cardInfoContainer)}>
          <label htmlFor="card-date">
            <input
              type="text"
              id="card-date"
              placeholder="MM/YY"
              className={cn(classes.cardDateAndYear)}
              value={cardDate}
              onChange={handleCardDateChange}
            />
          </label>
          <label htmlFor="card-secret" className={cn(classes.cardSecretCode)}>
            <input
              type="text"
              id="card-secret"
              placeholder="CVC/CVV"
              value={cardSecret}
              onChange={handleCardSecretChange}
            />
          </label>
        </div>
        <div className={cn(classes.buttonContainer)}>
          <ButtonMain
            variant="red"
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Привязать
          </ButtonMain>
        </div>
      </div>
    </ProfileForm>
  );
};
