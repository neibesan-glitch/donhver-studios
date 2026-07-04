import Reveal from "@/components/ui/Reveal";
import { profile, socials } from "@/lib/data";

export default function ContactFooter() {
  return (
    <>
      {/* ═══ CONTACT ═══ */}
      <section
        id="contact"
        className="px-x border-t border-line py-[72px] sm:py-[150px]"
      >
        <Reveal className="flex flex-col items-center text-center">
          <span className="kicker">/ UN PROJET EN TÊTE ?</span>
          <h2 className="m-0 mt-[22px] font-display text-[clamp(48px,11vw,190px)] uppercase leading-[0.86] tracking-[-0.01em] text-paper">
            Travaillons
            <br />
            ensemble<span className="text-accent">.</span>
          </h2>
          <a
            href={`mailto:${profile.email}`}
            className="btn-accent mt-7 sm:mt-12"
          >
            {profile.email} →
          </a>
          <div className="mt-[34px] flex gap-[26px]">
            {socials.map((s) => (
              <a
                key={s}
                href="#top"
                className="text-xs font-medium uppercase tracking-[0.14em] text-mute no-underline transition-colors hover:text-white"
              >
                {s}
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="px-x border-t border-line py-8 sm:py-12">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <span className="flex items-center gap-[9px] font-display text-lg tracking-[0.05em] text-paper">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            DONHVER STUDIOS
          </span>
          <span className="text-[11px] font-medium uppercase tracking-kicker text-mute">
            © 2026 — STUDIO CRÉATIF INDÉPENDANT
          </span>
          <a
            href="#top"
            className="text-[11px] font-medium uppercase tracking-kicker text-mute no-underline transition-colors hover:text-white"
          >
            RETOUR EN HAUT ↑
          </a>
        </div>
      </footer>
    </>
  );
}
