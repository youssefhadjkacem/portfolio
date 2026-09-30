"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Play, Trophy } from "lucide-react";
import { useRef, useState } from "react";
import { useI18n } from "@/i18n/provider";
import type { Project } from "@/data/projects";
import type { ProjectMedia } from "@/lib/manifest";
import { CoverMedia } from "./Cover";

export default function ProjectCard({
  project,
  media,
  onOpen,
}: {
  project: Project;
  media: ProjectMedia;
  onOpen: () => void;
}) {
  const { m } = useI18n();
  const t = m.projects.items[project.id as keyof typeof m.projects.items];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hover, setHover] = useState(false);
  const demo = media.video;

  const enter = () => {
    setHover(true);
    videoRef.current?.play().catch(() => {});
  };
  const leave = () => {
    setHover(false);
    videoRef.current?.pause();
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <button
        type="button"
        onClick={onOpen}
        onMouseEnter={enter}
        onMouseLeave={leave}
        onFocus={enter}
        onBlur={leave}
        className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-surface text-left transition duration-300 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-2xl hover:shadow-accent/10"
      >
        <div className="relative aspect-video overflow-hidden bg-surface2">
          <motion.div layoutId={`cover-${project.id}`} className="absolute inset-0">
            <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.07]">
              <CoverMedia media={media} title={t.title} seed={project.id} />
            </div>
          </motion.div>

          {/* démo : lecture au survol (vidéo) ou GIF chargé au survol */}
          {demo && demo.kind === "video" && (
            <video
              ref={videoRef}
              src={demo.src}
              poster={demo.poster}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${hover ? "opacity-100" : "opacity-0"}`}
            />
          )}
          {demo && demo.kind === "gif" && hover && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={demo.src} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
          )}

          {/* overlay technologies (visible au survol / focus) */}
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            <ul className="flex flex-wrap gap-1.5 translate-y-3 transition-transform duration-300 group-hover:translate-y-0">
              {project.tech.map((tech) => (
                <li key={tech} className="rounded-full bg-white/15 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur">
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {project.internship && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-on-accent shadow">
                {m.projects.internship} · {project.internship}
              </span>
            )}
            {project.award && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-semibold text-black">
                <Trophy size={12} />
                {m.projects.award}
              </span>
            )}
          </div>
          {demo && (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white backdrop-blur">
              <Play size={11} fill="currentColor" />
              {m.projects.demo}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold leading-snug">{t.title}</h3>
            <ArrowUpRight size={18} className="mt-1 shrink-0 text-muted transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
          </div>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{t.tagline}</p>
          {/* sur mobile (pas de survol) : technos toujours visibles */}
          <ul className="mt-4 flex flex-wrap gap-1.5 lg:hidden">
            {project.tech.slice(0, 4).map((tech) => (
              <li key={tech} className="rounded-full border border-line bg-surface2 px-2 py-0.5 font-mono text-[11px] text-muted">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </button>
    </motion.article>
  );
}
