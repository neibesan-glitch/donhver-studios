import Reveal from "@/components/ui/Reveal";
import { stats } from "@/lib/data";

export default function Stats() {
  return (
    <section className="px-x border-y border-line py-12 sm:py-[88px]">
      <Reveal>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s) => {
            // Colorer le dernier caractère en accent si demandé (ex. "48H")
            const value = s.value;
            const last = s.accentLastChar ? value.slice(-1) : null;
            const rest = s.accentLastChar ? value.slice(0, -1) : value;

            return (
              <div key={s.label}>
                <div className="font-display text-[clamp(40px,6vw,88px)] leading-[0.9] text-paper">
                  {rest}
                  {last && <span className="text-accent">{last}</span>}
                </div>
                <div className="mt-2.5 text-[11px] font-semibold uppercase tracking-kicker text-mute">
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
