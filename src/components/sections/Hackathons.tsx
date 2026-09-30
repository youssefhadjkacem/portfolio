"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Globe, Trophy, Users } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import type { Manifest } from "@/lib/manifest";
import TiltPhoto from "@/components/ui/TiltPhoto";
import OtherHackathons from "./OtherHackathons";
import { Badge, Reveal, Section, SectionHeading } from "@/components/ui/primitives";

export default function Hackathons({
  photos,
  others,
  onOpenProject,
}: {
  photos: Manifest["photos"];
  others: Manifest["otherHackathons"];
  onOpenProject: (id: string) => void;
}) {
  const { m } = useI18n();
  const h = m.hackathons;
  const reduce = useReducedMotion();
  const winPhoto = photos["hackathon-accede"];

  return (
    <Section id="hackathons" alt>
      <SectionHeading eyebrow={h.eyebrow} title={h.title} />

      {/* Victoire ACCEDE */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/15 via-surface to-surface p-6 sm:p-10">
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
          <div className={`relative grid items-center gap-8 ${winPhoto ? "md:grid-cols-[1.1fr_1fr]" : "md:grid-cols-[auto_1fr]"}`}>
            {!winPhoto && (
              <motion.div
                animate={reduce ? undefined : { y: [0, -8, 0], rotate: [0, -3, 3, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="relative mx-auto grid h-28 w-28 place-items-center rounded-full border border-accent/50 bg-accent/15 text-accent sm:h-36 sm:w-36"
              >
                <span className="absolute inset-0 animate-ping rounded-full border border-accent/30" style={{ animationDuration: "3s" }} />
                <Trophy className="h-12 w-12 sm:h-16 sm:w-16" />
              </motion.div>
            )}
            <div>
              {winPhoto && (
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-accent/50 bg-accent/15 text-accent">
                  <Trophy size={22} />
                </span>
              )}
              <p className="font-mono text-sm uppercase tracking-widest text-accent">{h.winSubtitle}</p>
              <h3 className="mt-2 text-2xl font-semibold sm:text-4xl">{h.winTitle}</h3>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted">{h.winText}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {h.winFacts.map((f) => (
                  <li key={f}>
                    <Badge>{f}</Badge>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onOpenProject("financial-inclusion")}
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition hover:-translate-y-0.5"
              >
                {h.winCta}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            {winPhoto && <TiltPhoto src={winPhoto} alt={h.winPhotoAlt} className="order-first md:order-none" />}
          </div>
        </div>
      </Reveal>

      {/* International & leadership */}
      <Reveal>
        <h3 className="mb-5 mt-14 flex items-center gap-2 text-xl font-semibold">
          <Globe size={20} className="text-accent" />
          {h.international}
        </h3>
      </Reveal>
      <div className="grid gap-5 md:grid-cols-3">
        {h.items.map((it, i) => {
          const photo = photos[it.id];
          return (
            <Reveal key={it.id} delay={i * 0.1} className="h-full">
              <div className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition duration-300 hover:border-accent/60 sm:p-6">
                {photo && <TiltPhoto src={photo} alt={it.photoAlt} className="mb-5" delay={0.2 + i * 0.25} />}
                <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
                  {it.kind === "leadership" ? <Users size={13} /> : <Globe size={13} />}
                  {h.kinds[it.kind as keyof typeof h.kinds]}
                </span>
                <h4 className="text-lg font-semibold">{it.role}</h4>
                <p className="mt-1 font-medium text-fg/90">{it.org}</p>
                <p className="mt-1 text-sm text-muted">{it.place}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <OtherHackathons images={others} />
    </Section>
  );
}
