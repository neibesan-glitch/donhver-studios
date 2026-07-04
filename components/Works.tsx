"use client";

import Reveal from "@/components/ui/Reveal";
import { useCaseStudy } from "@/components/CaseStudyProvider";
import { works } from "@/lib/data";
import type { Work } from "@/lib/data";

// Map ratio → classes aspect (Tailwind n'a pas de ratio dynamique)
const RATIO_CLASS: Record<Work["ratio"], string> = {
  "16/10": "aspect-[16/10]",
  "3/4": "aspect-[3/4]",
  "1/1": "aspect-square",
};

// Map span → classes col-span responsive (sur mobile on stack en full width)
const SPAN_CLASS: Record<Work["span"], string> = {
  7: "col-span-12 sm:col-span-7",
  5: "col-span-12 sm:col-span-5",
};

function WorkCard({ w }: { w: Work }) {
  const { open } = useCaseStudy();
  const clickable = Boolean(w.caseStudy);

  const inner = (
    <figure
 className={`zoom-on-hover group relative m-0 overflow-hidden border bg-surf ${
        clickable
          ? "cursor-pointer border-accent/40 transition-colors hover:border-accent"
          : "border-line"
      }`}
    >
      <div className={RATIO_CLASS[w.ratio]}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={w.image}
          alt={`${w.title}${w.subtitle ? " " + w.subtitle : ""}`}
          className="block h-full w-full object-cover"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-black/15 via-transparent to-black/72 p-[18px_20px]">
        <div className="flex items-start justify-between gap-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cream">
            / {w.num} — {w.kind}
          </span>
          {clickable && (
            <span className="pointer-events-none rounded-full bg-accent/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Case study ↗
            </span>
          )}
        </div>
        <div className="flex items-end justify-between gap-3">
          <span className="font-display text-[clamp(22px,2.6vw,38px)] uppercase leading-[0.95] text-paper">
            {w.title}
            {w.subtitle && (
              <>
                <br />
                {w.subtitle}
              </>
            )}
          </span>
          {w.mention && (
            <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.14em] text-cream">
              {w.mention}
            </span>
          )}
        </div>
      </div>
    </figure>
  );

  if (clickable && w.caseStudy) {
    return (
      <Reveal className={SPAN_CLASS[w.span]}>
        <button
          type="button"
          onClick={() => open(w.caseStudy!)}
          aria-label={`Voir le case study — ${w.title}`}
          className="block w-full p-0 text-left"
        >
          {inner}
        </button>
      </Reveal>
    );
  }

  return <Reveal className={SPAN_CLASS[w.span]}>{inner}</Reveal>;
}

export default function Works() {
  return (
    <section id="travaux" className="px-x border-t border-line py-16 sm:py-20 lg:py-[120px]">
      <Reveal className="mb-9 flex flex-wrap items-end justify-between gap-6 lg:mb-16">
        <h2 className="m-0 font-display text-[clamp(32px,5vw,72px)] uppercase leading-[0.95] text-paper">
          <span className="align-top text-[0.5em] text-accent">/ </span>
          Direction
          <br />
          &amp; visuels
        </h2>
        <p className="m-0 max-w-[360px] text-sm leading-relaxed text-mute">
          Au-delà du mouvement : affiches, pochettes, campagnes et identités. La
          preuve que chaque registre est maîtrisé, image fixe comprise. Cliquez
          sur un projet réel pour voir le case study complet.
        </p>
      </Reveal>

      <div className="grid-12 gap-3 sm:gap-4 lg:gap-5">
        {works.map((w) => (
          <WorkCard key={w.num} w={w} />
        ))}
      </div>
    </section>
  );
}
