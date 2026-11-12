import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/saira-condensed/700.css";
import "@fontsource/saira-condensed/800.css";
import "@fontsource/saira-condensed/900.css";
import "@fontsource-variable/inter";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
