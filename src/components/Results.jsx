import { FaMedal, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { results } from "../content.js";
import Reveal from "./Reveal.jsx";

const ext = { target: "_blank", rel: "noopener noreferrer" };

// barva čísla umístění: 1. zlatá, 2. stříbrná, 3. bronzová, jinak bílá
const placeColor = (place) =>
  place === 1 ? "text-[#f2c84b]" : place === 2 ? "text-[#c9d1d9]" : place === 3 ? "text-[#d08c4f]" : "text-white";

function Season({ season, note, liveUrl, teams }) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-display text-3xl">Sezóna {season}</h3>
        <a
          href={liveUrl}
          {...ext}
          className="inline-flex items-center gap-2 text-sm font-semibold text-croc-light underline underline-offset-4 hover:text-white"
        >
          Tabulky a zápasy <FaArrowUpRightFromSquare aria-hidden="true" className="text-xs" />
        </a>
      </div>
      <p className="mt-1 text-sm text-white/60">{note}</p>
      <ul className="mt-5 space-y-3">
        {teams.map(({ league, team, place, record }) => (
          <li
            key={league}
            className="card-lift flex items-center gap-4 border-l-4 border-croc bg-ink px-5 py-4"
          >
            <span className={`font-display w-14 shrink-0 text-5xl leading-none ${placeColor(place)}`}>
              {place}.
            </span>
            <span className="min-w-0 flex-1">
              <span className="font-display block text-xl leading-tight">{league}</span>
              <span className="block text-sm text-white/70">{team}</span>
            </span>
            <span className="shrink-0 text-right text-sm text-white/70">
              <span className="block font-semibold text-white">{record}</span>
              <span className="sr-only">výhry, remízy, prohry</span>
              <span aria-hidden="true">V-R-P</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Results() {
  const { current, last, national, league } = results;
  const medals = last.teams.filter((t) => t.place <= 3);

  return (
    <section id="vysledky" className="bg-ink-soft py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="font-display text-6xl sm:text-7xl">
            Výsledky<span className="text-flag-red">/</span>
          </h2>
          <div className="mt-3 h-1.5 w-24 -skew-x-12 bg-croc" aria-hidden="true" />
        </Reveal>

        <Reveal as="p" className="mt-8 max-w-2xl text-lg leading-relaxed text-white/80">
          Hrajeme{" "}
          <a href={league.url} {...ext} className="font-semibold text-croc-light underline underline-offset-4 hover:text-white">
            {league.name}
          </a>{" "}
          ve všech kategoriích: ženy, muži i mix.
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {medals.map(({ league: name, place }, i) => (
            <Reveal
              as="li"
              key={name}
              delay={i * 100}
              className="card-lift flex items-center gap-5 border border-white/10 bg-ink p-6"
            >
              <FaMedal aria-hidden="true" className={`shrink-0 text-5xl ${placeColor(place)}`} />
              <span>
                <span className="font-display block text-2xl leading-tight">
                  {place}. místo · {name}
                </span>
                <span className="block text-white/70">Sezóna {last.season}</span>
              </span>
            </Reveal>
          ))}
          <Reveal
            as="li"
            delay={medals.length * 100}
            className="card-lift flex items-center gap-5 border border-white/10 bg-ink p-6"
          >
            {/* česká vlajka: bílá nahoře, červená dole, modrý klín od žerdi (poměr 2:3) */}
            <svg
              aria-hidden="true"
              viewBox="0 0 30 20"
              className="h-10 w-15 shrink-0 rounded-sm shadow-[0_0_0_1px_rgba(255,255,255,0.15)]"
            >
              <rect width="30" height="10" fill="#ffffff" />
              <rect y="10" width="30" height="10" fill="#d7141a" />
              <path d="M0 0 L15 10 L0 20 Z" fill="#11457e" />
            </svg>
            <span>
              <span className="font-display block text-2xl leading-tight">Reprezentace</span>
              <span className="block text-white/70">{national}</span>
            </span>
          </Reveal>
        </ul>

        <div className="mt-14 grid gap-12 md:grid-cols-2">
          <Reveal>
            <Season {...current} />
          </Reveal>
          <Reveal delay={100}>
            <Season {...last} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
