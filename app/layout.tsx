import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/app/styles/global.css";
import { Header } from "../src/shared/ui/header";
import { Footer } from "../src/shared/ui/footer/footer";
import { MainPage } from "../src/pages/main-page";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Header companyName="Магаз" />
    <MainPage />
    <Footer companyEmail="vissar2016@gmail.com" companyName="2025 Магаз" />
  </StrictMode>,
);
