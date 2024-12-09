import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/app/styles/global.css";
import "../src/app/fonts/fonts.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, aspernatur?!</h1>
    <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos tempore totam consectetur porro magni consequatur harum in repellat quasi, laudantium, magnam omnis?</h2>
  </StrictMode>
);
