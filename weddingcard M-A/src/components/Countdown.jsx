import { useEffect, useState } from "react";
import { EVENT } from "../data.js";

const left = () => Math.max(0, new Date(EVENT.startsAt).getTime() - Date.now());
export default function Countdown() {
  const [t, setT] = useState(left());
  useEffect(() => { const id = setInterval(() => setT(left()), 1000); return () => clearInterval(id); }, []);
  if (t === 0) return <p className="font-script text-4xl text-ivory">The day is here, Alhamdulillah! ❤️</p>;
  const units = [["Days", Math.floor(t / 864e5)], ["Hours", Math.floor((t % 864e5) / 36e5)], ["Minutes", Math.floor((t % 36e5) / 6e4)], ["Seconds", Math.floor((t % 6e4) / 1e3)]];
  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {units.map(([label, n]) => (
        <div key={label} className="w-[4.6rem] rounded-lg border border-gold/50 bg-burgundy/60 py-3 shadow-[0_0_24px_rgba(88,13,29,.9)] sm:w-20">
          <div className="text-3xl font-semibold tabular-nums text-ivory sm:text-4xl">{String(n).padStart(2, "0")}</div>
          <div className="text-sm text-gold">{label}</div>
        </div>
      ))}
    </div>
  );
}
