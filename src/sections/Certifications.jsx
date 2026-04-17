import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TitleHeader from "../components/TitleHeader";

// ✅ Preload images
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

  // ✅ Preload
  useEffect(() => {
    preloadImages(certificates.map((c) => c.image));
  }, []);

  // ✅ Auto Slide
  useEffect(() => {
    if (hovered) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % certificates.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [hovered]);

  const next = () => {
    setIndex((prev) => (prev + 1) % certificates.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  return (
    <div id="certifications" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">

        <TitleHeader
          title="My Certifications & Achievements"
          sub="🎓 Professional Credentials"
        />

        {/* ✅ FIXED HEIGHT (prevents layout jump) */}
        <div
          className="relative max-w-7xl mx-auto mt-20 h-[550px] md:h-[700px]"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >

          {/* ✅ NO UNMOUNT → NO BLINK */}
          <div className="relative flex items-center justify-center w-full h-full">
            {certificates.map((cert, i) => (
              <motion.img
                key={i}
                src={cert.image}
                alt="certificate"
                className="absolute w-full h-full object-contain rounded-xl"
                initial={false}
                animate={{
                  opacity: i === index ? 1 : 0,
                  zIndex: i === index ? 1 : 0,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute top-1/2 -left-5 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 p-3 rounded-full"
          >
            ◀
          </button>

          <button
            onClick={next}
            className="absolute top-1/2 -right-5 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 p-3 rounded-full"
          >
            ▶
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {certificates.map((_, i) => (
              <div
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  i === index ? "bg-blue-500" : "bg-gray-600"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Certifications;