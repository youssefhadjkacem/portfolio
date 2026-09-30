import fs from "node:fs";
import path from "node:path";
import { projects } from "@/data/projects";
import { resumeDomains } from "@/data/resumes";
import type { Manifest, ProjectMedia } from "./manifest";

const PUBLIC = path.join(process.cwd(), "public");

// Dossiers des photos uniques (une seule photo.jpg par entrée) de la section Hackathons & International
const PHOTO_IDS = ["hackathon-accede", "aiesec-turquie", "eje-relations-internationales"];

function list(dir: string): string[] {
  try {
    return fs.readdirSync(dir);
  } catch {
    return [];
  }
}

/** Détecte au build les fichiers déposés dans public/media/<projet>/, public/profile.* et public/cv/. */
export function scanMedia(): Manifest {
  const manifest: Manifest = { projects: {}, cv: {}, photos: {}, otherHackathons: [] };

  for (const p of projects) {
    const files = list(path.join(PUBLIC, "media", p.id));
    const url = (f: string) => `/media/${p.id}/${f}`;
    const images = files
      .filter((f) => /^\d+\.(jpe?g|png|webp|avif)$/i.test(f))
      .sort((a, b) => parseInt(a) - parseInt(b))
      .map(url);
    const coverFile = files.find((f) => /^cover\.(jpe?g|png|webp|avif)$/i.test(f));
    const posterFile = files.find((f) => /^poster\.(jpe?g|png|webp|avif)$/i.test(f));
    const videoFile = files.find((f) => /^demo\.(mp4|webm)$/i.test(f));
    const gifFile = files.find((f) => /^demo\.gif$/i.test(f));

    const media: ProjectMedia = { images };
    media.cover = coverFile ? url(coverFile) : images[0];
    if (videoFile) media.video = { src: url(videoFile), kind: "video", poster: posterFile && url(posterFile) };
    else if (gifFile) media.video = { src: url(gifFile), kind: "gif", poster: posterFile && url(posterFile) };
    manifest.projects[p.id] = media;
  }

  for (const id of PHOTO_IDS) {
    const files = list(path.join(PUBLIC, "media", id)).filter((n) => /\.(jpe?g|png|webp|avif)$/i.test(n));
    // `photo.*` en priorité ; sinon la première image du dossier (tolère un nom de fichier différent)
    const f = files.find((n) => /^photo\./i.test(n)) ?? files.sort()[0];
    if (f) manifest.photos[id] = `/media/${id}/${f}`;
  }

  manifest.otherHackathons = list(path.join(PUBLIC, "media", "autres-hackathons"))
    .filter((f) => /^\d+\.(jpe?g|png|webp|avif)$/i.test(f))
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map((f) => `/media/autres-hackathons/${f}`);

  const profile = list(PUBLIC).find((f) => /^profile\.(jpe?g|png|webp|avif)$/i.test(f));
  if (profile) manifest.profile = `/${profile}`;

  const cvFiles = new Set(list(path.join(PUBLIC, "cv")));
  for (const d of resumeDomains) {
    for (const l of ["fr", "en"]) manifest.cv[`${d.slug}-${l}`] = cvFiles.has(`${d.slug}-${l}.pdf`);
  }
  return manifest;
}
