import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { testimonials } from "../constants";
import TitleHeader from "../components/TitleHeader";

// Triple for seamless infinite loop
const loopedTestimonials = [...testimonials, ...testimonials, ...testimonials];

// Popup rendered via portal — always floats above everything, never clipped
const CursorPopup = ({ testimonial, cursorX, cursorY }) => {
  const OFFSET_X = 20;
  const OFFSET_Y = -16;
  const POPUP_W = 240;

  // Flip to left side if too close to right edge
  const flipLeft = cursorX + OFFSET_X + POPUP_W > window.innerWidth - 16;
  const left = flipLeft
    ? cursorX - POPUP_W - OFFSET_X
    : cursorX + OFFSET_X;
  const top = cursorY + OFFSET_Y;

  return createPortal(
    <div
      className="testimonial-popup"
      style={{ left, top }}
    >
      <div className="flex items-center gap-2 mb-2">
        <img
          src={testimonial.imgPath}
          alt={testimonial.name}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />
        <span className="font-semibold text-white text-xs">{testimonial.name}</span>
      </div>
      <p className="text-white-50 text-xs leading-relaxed">{testimonial.review}</p>
    </div>,
    document.body
  );
};

const TestimonialCard = ({ testimonial }) => {
  const cardRef = useRef(null);
  const [glowAngle, setGlowAngle] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    // Glow angle — card-relative
    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
    angle = (angle + 360) % 360;
    setGlowAngle(angle + 60);

    // Popup position — viewport absolute (for portal)
    setCursor({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <div
        ref={cardRef}
        className="testimonial-slide-card"
        style={{ "--start": glowAngle }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="glow" />

        {/* Stars */}
        <div className="flex items-center gap-1 mb-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <img key={i} src="/images/star.png" alt="star" className="size-5" />
          ))}
        </div>

        {/* Review text */}
        <div className="mb-5 flex-1">
          <p className="text-white-50 text-base leading-relaxed line-clamp-5">
            {testimonial.review}
          </p>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/10">
          <img
            src={testimonial.imgPath}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex flex-col leading-tight">
            <p className="font-bold text-white text-sm">{testimonial.name}</p>
            <p className="text-white-50 text-xs">{testimonial.role || testimonial.designation}</p>
            <p className="text-white-50 text-xs">{testimonial.company || testimonial.mentions}</p>
          </div>
        </div>
      </div>

      {/* Portal popup — rendered into body, never clipped */}
      {hovered && (
        <CursorPopup
          testimonial={testimonial}
          cursorX={cursor.x}
          cursorY={cursor.y}
        />
      )}
    </>
  );
};

const Testimonials = () => {
  const trackRef = useRef(null);
  const animFrameRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const SPEED = 0.5;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = () => {
      if (!pausedRef.current) {
        posRef.current += SPEED;
        const singleSetWidth = track.scrollWidth / 3;
        if (posRef.current >= singleSetWidth) {
          posRef.current = 0;
        }
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  const handleMouseEnter = () => { pausedRef.current = true; };
  const handleMouseLeave = () => { pausedRef.current = false; };

  return (
    <section id="testimonials" className="flex-center section-padding overflow-hidden">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="What People Say About Me?"
          sub="⭐️ Customer feedback highlights"
        />

        <div
          className="testimonial-carousel-viewport mt-16"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="gradient-edge" />
          <div className="gradient-edge" />

          <div ref={trackRef} className="testimonial-track">
            {loopedTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;