import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const frameRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });

  // Detect touch device — render nothing on touch screens
  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  useEffect(() => {
    if (isTouch) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e) => {
      pointerRef.current = { x: e.clientX, y: e.clientY };

      if (frameRef.current) return;

      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = 0;
        const { x, y } = pointerRef.current;
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        cursor.style.opacity = "1";
      });
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest(
        'a, button, [role="button"], input, textarea, select, label, .cta-wrapper, .cta-button, .group'
      );
      if (target) cursor.classList.add("cursor-hover");
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest(
        'a, button, [role="button"], input, textarea, select, label, .cta-wrapper, .cta-button, .group'
      );
      if (target) cursor.classList.remove("cursor-hover");
    };

    const handleMouseLeaveWindow = (e) => {
      if (
        e.clientX <= 0 ||
        e.clientY <= 0 ||
        e.clientX >= window.innerWidth ||
        e.clientY >= window.innerHeight
      ) {
        cursor.style.opacity = "0";
      }
    };

    const handleWindowBlur = () => { cursor.style.opacity = "0"; };
    const handleWindowFocus = () => { cursor.style.opacity = "1"; };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", () => { cursor.style.opacity = "1"; });
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{ opacity: 0, pointerEvents: "none" }}
    >
      <span className="cursor-default-label">AM</span>
      <span className="cursor-ring" />
    </div>
  );
};

export default CustomCursor;
