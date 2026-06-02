import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { expCards } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.utils.toArray(".timeline-card").forEach((card) => {
      gsap.from(card, {
        x: -72,
        autoAlpha: 0,
        transformOrigin: "left left",
        duration: 0.65,
        ease: "power2.out",
        force3D: true,
        clearProps: "willChange",
        scrollTrigger: {
          trigger: card,
          start: "top 82%",
          once: true,
        },
      });
    });

    gsap.set(".timeline", {
      transformOrigin: "bottom bottom",
      scaleY: 1,
      force3D: true,
    });

    gsap.to(".timeline", {
      scaleY: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".timeline-wrapper",
        start: "top center",
        end: "bottom center",
        scrub: 0.2,
        invalidateOnRefresh: true,
      },
    });

    gsap.utils.toArray(".expText").forEach((text) => {
      gsap.from(text, {
        autoAlpha: 0,
        y: 24,
        duration: 0.55,
        ease: "power2.out",
        force3D: true,
        clearProps: "willChange",
        scrollTrigger: {
          trigger: text,
          start: "top 75%",
          once: true,
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="flex-center md:mt-40 mt-20 section-padding xl:px-0"
    >
      <div className="w-full h-full md:px-20 px-5">
        <TitleHeader
          title="Professional Work Experience"
          sub="💼 My Career Overview"
        />
        <div className="mt-32 relative">
          <div className="relative z-50 xl:space-y-32 space-y-10">
            {expCards.map((card) => (
              <div key={card.title} className="exp-card-wrapper">
                <div className="xl:w-2/6">
                  <GlowCard card={card}>
                    <div>
                      <img
                        src={card.imgPath}
                        alt={`${card.title} visual`}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </GlowCard>
                </div>
                <div className="xl:w-4/6">
                  <div className="flex items-start">
                    <div className="timeline-wrapper">
                      <div className="timeline" />
                      <div className="gradient-line w-1 h-full" />
                    </div>
                    <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                      <div className="timeline-logo">
                        <img
                          src={card.logoPath}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div>
                        <h1 className="font-semibold text-3xl">{card.title}</h1>
                        {card.company && (
                          <p className="text-[#839CB5] italic mt-2 whitespace-pre-line">
                            {card.company}
                          </p>
                        )}
                        <p className="my-5 text-white-50">
                          🗓️&nbsp;{card.date}
                        </p>
                        <p className="text-[#839CB5] italic">
                          Responsibilities
                        </p>
                        <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
                          {card.responsibilities.map(
                            (responsibility, index) => (
                              <li key={index} className="text-lg">
                                {responsibility}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
