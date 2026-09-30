"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";
import { useI18n } from "@/i18n/provider";
import { projects, tagIds, type TagId } from "@/data/projects";
import type { Manifest } from "@/lib/manifest";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectModal from "@/components/projects/ProjectModal";
import { Section, SectionHeading } from "@/components/ui/primitives";

export default function Projects({
  media,
  openId,
  setOpenId,
}: {
  media: Manifest["projects"];
  openId: string | null;
  setOpenId: (id: string | null) => void;
}) {
  const { m } = useI18n();
  const [filter, setFilter] = useState<TagId | "all">("all");
  const visible = projects.filter((p) => filter === "all" || p.tags.includes(filter));
  const open = projects.find((p) => p.id === openId);

  return (
    <Section id="projects">
      <SectionHeading eyebrow={m.projects.eyebrow} title={m.projects.title} subtitle={m.projects.subtitle} />

      <div role="group" aria-label={m.projects.filterLabel} className="mb-8 flex flex-wrap gap-2">
        {(["all", ...tagIds] as const).map((id) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            aria-pressed={filter === id}
            className={`relative rounded-full border px-4 py-2 text-sm transition-colors ${
              filter === id ? "border-transparent text-on-accent" : "border-line bg-surface text-muted hover:border-accent hover:text-fg"
            }`}
          >
            {filter === id && (
              <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 450, damping: 34 }} />
            )}
            <span className="relative">{id === "all" ? m.projects.all : m.projects.tags[id]}</span>
          </button>
        ))}
      </div>

      <LayoutGroup>
        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <ProjectCard key={p.id} project={p} media={media[p.id] ?? { images: [] }} onOpen={() => setOpenId(p.id)} />
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {open && <ProjectModal key={open.id} project={open} media={media[open.id] ?? { images: [] }} onClose={() => setOpenId(null)} />}
        </AnimatePresence>
      </LayoutGroup>
    </Section>
  );
}
