import { useState } from "react";
import { GoldButton, Reveal, Section, Title } from "./ui.jsx";

const QS = [
  { q: "Are you ready to celebrate with us?", o: [["Of course! ❤️", "Yay! The dance floor already misses you 🎉"], ["Absolutely! 🎉", "That’s the spirit! Save your best smile for us 😄"]] },
  { q: "What are you bringing?", o: [["Endless blessings 🤲", "Aameen! The most precious gift of all 🤲"], ["Lots of love 💕", "Aww, our hearts are already full 💕"], ["Dance moves 💃", "Warm up now, we’re counting on you! 💃"]] },
];

export default function FunQuiz({ onBurst }) {
  const [a, setA] = useState({});
  const pick = (i, j) => { setA((p) => ({ ...p, [i]: j })); onBurst(); };
  return (
    <Section>
      <Reveal><Title>Before You Go... We Have a Little Question!</Title></Reveal>
      {QS.map((Q, i) => (
        <Reveal key={i} className="mt-10">
          <p className="mb-4 text-2xl text-ivory">{Q.q}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {Q.o.map(([t], j) => <GoldButton key={j} solid={a[i] === j} onClick={() => pick(i, j)}>{t}</GoldButton>)}
          </div>
          {a[i] !== undefined && <p key={a[i]} className="mt-4 text-xl italic text-ivory [animation:pop_.5s_ease-out]">{Q.o[a[i]][1]}</p>}
        </Reveal>
      ))}
      {Object.keys(a).length === QS.length && <p className="mt-10 font-script text-4xl text-ivory [animation:pop_.6s_ease-out]">See you on 29 November! ❤️</p>}
    </Section>
  );
}
