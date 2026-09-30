"use client";

import { ArrowUp } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { site } from "@/data/site";

export default function Footer() {
  const { m } = useI18n();
  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted sm:flex-row sm:px-6">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-accent">
          <ArrowUp size={14} />
          {m.footer.top}
        </a>
      </div>
    </footer>
  );
}
