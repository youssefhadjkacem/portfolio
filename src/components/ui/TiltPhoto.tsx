"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Photo avec effet tilt 3D selon la position du curseur, lueur indigo et ombre qui suivent la souris.
 * Uniquement pour un pointeur « souris » : sur mobile / tactile (ou reduced-motion) la photo reste
 * statique, avec une ombre douce par défaut, sans effet figé ni cassé.
 */
export default function TiltPhoto({
  src,
  alt,
  className = "",
  delay = 0,
  onOpen,
  openLabel,
}: {
  src: string;
  alt: string;
  className?: string;
  /** Décalage (s) de l'animation d'entrée / de lévitation, pour échelonner plusieurs photos. */
  delay?: number;
  /** Si fourni, la photo est cliquable (ex. ouverture d'une lightbox). */
  onOpen?: () => void;
  openLabel?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const hover = useMotionValue(0);
  const spring = { stiffness: 220, damping: 22, mass: 0.6 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  const sh = useSpring(hover, { stiffness: 200, damping: 26 });

  const rotateY = useTransform(sx, [0, 1], [-10, 10]);
  const rotateX = useTransform(sy, [0, 1], [10, -10]);
  const gx = useTransform(sx, (v) => v * 100);
  const gy = useTransform(sy, (v) => v * 100);
  const glow = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgb(var(--accent-rgb) / 0.38), transparent 60%)`;
  // l'ombre se décale à l'opposé du curseur
  const ox = useTransform(sx, [0, 1], [22, -22]);
  const oy = useTransform(sy, [0, 1], [30, 14]);
  const shadow = useMotionTemplate`${ox}px ${oy}px 44px -12px rgb(var(--accent-rgb) / 0.45)`;
  const scale = useTransform(sh, [0, 1], [1, 1.03]);

  const active = (e: React.PointerEvent) => e.pointerType === "mouse" && !reduce;

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!active(e) || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }

  return (
    // Entrée : la photo « atterrit » (léger roulis + zoom) quand elle apparaît au scroll
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 44, scale: 0.9, rotate: delay % 2 ? 3 : -3 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 110, damping: 16, delay }}
    >
      {/* Repos : lévitation douce en boucle (désynchronisée d'une photo à l'autre), coupée si reduced-motion */}
      <motion.div
        animate={reduce ? undefined : { y: [0, -7, 0] }}
        transition={{ repeat: Infinity, duration: 5.5 + (delay % 1.5), ease: "easeInOut", delay: delay * 0.7 }}
      >
        <motion.div
          ref={ref}
          onPointerMove={onMove}
          {...(onOpen
            ? {
                role: "button",
                tabIndex: 0,
                "aria-label": openLabel ?? alt,
                onClick: onOpen,
                onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onOpen()),
              }
            : {})}
          onPointerEnter={(e) => active(e) && hover.set(1)}
          onPointerLeave={() => {
            px.set(0.5);
            py.set(0.5);
            hover.set(0);
          }}
          style={{ rotateX, rotateY, scale, boxShadow: shadow, transformPerspective: 900 }}
          // ombre douce par défaut (mobile / repos) ; la version dynamique prend le relais au survol
          className={`${onOpen ? "cursor-zoom-in " : ""}relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl shadow-accent/10`}
        >
          {/* Anneau lumineux indigo qui tourne en continu autour de la photo */}
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-2xl bg-accent/30">
            <div className="photo-ring absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,rgb(var(--accent-rgb)/0.95)_60deg,transparent_140deg,transparent_220deg,rgb(var(--accent-rgb)/0.6)_290deg,transparent_360deg)]" />
          </div>
          <div className="absolute inset-[2px] overflow-hidden rounded-[14px] bg-surface2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} loading="lazy" decoding="async" draggable={false} className="h-full w-full object-cover" />
            {/* Reflet qui balaie la photo régulièrement */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="photo-shine absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            </div>
            <motion.div aria-hidden="true" style={{ background: glow, opacity: sh }} className="pointer-events-none absolute inset-0 mix-blend-soft-light" />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
