import { useEffect, useRef } from "react";
const COLS = ["#D6AD68", "#B8264F", "#F6EAD8", "#8A1535"];

export default function Particles({ burst }) {
  const ref = useRef(null);
  const list = useRef([]);
  const make = (y, fast) => {
    const r = Math.random();
    return { t: r < 0.45 ? "petal" : r < 0.7 ? "heart" : "spark", x: Math.random() * innerWidth, y,
      s: Math.random() * 5 + 4, v: fast ? -(Math.random() * 7 + 3) : Math.random() * 0.7 + 0.3,
      dx: (Math.random() - 0.5) * (fast ? 7 : 0.6), rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.08,
      a: Math.random() * 0.5 + 0.4, c: COLS[Math.floor(Math.random() * COLS.length)], life: fast ? 80 : Infinity, ph: Math.random() * 6 };
  };
  useEffect(() => {
    const c = ref.current, x = c.getContext("2d");
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const size = () => { c.width = innerWidth; c.height = innerHeight; };
    size(); addEventListener("resize", size);
    for (let i = 0; i < 40; i++) list.current.push(make(Math.random() * innerHeight, false));
    let raf;
    const frame = () => {
      x.clearRect(0, 0, c.width, c.height);
      const L = list.current;
      for (let i = L.length - 1; i >= 0; i--) {
        const p = L[i];
        p.y += p.v; p.x += p.dx; p.rot += p.vr;
        if (p.life !== Infinity) { p.life--; p.v += 0.14; if (p.life <= 0) { L.splice(i, 1); continue; } }
        else if (p.y > c.height + 10) { p.y = -10; p.x = Math.random() * c.width; }
        x.save(); x.translate(p.x, p.y); x.rotate(p.rot); x.fillStyle = p.c;
        if (p.t === "petal") { x.globalAlpha = p.a; x.beginPath(); x.ellipse(0, 0, p.s, p.s * 0.55, 0, 0, 6.283); x.fill(); }
        else if (p.t === "heart") { x.globalAlpha = p.a; x.font = `${p.s * 3}px serif`; x.textAlign = "center"; x.fillText("♥", 0, 0); }
        else { p.ph += 0.05; x.globalAlpha = p.a * (0.5 + 0.5 * Math.sin(p.ph)); x.fillStyle = "#D6AD68"; x.beginPath(); x.arc(0, 0, p.s * 0.3, 0, 6.283); x.fill(); }
        x.restore();
      }
      raf = requestAnimationFrame(frame);
    };
    if (!calm) frame();
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); };
  }, []);
  useEffect(() => {
    if (!burst || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (let i = 0; i < 90; i++) list.current.push(make(innerHeight * 0.6, true));
  }, [burst]);
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-20 h-full w-full" />;
}
