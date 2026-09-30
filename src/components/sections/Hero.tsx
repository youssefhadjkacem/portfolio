"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Download, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/provider";
import { site } from "@/data/site";
import HeroCanvas from "@/components/ui/HeroCanvas";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { ease } from "@/components/ui/primitives";

function AnimatedName({ text }: { text: string }) {
  const words = text.split(" ");
  let i = 0;
  return (
    <h1 aria-label={text} className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl">
      {words.map((word, wi) => (
        <span key={wi} aria-hidden="true" className="mr-[0.25em] inline-block whitespace-nowrap">
          {word.split("").map((ch) => {
            const idx = i++;
            return (
              <span key={idx} className="inline-block overflow-hidden align-bottom pb-[0.12em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%", rotate: 6 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.15 + idx * 0.035, ease }}
                >
                  {ch}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

function RoleRotator({ roles }: { roles: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % roles.length), 2800);
    return () => clearInterval(t);
  }, [roles.length]);

  return (
    <div className="relative h-8 overflow-hidden font-mono text-base text-accent sm:h-9 sm:text-xl" aria-live="off">
      <AnimatePresence mode="wait">
        <motion.p
          key={roles[i]}
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -28, opacity: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <span className="text-muted">{"> "}</span>
          {roles[i]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export default function Hero() {
  const { m } = useI18n();
  const reduce = useReducedMotion();

  // Halo qui suit lentement le curseur
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.35);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const left = useTransform(sx, (v) => `${v * 100}%`);
  const top = useTransform(sy, (v) => `${v * 100}%`);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  const socials = [
    { href: site.linkedin, label: "LinkedIn", icon: <LinkedinIcon className="h-5 w-5" /> },
    { href: site.github, label: "GitHub", icon: <GithubIcon className="h-5 w-5" /> },
    { href: `mailto:${site.email}`, label: "Email", icon: <Mail size={20} /> },
  ];

  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-hidden pt-24 pb-16">
      {/* Fond : dégradé + halo + réseau vivant */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(var(--accent-rgb)/0.14),transparent_60%)]" />
        <motion.div
          style={{ left, top }}
          className="absolute h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[110px]"
        />
        <div className="dot-grid absolute inset-0 opacity-60" />
      </div>
      <div className="absolute inset-0">
        <HeroCanvas />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-xs text-muted backdrop-blur sm:text-sm"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {m.hero.badge}
        </motion.p>

        <p className="mb-2 font-mono text-sm text-muted sm:text-base">{m.hero.hello}</p>
        <AnimatedName text={site.name} />

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9, ease }} className="mt-5">
          <p className="bg-gradient-to-r from-accent to-fg bg-clip-text text-2xl font-semibold text-transparent sm:text-4xl">{m.hero.title}</p>
          <div className="mt-3">
            <RoleRotator roles={m.hero.roles} />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05, ease }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {m.hero.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2, ease }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-on-accent shadow-lg shadow-accent/20 transition hover:-translate-y-0.5 hover:shadow-accent/40"
          >
            {m.hero.ctaContact}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#resume"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-6 py-3 text-sm font-semibold backdrop-blur transition hover:-translate-y-0.5 hover:border-accent"
          >
            <Download size={16} />
            {m.hero.ctaResume}
          </a>
          <div className="ml-1 flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/70 text-muted backdrop-blur transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label={m.a11y.scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 font-mono text-xs text-muted sm:flex"
      >
        {m.hero.scroll}
        <motion.span animate={reduce ? undefined : { y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ChevronDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  );
}
