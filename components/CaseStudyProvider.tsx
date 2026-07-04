"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CaseStudy } from "@/lib/data";
import CaseStudyModal from "@/components/CaseStudyModal";

type CaseStudyContextValue = {
  /** Ouvre le modal avec le case study donné. */
  open: (cs: CaseStudy) => void;
  /** Ferme le modal. */
  close: () => void;
};

const CaseStudyContext = createContext<CaseStudyContextValue | null>(null);

/**
 * Provider qui rend le modal « case study » au niveau racine.
 * Permet à n'importe quelle section (Works, Showreel) d'ouvrir un case study
 * via le hook `useCaseStudy()`.
 *
 * À placer en haut de l'arbre (dans page.tsx), au-dessus des sections.
 */
export default function CaseStudyProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<CaseStudy | null>(null);

  const open = useCallback((cs: CaseStudy) => setActive(cs), []);
  const close = useCallback(() => setActive(null), []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <CaseStudyContext.Provider value={value}>
      {children}
      <CaseStudyModal caseStudy={active} onClose={close} />
    </CaseStudyContext.Provider>
  );
}

/**
 * Hook pour accéder au contrôle du modal case study.
 * Doit être appelé depuis un composant client rendu à l'intérieur de <CaseStudyProvider>.
 */
export function useCaseStudy(): CaseStudyContextValue {
  const ctx = useContext(CaseStudyContext);
  if (!ctx) {
    throw new Error("useCaseStudy doit être utilisé à l'intérieur de <CaseStudyProvider>");
  }
  return ctx;
}
