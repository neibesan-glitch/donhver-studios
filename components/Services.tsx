import Reveal from "@/components/ui/Reveal";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <section id="services" className="px-x py-16 sm:py-20 lg:py-[120px]">
      <Reveal>
        <h2 className="m-0 mb-9 font-display text-[clamp(32px,5vw,72px)] uppercase leading-[0.95] text-paper lg:mb-[60px]">
          <span className="align-top text-[0.5em] text-accent">/ </span>
          Ce que nous
          <br />
          dirigeons
        </h2>
      </Reveal>

      <div className="border-t border-line">
        {services.map((s) => (
          <Reveal key={s.num}>
            <a
              href="#contact"
              className="grid grid-cols-[60px_1fr_auto] gap-4 border-b border-line py-5 no-underline transition-colors hover:bg-surf sm:grid-cols-[80px_1fr_auto] sm:gap-8 sm:py-7 lg:py-9 lg:[&]:gap-12"
            >
              <span className="font-display text-xl text-accent">{s.num}</span>
              <div>
                <div className="font-display text-[clamp(24px,3vw,44px)] uppercase leading-none text-paper">
                  {s.title}
                </div>
                <div className="mt-2.5 max-w-[560px] text-sm leading-relaxed text-mute">
                  {s.desc}
                </div>
              </div>
              <span className="text-[22px] text-cream">↗</span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
