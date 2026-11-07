import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { GoldButton } from "./ui.jsx";

export default function Intro({ onOpen }) {
  const [opening, setOpening] = useState(false);
  const [gone, setGone] = useState(false);
  if (gone) return null;
  const go = () => { setOpening(true); onOpen(); setTimeout(() => setGone(true), 1500); };
  const half = "absolute inset-y-0 w-1/2 transition-transform duration-[1.3s] ease-in-out";
  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-ink">
      <div className={`${half} left-0 bg-gradient-to-r from-ink to-burgundy ${opening ? "-translate-x-full" : ""}`} />
      <div className={`${half} right-0 bg-gradient-to-l from-ink to-burgundy ${opening ? "translate-x-full" : ""}`} />
      <div className={`relative z-10 flex h-full flex-col items-center justify-center gap-9 px-8 text-center transition-opacity duration-700 ${opening ? "opacity-0" : ""}`}>
        <FaHeart className="animate-pulse text-4xl text-gold drop-shadow-[0_0_14px_rgba(214,173,104,.7)]" />
        <p className="max-w-md font-script text-4xl leading-snug text-ivory sm:text-5xl">Hey! Someone has a special invitation for you... ❤️</p>
        <GoldButton onClick={go}>OPEN YOUR INVITATION ✨</GoldButton>
      </div>
    </div>
  );
}
