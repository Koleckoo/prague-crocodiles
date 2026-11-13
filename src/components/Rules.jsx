import { rules } from "../content.js";
import Reveal from "./Reveal.jsx";

const accents = ["text-croc-light", "text-white", "text-croc-light", "text-white"];

export default function Rules() {
  return (
    <section id="dodgeball" className="bg-ink-soft py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="font-display text-6xl sm:text-7xl">
            Co je dodgeball?<span className="text-croc-light">/</span>
          </h2>
          <div className="mt-3 h-1.5 w-24 -skew-x-12 bg-croc" aria-hidden="true" />
        </Reveal>

        <Reveal as="p" className="mt-8 max-w-2xl text-lg leading-relaxed text-white/80">
          {rules.intro}
        </Reveal>

        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rules.steps.map(({ title, text }, i) => (
            <Reveal
              as="li"
              key={title}
              delay={i * 100}
              className="card-lift relative overflow-hidden border border-white/10 bg-ink p-6"
            >
              <span
                aria-hidden="true"
                className="font-display pointer-events-none absolute -right-2 -top-5 text-8xl text-white/5"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={`font-display text-4xl ${accents[i % accents.length]}`}>{title}.</h3>
              <p className="mt-3 text-white/80">{text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
