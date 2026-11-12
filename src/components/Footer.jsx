import { FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa6";
import logo from "../assets/logo-96.webp";
import { team, contact, credits } from "../content.js";

const links = [
  { href: "#trenink", label: "Tréninky" },
  { href: "#poprve", label: "Jdeš poprvé?" },
  { href: "#o-nas", label: "O nás" },
  { href: "#kontakt", label: "Kontakt" },
];

const socials = [
  { icon: FaFacebook, href: contact.facebook.url, label: "Facebook", external: true },
  { icon: FaInstagram, href: contact.instagram.url, label: "Instagram", external: true },
  { icon: FaEnvelope, href: `mailto:${contact.email}`, label: "E-mail" },
];

export default function Footer() {
  return (
    <footer className="bg-ink">
      <div aria-hidden="true" className="flex h-1.5">
        <span className="flex-1 bg-white" />
        <span className="flex-1 bg-flag-blue" />
        <span className="flex-1 bg-flag-red" />
      </div>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <a href="#top" className="flex items-center gap-3">
            <img src={logo} alt="Logo Prague Crocodiles" width="34" height="48" className="h-12 w-auto" />
            <span className="font-display text-2xl">{team.name}</span>
          </a>
          <ul className="flex gap-6">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="font-display text-lg text-white/80 hover:text-croc-light">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex gap-5 text-2xl">
            {socials.map(({ icon: Icon, href, label, external }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-white/80 hover:text-croc-light"
                >
                  <Icon aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-8 text-sm text-white/60">
          © {new Date().getFullYear()} {team.name} · Web vytvořil {credits}
        </p>
      </div>
    </footer>
  );
}
