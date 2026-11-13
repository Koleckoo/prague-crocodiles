import { FaUserGroup, FaCalendarDays, FaFlag, FaInstagram } from "react-icons/fa6";
import { team, council } from "../content.js";
import Reveal from "./Reveal.jsx";

const tints = ["bg-croc", "bg-flag-blue", "bg-flag-red", "bg-croc"];
const initials = (name) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

const highlights = [
  { icon: FaUserGroup, title: "Vítáme všechny úrovně", color: "bg-croc" },
  { icon: FaCalendarDays, title: "Každé úterý", color: "bg-flag-blue" },
  { icon: FaFlag, title: "Hráči v reprezentaci", color: "bg-flag-red" },
];

export default function About() {
  return (
    <section id="o-nas" className="py-20">
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
              className="card-lift flex items-center gap-4 border border-white/10 bg-ink-soft p-5"
            >
              <span className={`${color} flex h-12 w-12 shrink-0 -skew-x-12 items-center justify-center text-xl`}>
                <Icon aria-hidden="true" className="skew-x-12" />
              </span>
              <span className="font-display text-2xl">{title}</span>
            </Reveal>
          ))}
        </ul>

        {council.length > 0 && (
          <>
            <Reveal className="mt-16">
              <h3 className="font-display text-4xl sm:text-5xl">Rada týmu</h3>
              <p className="mt-2 text-white/80">Lidi, na které se můžeš s čímkoli obrátit.</p>
            </Reveal>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {council.map(({ name, role, instagram }, i) => (
                <Reveal
                  as="li"
                  key={name}
                  delay={i * 100}
                  className="card-lift flex items-center gap-4 border border-white/10 bg-ink-soft p-5"
                >
                  <span
                    aria-hidden="true"
                    className={`${tints[i % tints.length]} flex h-14 w-14 shrink-0 -skew-x-12 items-center justify-center`}
                  >
                    <span className="font-display skew-x-12 text-2xl">{initials(name)}</span>
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold leading-snug">{name}</span>
                    <span className="block text-sm text-white/70">{role}</span>
                    {instagram && (
                      <a
                        href={`https://www.instagram.com/${instagram}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-croc-light underline underline-offset-4 hover:text-white"
                      >
                        <FaInstagram aria-hidden="true" />@{instagram}
                      </a>
                    )}
                  </span>
                </Reveal>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
