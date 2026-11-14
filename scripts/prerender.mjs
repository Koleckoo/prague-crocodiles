// Spouští se po `vite build` (viz package.json):
//  1. vloží předrenderované HTML stránky do dist/index.html (Google ho přečte bez JS),
//  2. přidá strukturovaná data o klubu (JSON-LD),
//  3. vygeneruje robots.txt a sitemap.xml.
import { readFileSync, writeFileSync, readdirSync, rmSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const ssrDir = join(root, "dist-ssr");

// Adresa webu: Netlify ji dává v proměnné URL; jinak výchozí adresa na Netlify.
const DEFAULT_URL = "https://prague-crocodiles-db.netlify.app";
const siteUrl = (process.env.SITE_URL || process.env.URL || DEFAULT_URL).replace(/\/$/, "");

const ssrEntry = readdirSync(ssrDir).find((f) => /^entry-server\.(m?js)$/.test(f));
if (!ssrEntry) throw new Error("prerender: entry-server bundle not found in dist-ssr");
const { render, content } = await import(pathToFileURL(join(ssrDir, ssrEntry)).href);
const { team, trainings, contact } = content;

// --- 1. předrenderované HTML -------------------------------------------------
const indexPath = join(dist, "index.html");
let html = readFileSync(indexPath, "utf8");
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error("prerender: empty #root not found in dist/index.html");
html = html.replace(marker, `<div id="root">${render()}</div>`);

// --- 2. strukturovaná data ---------------------------------------------------
const logoFile = readdirSync(join(dist, "assets")).find((f) => /^logo-768-.*\.webp$/.test(f));

const places = trainings.map((t) => ({
  "@type": "Place",
  name: t.venue,
  ...(t.address && {
    address: {
      "@type": "PostalAddress",
      streetAddress: t.address.street,
      postalCode: t.address.postalCode,
      addressLocality: t.address.city,
      addressCountry: "CZ",
    },
  }),
}));

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsTeam",
  name: team.name,
  sport: team.sport,
  url: `${siteUrl}/`,
  ...(logoFile && { logo: `${siteUrl}/assets/${logoFile}` }),
  image: `${siteUrl}/og-image.jpg`,
  description: `${team.name} – dodgeballový tým z Prahy. Vítáme nováčky všech úrovní, první trénink je zdarma.`,
  email: contact.email,
  sameAs: [contact.instagram.url, contact.facebook.url],
  location: places.length === 1 ? places[0] : places,
  memberOf: {
    "@type": "SportsOrganization",
    name: "Česká asociace dodgeballu",
    url: "https://czechdodgeball.cz/",
  },
  // Tréninky záměrně nejsou jako Event: Google u událostí vyžaduje konkrétní
  // datum (startDate) a pravidelný trénink hlásí jako chybu.
};
const ldScript = `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`;
html = html.replace("</head>", `    ${ldScript}\n  </head>`);
writeFileSync(indexPath, html);

// --- 3. robots.txt a sitemap.xml ---------------------------------------------
writeFileSync(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`,
);

rmSync(ssrDir, { recursive: true, force: true });
console.log(`prerender: done for ${siteUrl} (${Math.round(html.length / 1024)} kB index.html)`);
