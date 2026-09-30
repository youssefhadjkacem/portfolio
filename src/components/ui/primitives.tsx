"use client";

import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Apparition au scroll (fade + slide). */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  x = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.65, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Compteur animé (0 → to) déclenché à l'apparition. */
export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) return setVal(to);
    const c = animate(0, to, { duration: 1.6, ease, onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref} aria-label={`${to}${suffix}`}>
      <span aria-hidden="true">
        {val}
        {suffix}
      </span>
    </span>
  );
}

export function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-line bg-surface2 px-2.5 py-1 font-mono text-xs text-fg/90 ${className}`}
    >
      {children}
    </span>
  );
}

export function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-12 max-w-2xl">
      <Reveal>
        <p className="mb-3 font-mono text-sm uppercase tracking-widest text-accent">{eyebrow}</p>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        <motion.div
          className="mt-4 h-1 w-16 origin-left rounded-full bg-accent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        />
        {subtitle && <p className="mt-5 text-lg leading-relaxed text-muted">{subtitle}</p>}
      </Reveal>
    </div>
  );
}

export function Section({
  id,
  alt,
  children,
}: {
  id: string;
  alt?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`relative py-20 sm:py-28 ${alt ? "section-alt" : ""}`}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}
