"use client";

import { Award, Cpu, FolderGit2, Globe } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { projects } from "@/data/projects";
import { technologyCount } from "@/data/skills";
import { Counter, Reveal, Section } from "@/components/ui/primitives";

export default function Stats() {
  const { m } = useI18n();
  const items = [
    { icon: FolderGit2, value: projects.length, label: m.stats.projects },
    { icon: Award, value: 1, label: m.stats.hackathons },
    { icon: Cpu, value: technologyCount, suffix: "+", label: m.stats.technologies },
    { icon: Globe, value: 3, label: m.stats.countries, hint: m.stats.countriesHint },
  ];

  return (
    <Section id="stats" alt>
      <h2 className="sr-only">{m.stats.title}</h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {items.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="group h-full rounded-2xl border border-line bg-surface p-5 transition duration-300 hover:-translate-y-1 hover:border-accent/60 sm:p-6">
              <s.icon size={22} className="mb-4 text-accent transition-transform duration-300 group-hover:scale-110" />
              <p className="text-4xl font-semibold tracking-tight sm:text-5xl">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted">{s.label}</p>
              {s.hint && <p className="mt-1 font-mono text-xs text-accent">{s.hint}</p>}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
