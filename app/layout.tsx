import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/app/styles/global.css";
import { ImageBackground } from "../src/shared/ui/image-background";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ImageBackground
      variant="grey"
      saleName="осенний сейл"
      saleValue="30%"
      layout="two"
    />
  </StrictMode>
);
