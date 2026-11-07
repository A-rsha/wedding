import { useEffect, useState } from "react";
import { COUPLE, PHOTOS } from "../data.js";

export default function Hero() {
  const [ok, setOk] = useState([]);
  const [i, setI] = useState(0);
  useEffect(() => {
    PHOTOS.forEach((src) => { const im = new Image(); im.onload = () => setOk((p) => (p.includes(src) ? p : [...p, src])); im.src = src; });
  }, []);
  useEffect(() => {
    if (ok.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % ok.length), 4500);
    return () => clearInterval(t);
  }, [ok.length]);
  return (
    <header className="relative z-10 flex min-h-[100svh] items-end justify-center overflow-hidden">
      {ok.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-[55vh] w-64 items-center justify-center rounded-t-full border border-gold/60 bg-gradient-to-b from-burgundy/70 to-transparent">
            <span className="font-script text-7xl text-ivory [animation:glow_4s_ease-in-out_infinite_alternate]">F &amp; M</span>
          </div>
        </div>
      )}
      {ok.map((src, k) => (
        <img key={src} src={src} alt={`${COUPLE.bride} and ${COUPLE.groom}`}
          className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-[1.8s] ${k === i ? "opacity-100" : "opacity-0"}`} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
      <div className="pointer-events-none absolute inset-4 border border-gold/60 sm:inset-8" />
      <div className="relative px-8 pb-20 text-center">
        <p className="font-script text-4xl leading-snug text-ivory [animation:glow_4s_ease-in-out_infinite_alternate] sm:text-6xl">Two Hearts, One Beautiful Journey ❤️</p>
        {ok.length > 1 && (
          <div className="mt-6 flex justify-center gap-2">{ok.map((s, k) => <span key={s} className={`h-1.5 rounded-full bg-gold transition-all ${k === i ? "w-6" : "w-1.5 opacity-40"}`} />)}</div>
        )}
      </div>
    </header>
  );
}
