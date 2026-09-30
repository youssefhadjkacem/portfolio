// Types du "manifeste" de médias, généré au build par scan-media.ts (aucune config à maintenir).
export interface ProjectMedia {
  cover?: string;
  images: string[];
  video?: { src: string; kind: "video" | "gif"; poster?: string };
}

export interface Manifest {
  projects: Record<string, ProjectMedia>;
  profile?: string;
  /** Photos de la section Hackathons & International : clé = nom du dossier dans public/media/ */
  photos: Record<string, string>;
  /** Photos de public/media/autres-hackathons/ (01.jpg, 02.jpg…), dans l'ordre */
  otherHackathons: string[];
  /** clé = "<slug>-<lang>" (ex. "ia-ml-fr"), true si le PDF existe dans public/cv/ */
  cv: Record<string, boolean>;
}
