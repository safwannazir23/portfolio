"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
interface ProficiencyItem {
  name: string;
  category: string;
}

const Proficiencies = ({ proficiencies }: { proficiencies: ProficiencyItem[] }) => {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Group proficiencies by category
  const groupedProficiencies = proficiencies?.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item.name);
    return acc;
  }, {} as Record<string, string[]>);

  const categories = groupedProficiencies ? Object.keys(groupedProficiencies) : [];

  useGSAP(() => {
    if (!proficiencies) return;
    // Title animation
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      x: -30,
      duration: 0.8,
      ease: "expo.out",
    });

    // Sections animation
    sectionRefs.current.forEach((section, index) => {
      if (!section) return;

      const sectionTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      });

      sectionTl.from(section, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "expo.out",
      })
        .from(section.querySelectorAll(".prof-item"), {
          x: 15,
          opacity: 0,
          stagger: 0.05,
          duration: 0.4,
          ease: "expo.out"
        }, "-=0.3");
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
          {categories.map((category, index) => (
            <div
              key={category}
              ref={(el) => { sectionRefs.current[index] = el; }}
              className="group"
            >
              <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-6 pb-12 border-b border-black/5 group-last:border-none">
                <h3 className="text-xl font-bold text-white uppercase tracking-widest sm:text-right">
                  {category}
                </h3>
                <ul className="flex flex-wrap sm:flex-col gap-x-6 gap-y-2 text-zinc-600 font-medium text-lg">
                  {groupedProficiencies[category].map((item: string) => (
                    <li key={item} className="prof-item text-white bg-red-500 transition-colors duration-300 px-2 py-1">
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
