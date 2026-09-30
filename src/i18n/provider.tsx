"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import fr from "./fr.json";
import en from "./en.json";

export type Lang = "fr" | "en";
export type Messages = typeof fr;

// Vérifie à la compilation que en.json a exactement la même structure que fr.json
const messages: Record<Lang, Messages> = { fr, en };

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  m: Messages;
}

const I18nContext = createContext<I18nValue>({ lang: "fr", setLang: () => {}, m: fr });

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");
  const [ready, setReady] = useState(false);

  // Détection : choix mémorisé > langue du navigateur > français
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("lang");
    } catch {}
    const detected: Lang = stored === "fr" || stored === "en" ? stored : navigator.language?.toLowerCase().startsWith("fr") ? "fr" : "en";
    setLangState(detected);
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = messages[lang].meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", messages[lang].meta.description);
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
  }, []);

  const value = useMemo(() => ({ lang, setLang, m: messages[lang] }), [lang, setLang]);

  // Évite le flash de la mauvaise langue au premier affichage
  return (
    <I18nContext.Provider value={value}>
      <div style={{ opacity: ready ? 1 : 0, transition: "opacity .25s ease" }}>{children}</div>
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
