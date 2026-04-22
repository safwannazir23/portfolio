"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as LucideIcons from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";

interface Project {
  title: string;
  description: string;
  icon: string;
  link: string;
  mainImage?: any;
}

const Projects = ({ projects }: { projects: Project[] }) => {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useGSAP(() => {
    if (!projects) return;
    gsap.from(titleRef.current, {
      scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
      opacity: 0, x: -30, duration: 0.8, ease: "expo.out"
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
      duration: 0.1,
      ease: "power2.out"
    });
  };

  const onCardLeave = (index: number) => {
    gsap.to(cardRefs.current[index], {
      y: 0,
      scale: 1,
      duration: 0.1,
      ease: "power2.inOut"
    });
  };

  return (
    <section ref={container} className="py-24 px-8 relative">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] z-0 opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 relative z-10">
        <div className="flex justify-start md:justify-end">
          <h2 ref={titleRef} className="text-5xl md:text-7xl font-bold tracking-tighter text-red-500">Projects</h2>
        </div>
        <div className="flex flex-col gap-6 w-full max-w-md">
          {projects?.map((project, index) => {
            const IconComponent = (LucideIcons as any)[project.icon] || LucideIcons.LayoutGrid;
            return (
              <a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                ref={el => { cardRefs.current[index] = el; }}
                onMouseEnter={() => onCardEnter(index)}
                onMouseLeave={() => onCardLeave(index)}
                className="group flex flex-col gap-6 p-6 bg-red-500 transition-all duration-500 cursor-pointer shadow-lg backdrop-blur-sm"
              >
                {project.mainImage && (
                  <div className="w-full h-64 relative overflow-hidden bg-black/10">
                    <Image
                      src={urlFor(project.mainImage).url()}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white/10 rounded-lg">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-1 tracking-tight">{project.title}</h3>
                    <p className="text-white font-medium text-smOpacity-80">{project.description}</p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
