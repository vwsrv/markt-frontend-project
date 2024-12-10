import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/app/styles/global.css";
import { Button } from "../src/shared/btn-main";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Button>В корзину</Button>
  </StrictMode>
);
