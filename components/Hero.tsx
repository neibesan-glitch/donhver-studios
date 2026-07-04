import { profile } from "@/lib/data";

export default function Hero() {
  const [line1, line2] = profile.heroHeadline;
  // Troisième ligne = "qui vendent." → "vendent." coloré en accent
  const accentWord = "vendent.";

  return (
    <section
      id="top"
      className="flex min-h-screen flex-col justify-between px-x pt-[120px] pb-10 sm:pt-[150px] sm:pb-[72px]"
    >
      {/* Ligne supérieure — labels */}
      <div className="flex flex-wrap items-start justify-between gap-6 border-t border-line pt-[18px]">
        <span className="kicker">STUDIO CRÉATIF · DIRECTION ARTISTIQUE</span>
        <span className="kicker">{profile.established}</span>
      </div>

      {/* Bloc central — titre + lead + CTAs + image */}
      <div className="mx-auto my-auto grid w-full grid-cols-1 items-end gap-6 md:grid-cols-[1.55fr_0.9fr] md:gap-8 lg:gap-14">
        <div>
          <h1 className="m-0 font-display text-[clamp(48px,9.2vw,158px)] uppercase leading-[0.9] tracking-[-0.01em] text-paper">
            {line1}
            <br />
            {line2}
            <br />
            qui <span className="text-accent">{accentWord}</span>
          </h1>
          <p className="mt-5 max-w-[520px] text-[clamp(15px,1.15vw,18px)] leading-relaxed text-cream sm:mt-8">
            {profile.heroLead}
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <a href="#travaux" className="btn-solid">
              VOIR LES TRAVAUX →
            </a>
            <a href="#contact" className="btn-outline">
              DÉMARRER UN PROJET
            </a>
          </div>
        </div>

        {/* Image portrait 2/3 */}
        <figure className="relative m-0 aspect-[2/3] overflow-hidden border border-line bg-surf">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.heroImage}
            alt="Affiche cinéma The Quiet Room"
            className="block h-full w-full object-cover"
          />
          <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/75 to-transparent px-4 py-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream">
            <span>{profile.heroCaption.label}</span>
            <span>{profile.heroCaption.index}</span>
          </figcaption>
        </figure>
      </div>

      {/* Ligne inférieure — labels */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4 text-[11px] font-medium uppercase tracking-kicker text-mute">
        <span>DÉFILER POUR EXPLORER ↓</span>
        <span>{profile.location}</span>
      </div>
    </section>
  );
}
