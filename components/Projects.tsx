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
    title: "Shelf",
    description: "Digital Library for Developers",
    icon: LayoutGrid,
    color: "text-zinc-400"
  },
  {
    title: "Locale",
    description: "Lightweight Content Localization",
    icon: Sparkles,
    color: "text-orange-400"
  },
  {
    title: "Taskly",
    description: "Minimal Task Manager",
    icon: Zap,
    color: "text-blue-400"
  },
];

const Projects = () => {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement|null)[]>([]);

  useGSAP(() => {
    gsap.from(titleRef.current, {
      scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
      opacity: 0, x: -50, duration: 1, ease: "power3.out"
    });

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 90%" },
        opacity: 0, scale: 0.95, y: 30, duration: 0.8, delay: index * 0.1, ease: "power3.out"
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-24 px-8 relative">
       {/* Decorative grid for projects section */}
       <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] z-0 opacity-10 pointer-events-none"
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 relative z-10">
        <div className="flex justify-start md:justify-end">
          <h2 ref={titleRef} className="text-5xl md:text-7xl font-bold tracking-tighter text-black">Projects</h2>
        </div>
        <div className="flex flex-col gap-6 w-full max-w-md">
          {projectsData.map((project, index) => (
            <div 
              key={project.title} 
              ref={el => { cardRefs.current[index] = el; }}
              className="group flex items-center gap-6 p-6 rounded-2xl bg-white/80 border border-black/5 hover:bg-white hover:border-black/20 transition-all duration-500 cursor-pointer shadow-lg backdrop-blur-sm"
            >
              <div className={`p-4 rounded-xl bg-zinc-50 border border-black/5 group-hover:scale-110 transition-transform duration-500 shadow-sm ${project.color}`}>
                <project.icon className="w-8 h-8" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-black mb-1 tracking-tight">{project.title}</h3>
                <p className="text-zinc-600 font-medium text-sm">{project.description}</p>
              </div>
            </div>
          ))}
          <button className="mt-4 text-zinc-600 font-bold uppercase tracking-widest text-xs hover:text-black transition-colors duration-300 w-fit">
            Load More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
