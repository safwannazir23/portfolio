"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LayoutGrid, Sparkles, Zap } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projectsData = [
  {
    title: "KampBuzz",
    description: "MERN, AWS S3, Postman, Figma, Vercel",
    icon: LayoutGrid,
    color: "text-zinc-400",
    link: "https://github.com/safwannazir923/kampbuzz"
  },
  {
    title: "Notes App",
    description: "React.js, Tailwind CSS, Node.js, MongoDB, Vercel",
    icon: Sparkles,
    color: "text-orange-400",
    link: "https://github.com/safwannazir923/notes_app"
  }
];

const Projects = () => {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useGSAP(() => {
    gsap.from(titleRef.current, {
      scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
      opacity: 0, x: -50, duration: 1, ease: "power3.out"
    });

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 90%" },
        opacity: 0, scale: 0.95, y: 30, duration: 0.2, ease: "power3.out"
      });
    });
  }, { scope: container });

  const onCardEnter = (index: number) => {
    gsap.to(cardRefs.current[index], {
      y: -10,
      scale: 1.02,
      borderColor: "rgba(0,0,0,0.2)",
      backgroundColor: "rgba(255,255,255,1)",
      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      duration: 0.2,
      ease: "power2.out"
    });
  };

  const onCardLeave = (index: number) => {
    gsap.to(cardRefs.current[index], {
      y: 0,
      scale: 1,
      borderColor: "rgba(0,0,0,0.05)",
      backgroundColor: "rgba(255,255,255,0.8)",
      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      duration: 0.2,
      ease: "power2.inOut"
    });
  };

  return (
    <section ref={container} className="py-24 px-8 relative">
      {/* Decorative grid for projects section */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] z-0 opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 relative z-10">
        <div className="flex justify-start md:justify-end">
          <h2 ref={titleRef} className="text-5xl md:text-7xl font-bold tracking-tighter text-red-500">Projects</h2>
        </div>
        <div className="flex flex-col gap-6 w-full max-w-md">
          {projectsData.map((project, index) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              ref={el => { cardRefs.current[index] = el; }}
              onMouseEnter={() => onCardEnter(index)}
              onMouseLeave={() => onCardLeave(index)}
              className="group flex items-center gap-6 p-6 rounded-2xl bg-white/80 border border-black/5 transition-all duration-500 cursor-pointer shadow-lg backdrop-blur-sm"
            >
              <div className={`p-4 rounded-xl bg-zinc-50 border border-black/5 group-hover:bg-white group-hover:rotate-6 transition-all duration-500 shadow-sm ${project.color}`}>
                <project.icon className="w-8 h-8" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-black mb-1 tracking-tight">{project.title}</h3>
                <p className="text-zinc-600 font-medium text-sm">{project.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
