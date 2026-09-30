"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, LoaderCircle, Mail, Phone, Send, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/i18n/provider";
import { site } from "@/data/site";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Reveal, Section, SectionHeading } from "@/components/ui/primitives";

type Status = "idle" | "sending" | "success" | "error";

const field =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-base outline-none transition placeholder:text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/30";

export default function Contact() {
  const { m } = useI18n();
  const c = m.contact;
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Sans ID Formspree configuré : repli propre vers le client mail
    if (!site.formspreeId) {
      const body = `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(c.subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error();
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const links = [
    { icon: <Mail size={18} />, label: site.email, href: `mailto:${site.email}` },
    { icon: <Phone size={18} />, label: site.phone, href: `tel:${site.phoneHref}` },
    { icon: <LinkedinIcon className="h-[18px] w-[18px]" />, label: "LinkedIn", href: site.linkedin },
    { icon: <GithubIcon className="h-[18px] w-[18px]" />, label: "GitHub", href: site.github },
  ];

  return (
    <Section id="contact" alt>
      <SectionHeading eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <ul className="space-y-3">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition duration-300 hover:-translate-y-0.5 hover:border-accent/60"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent transition-transform group-hover:scale-110">
                    {l.icon}
                  </span>
                  <span className="break-all text-sm sm:text-base">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-line bg-surface/60 p-5 sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1.5 block text-muted">{c.name}</span>
                <input name="name" required autoComplete="name" className={field} />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block text-muted">{c.email}</span>
                <input name="email" type="email" required autoComplete="email" className={field} />
              </label>
            </div>
            <label className="block text-sm">
              <span className="mb-1.5 block text-muted">{c.message}</span>
              <textarea name="message" required rows={6} className={`${field} resize-y`} />
            </label>
            {/* honeypot anti-spam */}
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-on-accent shadow-lg shadow-accent/20 transition hover:-translate-y-0.5 disabled:opacity-70"
            >
              {status === "sending" ? <LoaderCircle size={16} className="animate-spin" /> : <Send size={16} />}
              {status === "sending" ? c.sending : c.send}
            </button>
            {!site.formspreeId && <p className="text-xs text-muted">{c.fallbackNote}</p>}

            <div aria-live="polite">
              <AnimatePresence>
                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start gap-2 rounded-xl bg-emerald-500/15 p-3 text-sm text-emerald-600 dark:text-emerald-300"
                  >
                    <Check size={18} className="shrink-0" />
                    {c.success}
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start gap-2 rounded-xl bg-red-500/15 p-3 text-sm text-red-600 dark:text-red-300"
                  >
                    <TriangleAlert size={18} className="shrink-0" />
                    {c.error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
