import type { ProjectMedia } from "@/lib/manifest";

/**
 * Visuel de repli ANIMÉ, utilisé quand un projet n'a ni cover, ni capture, ni démo.
 * Réseau dont les liens « transportent des données » (tirets qui défilent) et dont les nœuds pulsent.
 * Animations CSS (voir globals.css) : légères, coupées avec prefers-reduced-motion.
 */
export default function CoverFallback({ seed, label }: { seed: string; label: string }) {
  // Positions pseudo-aléatoires stables dérivées de l'id du projet
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const rnd = (n: number) => {
    h = (h * 1664525 + 1013904223) >>> 0;
    return ((h % 1000) / 1000) * n;
  };
  const pts = Array.from({ length: 14 }, () => ({ x: 8 + rnd(184), y: 8 + rnd(104), d: rnd(3) }));
  const links: [number, number][] = [];
  pts.forEach((a, i) =>
    pts.forEach((b, j) => {
      if (j > i && Math.hypot(a.x - b.x, a.y - b.y) < 55) links.push([i, j]);
    }),
  );

  return (
    <div role="img" aria-label={label} className="fb-bg relative h-full w-full overflow-hidden bg-gradient-to-br from-accent/25 via-surface2 to-surface">
      <div className="fb-glow absolute -left-1/4 top-0 h-full w-1/2 bg-accent/20 blur-3xl" aria-hidden="true" />
      <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full text-accent" aria-hidden="true">
        {links.map(([a, b], i) => (
          <line
            key={`${a}-${b}`}
            className="fb-line"
            style={{ animationDelay: `${(i % 5) * -1.2}s` }}
            x1={pts[a].x}
            y1={pts[a].y}
            x2={pts[b].x}
            y2={pts[b].y}
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="0.45"
          />
        ))}
        {pts.map((p, i) => (
          <circle key={i} className="fb-node" style={{ animationDelay: `${-p.d}s` }} cx={p.x} cy={p.y} r={1.5} fill="currentColor" />
        ))}
      </svg>
    </div>
  );
}

/**
 * Visuel principal d'un projet, par ordre de priorité :
 * cover/capture → image d'une démo (poster ou première image de la vidéo, GIF) → visuel animé de repli.
 */
export function CoverMedia({ media, title, seed, eager = false }: { media: ProjectMedia; title: string; seed: string; eager?: boolean }) {
  const cls = "h-full w-full object-cover";
  if (media.cover) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={media.cover} alt={title} loading={eager ? "eager" : "lazy"} decoding="async" className={cls} />;
  }
  const v = media.video;
  if (v?.kind === "video") {
    return v.poster ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={v.poster} alt={title} loading="lazy" decoding="async" className={cls} />
    ) : (
      <video src={`${v.src}#t=0.5`} muted playsInline preload="metadata" aria-label={title} className={cls} />
    );
  }
  if (v?.kind === "gif") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={v.poster ?? v.src} alt={title} loading="lazy" decoding="async" className={cls} />;
  }
  return <CoverFallback seed={seed} label={title} />;
}
