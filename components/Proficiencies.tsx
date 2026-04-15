"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const proficienciesData = [
  {
    category: "Skills",
    items: ["System Design", "Frontend Architecture", "Backend Logic", "Deployment"],
  },
  {
    category: "Tools",
    items: ["VS Code", "Antigravity", "Postman", "Notion", "Razorpay API"],
  },
  {
    category: "Tech Stack",
    items: ["React", "Next.js", "Framer Motion", "Express", "JavaScript (ES6+)", "Python", "SQL"],
  },
  {
    category: "Spoken Languages",
    items: ["English", "Kashmiri", "Urdu"],
  },
];

const Proficiencies = () => {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Title animation
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      x: -50,
      duration: 1,
      ease: "power3.out",
    });

    // Sections animation
    sectionRefs.current.forEach((section, index) => {
      if (!section) return;

      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out",
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-24 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
        {/* Left: Title */}
        <div className="flex justify-start md:justify-end">
          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold tracking-tighter text-red-500"
          >
            Proficiencies
          </h2>
        </div>

        {/* Right: Content */}
        <div className="flex flex-col gap-12">
          {proficienciesData.map((group, index) => (
            <div
              key={group.category}
              ref={(el) => { sectionRefs.current[index] = el; }}
              className="group"
            >
              <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-6 pb-12 border-b border-black/5 group-last:border-none">
                <h3 className="text-xl font-bold text-black uppercase tracking-widest sm:text-right">
                  {group.category}
                </h3>
                <ul className="flex flex-wrap sm:flex-col gap-x-6 gap-y-2 text-zinc-600 font-medium text-lg">
                  {group.items.map((item) => (
                    <li key={item} className="hover:text-black transition-colors duration-300">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Proficiencies;
