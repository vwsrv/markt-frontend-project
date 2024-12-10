import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/app/styles/global.css";
import { ButtonCounter } from "../src/shared/ui/btn-counter";
import { ButtonMain } from "../src/shared/ui/btn-main";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ButtonCounter>1</ButtonCounter>
    <ButtonMain>В корзину</ButtonMain>
  </StrictMode>
);
