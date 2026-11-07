import { useEffect, useState } from "react";
import { FaHeart, FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_NUMBER } from "../data.js";
import { GoldButton, Reveal, Section, Title } from "./ui.jsx";

const KEY = "wedding-wishes-local";
const readLocal = () => { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; } };
const field = "w-full rounded-lg border border-gold/50 bg-ink/60 px-4 py-3 text-xl text-ivory placeholder:text-gold/40 focus:outline-2 focus:outline-gold";

export default function Wishes({ onBurst }) {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/wishes").then((r) => { if (!r.ok) throw 0; return r.json(); })
      .then((j) => setList(j.wishes || [])).catch(() => setList(readLocal()));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const w = { name: name.trim().slice(0, 40), msg: msg.trim().slice(0, 220) };
    if (!w.name || !w.msg) return;
    setBusy(true);
    try {
      const r = await fetch("/api/wishes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(w) });
      if (!r.ok) throw 0;
      setList((await r.json()).wishes || []);
      setNote("Thank you! Your wish is on the wall ❤️");
    } catch {
      const l = [w, ...readLocal()].slice(0, 50);
      try { localStorage.setItem(KEY, JSON.stringify(l)); } catch {}
      setList(l); setNote("Saved on this phone. The shared wall isn’t connected yet.");
    }
    setBusy(false); setName(""); setMsg(""); onBurst();
  };

  const sendWa = () => {
    if (!name.trim() || !msg.trim()) { setNote("Add your name and wish first 💌"); return; }
    const text = `${msg.trim()}\n\n– ${name.trim()}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  };

  return (
    <Section>
      <Reveal><Title>Leave Us Some Love ❤️</Title></Reveal>
      <Reveal className="mt-8">
        <form onSubmit={submit} className="space-y-4 text-left">
          <input className={field} value={name} onChange={(e) => setName(e.target.value)} maxLength={40} required placeholder="Your name" />
          <textarea className={`${field} h-28 resize-none`} value={msg} onChange={(e) => setMsg(e.target.value)} maxLength={220} required placeholder="Write your wedding wish or dua for them" />
          <div className="flex flex-wrap justify-center gap-3">
            <GoldButton type="submit" disabled={busy}><FaHeart />SUBMIT MY WISH</GoldButton>
            <GoldButton type="button" solid={false} onClick={sendWa}><FaWhatsapp />SEND ON WHATSAPP</GoldButton>
          </div>
        </form>
        <p className="mt-3 min-h-6 text-lg italic text-ivory" role="status">{note}</p>
      </Reveal>
      <div className="mt-6 space-y-4 text-left">
        {list.length === 0 && <p className="text-center text-lg italic text-gold/80">Be the first to leave a wish.</p>}
        {list.map((w, k) => (
          <div key={`${w.t}-${k}`} className={`rounded-xl border border-gold/40 border-l-4 border-l-gold bg-gradient-to-br from-burgundy/60 to-ink/80 px-5 py-4 [animation:pop_.5s_ease-out] ${k % 2 ? "ml-4 rotate-[.7deg]" : "mr-4 -rotate-[.7deg]"}`}>
            <p className="break-words text-xl italic leading-snug text-ivory">{w.msg}</p>
            <p className="mt-1 font-script text-2xl text-gold">{w.name}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
