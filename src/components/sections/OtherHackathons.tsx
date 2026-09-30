"use client";

import { AnimatePresence } from "framer-motion";
import { Images } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/i18n/provider";
import { Lightbox } from "@/components/projects/Gallery";
import TiltPhoto from "@/components/ui/TiltPhoto";
import { Reveal } from "@/components/ui/primitives";

/**
 * Photos de public/media/autres-hackathons/ (01.jpg, 02.jpg, 03.jpg…).
 * Générique : 1 à 3 photos = une rangée de cartes égales ; 4 = grille 2×2 / 4 colonnes ; 5-6 = 3 colonnes ; 7+ = 4 colonnes.
 * Rien n'est rendu s'il n'y a pas de photo.
 */
export default function OtherHackathons({ images }: { images: string[] }) {
  const { m } = useI18n();
  const h = m.hackathons;
  const [open, setOpen] = useState<number | null>(null);
  const n = images.length;
  if (n === 0) return null;

  const alt = (i: number) => h.othersPhotoAlt.replace("{n}", String(i + 1)).replace("{total}", String(n));
  // ≤ 3 photos : autant de colonnes que de photos (cartes égales) ; sinon grille auto-adaptative
  const cols = n === 1 ? "sm:grid-cols-1 max-w-xl" : n === 2 ? "sm:grid-cols-2 max-w-3xl" : n === 3 ? "sm:grid-cols-3" : n === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : n <= 6 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div>
      <Reveal>
        <h3 className="mb-5 mt-14 flex items-center gap-2 text-xl font-semibold">
          <Images size={20} className="text-accent" />
          {h.othersTitle}
        </h3>
      </Reveal>
      <ul className={`grid grid-cols-1 gap-6 ${cols}`}>
        {images.map((src, i) => (
          <li key={src}>
            <TiltPhoto src={src} alt={alt(i)} delay={i * 0.18} openLabel={`${m.a11y.openImage} — ${alt(i)}`} onOpen={() => setOpen(i)} />
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {open !== null && <Lightbox images={images} index={open} setIndex={setOpen} onClose={() => setOpen(null)} alt={alt} />}
      </AnimatePresence>
    </div>
  );
}

