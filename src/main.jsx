import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource/saira-condensed/700.css";
import "@fontsource/saira-condensed/800.css";
import "@fontsource/saira-condensed/900.css";
import "@fontsource-variable/inter";
import "./index.css";
import App from "./App.jsx";

const root = document.getElementById("root");
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Produkční build má stránku předrenderovanou (kvůli Googlu) – tu jen „oživíme".
// Ve vývoji (npm run dev) je #root prázdný, tak ho vykreslíme od nuly.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
