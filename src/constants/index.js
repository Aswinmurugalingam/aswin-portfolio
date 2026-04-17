const navLinks = [
  {
    name: "Work",
    link: "#work",
  },
  {
    name: "Experience",
    link: "#experience",
  },
  {
    name: "Skills",
    link: "#skills",
  },
  {
  name: "Certifications",
  link: "#certifications",
  },
  {
    name: "Testimonials",
    link: "#testimonials",
  },
];

const words = [
  { text: "System Reliability", imgPath: "/images/ideas.svg" },
  { text: "Network Security", imgPath: "/images/concepts.svg" },
  { text: "IT Operations", imgPath: "/images/designs.svg" },
  { text: "Infrastructure", imgPath: "/images/code.svg" },
  { text: "System Reliability", imgPath: "/images/ideas.svg" },
  { text: "Network Security", imgPath: "/images/concepts.svg" },
  { text: "IT Operations", imgPath: "/images/designs.svg" },
  { text: "Infrastructure", imgPath: "/images/code.svg" },
];

const counterItems = [
  { value: 5, suffix: "+", label: "Years in IT Operations" },
  { value: 100, suffix: "+", label: "Workstations Deployed & Maintained" },
  { value: 30, suffix: "+", label: "Systems & Network Devices Managed" },
  { value: 99.9, suffix: "%", label: "Service Uptime Focus" },
];

const logoIconsList = [
  {
    imgPath: "/images/logos/company-logo-1.png",
  },
  {
    imgPath: "/images/logos/company-logo-2.png",
  },
  {
    imgPath: "/images/logos/company-logo-3.png",
  },
  {
    imgPath: "/images/logos/company-logo-4.png",
  },
  {
    imgPath: "/images/logos/company-logo-5.png",
  },
  {
    imgPath: "/images/logos/company-logo-6.png",
  },
  {
    imgPath: "/images/logos/company-logo-7.png",
  },
  {
    imgPath: "/images/logos/company-logo-8.png",
  },
  {
    imgPath: "/images/logos/company-logo-9.png",
  },
  {
    imgPath: "/images/logos/company-logo-10.png",
  },
  {
    imgPath: "/images/logos/company-logo-11.png",
  },
];

const abilities = [
  {
    imgPath: "/images/rack.png",
    title: "Systems & Infrastructure Management",
    desc: "Designing, deploying, and maintaining enterprise IT infrastructure including servers, storage, and virtualization.",
  },
  {
    imgPath: "/images/shield.png",
    title: "Network & Security Operations",
    desc: "Managing firewalls, VPNs, and network security to protect organizational assets and connectivity.",
  },
  {
    imgPath: "/images/repair.png",
    title: "Computer Repair & OS Installation",
    desc: "Diagnosing hardware issues and installing optimized operating systems for efficient performance.",
  },
];

const techStackImgs = [
  {
    name: "React Developer",
    imgPath: "/images/logos/operation.png",
  },
  {
    name: "Python Developer",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Backend Developer",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Interactive Developer",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Project Manager",
    imgPath: "/images/logos/git.svg",
  },
];

const techStackIcons = [
  {
    name: "Fortigate",
    modelPath: "/models/fortigate.glb",
    scale: 0.07,
    rotation: [Math.PI / 2, 0, 0],
  },
  {
    name: "QNAP NAS",
    modelPath: "/models/qnap.glb",
    scale: 0.05,
    rotation: [Math.PI / 2, 0, 0],
  },
  {
    name: "Windows",
    modelPath: "/models/windows.glb",
    scale: 0.13,
    rotation: [Math.PI / 2, 0, 0],
  },
  {
    name: "Microsoft 365",
    modelPath: "/models/microsoft.glb",
    scale: 0.06,
    rotation: [Math.PI / 2, 0, 0],
  },
  {
    name: "Linux",
    modelPath: "/models/linux.glb",
    scale: 0.06,
    rotation: [Math.PI / 2, 0, 0],
  },
];

