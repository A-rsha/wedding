import { useEffect, useRef, useState } from "react";

export function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); o.disconnect(); } }, { threshold: 0.15 });
    o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return <div ref={ref} style={{ transitionDelay: delay + "ms" }} className={`reveal ${shown ? "in" : ""} ${className}`}>{children}</div>;
}

export const Section = ({ children, className = "" }) => (
  <section className={`relative z-10 mx-auto max-w-xl px-6 py-16 text-center ${className}`}>{children}</section>
);

export const Title = ({ children, className = "" }) => (
  <h2 className={`font-script text-4xl sm:text-5xl text-ivory text-center leading-tight ${className}`}>{children}</h2>
);

export const GoldButton = ({ as: Tag = "button", solid = true, className = "", children, ...p }) => (
  <Tag {...p} className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-lg tracking-wide cursor-pointer transition hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${
    solid ? "bg-gradient-to-r from-gold to-[#f0d49a] text-ink font-semibold shadow-[0_0_30px_rgba(214,173,104,.35)]"
          : "border border-gold text-gold hover:bg-gold hover:text-ink"} ${className}`}>{children}</Tag>
);
