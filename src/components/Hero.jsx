import { lazy, Suspense, useEffect, useRef } from "react";
import logo from "../assets/logo-768.webp";
import { team } from "../content.js";

const HeroBalls = lazy(() => import("./HeroBalls.jsx"));

const MAX_TILT = 10;

export default function Hero() {
  const tiltRef = useRef(null);

  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return undefined;
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let raf = 0;
    const tick = () => {
      cur.x += (target.x - cur.x) * 0.1;
      cur.y += (target.y - cur.y) * 0.1;
      el.style.transform = `rotateX(${cur.x.toFixed(2)}deg) rotateY(${cur.y.toFixed(2)}deg)`;
      if (Math.abs(target.x - cur.x) > 0.01 || Math.abs(target.y - cur.y) > 0.01) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e) => {
      target.y = ((e.clientX / window.innerWidth) * 2 - 1) * MAX_TILT;
      target.x = -((e.clientY / window.innerHeight) * 2 - 1) * MAX_TILT;
      kick();
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      kick();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
    >
      {/* decorative stripes */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 top-0 h-full w-40 -skew-x-12 bg-croc/20 sm:w-56" />
        <div className="absolute right-24 top-0 h-full w-10 -skew-x-12 bg-flag-red/40 sm:right-40" />
        <div className="absolute right-40 top-0 h-full w-6 -skew-x-12 bg-flag-blue/50 sm:right-60" />
        <div className="absolute -left-32 bottom-0 h-1/2 w-64 -skew-x-12 bg-flag-blue/15" />
      </div>

      <Suspense fallback={null}>
        <HeroBalls />
      </Suspense>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 px-4 sm:px-6 md:grid-cols-2">
        <div className="animate-float-in flex justify-center md:order-2">
          <div style={{ perspective: "1000px" }}>
            <div ref={tiltRef} style={{ willChange: "transform" }}>
              <img
                src={logo}
                alt="Logo Prague Crocodiles"
                width="400"
                height="561"
                fetchPriority="high"
                className="h-auto w-40 drop-shadow-[0_20px_40px_rgba(1,132,95,0.45)] sm:w-72 md:w-full md:max-w-sm"
              />
            </div>
          </div>
        </div>

        <div className="animate-float-in md:order-1">
          <p className="font-display text-lg text-croc-light sm:text-xl">
            {team.sport} · {team.city}
          </p>
          <h1 className="font-display text-6xl leading-[1.08] sm:text-7xl lg:text-8xl">
            Uhni.
            <br />
            Chyť.
            <br />
            Hoď.
            <br />
            <span className="text-croc-light">Vyhraj.</span>
          </h1>
          <div aria-hidden="true" className="mt-5 flex h-1.5 w-32 -skew-x-12 overflow-hidden">
            <span className="flex-1 bg-white" />
            <span className="flex-1 bg-flag-blue" />
            <span className="flex-1 bg-flag-red" />
          </div>
          <p className="mt-6 max-w-md text-lg text-white/80">{team.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#trenink"
              className="-skew-x-12 bg-croc px-7 py-3 transition-all duration-200 hover:-translate-y-1 hover:bg-croc-light hover:shadow-[0_10px_28px_-6px_rgba(18,180,132,0.6)]"
            >
              <span className="font-display block skew-x-12 text-xl">Přijď na trénink</span>
            </a>
            <a
              href="#kontakt"
              className="-skew-x-12 border-2 border-white px-7 py-3 transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:text-ink hover:shadow-[0_10px_28px_-6px_rgba(255,255,255,0.35)]"
            >
              <span className="font-display block skew-x-12 text-xl">Napiš nám</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
