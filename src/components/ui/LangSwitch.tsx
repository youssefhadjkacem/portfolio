"use client";

import { motion } from "framer-motion";
import { useI18n, type Lang } from "@/i18n/provider";

const langs: Lang[] = ["fr", "en"];

export default function LangSwitch({ layoutKey = "lang" }: { layoutKey?: string }) {
  const { lang, setLang, m } = useI18n();
  return (
    <div role="group" aria-label={m.a11y.language} className="relative flex h-10 items-center rounded-full border border-line bg-surface/70 p-1">
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`relative z-10 h-8 w-10 rounded-full font-mono text-xs font-semibold uppercase transition-colors ${
            lang === l ? "text-on-accent" : "text-muted hover:text-fg"
          }`}
        >
          {lang === l && (
            <motion.span
              layoutId={`${layoutKey}-pill`}
              className="absolute inset-0 -z-10 rounded-full bg-accent"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
          {l}
        </button>
      ))}
    </div>
  );
}
