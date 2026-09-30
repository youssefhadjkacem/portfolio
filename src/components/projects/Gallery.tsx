"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useI18n } from "@/i18n/provider";

export function Lightbox({
  images,
  index,
  setIndex,
  onClose,
  alt,
}: {
  images: string[];
  index: number;
  setIndex: (i: number) => void;
  onClose: () => void;
  alt: (i: number) => string;
}) {
  const { m } = useI18n();
  const n = images.length;
  const go = useCallback((d: number) => setIndex((index + d + n) % n), [index, n, setIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={alt(index)}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button onClick={onClose} aria-label={m.a11y.close} className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
        <X size={20} />
      </button>
      {n > 1 && (
        <>
          <button
            onClick={(e) => (e.stopPropagation(), go(-1))}
            aria-label={m.a11y.prev}
            className="absolute left-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={(e) => (e.stopPropagation(), go(1))}
            aria-label={m.a11y.next}
            className="absolute right-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={alt(index)}
          onClick={(e) => e.stopPropagation()}
          className="max-h-[88vh] max-w-full rounded-lg object-contain shadow-2xl"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.25 }}
          drag={n > 1 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.4}
          onDragEnd={(_, info) => {
            if (info.offset.x < -70) go(1);
            else if (info.offset.x > 70) go(-1);
          }}
        />
      </AnimatePresence>
      <p className="absolute bottom-4 font-mono text-sm text-white/70">
        {index + 1} / {n}
      </p>
    </motion.div>
  );
}

/** Carrousel de captures + lightbox au clic. */
export default function Gallery({
  images,
  title,
  onLightboxChange,
}: {
  images: string[];
  title: string;
  onLightboxChange?: (open: boolean) => void;
}) {
  const { m } = useI18n();
  const [index, setIndex] = useState(0);
  const [lb, setLb] = useState(false);
  const n = images.length;
  const alt = (i: number) => `${title} — ${m.projects.imageOf.replace("{n}", String(i + 1)).replace("{total}", String(n))}`;

  useEffect(() => onLightboxChange?.(lb), [lb, onLightboxChange]);
  if (n === 0) return null;

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl border border-line bg-surface2">
        <AnimatePresence mode="wait" initial={false}>
          <motion.button
            key={images[index]}
            type="button"
            onClick={() => setLb(true)}
            aria-label={m.a11y.openImage}
            className="group relative block aspect-video w-full cursor-zoom-in"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[index]} alt={alt(index)} loading="lazy" decoding="async" className="h-full w-full object-cover" />
            <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100">
              <Maximize2 size={16} />
            </span>
          </motion.button>
        </AnimatePresence>
        {n > 1 && (
          <>
            <button
              onClick={() => setIndex((index - 1 + n) % n)}
              aria-label={m.a11y.prev}
              className="absolute left-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white hover:bg-black/70"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setIndex((index + 1) % n)}
              aria-label={m.a11y.next}
              className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white hover:bg-black/70"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {n > 1 && (
        <ul className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <li key={src} className="shrink-0">
              <button
                onClick={() => setIndex(i)}
                aria-label={alt(i)}
                aria-current={i === index}
                className={`block h-14 w-24 overflow-hidden rounded-lg border-2 transition ${i === index ? "border-accent" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <AnimatePresence>{lb && <Lightbox images={images} index={index} setIndex={setIndex} onClose={() => setLb(false)} alt={alt} />}</AnimatePresence>
    </div>
  );
}
