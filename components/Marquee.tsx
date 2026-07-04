import { marqueeItems } from "@/lib/data";

function Track() {
  return (
    <div
      className="flex items-center gap-[34px] pr-[34px] font-display text-[clamp(28px,3.6vw,52px)] uppercase tracking-[0.01em] text-paper"
      aria-hidden="true"
    >
      {marqueeItems.map((item, i) => (
        <span key={i} className="flex items-center gap-[34px]">
          {item}
          <span className="text-accent">●</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="flex w-full overflow-hidden border-y border-line bg-surf py-[22px]">
      <div className="flex w-max animate-marquee will-change-transform">
        <Track />
        <Track />
      </div>
    </div>
  );
}
