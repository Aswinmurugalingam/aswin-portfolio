import { useEffect } from "react";
import Lenis from "lenis";

import Testimonials from "./sections/Testimonials";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";
import FeatureCards from "./sections/FeatureCards";
import Navbar from "./components/NavBar";
import CustomCursor from "./components/CustomCursor";
import Certifications from "./sections/Certifications";

export default function App() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouch) return;

    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    if (window.__LENIS__) return;

    const lenis = new Lenis({
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1.4,  // faster scroll distance per wheel tick
      lerp: 0.18,            // faster easing catch-up
    });

    window.__LENIS__ = lenis;

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const styleId = "lenis-css";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        html.lenis { height: auto; }
        .lenis.lenis-smooth { scroll-behavior: auto !important; }
        .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
        .lenis.lenis-stopped { overflow: hidden; }
      `;
      document.head.appendChild(style);
    }

    document.documentElement.classList.add("lenis");

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__LENIS__ = null;
      document.documentElement.classList.remove("lenis");
    };
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <Hero />
      <ShowcaseSection />
      <LogoShowcase />
      <FeatureCards />
      <Experience />
      <TechStack />
      <Certifications />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}