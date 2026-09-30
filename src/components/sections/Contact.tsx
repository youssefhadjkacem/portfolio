"use client";

import { Mail, Phone } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { site } from "@/data/site";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Reveal, Section, SectionHeading } from "@/components/ui/primitives";

export default function Contact() {
  const { m } = useI18n();
  const c = m.contact;

  const links = [
    { icon: <Mail size={20} />, label: site.email, href: `mailto:${site.email}` },
    { icon: <Phone size={20} />, label: site.phone, href: `tel:${site.phoneHref}` },
    { icon: <LinkedinIcon className="h-5 w-5" />, label: "LinkedIn", href: site.linkedin },
    { icon: <GithubIcon className="h-5 w-5" />, label: "GitHub", href: site.github },
  ];

  return (
    <Section id="contact" alt>
      <SectionHeading eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />
      <ul className="grid gap-4 sm:grid-cols-2">
        {links.map((l, i) => (
          <li key={l.label}>
            <Reveal delay={i * 0.08}>
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/10"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent transition-transform group-hover:scale-110 group-hover:-rotate-6">
                  {l.icon}
                </span>
                <span className="break-all text-base font-medium">{l.label}</span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
