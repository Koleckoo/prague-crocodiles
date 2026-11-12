import { team, trainings } from "../content.js";

const items = [
  team.sport,
  team.city,
  ...trainings.map((t) => `${t.day} ${t.time.split(/\s*[–-]\s*/)[0]}`),
];

function Half() {
  return (
    <div className="flex shrink-0 items-center">
      {Array.from({ length: 4 }).flatMap((_, r) =>
        items.map((text, i) => (
          <span key={`${r}-${i}`} className="flex items-center">
            <span className="font-display whitespace-nowrap text-3xl text-white sm:text-4xl">
              {text}
            </span>
            <span className="font-display mx-6 text-2xl text-ink sm:mx-8">/</span>
          </span>
        )),
      )}
    </div>
  );
}

export default function Marquee() {
  return (
    <div aria-hidden="true" className="relative z-10 overflow-hidden py-6 sm:py-8">
      <div className="-rotate-[1.5deg] bg-croc py-3">
        <div className="marquee-track flex w-max">
          <Half />
          <Half />
        </div>
      </div>
    </div>
  );
}
