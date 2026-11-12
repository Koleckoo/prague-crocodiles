import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Sociální sítě chtějí u náhledového obrázku celou adresu webu.
// Netlify ji při buildu dává do proměnné URL; lokálně zůstane prázdná
// (odkazy pak budou relativní, např. /og-image.jpg).
const siteUrl = (process.env.SITE_URL || process.env.URL || "").replace(/\/$/, "");

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
