import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";

import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import { words } from "../constants";
import ComputersCanvas from "../components/canvas/Computers";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
};

const PhotoFrame = ({ src = "/images/aswin.jpeg", alt = "Profile photo" }) => {
  const cardRef = useRef(null);
  const isMobile = useIsMobile();

  const setTilt = (clientX, clientY) => {
    if (isMobile) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (clientX - rect.left) / rect.width;
    const py = (clientY - rect.top) / rect.height;
    el.style.setProperty("--rx", `${((0.5 - py) * 10).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((px - 0.5) * 14).toFixed(2)}deg`);
  };

  const resetTilt = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={cardRef}
      className="relative select-none mx-auto"
      style={{
        transformStyle: "preserve-3d",
        transform: "perspective(1100px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
        width: isMobile ? "140px" : "220px",
        height: isMobile ? "210px" : "340px",
      }}
      onMouseMove={(e) => setTilt(e.clientX, e.clientY)}
      onMouseLeave={resetTilt}
    >
      <div
        className="relative rounded-2xl overflow-hidden w-full h-full"
        style={{
          borderRadius: "16px",
          border: "2px solid transparent",
          background:
            "linear-gradient(#000,#000) padding-box, conic-gradient(from 180deg, #ff3b3b, #ff00cc, #007bff, #ff3b3b) border-box",
          boxShadow: "0 0 12px rgba(255,59,59,0.35), 0 0 20px rgba(0,123,255,0.2)",
          filter: "saturate(1.2)",
        }}
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          draggable="false"
        />
      </div>
    </div>
  );
};

const DownloadCVButton = () => {
  const [downloaded, setDownloaded] = useState(false);
  const btnRef = useRef(null);

  const handleDownload = (e) => {
    const button = btnRef.current;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    // Handle both mouse and touch events
    const clientX = e.clientX ?? (e.touches?.[0]?.clientX ?? 0);
    const clientY = e.clientY ?? (e.touches?.[0]?.clientY ?? 0);
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple");
    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) ripple.remove();
    button.appendChild(circle);

    const link = document.createElement("a");
    link.href = "/aswin-cv.pdf";
    link.download = "Aswin_Murugalingam_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "cv_download", {
        event_category: "engagement",
        event_label: "Hero Download Button",
        value: 1,
      });
    }
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const resetPosition = () => {
    if (btnRef.current) btnRef.current.style.transform = "translate(0,0)";
  };

  return (
    <>
      <button
        ref={btnRef}
        onClick={handleDownload}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetPosition}
        className="group w-full max-w-[280px] md:max-w-xs h-12 md:h-14 rounded-xl
        bg-[#c9d6e2] text-black flex items-center justify-center
        relative overflow-hidden transition-all duration-300 shadow-xl"
      >
        <span className="z-10 flex items-center gap-2 font-medium tracking-wide transition-all duration-300 group-hover:text-white">
          {downloaded ? "✔ Downloaded" : "Download CV"}
          <span className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-[#2b2b3c] via-[#1a1a2e] to-[#0f172a] opacity-0 group-hover:opacity-100 transition duration-300" />
        <span
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300"
          style={{ boxShadow: "0 0 25px rgba(34,211,238,0.7), 0 0 60px rgba(168,85,247,0.5)" }}
        />
      </button>
      <style>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.4);
          transform: scale(0);
          animation: ripple-animation 600ms linear;
          pointer-events: none;
        }
        @keyframes ripple-animation {
          to { transform: scale(4); opacity: 0; }
        }
      `}</style>
    </>
  );
};

const Hero = () => {
  const isMobile = useIsMobile();

  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1 }
    );
  });

  return (
    <section id="hero" className="relative overflow-hidden bg-black text-white">
      <img
        src="/images/bg.png"
        alt="bg"
        className="absolute left-[-40px] md:left-[-80px] top-[-20px] md:top-[-40px] w-[280px] md:w-[600px] opacity-95 brightness-110 contrast-110 drop-shadow-[0_0_40px_rgba(0,200,255,0.35)] z-0 pointer-events-none"
      />

      {/* ── Mobile layout: stacked ── */}
      {isMobile ? (
        <div className="relative z-10 flex flex-col items-center px-5 pt-24 pb-10 min-h-screen">
          {/* Photo */}
          <div className="mb-6">
            <PhotoFrame src="/images/aswin.jpeg" alt="Aswin" />
          </div>

          {/* Text */}
          <div className="hero-text text-center w-full">
            <h1 className="text-[28px] font-semibold leading-tight">
              Shaping{" "}
              <span className="slide" style={{ display: "inline-block" }}>
                <span className="wrapper">
                  {words.map((word, index) => (
                    <span key={index} className="flex items-center justify-center gap-2 pb-2">
                      <img src={word.imgPath} alt="icon" className="size-6 rounded-full bg-white-50" />
                      <span>{word.text}</span>
                    </span>
                  ))}
                </span>
              </span>
            </h1>
            <h1 className="text-[28px] font-semibold leading-tight mt-1">
              into Reliable Business Operations
            </h1>
            <h1 className="text-[28px] font-semibold leading-tight mt-1">
              that Deliver Results
            </h1>
          </div>

          <p className="text-white-50 text-sm text-center mt-4 mb-6">
            Hi, I'm Aswin, an IT Administrator based in Dubai focused on reliable IT operations and infrastructure.
          </p>

          <DownloadCVButton />

          {/* 3D Canvas — full width on mobile */}
          <div className="w-full mt-8" style={{ height: "45vw", minHeight: "200px", maxHeight: "320px" }}>
            <ComputersCanvas isMobile={true} />
          </div>

          <div className="w-full mt-4">
            <AnimatedCounter />
          </div>
        </div>
      ) : (
        /* ── Desktop layout: side-by-side ── */
        <div className="hero-layout relative z-10">
          <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5 pt-20 md:pt-28">
            <div className="flex flex-col gap-7 relative">
              <div className="max-w-xs md:max-w-sm mb-2 absolute left-0" style={{ marginLeft: "120px", top: "-140px" }}>
                <PhotoFrame src="/images/aswin.jpeg" alt="Aswin" />
              </div>

              <div className="hero-text mt-16 md:mt-50">
                <h1>
                  Shaping
                  <span className="slide">
                    <span className="wrapper">
                      {words.map((word, index) => (
                        <span key={index} className="flex items-center gap-2 pb-2">
                          <img src={word.imgPath} alt="person" className="size-7 rounded-full bg-white-50" />
                          <span>{word.text}</span>
                        </span>
                      ))}
                    </span>
                  </span>
                </h1>
                <h1>into Reliable <br />Business Operations</h1>
                <h1>that Deliver Results</h1>
              </div>

              <p className="text-white-50 md:text-xl">
                Hi, I'm Aswin, an IT Administrator based in Dubai focused on reliable IT operations and infrastructure.
              </p>

              <DownloadCVButton />
            </div>
          </header>

          <figure>
            <div className="hero-3d-layout">
              <div className="relative w-full h-full">
                <div className="relative z-10 w-full h-full">
                  <ComputersCanvas isMobile={false} />
                </div>
              </div>
            </div>
          </figure>
        </div>
      )}

      {!isMobile && <AnimatedCounter />}
    </section>
  );
};

export default Hero;