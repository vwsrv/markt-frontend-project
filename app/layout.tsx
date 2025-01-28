import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/app/styles/global.css";
import { Header } from "../src/shared/ui/header";
import { Footer } from "../src/shared/ui/footer/footer";
import { MainPage } from "../src/pages/main-page";
import { Catalog } from "../src/pages/catalog";
import { BrowserRouter, Route, Routes } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Header companyName="Магаз" />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="catalog" element={<Catalog />} />
      </Routes>
      <Footer companyEmail="vissar2016@gmail.com" companyName="2025 Магаз" />
    </BrowserRouter>
  </StrictMode>,
);
