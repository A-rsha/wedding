import { useEffect, useRef, useState } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import Details from "./components/Details.jsx";
import Finale from "./components/Finale.jsx";
import FunQuiz from "./components/FunQuiz.jsx";
import Hero from "./components/Hero.jsx";
import Intro from "./components/Intro.jsx";
import Particles from "./components/Particles.jsx";
import Wishes from "./components/Wishes.jsx";

export default function App() {
  const [open, setOpen] = useState(false);
  const [burst, setBurst] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hasMusic, setHasMusic] = useState(true);
  const audio = useRef(null);
  const pop = () => setBurst((n) => n + 1);

  useEffect(() => {
    const a = new Audio("/music.mp3");
    a.loop = true; a.volume = 0.5;
    a.addEventListener("error", () => setHasMusic(false));
    audio.current = a;
    return () => a.pause();
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "" : "hidden"; }, [open]);

  const start = () => { setOpen(true); pop(); audio.current.play().then(() => setPlaying(true)).catch(() => {}); };
  const toggle = () => {
    const a = audio.current;
    if (a.paused) { a.play().then(() => setPlaying(true)).catch(() => {}); } else { a.pause(); setPlaying(false); }
  };

  return (
    <>
      <Intro onOpen={start} />
      <Particles burst={burst} />
      {open && hasMusic && (
        <button onClick={toggle} aria-label={playing ? "Mute music" : "Play music"}
          className="fixed right-4 top-[max(1rem,env(safe-area-inset-top))] z-30 flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 bg-ink/70 text-gold backdrop-blur">
          {playing ? <FaVolumeUp /> : <FaVolumeMute />}
        </button>
      )}
      <main>
        <Hero />
        <Details />
        <FunQuiz onBurst={pop} />
        <Wishes onBurst={pop} />
        <Finale onBurst={pop} />
      </main>
    </>
  );
}
