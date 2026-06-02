import { useEffect, useRef } from "react";

const ScrollProgress = () => {
  const barRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const updateProgress = () => {
      frameRef.current = 0;

      const bar = barRef.current;
      if (!bar) return;

      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

      bar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
    };

    const requestUpdate = () => {
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span ref={barRef} className="scroll-progress__bar" />
    </div>
  );
};

export default ScrollProgress;
