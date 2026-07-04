import Reveal from "@/components/ui/Reveal";
import { profile } from "@/lib/data";

export default function About() {
  return (
    <section id="studio" className="px-x border-t border-line py-16 sm:py-20 lg:py-[120px]">
      <div className="grid grid-cols-1 items-center gap-7 sm:gap-9 lg:grid-cols-2 lg:gap-[72px]">
        <Reveal>
          <figure className="m-0 aspect-[4/5] overflow-hidden border border-line bg-surf">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.aboutImage}
              alt="Mockups produits Mocha Mood"
              className="block h-full w-full object-cover"
            />
          </figure>
        </Reveal>

        <Reveal>
          <span className="kicker text-accent">{profile.studioEyebrow}</span>
          <p className="m-0 mt-[18px] font-display text-[clamp(24px,3vw,46px)] uppercase leading-[1.02] text-paper">
            {profile.studioStatement}
          </p>
          <p className="mt-6 max-w-[520px] text-[clamp(15px,1.1vw,17px)] leading-relaxed text-cream">
            {profile.studioBody}
          </p>
          <p className="mt-4 max-w-[520px] text-sm leading-relaxed text-mute">
            {profile.studioBody2}
          </p>

          <div className="mt-[34px] flex flex-wrap gap-10">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-kicker text-mute">
                APPROCHE
              </div>
              <div className="mt-1.5 text-[15px] text-paper">
                Éditoriale · cinématographique
              </div>
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-kicker text-mute">
                DISPONIBILITÉ
              </div>
              <div className="mt-1.5 text-[15px] text-paper">
                Ouvert aux collaborations
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
