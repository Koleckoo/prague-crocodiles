// Vstup pro předrenderování při buildu (scripts/prerender.mjs).
// Vyrenderuje celou stránku do HTML, aby ji Google přečetl i bez JavaScriptu.
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import { team, trainings, contact, firstTime, rules } from "./content.js";

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

export const content = { team, trainings, contact, firstTime, rules };
