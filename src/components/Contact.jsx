import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaFacebook, FaInstagram } from "react-icons/fa6";
import { contact, emailjs as cfg } from "../content.js";
import Reveal from "./Reveal.jsx";

const cards = [
  { icon: FaEnvelope, label: contact.email, href: `mailto:${contact.email}`, title: "E-mail" },
  { icon: FaFacebook, label: contact.facebook.label, href: contact.facebook.url, title: "Facebook", external: true },
  { icon: FaInstagram, label: contact.instagram.label, href: contact.instagram.url, title: "Instagram", external: true },
];

const field =
  "mt-1 w-full border border-white/20 bg-ink-soft px-4 py-3 text-white placeholder-white/40 focus:border-croc-light";

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.sendForm(cfg.serviceId, cfg.templateId, formRef.current, {
        publicKey: cfg.publicKey,
      });
      setStatus("success");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="kontakt" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="font-display text-6xl sm:text-7xl">
            Kontakt<span className="text-flag-red">/</span>
          </h2>
          <div className="mt-3 h-1.5 w-24 -skew-x-12 bg-croc" aria-hidden="true" />
        </Reveal>

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <Reveal as="ul" className="space-y-4">
            {cards.map(({ icon: Icon, label, href, title, external }) => (
              <li key={title}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="card-lift flex items-center gap-4 border-l-4 border-croc bg-ink-soft p-5 hover:border-croc-light hover:bg-black"
                >
                  <Icon aria-hidden="true" className="shrink-0 text-3xl text-croc-light" />
                  <span className="min-w-0">
                    <span className="font-display block text-xl">{title}</span>
                    <span className="block break-words text-white/80">{label}</span>
                  </span>
                </a>
              </li>
            ))}
          </Reveal>

          <Reveal as="form" delay={100} ref={formRef} onSubmit={onSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="font-semibold">Jméno</label>
              <input id="name" name="name" type="text" required autoComplete="name" className={field} />
            </div>
            <div>
              <label htmlFor="email" className="font-semibold">E-mail</label>
              <input id="email" name="email" type="email" required autoComplete="email" className={field} />
            </div>
            <div>
              <label htmlFor="message" className="font-semibold">Zpráva</label>
              <textarea id="message" name="message" rows="5" required className={field} />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="-skew-x-12 bg-croc px-8 py-3 transition-colors hover:bg-croc-light disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="font-display block skew-x-12 text-xl">
                {status === "sending" ? "Odesílám…" : "Odeslat zprávu"}
              </span>
            </button>

            <div aria-live="polite">
              {status === "success" && (
                <p className="border-l-4 border-croc-light bg-croc/20 p-4">
                  Díky! Zpráva odešla, brzy se ti ozveme.
                </p>
              )}
              {status === "error" && (
                <p className="border-l-4 border-flag-red bg-flag-red/20 p-4">
                  Zprávu se nepodařilo odeslat. Napiš nám prosím přímo na{" "}
                  <a href={`mailto:${contact.email}`} className="font-semibold underline">
                    {contact.email}
                  </a>
                  .
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
