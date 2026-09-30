// Fichiers attendus : public/cv/<slug>-<fr|en>.pdf
export const resumeDomains = [
  { id: "data", slug: "data-scientist", primary: true },
  { id: "ai", slug: "ia-ml", primary: true },
  { id: "cloud", slug: "cloud-backend", primary: false },
  { id: "fintech", slug: "fintech-backend", primary: false },
] as const;

export type ResumeDomainId = (typeof resumeDomains)[number]["id"];
export type Lang = "fr" | "en";
export const resumePath = (slug: string, lang: Lang) => `/cv/${slug}-${lang}.pdf`;
