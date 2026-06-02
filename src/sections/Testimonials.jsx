import { useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { testimonials } from "../constants";
import TitleHeader from "../components/TitleHeader";

const loopedTestimonials = [...testimonials, ...testimonials, ...testimonials];

// Popup rendered via portal — uses a single shared DOM node, no setState
const popupEl =
  typeof document !== "undefined"
    ? (() => {
        const el = document.createElement("div");
        el.className = "testimonial-popup";
        el.style.display = "none";
        document.body.appendChild(el);
        return el;
      })()
    : null;

const showPopup = (testimonial, x, y) => {
  if (!popupEl) return;
  const OFFSET_X = 20;
  const POPUP_W = 240;
  const flipLeft = x + OFFSET_X + POPUP_W > window.innerWidth - 16;
  const left = flipLeft ? x - POPUP_W - OFFSET_X : x + OFFSET_X;
  popupEl.style.left = left + "px";
  popupEl.style.top = (y - 16) + "px";
  popupEl.style.display = "block";
  popupEl.innerHTML = `
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
      <img src="${testimonial.imgPath}" alt="${testimonial.name}"
        style="width:32px;height:32px;border-radius:50%;object-fit:cover;flex-shrink:0;" />
      <span style="font-weight:600;color:#fff;font-size:12px;">${testimonial.name}</span>
    </div>
    <p style="color:#d9ecff;font-size:12px;line-height:1.5;">${testimonial.review}</p>
  `;
};

const hidePopup = () => {
  if (popupEl) popupEl.style.display = "none";
};

const TestimonialCard = ({ testimonial }) => {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;

    // Glow — direct DOM, no setState
    const rect = card.getBoundingClientRect();
    const mx = e.clientX - rect.left - rect.width / 2;
    const my = e.clientY - rect.top - rect.height / 2;
    let angle = Math.atan2(my, mx) * (180 / Math.PI);
    angle = (angle + 360) % 360;
    card.style.setProperty("--start", angle + 60);

    // Popup — shared DOM node
    showPopup(testimonial, e.clientX, e.clientY);
  }, [testimonial]);

  const handleMouseLeave = useCallback(() => {
    hidePopup();
  }, []);

  return (
    <div
      ref={cardRef}
      className="testimonial-slide-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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

    // Cleanup shared popup node on unmount
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      hidePopup();
    };
  }, []);

  const handleMouseEnter = useCallback(() => { pausedRef.current = true; }, []);
  const handleMouseLeave = useCallback(() => {
    pausedRef.current = false;
    hidePopup();
  }, []);

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