"use client";

import { MotionConfig } from "framer-motion";
import { useState } from "react";
import { I18nProvider, useI18n } from "@/i18n/provider";
import type { Manifest } from "@/lib/manifest";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Hackathons from "@/components/sections/Hackathons";
import Resume from "@/components/sections/Resume";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

function Page({ manifest }: { manifest: Manifest }) {
  const { m } = useI18n();
  const [openId, setOpenId] = useState<string | null>(null);

  const openProject = (id: string) => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    setOpenId(id);
  };

  return (
    <>
      <a
        href="#about"
        className="sr-only z-50 rounded-lg bg-accent px-4 py-2 text-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {m.a11y.skip}
      </a>
      <Navbar />
      <main>
        <Hero />
        <About profile={manifest.profile} />
        <Stats />
        <Experience />
        <Projects media={manifest.projects} openId={openId} setOpenId={setOpenId} />
        <Skills />
        <Hackathons photos={manifest.photos} others={manifest.otherHackathons} onOpenProject={openProject} />
        <Resume cv={manifest.cv} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App({ manifest }: { manifest: Manifest }) {
  return (
    // reducedMotion="user" : respecte prefers-reduced-motion (désactive les animations de transformation)
    <MotionConfig reducedMotion="user">
      <I18nProvider>
        <Page manifest={manifest} />
      </I18nProvider>
    </MotionConfig>
  );
}
