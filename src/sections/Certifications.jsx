import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TitleHeader from "../components/TitleHeader";

const preloadImages = (images) => {
  images.forEach((img) => {
    const image = new Image();
    image.src = img;
  });
};

const certificates = [
  { image: "/certificates/fortinet.jpg" },
  { image: "/certificates/azure.jpg" },
  { image: "/certificates/ccna.jpg" },
];

const Certifications = () => {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    preloadImages(certificates.map((c) => c.image));
  }, []);

  useEffect(() => {
    if (hovered) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % certificates.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [hovered]);

  const next = () => setIndex((prev) => (prev + 1) % certificates.length);
  const prev = () => setIndex((prev) => (prev - 1 + certificates.length) % certificates.length);

  return (
    <div id="certifications" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="My Certifications & Achievements"
          sub="🎓 Professional Credentials"
        />

        <div
          className="relative max-w-7xl mx-auto mt-20 h-[300px] sm:h-[420px] md:h-[560px]"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Slides */}
          <div className="relative flex items-center justify-center w-full h-full px-10">
            {certificates.map((cert, i) => (
              <motion.img
                key={i}
                src={cert.image}
                alt="certificate"
                className="absolute w-full h-full object-contain rounded-xl"
                initial={false}
                animate={{ opacity: i === index ? 1 : 0, zIndex: i === index ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            ))}
          </div>

          {/* Prev arrow — inset so it never clips on mobile */}
          <button
            onClick={prev}
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 p-2 md:p-3 rounded-full z-10"
            aria-label="Previous"
          >
            ◀
          </button>

          {/* Next arrow */}
          <button
            onClick={next}
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 p-2 md:p-3 rounded-full z-10"
            aria-label="Next"
          >
            ▶
          </button>

          {/* Dots */}
          <div className="absolute bottom-[-28px] left-0 right-0 flex justify-center gap-2">
            {certificates.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === index ? "bg-blue-500" : "bg-gray-600"
                }`}
                aria-label={`Go to certificate ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certifications;