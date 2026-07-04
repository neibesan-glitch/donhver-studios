import { profile } from "@/lib/data";

const LINKS = [
  { href: "#showreel", label: "VIDÉO" },
  { href: "#travaux", label: "VISUELS" },
  { href: "#services", label: "SERVICES" },
  { href: "#studio", label: "STUDIO" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-x py-[22px] mix-blend-difference">
      <a
        href="#top"
        className="flex items-center gap-2.5 font-display text-[19px] tracking-[0.06em] text-white no-underline"
      >
        <span className="inline-block h-[9px] w-[9px] rounded-full bg-accent mix-blend-normal" />
        DONHVER STUDIOS
      </a>
      <nav className="flex items-center gap-4 sm:gap-6 md:gap-[34px]">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-xs font-medium uppercase tracking-kicker text-white no-underline"
          >
            {l.label}
          </a>
        ))}
        <a
          href="#contact"
          className="rounded-full border border-white/50 px-4 py-2 text-xs font-medium uppercase tracking-kicker text-white no-underline transition-colors hover:bg-white/10"
        >
          CONTACT
        </a>
      </nav>
    </header>
  );
}
