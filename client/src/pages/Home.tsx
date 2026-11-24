/**
 * Portfolio — home.
 *
 * Structure: a fixed ambient backdrop, a floating nav, then one section per
 * concern. Every section reads its content from `src/data/*`, so updating the
 * site means editing data, never JSX.
 *
 * Section order is deliberate: identity → proof → history → tools → contact.
 */

import { useState } from "react";
import { About } from "@/components/portfolio/About";
import { Backdrop } from "@/components/portfolio/Backdrop";
import { CommandPalette } from "@/components/portfolio/CommandPalette";
import { Contact } from "@/components/portfolio/Contact";
import { Experience } from "@/components/portfolio/Experience";
import { Footer } from "@/components/portfolio/Footer";
import { Hero } from "@/components/portfolio/Hero";
import { Marquee } from "@/components/portfolio/Marquee";
import { Nav } from "@/components/portfolio/Nav";
import { Stack } from "@/components/portfolio/Stack";
import { Work } from "@/components/portfolio/Work";

export default function Home() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Backdrop />

      <Nav onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />

      <main>
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Experience />
        <Stack />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
