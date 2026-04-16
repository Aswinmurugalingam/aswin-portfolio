import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const rydeRef = useRef(null);
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animations for each app showcase
    const cards = [rydeRef.current, libraryRef.current, ycDirectoryRef.current];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

return (
  <div id="work" ref={sectionRef} className="app-showcase">
    <div className="w-full">
      <div className="showcaselayout">

        {/* PROJECT 1 */}
        <div ref={rydeRef} className="first-project-wrapper">
          <div className="image-wrapper">
            <img src="/images/project1.png" alt="Ryde App Interface" />
          </div>
          <div className="text-content">
            <h2>
              Electra Workforce Attendance Management System
            </h2>
            <p className="text-white-50 md:text-xl">
  A NAS-integrated attendance platform designed to streamline workforce management across survey operations.  
  It enables real-time tracking of employee activity, approval workflows, and accurate attendance logging.  
  Built with HTML, CSS, JavaScript, and Android Studio, ensuring reliability, scalability, and seamless integration.            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="project-list-wrapper overflow-hidden">

          {/* PROJECT 2 */}
          <div className="project" ref={libraryRef}>
            <div className="image-wrapper bg-[#FFEFDB]">
              <img
                src="/images/project2.png"
                alt="Project Expense Calculation & Analytics System"
              />
            </div>

            <h2>Project Expense Calculation & Analytics System</h2>

            {/* ✅ SUBTITLE ADDED */}
            <p className="text-white-50 md:text-base mt-2">
              A centralized system for calculating project costs, tracking workforce expenses, and generating real-time financial insights.
            </p>
          </div>

          {/* PROJECT 3 */}
          <div className="project" ref={ycDirectoryRef}>
            <div className="image-wrapper bg-[#FFE7EB]">
              <img src="/images/project3.png" alt="Drone Viewer" />
            </div>

            <h2>360° Drone Data Visualization Platform</h2>

            {/* ✅ SUBTITLE ADDED */}
            <p className="text-white-50 md:text-base mt-2">
              A NAS-powered platform for interactive viewing of drone-captured 360° images and geospatial survey data.
            </p>
          </div>

        </div>
      </div>
    </div>
  </div>
);
};

export default AppShowcase;
