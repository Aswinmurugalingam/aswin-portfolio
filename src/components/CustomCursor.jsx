import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    // 🔹 Move cursor
    const moveCursor = (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
      cursor.style.opacity = "1"; // always show when moving
    };

    // 🔹 Hover detection (for clickable elements)
    const handleMouseOver = (e) => {
      const target = e.target.closest(
        'a, button, [role="button"], input, textarea, select, label, .cta-wrapper, .cta-button, .group'
      );

      if (target) {
        cursor.classList.add("cursor-hover");
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest(
        'a, button, [role="button"], input, textarea, select, label, .cta-wrapper, .cta-button, .group'
      );

      if (target) {
        cursor.classList.remove("cursor-hover");
      }
    };

    // 🔹 Detect leaving browser window (ALL SIDES — FINAL FIX)
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

    // 🔹 Detect re-entering window
    const handleMouseEnterWindow = () => {
      cursor.style.opacity = "1";
    };

    // 🔹 Fallback (tab switch / window inactive)
    const handleWindowBlur = () => {
      cursor.style.opacity = "0";
    };

    const handleWindowFocus = () => {
      cursor.style.opacity = "1";
    };

    // 🔹 Events
    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);

    // 🔹 Cleanup
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        opacity: 1,
        transition: "opacity 0.15s ease",
        pointerEvents: "none", // 🔥 IMPORTANT
      }}
    >
      <span className="cursor-default-label">AM</span>
      <span className="cursor-ring" />
    </div>
  );
};

export default CustomCursor;