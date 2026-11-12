import { FaLocationDot, FaClock } from "react-icons/fa6";
import { trainings } from "../content.js";
import Reveal from "./Reveal.jsx";

export default function Training() {
  return (
    <section id="trenink" className="relative bg-ink-soft py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="font-display text-6xl sm:text-7xl">
            Tréninky<span className="text-flag-red">/</span>
          </h2>
          <div className="mt-3 h-1.5 w-24 -skew-x-12 bg-croc" aria-hidden="true" />
        </Reveal>

        <div className="mt-10 grid gap-8">
          {trainings.map((t) => (
            <Reveal
              as="article"
              key={t.venue}
              className="card-lift grid gap-6 overflow-hidden border-l-4 border-croc bg-ink p-6 md:grid-cols-[2fr_3fr] md:items-center md:gap-10 md:p-10"
            >
              <div>
                <h3 className="font-display text-5xl text-croc-light md:text-7xl">{t.day}</h3>
                <p className="mt-3 flex items-center gap-2 text-lg font-semibold md:text-xl">
                  <FaClock aria-hidden="true" className="text-flag-red" />
                  {t.time}
                </p>
                <p className="mt-1 flex items-center gap-2 text-white/80 md:text-lg">
                  <FaLocationDot aria-hidden="true" className="shrink-0 text-flag-red" />
                  {t.venue}
                </p>
                <a
                  href={t.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block font-semibold text-croc-light underline underline-offset-4 hover:text-white"
                >
                  Otevřít v Mapách
                </a>
              </div>
              <iframe
                src={t.mapEmbed}
                title={`Mapa – ${t.venue}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="aspect-[16/10] w-full rounded-lg border-0"
              />
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-white/80">
          Jdeš poprvé? Stačí nám předem{" "}
          <a href="#kontakt" className="font-semibold text-croc-light underline underline-offset-4 hover:text-white">
            napsat
          </a>
          .
        </p>
      </div>
    </section>
  );
}
