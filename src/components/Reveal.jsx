import { forwardRef, useEffect, useRef, useState } from "react";

const Reveal = forwardRef(function Reveal(
  { as: Tag = "div", delay = 0, className = "", children, ...rest },
  forwardedRef,
) {
  const ref = useRef(null);
  const [shown, setShown] = useState(
    () =>
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  // po dokončení přechodu zrušíme zpoždění a zkrátíme přechod, ať hover reaguje hned
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!shown) return undefined;
    const id = setTimeout(() => setDone(true), delay + 700);
    return () => clearTimeout(id);
  }, [shown, delay]);

  const setRefs = (el) => {
    ref.current = el;
    if (typeof forwardedRef === "function") forwardedRef(el);
    else if (forwardedRef) forwardedRef.current = el;
  };

  useEffect(() => {
    if (shown) return undefined;
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <Tag
      ref={setRefs}
      className={`reveal ${shown ? "reveal-in" : ""} ${done ? "reveal-done" : ""} ${className}`}
      style={delay && !done ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
});

export default Reveal;
