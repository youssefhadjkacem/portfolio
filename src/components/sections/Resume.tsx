"use client";

import { motion } from "framer-motion";
import { Brain, Cloud, Download, FileText, LineChart, ShieldCheck, Star, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { useI18n, type Lang } from "@/i18n/provider";
import { resumeDomains, resumePath, type ResumeDomainId } from "@/data/resumes";
import type { Manifest } from "@/lib/manifest";
import { Reveal, Section, SectionHeading } from "@/components/ui/primitives";

const icons: Record<ResumeDomainId, LucideIcon> = { data: LineChart, ai: Brain, cloud: Cloud, fintech: ShieldCheck };
const langs: Lang[] = ["fr", "en"];

export default function Resume({ cv }: { cv: Manifest["cv"] }) {
  const { m, lang } = useI18n();
  // Par défaut, le CV suit la langue affichée du site ; un clic sur le sélecteur la remplace
  const [override, setOverride] = useState<Lang | null>(null);
  const cvLang = override ?? lang;
  const r = m.resume;

  const primary = resumeDomains.filter((d) => d.primary);
  const others = resumeDomains.filter((d) => !d.primary);

  return (
    <Section id="resume">
      <SectionHeading eyebrow={r.eyebrow} title={r.title} subtitle={r.subtitle} />

      <Reveal>
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <span className="text-sm text-muted">{r.language}</span>
          <div role="group" aria-label={r.language} className="relative flex rounded-full border border-line bg-surface p-1">
            {langs.map((l) => (
              <button
                key={l}
                onClick={() => setOverride(l)}
                aria-pressed={cvLang === l}
                className={`relative h-8 w-14 rounded-full font-mono text-xs font-semibold uppercase transition-colors ${
                  cvLang === l ? "text-on-accent" : "text-muted hover:text-fg"
                }`}
              >
                {cvLang === l && (
                  <motion.span
                    layoutId="cv-lang-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative">{l}</span>
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {/* CV principaux : Data Scientist & IA/ML */}
      <Reveal>
        <h3 className="mb-4 flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-accent">
          <Star size={14} fill="currentColor" />
          {r.primaryTitle}
        </h3>
      </Reveal>
      <div className="grid gap-5 md:grid-cols-2">
        {primary.map((d, i) => {
          const Icon = icons[d.id];
          const t = r.domains[d.id];
          const available = cv[`${d.slug}-${cvLang}`];
          const cls = "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition";
          return (
            <Reveal key={d.id} delay={i * 0.1}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-accent/50 bg-gradient-to-br from-accent/15 via-surface to-surface p-7 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10">
                <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-accent/20 text-accent transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  <Icon size={24} />
                </span>
                <h4 className="text-xl font-semibold">{t.name}</h4>
                <p className="mt-2 flex-1 leading-relaxed text-muted">{t.desc}</p>
                {available ? (
                  <a href={resumePath(d.slug, cvLang)} download className={`${cls} bg-accent text-on-accent hover:brightness-110`}>
                    <Download size={16} />
                    {r.download} · {cvLang.toUpperCase()}
                  </a>
                ) : (
                  <span aria-disabled="true" className={`${cls} cursor-not-allowed border border-line text-muted`}>
                    <FileText size={16} />
                    {r.unavailable}
                  </span>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* CV alternatifs : présentés en second plan, plus discrets */}
      <Reveal>
        <div className="mt-12 border-t border-line pt-8">
          <h3 className="font-mono text-sm uppercase tracking-widest text-muted">{r.otherTitle}</h3>
          <p className="mb-4 mt-1 text-sm text-muted">{r.otherHint}</p>
          <ul className="flex flex-col gap-3 sm:flex-row">
            {others.map((d) => {
              const Icon = icons[d.id];
              const available = cv[`${d.slug}-${cvLang}`];
              const inner = (
                <>
                  <Icon size={16} className="shrink-0 text-accent" />
                  <span className="flex-1 text-left">{r.domains[d.id].name}</span>
                  {available ? <Download size={15} /> : <span className="text-xs">{r.unavailable}</span>}
                </>
              );
              const base = "flex items-center gap-3 rounded-xl border border-line px-4 py-3 text-sm transition";
              return (
                <li key={d.id} className="sm:flex-1">
                  {available ? (
                    <a href={resumePath(d.slug, cvLang)} download className={`${base} bg-surface/50 text-muted hover:border-accent hover:text-fg`}>
                      {inner}
                    </a>
                  ) : (
                    <span aria-disabled="true" className={`${base} cursor-not-allowed text-muted/70`}>
                      {inner}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
