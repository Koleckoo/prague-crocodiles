import { useEffect, useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import logo from "../assets/logo.png";
import { team } from "../content.js";

const links = [
  { href: "#training", label: "Training" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "bg-ink/90 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
        aria-label="Main"
      >
        <a href="#top" className="flex items-center gap-3">
          <img
            src={logo}
            alt={`${team.name} logo`}
            width="34"
            height="48"
            className="h-10 w-auto"
          />
          <span className="font-display text-xl sm:text-2xl">{team.name}</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-display text-lg font-bold tracking-wide text-white/80 transition-colors hover:text-croc-light"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="p-2 text-2xl md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <FaXmark aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="border-t border-white/10 px-4 pb-4 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display block py-3 text-2xl"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
