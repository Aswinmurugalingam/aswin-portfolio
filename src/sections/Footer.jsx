import { socialImgs } from "../constants";
import { useState } from "react";

const Footer = () => {
  const [showTerms, setShowTerms] = useState(false);

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Terms */}
        <div className="flex flex-col justify-center">
          <button 
            onClick={() => setShowTerms(true)}
            className="hover:underline"
          >
            Terms & Conditions
          </button>
        </div>

        {/* Social Icons */}
        <div className="socials flex gap-4 items-center justify-center">

          {socialImgs.map((socialImg, index) => (
            <a
              key={index}
              href={socialImg.link}
              target="_blank"
              rel="noopener noreferrer"
              className="icon hover:scale-110 transition duration-300"
            >
              <img src={socialImg.imgPath} alt={socialImg.name} />
            </a>
          ))}

          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/918610507446"
            target="_blank"
            rel="noopener noreferrer"
            className="icon hover:scale-110 transition duration-300"
          >
            <img src="/images/whatsapp.png" alt="whatsapp" className="w-5 h-5" />
          </a>

        </div>

        {/* Copyright */}
        <div className="flex flex-col justify-center">
          <p className="text-center md:text-end">
            © {new Date().getFullYear()} Aswin Murugalingam. All rights reserved.
          </p>
        </div>

      </div>

      {/* Terms Modal */}
      {showTerms && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
          onClick={() => setShowTerms(false)}
        >
          <div 
            className="bg-white/5 backdrop-blur-xl border border-white/10 text-white max-w-2xl w-full p-6 rounded-2xl shadow-2xl relative animate-fadeIn max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              onClick={() => setShowTerms(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>

            <p className="mb-3">
              This website is created for professional portfolio purposes.
            </p>

            <h3 className="font-semibold mt-3">1. Purpose</h3>
            <p>This site showcases my IT skills, experience, and projects.</p>

            <h3 className="font-semibold mt-3">2. Accuracy</h3>
            <p>All information is accurate to the best of my knowledge.</p>

            <h3 className="font-semibold mt-3">3. Content</h3>
            <p>All content belongs to me unless stated otherwise.</p>

            <h3 className="font-semibold mt-3">4. External Links</h3>
            <p>I am not responsible for third-party websites.</p>

            <h3 className="font-semibold mt-3">5. Contact</h3>
            <p>Information shared is used only for communication.</p>

            <h3 className="font-semibold mt-3">6. Updates</h3>
            <p>Terms may change without notice.</p>

          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
