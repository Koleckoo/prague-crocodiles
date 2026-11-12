import { FaUserGroup, FaCalendarDays, FaTrophy } from "react-icons/fa6";
import { team } from "../content.js";

const highlights = [
  { icon: FaUserGroup, title: "All levels welcome", color: "bg-croc" },
  { icon: FaCalendarDays, title: "Twice a week", color: "bg-flag-blue" },
  { icon: FaTrophy, title: "Tournaments", color: "bg-flag-red" },
];

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-5xl sm:text-6xl">
          Who we are<span className="text-flag-red">/</span>
        </h2>
        <div className="mt-3 h-1.5 w-24 -skew-x-12 bg-croc" aria-hidden="true" />

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/80">
          {team.name} are a {team.sport.toLowerCase()} club based in {team.city}. We are open to
          newcomers of all levels, and you do not need any experience to join in. We train twice
          a week, so there is always a chance to jump in, have fun and get better.
        </p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-3">
          {highlights.map(({ icon: Icon, title, color }) => (
            <li key={title} className="flex items-center gap-4 border border-white/10 bg-ink-soft p-5">
              <span className={`${color} flex h-12 w-12 shrink-0 -skew-x-12 items-center justify-center text-xl`}>
                <Icon aria-hidden="true" className="skew-x-12" />
              </span>
              <span className="font-display text-2xl">{title}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
