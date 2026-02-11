import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import { words } from "../constants";
import ComputersCanvas from "../components/canvas/Computers";
import CodeRainBackdrop from "../components/CodeRainBackdrop";




const PhotoFrame = ({ src = "/images/aswin.jpeg", alt = "Profile photo" }) => {
  const cardRef = useRef(null);

  const setTilt = (clientX, clientY) => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform 0ms";

    const rect = el.getBoundingClientRect();
    const px = (clientX - rect.left) / rect.width; // 0..1
    const py = (clientY - rect.top) / rect.height; // 0..1

    const tiltX = (0.5 - py) * 10;
    const tiltY = (px - 0.5) * 14;

    el.style.setProperty("--rx", `${tiltX.toFixed(2)}deg`);
    el.style.setProperty("--ry", `${tiltY.toFixed(2)}deg`);
  };


  const setGlow = (clientX, clientY) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // 0 (far) → 1 (near center)
    const dx = (clientX - cx) / rect.width;
    const dy = (clientY - cy) / rect.height;
    const dist = Math.min(1, Math.sqrt(dx * dx + dy * dy) * 1.6);
    const proximity = 1 - dist;

    const hoverBoost = Number(el.dataset.hover || "0");
    const intensity = Math.max(0, Math.min(1, 0.35 + proximity * 0.55 + hoverBoost * 0.25));

    // CSS vars used in border + shadow
    el.style.setProperty("--glow", intensity.toFixed(3));
    el.style.setProperty("--glow2", (0.55 * intensity).toFixed(3));

    // Small color drift based on X so it “feels” like PC RGB
    const t = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const c1 = glowPalette[0];
    const c2 = glowPalette[1];
    const c3 = glowPalette[2];
    // simple 3-stop blend selector
    el.style.setProperty("--c1", t < 0.5 ? c1 : c2);
    el.style.setProperty("--c2", t < 0.5 ? c2 : c3);
    el.style.setProperty("--c3", t < 0.5 ? c3 : c1);
  };

  const resetTilt = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform 220ms ease";
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  return (
    <div className="w-full">
      <div
        ref={cardRef}
        className="relative select-none will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          transform:
            "perspective(1100px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
          transition: "transform 220ms ease",
          // default glow (will be updated on hover/move)
          "--glow": 0.35,
          "--glow2": 0.18,
          "--c1": "34,211,238",
          "--c2": "168,85,247",
          "--c3": "59,130,246",
          "--hue": 0,
        }}
        onMouseMove={(e) => {
          setTilt(e.clientX, e.clientY);
          setGlow(e.clientX, e.clientY);
        }}
        onMouseEnter={() => {
          const el = cardRef.current;
          if (el) el.dataset.hover = "1";
        }}
        onMouseLeave={(e) => {
          const el = cardRef.current;
          if (el) el.dataset.hover = "0";
          resetTilt();
          // ease glow back to baseline
          if (el) {
            el.style.setProperty("--glow", "0.35");
            el.style.setProperty("--glow2", "0.18");
          }
        }}
        onTouchMove={(e) => {
          const t = e.touches?.[0];
          if (t) {
            setTilt(t.clientX, t.clientY);
            setGlow(t.clientX, t.clientY);
          }
        }}
        onTouchEnd={resetTilt}
      >
        {/* Single wrapper that guarantees border-only gradient (no leaking) */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            width: "220px",
            height: "340px",
            borderRadius: "16px",
            border: "2px solid transparent",
            // Sync RGB flow like PC fans
            filter: "hue-rotate(calc(var(--hue, 0) * 1deg))",
            // Two-layer background: inner is transparent (padding-box), outer is RGB border (border-box)
            background:
              "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)) padding-box, " +
              // Border-only RGB ring using synced colors
              `conic-gradient(from 180deg, rgba(139,92,246,0), rgba(var(--c1, 34,211,238), calc(0.55 + var(--glow, 0.35))), rgba(var(--c2, 168,85,247), calc(0.55 + var(--glow, 0.35))), rgba(var(--c3, 59,130,246), calc(0.55 + var(--glow, 0.35))), rgba(139,92,246,0)) border-box`,
            boxShadow:
              `0 0 14px rgba(34,211,238, calc(0.10 + var(--glow, 0.35) * 0.20)), 0 0 28px rgba(168,85,247, calc(0.08 + var(--glow2, 0.18) * 0.20))`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "translateZ(1px)",
            }}
          >
            <img
              src={src}
              alt={alt}
              className="h-full w-full object-cover"
              draggable="false"
            />
          </div>

          {/* Back (same photo) */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{
              transform: "rotateY(180deg) translateZ(1px)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
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
      </div>
    </div>
  );
};


const Hero = () => {
  const frameWrapRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );

    // Subtle idle floating animation for the photo frame (GPU-friendly)
    if (frameWrapRef.current) {
      gsap.to(frameWrapRef.current, {
        y: -8,
        rotationZ: 0.6,
        duration: 3.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // RGB sync cycle (like PC fan colors)
      gsap.to(frameWrapRef.current, {
        "--hue": 360,
        duration: 10,
        ease: "none",
        repeat: -1,
        overwrite: false,
      });
    }
  });

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="" />
      </div>

      <div className="hero-layout">
        {/* LEFT: Hero Content */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5 pt-20 md:pt-28">
          <div className="flex flex-col gap-7 relative">
<div
              ref={frameWrapRef}
              className="max-w-xs md:max-w-sm mb-2 -mt-30 md:-mt-38 absolute left-0"
              style={{ marginLeft: "120px", top: "5px" }}
            >
              <PhotoFrame src="/images/aswin.jpeg" alt="Aswin" />
            </div>

            <div className="hero-text mt-16 md:mt-50">
              <h1>
                Shaping
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt="person"
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>
  into Reliable <br />
  Business Operations
</h1>

              <h1>that Deliver Results</h1>
            </div>

            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
              Hi, I’m Aswin, an IT Administrator based in Dubai focused on reliable IT operations and infrastructure.
            </p>

            <Button
              text="See My Work"
              className="md:w-80 md:h-16 w-60 h-12"
              id="counter"
            />
          </div>
        </header>

        {/* RIGHT: 3D Model or Visual */}
        <figure>
          <div className="hero-3d-layout">
            <div className="relative w-full h-full">
              {/* Code-rain background (right side only, behind computer) */}
              <CodeRainBackdrop className="z-0" opacity={0.30} density={1.25} speed={0.5} fontSize={16} radius={20} />

              {/* Computer stays above */}
              <div className="relative z-10 w-full h-full">
                <ComputersCanvas />
              </div>
            </div>
            </div>
        </figure>
      </div>

      <AnimatedCounter />
    </section>
  );
};

export default Hero;