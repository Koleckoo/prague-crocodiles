import { FaLocationDot, FaClock } from "react-icons/fa6";
import { trainings } from "../content.js";

export default function Training() {
  return (
    <section id="training" className="relative bg-ink-soft py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-5xl sm:text-6xl">
          Training<span className="text-flag-red">/</span>
        </h2>
        <div className="mt-3 h-1.5 w-24 -skew-x-12 bg-croc" aria-hidden="true" />

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {trainings.map((t) => (
            <article
              key={t.venue}
              className="overflow-hidden border-l-4 border-croc bg-ink p-6"
            >
              <h3 className="font-display text-5xl text-croc-light">{t.day}</h3>
              <p className="mt-2 flex items-center gap-2 text-lg font-semibold">
                <FaClock aria-hidden="true" className="text-flag-red" />
                {t.time}
              </p>
              <p className="mt-1 flex items-center gap-2 text-white/80">
                <FaLocationDot aria-hidden="true" className="shrink-0 text-flag-red" />
                {t.venue}
              </p>
              <iframe
                src={t.mapEmbed}
                title={t.venue}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="mt-5 aspect-[16/10] w-full rounded-lg border-0"
              />
              <a
                href={t.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block font-semibold text-croc-light underline underline-offset-4 hover:text-white"
              >
                Open in Maps
              </a>
            </article>
          ))}
        </div>

        <p className="mt-8 text-white/80">
          First training? Just{" "}
          <a href="#contact" className="font-semibold text-croc-light underline underline-offset-4 hover:text-white">
            message us
          </a>{" "}
          before you come.
        </p>
      </div>
    </section>
  );
}
