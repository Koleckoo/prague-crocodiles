import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Sociální sítě a Google chtějí celou adresu webu (náhledový obrázek, canonical).
// Netlify ji při buildu dává do proměnné URL; jinak se použije výchozí adresa.
// Při přechodu na vlastní doménu stačí změnit DEFAULT_URL tady i ve scripts/prerender.mjs.
const DEFAULT_URL = "https://prague-crocodiles-db.netlify.app";
const siteUrl = (process.env.SITE_URL || process.env.URL || DEFAULT_URL).replace(/\/$/, "");

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "site-url",
      transformIndexHtml: (html) => html.replaceAll("%SITE_URL%", siteUrl),
    },
  ],
});
