import Reveal from "@/components/ui/Reveal";
import { showreel, videos, videosNote } from "@/lib/data";

export default function Showreel() {
  return (
    <section id="showreel" className="px-x py-16 sm:py-20 lg:py-[120px]">
      {/* Titre + intro */}
      <Reveal className="mb-7 flex flex-wrap items-end justify-between gap-6 lg:mb-12">
        <h2 className="m-0 font-display text-[clamp(32px,5.4vw,84px)] uppercase leading-[0.92] text-paper">
          <span className="align-top text-[0.42em] text-accent">/ </span>
          Films &amp;
          <br />
          publicités
        </h2>
        <p className="m-0 max-w-[400px] text-sm leading-relaxed text-mute">
          Réalisation, court-métrages et publicités cinématographiques. La vidéo
          est au cœur du studio — voici le travail en mouvement.
        </p>
      </Reveal>

      {/* Showreel principal 16/9 */}
      <Reveal>
        <figure className="m-0 mb-4 sm:mb-6">
          <div className="relative aspect-video overflow-hidden border border-line bg-black">
            <video
              controls
              playsInline
              preload="metadata"
              src={`${showreel.src}#t=0.1`}
              className="block h-full w-full bg-black object-cover"
            />
            <span className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/55 px-3 py-[7px] text-[10px] font-semibold uppercase tracking-[0.2em] text-cream backdrop-blur-sm">
              <span className="h-[7px] w-[7px] animate-pulse-dot rounded-full bg-accent" />
              {showreel.badge}
            </span>
          </div>
          <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-5 border-t border-line pt-4">
            <span className="font-display text-[clamp(22px,2.6vw,40px)] uppercase leading-none text-paper">
              {showreel.title}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-kicker text-mute">
              {showreel.caption}
            </span>
          </figcaption>
        </figure>
      </Reveal>

      {/* Grille de vidéos */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
        {videos.map((v) => (
          <Reveal key={v.num}>
            <figure className="m-0">
              {v.src ? (
                <div className="relative aspect-video overflow-hidden border border-line bg-black">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    src={v.src}
                    className="block h-full w-full bg-black object-cover"
                  />
                  <span className="pointer-events-none absolute left-3.5 top-3.5 rounded-md bg-black/50 font-display text-base text-accent px-2 py-0.5">
                    {v.num}
                  </span>
                </div>
              ) : (
                <div className="group relative flex aspect-video flex-col items-center justify-center gap-3.5 overflow-hidden border border-dashed border-line bg-gradient-to-br from-[#161618] to-[#0e0e10] transition-colors hover:border-accent">
                  <span className="pointer-events-none absolute left-3.5 top-3.5 font-display text-base text-accent">
                    {v.num}
                  </span>
                  <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-line text-base text-cream">
                    ▶
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mute">
                    BIENTÔT EN LIGNE
                  </span>
                </div>
              )}
              <figcaption className="mt-3.5 flex items-baseline justify-between gap-3 border-t border-line pt-3.5">
                <span className="font-display text-[clamp(16px,1.6vw,22px)] uppercase leading-none text-paper">
                  {v.title}
                </span>
                <span className="whitespace-nowrap text-right text-[10px] font-semibold uppercase tracking-[0.14em] text-mute">
                  {v.cat}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <p className="mt-5 max-w-[560px] text-[13px] leading-relaxed text-mute sm:mt-8">
        {videosNote}
      </p>
    </section>
  );
}
