import type { Metadata } from "next";
import Navbar from "@/components/public/sections/Navbar";
import Hero from "@/components/public/sections/Hero";
import About from "@/components/public/sections/About";
import Skills from "@/components/public/sections/Skills";
import Portfolio from "@/components/public/sections/Portfolio";
import ExperienceSection from "@/components/public/sections/Experience";
import TestimonialSection from "@/components/public/sections/Testimonial";
import Contact from "@/components/public/sections/Contact";
import Footer from "@/components/public/sections/Footer";

export const metadata: Metadata = {
  description:
    "Informatics student & full-stack developer building products that work end to end with React, Next.js, Node.js, and Laravel.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Portfolio />
        <ExperienceSection />
        <TestimonialSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
