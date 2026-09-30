"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { Reveal, Section, SectionHeading, ease } from "@/components/ui/primitives";

/** Photo dans une forme organique animée, liée au réseau du hero (nœuds + liens). */
function ProfilePhoto({ src, alt }: { src?: string; alt: string }) {
  const reduce = useReducedMotion();
  const morph = reduce
    ? undefined
    : { borderRadius: ["58% 42% 55% 45% / 45% 55% 45% 55%", "42% 58% 45% 55% / 55% 45% 58% 42%", "58% 42% 55% 45% / 45% 55% 45% 55%"] };

  return (
    <div className="relative mx-auto aspect-square w-64 sm:w-80">
      {/* anneau en pointillés qui tourne lentement */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute -inset-5 text-accent/50"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1.5 3" />
        <circle cx="50" cy="2" r="1.6" fill="currentColor" />
        <circle cx="92" cy="72" r="1.2" fill="currentColor" />
        <circle cx="10" cy="74" r="1.2" fill="currentColor" />
      </motion.svg>
      {/* halo */}
      <div className="absolute inset-4 rounded-full bg-accent/25 blur-3xl" aria-hidden="true" />
      {/* forme organique */}
      <motion.div
        animate={morph}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
        style={{ borderRadius: "58% 42% 55% 45% / 45% 55% 45% 55%" }}
        className="relative h-full w-full overflow-hidden border border-accent/40 bg-surface2 shadow-2xl shadow-accent/10"
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        ) : (
          <div role="img" aria-label={alt} className="grid h-full w-full place-items-center bg-gradient-to-br from-accent/30 via-surface2 to-surface">
            <span className="font-mono text-6xl font-semibold text-accent">YH</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function About({ profile }: { profile?: string }) {
  const { m } = useI18n();
  const a = m.about;

  return (
    <Section id="about">
      <SectionHeading eyebrow={a.eyebrow} title={a.title} />
      <div className="grid items-start gap-14 lg:grid-cols-[1fr_auto]">
        <div className="order-2 lg:order-1">
          <Reveal>
            <div className="space-y-4 text-base leading-relaxed text-muted sm:text-lg">
              <p>{a.p1}</p>
              <p>{a.p2}</p>
              <p>{a.p3}</p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <Reveal>
                <h3 className="mb-4 flex items-center gap-2 font-semibold">
                  <GraduationCap size={18} className="text-accent" />
                  {a.educationTitle}
                </h3>
              </Reveal>
              <ol className="space-y-4 border-l border-line pl-5">
                {a.education.map((e, i) => (
                  <Reveal key={e.school} delay={i * 0.1}>
                    <li className="relative">
                      <span className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-bg" />
                      <p className="font-mono text-xs text-accent">{e.period}</p>
                      <p className="font-medium">{e.school}</p>
                      <p className="text-sm text-muted">
                        {e.detail} · {e.place}
                      </p>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>

            <div>
              <Reveal>
                <h3 className="mb-4 font-semibold">{a.languagesTitle}</h3>
              </Reveal>
              <ul className="space-y-4">
                {a.languages.map((l, i) => (
                  <li key={l.name}>
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span>{l.name}</span>
                      <span className="font-mono text-muted">{l.level}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-surface2">
                      <motion.div
                        className="h-full rounded-full bg-accent"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${l.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + i * 0.12, ease }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Reveal x={30} y={0} className="order-1 lg:order-2">
          <ProfilePhoto src={profile} alt={a.photoAlt} />
        </Reveal>
      </div>
    </Section>
  );
}
