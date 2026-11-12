import { FaGift, FaBagShopping, FaShieldHalved, FaCoins } from "react-icons/fa6";
import { firstTime } from "../content.js";
import Reveal from "./Reveal.jsx";

const icons = { gift: FaGift, bag: FaBagShopping, shield: FaShieldHalved, coins: FaCoins };
const tints = ["bg-croc", "bg-flag-blue", "bg-flag-red", "bg-croc"];

export default function FirstTime() {
  return (
    <section id="poprve" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="font-display text-6xl sm:text-7xl">
            Jdeš poprvé?<span className="text-flag-red">/</span>
          </h2>
          <div className="mt-3 h-1.5 w-24 -skew-x-12 bg-croc" aria-hidden="true" />
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {firstTime.map(({ icon, title, text }, i) => {
            const Icon = icons[icon] ?? FaGift;
            return (
              <Reveal
                as="li"
                key={title}
                delay={i * 100}
                className="card-lift border border-white/10 bg-ink-soft p-6"
              >
                <span
                  className={`${tints[i % tints.length]} flex h-12 w-12 -skew-x-12 items-center justify-center text-xl`}
                >
                  <Icon aria-hidden="true" className="skew-x-12" />
                </span>
                <h3 className="font-display mt-5 text-2xl leading-tight">{title}</h3>
                <p className="mt-2 text-white/80">{text}</p>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mt-10">
          <a
            href="#kontakt"
            className="inline-block -skew-x-12 bg-croc px-7 py-3 transition-all duration-200 hover:-translate-y-1 hover:bg-croc-light hover:shadow-[0_10px_28px_-6px_rgba(18,180,132,0.6)]"
          >
            <span className="font-display block skew-x-12 text-xl">Dej nám vědět, že přijdeš</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
