import { useEffect, useRef } from "react";

const DIGITS = "0123456789";

// RGB palette for glowing digits
const RGB = [
  [0, 255, 120],   // neon green
  [0, 200, 255],   // cyan
  [140, 0, 255],   // purple
  [255, 0, 140],   // magenta
];

export default function CodeRainBackdrop({
  // Keep defaults subtle but visible; you can tweak later
  fontSize = 20,
  fade = 0.15,          // lower = longer trails (0.05–0.15)
  speedBase = 0.010,      // base falling speed
  speedJitter = 1,    // per-column speed randomization
  glow = 5,            // shadow blur for glow
  opacity = 0.5,        // digit opacity
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });

    let dpr = Math.max(1, window.devicePixelRatio || 1);
    let width = 0;
    let height = 0;

    // Columns state
    let cols = 0;
    let y = [];          // y position per column (in "rows")
    let v = [];          // speed per column (rows per frame-ish)
    let c = [];          // color index per column

    const setup = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      // CSS pixels
      const w = Math.max(1, parent.clientWidth);
      const h = Math.max(1, parent.clientHeight);

      dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // draw in CSS px space
      width = w;
      height = h;

      cols = Math.max(1, Math.floor(width / fontSize));
      y = new Array(cols).fill(0).map(() => Math.random() * (height / fontSize));
      v = new Array(cols).fill(0).map(() => speedBase + Math.random() * speedJitter);
      c = new Array(cols).fill(0).map(() => Math.floor(Math.random() * RGB.length));

      // Start with a clean black fill (no tint)
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);
    };

    setup();

    let raf = 0;
    let last = performance.now();

    const draw = (now) => {
      const dt = Math.min(33, now - last); // clamp
      last = now;

      // Fade the previous frame with *black* alpha to create trails (still black background)
      ctx.fillStyle = `rgba(0,0,0,${fade})`;
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
      ctx.textBaseline = "top";

      for (let i = 0; i < cols; i++) {
        const ch = DIGITS[(Math.random() * DIGITS.length) | 0];
        const [r, g, b] = RGB[c[i]];

        // Glow
        ctx.shadowColor = `rgb(${r},${g},${b})`;
        ctx.shadowBlur = glow;

        ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`;
        ctx.fillText(ch, i * fontSize, y[i] * fontSize);

        // Move down
        y[i] += (v[i] * dt) / 16.6; // normalize to ~60fps

        // Occasionally switch color per column for "RGB" feel
        if (Math.random() > 0.995) c[i] = (c[i] + 1) % RGB.length;

        // Reset to top randomly after it exits bottom (creates continuous rain)
        if (y[i] * fontSize > height + fontSize * 2) {
          y[i] = -Math.random() * 20;
          v[i] = speedBase + Math.random() * speedJitter;
          c[i] = Math.floor(Math.random() * RGB.length);
        }
      }

      // Reset shadow so it doesn't affect other drawings
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    const onResize = () => setup();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [fontSize, fade, speedBase, speedJitter, glow, opacity]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#000",          // ✅ pure black
        borderRadius: "24px",
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