const expCards = [
  {
    review: "Designed and deployed secure network infrastructure using FortiGate firewall solutions to protect enterprise environments. Configured firewall policies, VPN access, and network segmentation to ensure secure connectivity between office and remote sites. Monitored network traffic, threats, and logs to proactively identify and mitigate security risks.",
    imgPath: "/images/exp1.png",
    logoPath: "/images/engineer.png",
    title: "IT Administrator",
	company: "Electra Surveying Engineering Services, Dubai, UAE",
    date: "July 2024 - Present",
    responsibilities: [
      "Managed day-to-day IT infrastructure including workstations, printers, and network devices across office and field operations.",
      "Configured and maintained FortiGate firewall, LAN/WAN networks, and secure connectivity for enterprise environments.",
      "Administered QNAP NAS storage, backups, and software licensing for survey and engineering applications.",
    ],
  },
  {
    review: "Designed and implemented centralized storage solutions using QNAP NAS to support large-scale engineering and survey data workflows. Managed user access, permissions, and shared directories to ensure secure and structured data handling across teams.",
    imgPath: "/images/exp2.png",
    logoPath: "/images/screen.png",
    title: "Junior IT Technician",
	company: "ISRO Propulsion Complex (IPRC), Mahendragiri",
    date: "January 2022 - June 2024",
    responsibilities: [
      "Performed maintenance, troubleshooting, and repair of computer systems and network equipment.",
      "Installed and configured operating systems, hardware components, and enterprise software.",
      "Maintained IT asset inventory, service logs, and supported structured government IT operations.",
    ],
  },
  {
    review: "Managed and maintained Windows-based IT infrastructure including system deployment, user account management, and enterprise software environments. Handled workstation setup, OS installation, and configuration to support daily engineering operations.",
    imgPath: "/images/exp3.png",
    logoPath: "/images/logo3.png",
    title: "Software Development & Systems Engineering Studies",
	company: "ICT Computer Education, Nagercoil & Greens Technologies, Chennai",
    date: "July 2020 - December 2021",
    responsibilities: [
      "Studied multi-language programming fundamentals including C, C++, Java, Python, and Swift programming.",
      "Learned web development concepts covering HTML, CSS, React JS, and modern web designing principles.",
      "Gained academic exposure to mobile application development using Android Studio and iOS Swift environments.",
	  "Understood backend development basics including PHP programming and server-side scripting concepts.",
	  "Studied database management fundamentals and administrative operations using phpMyAdmin.",
	  "Learned web hosting and server configuration concepts involving Apache and Nginx environments.",
	  "Practiced application development workflows using Microsoft Visual Studio IDE tools.",
	  "Developed foundational knowledge in debugging, performance optimization, and software testing practices.",
	  "Gained theoretical and lab-based understanding of full-stack architecture including frontend, backend, database, and hosting layers.",
    ],
  },
];

const expLogos = [
  {
    name: "engineer",
    imgPath: "/images/engineer.png",
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.png",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
  },
];

const testimonials = [
  {
    name: "Esther Howard",
	role: "General Manager",
    mentions: "Electra Surveying Engineering Services, Dubai",
    review:
      "I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
    imgPath: "/images/client1.png",
  },
  {
    name: "Wade Warren",
    mentions: "@wadewarren",
    review:
      "Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.",
    imgPath: "/images/client3.png",
  },
  {
    name: "Guy Hawkins",
    mentions: "@guyhawkins",
    review:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    imgPath: "/images/client2.png",
  },
  {
    name: "Marvin McKinney",
    mentions: "@marvinmckinney",
    review:
      "Adrian was a pleasure to work with. He turned our outdated website into a fresh, intuitive platform that’s both modern and easy to navigate. Fantastic work overall.",
    imgPath: "/images/client5.png",
  },
  {
    name: "Floyd Miles",
    mentions: "@floydmiles",
    review:
      "Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional!",
    imgPath: "/images/client4.png",
  },
  {
    name: "Albert Flores",
    mentions: "@albertflores",
    review:
      "Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend and backend dev are top-notch.",
    imgPath: "/images/client6.png",
  },
];

const socialImgs = [
  {
    name: "insta",
    imgPath: "/images/insta.png",
    link: "https://www.instagram.com/m.r_a_s_w_i_n__?igsh=bzFidzgwMGRydTJq",
  },
  {
    name: "fb",
    imgPath: "/images/fb.png",
    link: "https://www.facebook.com/share/17v93upVXo/",
  },
  {
    name: "x",
    imgPath: "/images/x.png",
    link: "https://x.com/YOUR_USERNAME",
  },
  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
    link: "https://www.linkedin.com/in/aswin-murugalingam-4a690931a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
};
