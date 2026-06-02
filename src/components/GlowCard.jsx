import { useEffect, useRef } from "react";

const GlowCard = ({ card, children }) => {
  const cardRef = useRef(null);
  const frameRef = useRef(0);
  const rectRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    rectRef.current = cardRef.current?.getBoundingClientRect() ?? null;
  };

  const handleMouseMove = (e) => {
    pointerRef.current = { x: e.clientX, y: e.clientY };

    if (frameRef.current) return;

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0;

      const cardEl = cardRef.current;
      const rect = rectRef.current;
      if (!cardEl || !rect) return;

      const mouseX = pointerRef.current.x - rect.left - rect.width / 2;
      const mouseY = pointerRef.current.y - rect.top - rect.height / 2;
      const angle = (Math.atan2(mouseY, mouseX) * (180 / Math.PI) + 360) % 360;

      cardEl.style.setProperty("--start", `${angle + 60}`);
    });
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="card card-border timeline-card rounded-xl p-10 mb-5 break-inside-avoid-column"
    >
      <div className="glow"></div>
      <div className="flex items-center gap-1 mb-5">
        {Array.from({ length: 5 }, (_, i) => (
          <img
            key={i}
            src="/images/star.png"
            alt=""
            className="size-5"
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
      <div className="mb-5">
        <p className="text-white-50 text-lg">{card.review}</p>
      </div>
      {children}
    </div>
  );
};

export default GlowCard;
