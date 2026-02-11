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

export default function App() {
  useEffect(() => {
    // Premium smooth scrolling (wheel/trackpad) with reduced-motion respect.
    // Install: npm i lenis
    if (typeof window === "undefined") return;

    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    // Avoid double-init during React StrictMode in dev
    if (window.__LENIS__) return;

    const lenis = new Lenis({
      // "smoothWheel" gives the premium inertia feel
      smoothWheel: true,
      // Keep touch natural on mobile (avoid rubbery feel)
      smoothTouch: false,
      // Tune these if you want more/less smoothing
      wheelMultiplier: 0.9,
      touchMultiplier: 1.0,
      // Easing curve for consistent feel
      lerp: 0.08,
    });

    window.__LENIS__ = lenis;

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Minimal CSS needed for Lenis to behave correctly
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

    // Lenis adds classes to <html> automatically, but some setups benefit from this:
    document.documentElement.classList.add("lenis");

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__LENIS__ = null;
      document.documentElement.classList.remove("lenis");
    };
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <ShowcaseSection />
      <LogoShowcase />
      <FeatureCards />
      <Experience />
      <TechStack />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
