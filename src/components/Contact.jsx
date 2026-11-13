import { FaEnvelope, FaFacebook, FaInstagram, FaArrowRight } from "react-icons/fa6";
import { contact } from "../content.js";
import Reveal from "./Reveal.jsx";

const cards = [
  {
    icon: FaInstagram,
    title: "Instagram",
    label: `@${contact.instagram.label}`,
    href: contact.instagram.url,
    external: true,
  },
  {
    icon: FaFacebook,
    title: "Facebook",
    label: contact.facebook.label,
    href: contact.facebook.url,
    external: true,
  },
  { icon: FaEnvelope, title: "E-mail", label: contact.email, href: `mailto:${contact.email}` },
];

const ext = { target: "_blank", rel: "noopener noreferrer" };

export default function Contact() {
  return (
    <section id="kontakt" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="font-display text-6xl sm:text-7xl">
            Kontakt<span className="text-croc-light">/</span>
          </h2>
          <div className="mt-3 h-1.5 w-24 -skew-x-12 bg-croc" aria-hidden="true" />
        </Reveal>

        <div className="mt-10 grid gap-12 md:grid-cols-2">
          <Reveal>
            <p className="max-w-md text-lg leading-relaxed text-white/80">
              Nejrychleji nás zastihneš na Instagramu. Napiš nám zprávu a domluvíme se, kdy
              přijdeš.
            </p>

            <a
              href={contact.instagram.dm}
              {...ext}
              className="mt-7 inline-block -skew-x-12 bg-croc px-7 py-4 transition-all duration-200 hover:-translate-y-1 hover:bg-croc-light hover:shadow-[0_10px_28px_-6px_rgba(18,180,132,0.6)]"
            >
              <span className="font-display flex skew-x-12 items-center gap-3 text-2xl">
                <FaInstagram aria-hidden="true" />
                Napiš nám na Instagram
                <FaArrowRight aria-hidden="true" className="text-lg" />
              </span>
            </a>

            <ul className="mt-10 space-y-3">
              {cards.map(({ icon: Icon, label, href, title, external }) => (
                <li key={title}>
                  <a
                    href={href}
                    {...(external ? ext : {})}
                    className="card-lift flex items-center gap-4 border-l-4 border-croc bg-ink-soft px-5 py-4 hover:border-croc-light hover:bg-black"
                  >
                    <Icon aria-hidden="true" className="shrink-0 text-2xl text-croc-light" />
                    <span className="min-w-0">
                      <span className="font-display block text-lg leading-tight">{title}</span>
                      <span className="block break-words text-white/80">{label}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex items-end justify-between gap-4">
              <h3 className="font-display text-3xl">Poslední příspěvky</h3>
              <a
                href={contact.instagram.url}
                {...ext}
                className="font-semibold text-croc-light underline underline-offset-4 hover:text-white"
              >
                @{contact.instagram.label}
              </a>
            </div>
            {/* oficiální náhled profilu z Instagramu – aktualizuje se sám */}
            <div className="@container mt-4 overflow-hidden rounded-xl border border-white/10 bg-white shadow-[0_20px_50px_-20px_rgba(18,180,132,0.5)]">
              <iframe
                src={contact.instagram.embed}
                title={`Instagram @${contact.instagram.label} – poslední příspěvky`}
                loading="lazy"
                scrolling="no"
                className="block h-[calc(160px+66.7cqw)] w-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
