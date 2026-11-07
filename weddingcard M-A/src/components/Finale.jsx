import { FaWhatsapp } from "react-icons/fa";
import { COUPLE, SHARE_TEXT } from "../data.js";
import { GoldButton, Reveal, Section } from "./ui.jsx";

const HEARTS = Array.from({ length: 14 }, (_, i) => ({ left: (i * 37) % 100, delay: (i * 0.9) % 7, size: 16 + ((i * 7) % 18), dur: 7 + (i % 5) }));

export default function Finale({ onBurst }) {
  const share = () => {
    onBurst();
    window.open(`https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${location.href}`)}`, "_blank", "noopener");
  };
  return (
    <footer className="relative z-10 overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {HEARTS.map((h, i) => (
          <span key={i} className="absolute bottom-0 text-gold/80" style={{ left: `${h.left}%`, fontSize: h.size, animation: `floatUp ${h.dur}s ${h.delay}s linear infinite` }}>{i % 3 ? "♥" : "✦"}</span>
        ))}
      </div>
      <Section className="pb-24">
        <Reveal><GoldButton onClick={share}><FaWhatsapp className="text-xl" />SHARE THIS LOVE ON WHATSAPP 💌</GoldButton></Reveal>
        <Reveal className="mt-14"><p className="text-2xl leading-relaxed text-ivory">Your presence, prayers and blessings mean the world to us.</p></Reveal>
        <Reveal className="mt-8">
          <p className="text-xl italic text-gold">With Love,</p>
          <p className="mt-2 font-script text-4xl leading-snug text-ivory [animation:glow_4s_ease-in-out_infinite_alternate] sm:text-5xl">{COUPLE.bride} &amp; {COUPLE.groom} ❤️</p>
        </Reveal>
      </Section>
    </footer>
  );
}
