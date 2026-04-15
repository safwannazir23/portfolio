"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Briefcase, MapPin } from "lucide-react";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const workData = [
  {
    role: "Full-Stack Developer",
    status: "Current",
    duration: "2022 - Now",
    company: "Lumina Tech",
    location: "Berlin",
    description: "At Lumina Tech I strengthened my foundation in algorithms, data structures, and software engineering.",
  },
  {
    role: "Junior Developer",
    duration: "2017 - 2019",
    company: "Toijuh",
    location: "Tokyo",
    description: "Supported front- and back-end development on client projects and internal tools, gaining hands-on coding experience in real-world environments.",
  },
  {
    role: "Internship",
    duration: "2016 - 2017",
    company: "Cloudel",
    location: "Berlin",
    description: "Assisted in developing cloud-based features and automation tools while learning agile workflows and dev best practices.",
  },
];

const Work = () => {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Title animation
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      x: -50,
      duration: 1,
      ease: "power3.out",
    });

    // Items animation
    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: index * 0.15,
        ease: "power3.out",
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-32 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
        {/* Left: Title */}
        <div className="flex justify-start md:justify-end">
          <h2 
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold tracking-tighter text-black h-fit"
          >
            Work
          </h2>
        </div>

        {/* Right: Work Items */}
        <div className="flex flex-col gap-12">
          {workData.map((item, index) => (
            <div 
              key={item.role + index}
              ref={(el) => { itemRefs.current[index] = el; }}
              className="pb-12 border-b border-black/5 last:border-none"
            >
              <div className="flex flex-col gap-4">
                {/* Role and Status */}
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-bold text-black">{item.role}</h3>
                  {item.status && (
                    <span className="px-3 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider border border-orange-200">
                      {item.status}
                    </span>
                  )}
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-6 text-zinc-500 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{item.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    <span>{item.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-lg text-zinc-600 leading-relaxed max-w-xl">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
