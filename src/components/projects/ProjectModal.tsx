"use client";

import { motion } from "framer-motion";
import { ExternalLink, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/provider";
import type { Project } from "@/data/projects";
import type { ProjectMedia } from "@/lib/manifest";
import { GithubIcon } from "@/components/ui/Icons";
import { Badge } from "@/components/ui/primitives";
import { CoverMedia } from "./Cover";
import Gallery from "./Gallery";

export default function ProjectModal({
  project,
  media,
  onClose,
}: {
  project: Project;
  media: ProjectMedia;
  onClose: () => void;
}) {
  const { m } = useI18n();
  const t = m.projects.items[project.id as keyof typeof m.projects.items];
  const closeRef = useRef<HTMLButtonElement>(null);
  const [lbOpen, setLbOpen] = useState(false);
  const demo = media.video;

  // Échap ferme (sauf si la lightbox est ouverte), blocage du scroll, focus géré
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && !lbOpen && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus?.();
    };
  }, [onClose, lbOpen]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center overflow-y-auto bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={t.title}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="relative my-auto max-h-[100svh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border border-line bg-bg shadow-2xl sm:max-h-[92vh] sm:rounded-3xl"
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label={m.a11y.close}
          className="sticky right-3 top-3 z-20 float-right mr-3 mt-3 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/80"
        >
          <X size={18} />
        </button>

        {/* Démo (vidéo / GIF) sinon visuel de couverture */}
        <motion.div layoutId={`cover-${project.id}`} className="relative aspect-video w-full overflow-hidden bg-surface2">
          {demo?.kind === "video" ? (
            <video src={demo.src} poster={demo.poster ?? media.cover} controls playsInline preload="metadata" className="h-full w-full bg-black object-contain">
              {m.projects.demoVideo}
            </video>
          ) : demo?.kind === "gif" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={demo.src} alt={`${t.title} — ${m.projects.demoVideo}`} className="h-full w-full object-contain bg-black" />
          ) : (
            <CoverMedia media={media} title={t.title} seed={project.id} eager />
          )}
        </motion.div>

        <div className="p-5 sm:p-8">
          {demo && (
            <p className="mb-3 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-accent">
              <Play size={12} fill="currentColor" />
              {m.projects.demoVideo}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-2xl font-semibold sm:text-3xl">{t.title}</h3>
            {project.internship && (
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-on-accent">
                {m.projects.internship} · {project.internship}
              </span>
            )}
            {project.award && <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-black">🏆 {m.projects.award}</span>}
          </div>
          <p className="mt-1 text-muted">{t.tagline}</p>
          <p className="mt-5 leading-relaxed">{t.description}</p>

          <h4 className="mb-3 mt-7 font-mono text-xs uppercase tracking-widest text-accent">{m.projects.technologies}</h4>
          <ul className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li key={tech}>
                <Badge>{tech}</Badge>
              </li>
            ))}
          </ul>

          {(project.githubUrl || project.liveUrl) && (
            <div className="mt-7 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition hover:-translate-y-0.5"
                >
                  <ExternalLink size={16} />
                  {m.projects.live}
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-accent"
                >
                  <GithubIcon className="h-4 w-4" />
                  {m.projects.github}
                </a>
              )}
            </div>
          )}

          {media.images.length > 0 && (
            <>
              <h4 className="mb-3 mt-8 font-mono text-xs uppercase tracking-widest text-accent">{m.projects.gallery}</h4>
              <Gallery images={media.images} title={t.title} onLightboxChange={setLbOpen} />
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
