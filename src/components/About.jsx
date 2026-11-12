import { FaUserGroup, FaCalendarDays, FaTrophy } from "react-icons/fa6";
import { team } from "../content.js";
import Reveal from "./Reveal.jsx";

const highlights = [
  { icon: FaUserGroup, title: "Vítáme všechny úrovně", color: "bg-croc" },
  { icon: FaCalendarDays, title: "Každé úterý", color: "bg-flag-blue" },
  { icon: FaTrophy, title: "Turnaje", color: "bg-flag-red" },
];

export default function About() {
  return (
    <section id="o-nas" className="bg-ink-soft py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="font-display text-6xl sm:text-7xl">
            Kdo jsme<span className="text-flag-red">/</span>
          </h2>
          <div className="mt-3 h-1.5 w-24 -skew-x-12 bg-croc" aria-hidden="true" />
        </Reveal>

        <Reveal as="p" className="mt-8 max-w-2xl text-lg leading-relaxed text-white/80">
          {team.name} jsou dodgeballový tým z Prahy. Rádi mezi sebou uvítáme nováčky všech
          úrovní – žádné zkušenosti nepotřebuješ. Trénujeme každé úterý, tak se přidej, zahraj
          si a zlepšuj se s námi.
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-3">
          {highlights.map(({ icon: Icon, title, color }, i) => (
            <Reveal
              as="li"
              key={title}
              delay={i * 100}
              className="card-lift flex items-center gap-4 border border-white/10 bg-ink p-5"
            >
              <span className={`${color} flex h-12 w-12 shrink-0 -skew-x-12 items-center justify-center text-xl`}>
                <Icon aria-hidden="true" className="skew-x-12" />
              </span>
              <span className="font-display text-2xl">{title}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
