"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import { useRef } from "react";
import { useI18n } from "@/i18n/provider";
import { experiences } from "@/data/experiences";
import { Badge, Section, SectionHeading, ease } from "@/components/ui/primitives";

export default function Experience() {
  const { m } = useI18n();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const e = m.experience;

  return (
    <Section id="experience" alt>
      <SectionHeading eyebrow={e.eyebrow} title={e.title} />

      <ol ref={ref} className="relative">
        {/* ligne de la timeline : tracé progressif au scroll */}
        <div className="absolute left-4 top-0 h-full w-px bg-line md:left-1/2" aria-hidden="true" />
        <motion.div
          style={{ scaleY }}
          className="absolute left-4 top-0 h-full w-px origin-top bg-accent md:left-1/2"
          aria-hidden="true"
        />

        {experiences.map((exp, i) => {
          const t = e.items[exp.id as keyof typeof e.items];
          const right = i % 2 === 1;
          return (
            <li key={exp.id} className="relative mb-10 last:mb-0 md:grid md:grid-cols-2 md:gap-14">
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="absolute left-4 top-7 z-10 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full border border-accent bg-bg text-accent md:left-1/2"
              >
                <Briefcase size={14} />
              </motion.span>

              <motion.article
                initial={{ opacity: 0, x: right ? 40 : -40, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease }}
                className={`ml-12 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/50 sm:p-6 md:ml-0 ${
                  right ? "md:col-start-2" : "md:col-start-1 md:row-start-1"
                }`}
              >
                <p className="font-mono text-xs text-accent">{t.period}</p>
                <h3 className="mt-2 text-xl font-semibold">{t.role}</h3>
                <p className="mt-1 flex flex-wrap items-center gap-x-3 text-sm text-muted">
                  <span className="font-medium text-fg">{t.company}</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={13} />
                    {t.place}
                  </span>
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{t.description}</p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {t.highlights.map((h) => (
                    <li key={h} className="rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
                      {h}
                    </li>
                  ))}
                </ul>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {exp.tech.map((tech, k) => (
                    <motion.li
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + k * 0.05 }}
                    >
                      <Badge>{tech}</Badge>
                    </motion.li>
                  ))}
                </ul>
              </motion.article>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
