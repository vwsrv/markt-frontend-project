import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/app/styles/global.css";
import { Header } from "../src/shared/ui/header";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Header />
  </StrictMode>
);
