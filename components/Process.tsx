import Reveal from "@/components/ui/Reveal";
import { processSteps } from "@/lib/data";

export default function Process() {
  return (
    <section className="px-x border-t border-line py-16 sm:py-20 lg:py-[120px]">
      <Reveal>
        <h2 className="m-0 mb-9 font-display text-[clamp(32px,5vw,72px)] uppercase leading-[0.95] text-paper lg:mb-[60px]">
          <span className="align-top text-[0.5em] text-accent">/ </span>
          Notre
          <br />
          processus
        </h2>
      </Reveal>

      <Reveal>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-5 lg:gap-12">
          {processSteps.map((step) => (
            <div key={step.num} className="border-t border-line pt-[22px]">
              <div className="font-display text-[clamp(48px,6vw,96px)] leading-[0.85] text-accent">
                {step.num}
              </div>
              <div className="mt-4 font-display text-[clamp(20px,2vw,30px)] uppercase text-paper">
                {step.title}
              </div>
              <p className="m-0 mt-2.5 max-w-[320px] text-sm leading-relaxed text-mute">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
