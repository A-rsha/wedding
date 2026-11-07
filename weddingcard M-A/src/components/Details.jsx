import { FaMapMarkerAlt, FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { BRIDE_FAMILY, COUPLE, EVENT, GROOM_FAMILY } from "../data.js";
import Countdown from "./Countdown.jsx";
import { GoldButton, Reveal, Section, Title } from "./ui.jsx";

const Family = ({ f }) => (
  <p className="text-xl leading-relaxed text-ivory">
    <b className="block font-semibold">{f.parents}</b>
    <span className="block text-lg text-gold">{f.house}</span>
    <span className="block text-lg text-gold">{f.place}</span>
  </p>
);

export default function Details() {
  return (
    <Section>
      <Reveal><p className="text-lg italic text-gold/80">In the name of Allah, the Most Gracious, the Most Merciful</p></Reveal>
      <Reveal className="mt-8"><p className="mb-4 text-xl font-semibold tracking-widest text-gold">TOGETHER WITH THEIR FAMILIES</p><Family f={BRIDE_FAMILY} /></Reveal>
      <Reveal className="mt-8"><p className="text-xl italic text-gold">Invite You To Their Wedding Ceremony</p></Reveal>
      <Reveal className="mt-6">
        <h1 className="font-script text-6xl leading-tight text-ivory [animation:glow_4s_ease-in-out_infinite_alternate] sm:text-7xl">
          {COUPLE.bride}<span className="block text-4xl text-gold">&amp;</span>{COUPLE.groom}
        </h1>
      </Reveal>
      <Reveal className="mt-8"><Family f={GROOM_FAMILY} /></Reveal>

      <Reveal className="mt-16">
        <Title>Save the Date</Title>
        <div className="mt-6 space-y-3 rounded-2xl border border-gold/40 bg-ink/50 px-6 py-7 text-xl text-ivory">
          <p className="flex items-center justify-center gap-3"><FaRegCalendarAlt className="text-gold" />{EVENT.dateText}, {EVENT.day}</p>
          <p className="flex items-center justify-center gap-3"><FaRegClock className="text-gold" />{EVENT.time}</p>
          <p className="flex items-center justify-center gap-3"><FaMapMarkerAlt className="text-gold" />Venue: {EVENT.venue}</p>
        </div>
      </Reveal>
      <Reveal className="mt-10"><Countdown /></Reveal>
      <Reveal className="mt-10">
        <GoldButton as="a" href={EVENT.mapsUrl} target="_blank" rel="noopener noreferrer"><FaMapMarkerAlt />GET DIRECTIONS</GoldButton>
      </Reveal>
    </Section>
  );
}
