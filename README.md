# Prague Crocodiles

Web dodgeballového týmu Prague Crocodiles (česky). Vite, React a Tailwind CSS.

## Vývoj

```
npm install
npm run dev
```

## Obsah

Obsah se upravuje v `src/content.js` (info o týmu, tréninky, kontakty, Instagram).

## Nasazení

Nasazuje se přes Netlify (`netlify.toml`: `npm run build`, publish `dist`).

## SEO

`npm run build` předrenderuje celou stránku do `dist/index.html` (Google ji přečte i bez JavaScriptu),
přidá strukturovaná data o klubu a vytvoří `robots.txt` a `sitemap.xml`.
Adresa webu se bere z proměnné `URL` na Netlify; při přechodu na vlastní doménu změň `DEFAULT_URL`
ve `vite.config.js` a `scripts/prerender.mjs`.
