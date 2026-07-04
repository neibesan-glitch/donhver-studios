"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CaseStudy } from "@/lib/data";

type Props = {
  caseStudy: CaseStudy | null;
  onClose: () => void;
};

/**
 * Modal « case study » — behind-the-scenes d'un projet vidéo.
 *
 * Affiche, dans le style Donhver Studios (dark, Anton/Archivo, accent orange) :
 * 1. En-tête (marque + tagline)
 * 2. Vidéo finale OU placeholder « à venir »
 * 3. Ref sheet (design lock) OU badge « sujet unique »
 * 4. Brief & outils (concept, format, outils, livrables)
 *
 * Accessibilité : role="dialog" aria-modal, fermeture Escape + clic backdrop,
 * focus sur le bouton fermer à l'ouverture, verrouillage du scroll body.
 */
export default function CaseStudyModal({ caseStudy, onClose }: Props) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Escape pour fermer + verrouillage du scroll body
  useEffect(() => {
    if (!caseStudy) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus initial sur le bouton fermer
    closeBtnRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [caseStudy, onClose]);

  const accent = caseStudy?.accent ?? "#e2542a";
  const b = caseStudy?.brief;

  return (
    <AnimatePresence>
      {caseStudy && b && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-ink/90 px-4 py-8 backdrop-blur-sm sm:px-6 sm:py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Case study — ${b.brand}`}
        >
          <motion.div
            className="relative my-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-line bg-surf shadow-2xl"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton fermer */}
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-ink/60 text-cream backdrop-blur transition-colors hover:border-white/30 hover:text-paper"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="modal-scroll max-h-[calc(100vh-4rem)] overflow-y-auto sm:max-h-[calc(100vh-6rem)]">
              {/* ─── En-tête ─── */}
              <header
                className="relative px-6 pb-6 pt-10 sm:px-10 sm:pt-12"
                style={{ borderTop: `3px solid ${accent}` }}
              >
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-eyebrow text-mute">
                  <span
                    className="inline-block h-[9px] w-[9px] rounded-full"
                    style={{ background: accent }}
                  />
                  CASE STUDY
                </div>
                <h3 className="mt-3 font-display text-[clamp(34px,5vw,64px)] uppercase leading-[0.92] text-paper">
                  {b.brand}
                </h3>
                <p className="mt-2 text-sm italic text-cream">{b.tagline}</p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-[11px] font-semibold uppercase tracking-kicker text-mute">
                  {b.format}
                </div>
              </header>

              {/* ─── Vidéo finale ─── */}
              <section className="px-6 sm:px-10">
                <SectionLabel>Résultat final</SectionLabel>
                {caseStudy.video?.src ? (
                  <div className="relative aspect-video overflow-hidden rounded-lg border border-line bg-black">
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      src={caseStudy.video.src}
                      className="block h-full w-full bg-black object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video flex-col items-center justify-center gap-3.5 overflow-hidden rounded-lg border border-dashed border-line bg-gradient-to-br from-[#161618] to-[#0e0e10]">
                    <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-line text-base text-cream">
                      ▶
                    </span>
                    <span className="px-6 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-mute">
                      Vidéo à venir
                    </span>
                    {caseStudy.video?.note && (
                      <span className="max-w-md px-6 text-center text-xs leading-relaxed text-mute/70">
                        {caseStudy.video.note}
                      </span>
                    )}
                  </div>
                )}
              </section>

              {/* ─── Ref sheet ─── */}
              <section className="mt-8 px-6 sm:px-10">
                <SectionLabel>Design lock — Référence</SectionLabel>
                {caseStudy.refSheet ? (
                  <figure className="m-0 overflow-hidden rounded-lg border border-line bg-ink">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={caseStudy.refSheet.src}
                      alt={caseStudy.refSheet.label}
                      className="block h-auto w-full"
                    />
                    <figcaption className="border-t border-line px-4 py-3 text-xs text-cream">
                      {caseStudy.refSheet.label}
                    </figcaption>
                  </figure>
                ) : (
                  <div className="flex items-center gap-3 rounded-lg border border-dashed border-line bg-ink/40 px-4 py-4">
                    <span
                      className="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                      style={{ background: accent }}
                    />
                    <span className="text-sm text-cream">
                      Pas de ref sheet — sujet unique, rien à verrouiller.
                    </span>
                  </div>
                )}
              </section>

              {/* ─── Brief & outils ─── */}
              <section className="mt-8 px-6 pb-10 sm:px-10 sm:pb-12">
                <SectionLabel>Brief &amp; outils</SectionLabel>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-[1fr_auto]">
                  {/* Concept */}
                  <div>
                    <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-kicker text-mute">
                      Concept
                    </h4>
                    <p className="text-sm leading-relaxed text-cream">{b.concept}</p>
                  </div>

                  {/* Format */}
                  <div className="sm:text-right">
                    <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-kicker text-mute">
                      Format
                    </h4>
                    <p className="font-display text-lg uppercase text-paper">{b.format}</p>
                  </div>
                </div>

                {/* Livrables */}
                <div className="mt-6">
                  <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-kicker text-mute">
                    Livrables
                  </h4>
                  <p className="text-sm leading-relaxed text-cream">{b.deliverables}</p>
                </div>

                {/* Outils */}
                <div className="mt-6">
                  <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-kicker text-mute">
                    Outils &amp; pipeline
                  </h4>
                  <ul className="flex flex-wrap gap-2">
                    {b.tools.map((tool, i) => (
                      <li
                        key={i}
                        className="inline-flex items-center gap-2 rounded-full border border-line bg-ink/50 px-3 py-1.5 text-xs text-cream"
                      >
                        <span
                          className="inline-block h-1.5 w-1.5 rounded-full"
                          style={{ background: accent }}
                        />
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="h-px w-6 bg-accent" />
      <span className="text-[11px] font-semibold uppercase tracking-eyebrow text-accent">
        {children}
      </span>
    </div>
  );
}
