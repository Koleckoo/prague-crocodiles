import { FaLocationDot, FaClock, FaInstagram } from "react-icons/fa6";
import { trainings, contact } from "../content.js";
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

              {t.directions?.length > 0 && (
                <div className="border-t border-white/10 pt-6 md:col-span-2 md:pt-8">
                  <h4 className="font-display text-3xl">Jak nás najdeš</h4>
                  <ol className="mt-5 grid gap-4 md:grid-cols-3 md:gap-6">
                    {t.directions.map((step, i) => (
                      <li key={step} className="flex items-start gap-4">
                        <span
                          aria-hidden="true"
                          className="flex h-10 w-10 shrink-0 -skew-x-12 items-center justify-center bg-croc"
                        >
                          <span className="font-display skew-x-12 text-xl">{i + 1}</span>
                        </span>
                        <span className="pt-1.5 text-white/90">{step}</span>
                      </li>
                    ))}
                  </ol>
                  {t.pickup && (
                    <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-white/80">
                      {t.pickup}
                      <a
                        href={contact.instagram.dm}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-semibold text-croc-light underline underline-offset-4 hover:text-white"
                      >
                        <FaInstagram aria-hidden="true" />
                        Napsat na Instagram
                      </a>
                    </p>
                  )}
                </div>
              )}
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-white/80">
          Jdeš poprvé? Stačí nám předem{" "}
          <a href="#kontakt" className="font-semibold text-croc-light underline underline-offset-4 hover:text-white">
            napsat
          </a>
          . První trénink máš zdarma.
        </p>
      </div>
    </section>
  );
}
