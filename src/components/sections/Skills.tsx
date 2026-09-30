"use client";

import { motion } from "framer-motion";
import { Brain, Cloud, Code, Database, LineChart, Server, ShieldCheck, Wrench, type LucideIcon } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { coreSkillIds, skills, type SkillCategoryId } from "@/data/skills";
import { Reveal, Section, SectionHeading } from "@/components/ui/primitives";

const icons: Record<SkillCategoryId, LucideIcon> = {
  languages: Code,
  data: LineChart,
  ai: Brain,
  backend: Server,
  databases: Database,
  cloud: Cloud,
  security: ShieldCheck,
  tools: Wrench,
};

function Card({ cat, index, core }: { cat: (typeof skills)[number]; index: number; core: boolean }) {
  const { m } = useI18n();
  const Icon = icons[cat.id];
  return (
    <Reveal delay={(index % 3) * 0.08}>
      <div
        className={`h-full rounded-2xl border p-5 transition-colors hover:border-accent/50 sm:p-6 ${
          core ? "border-accent/30 bg-surface" : "border-line bg-surface/60"
        }`}
      >
        <h3 className={`mb-4 flex items-center gap-2.5 font-semibold ${core ? "" : "text-sm"}`}>
          <span className={`grid place-items-center rounded-lg bg-accent/15 text-accent ${core ? "h-9 w-9" : "h-8 w-8"}`}>
            <Icon size={core ? 18 : 16} />
          </span>
          {m.skills.categories[cat.id]}
        </h3>
        <ul className="flex flex-wrap gap-2">
          {cat.items.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, scale: 0.7, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 + i * 0.045 }}
              whileHover={{ y: -3, scale: 1.05 }}
              className={`cursor-default rounded-full border border-line bg-surface2 font-mono hover:border-accent hover:text-accent ${
                core ? "px-3 py-1.5 text-xs text-fg/90" : "px-2.5 py-1 text-[11px] text-muted"
              }`}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export default function Skills() {
  const { m } = useI18n();
  const core = skills.filter((s) => coreSkillIds.includes(s.id));
  const rest = skills.filter((s) => !coreSkillIds.includes(s.id));

  return (
    <Section id="skills">
      <SectionHeading eyebrow={m.skills.eyebrow} title={m.skills.title} />

      <Reveal>
        <h3 className="mb-5 font-mono text-sm uppercase tracking-widest text-accent">{m.skills.coreTitle}</h3>
      </Reveal>
      <div className="grid gap-5 md:grid-cols-3">
        {core.map((cat, i) => (
          <Card key={cat.id} cat={cat} index={i} core />
        ))}
      </div>

      <Reveal>
        <h3 className="mb-5 mt-12 font-mono text-sm uppercase tracking-widest text-muted">{m.skills.complementTitle}</h3>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((cat, i) => (
          <Card key={cat.id} cat={cat} index={i} core={false} />
        ))}
      </div>
    </Section>
  );
}
