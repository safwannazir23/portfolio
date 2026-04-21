"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Briefcase, MapPin } from "lucide-react";
import { storage } from "three/webgpu";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const workData = [
  {
    role: "Software Developer Intern",
    status: "Current",
    duration: "JAN 2025 - Now",
    company: "EnableNow Technology Solutions",
    location: "Srinagar",
    description: "At EnableNow Technology Solutions I strengthened my frontend developent skills. Collaborated with the team to develop and maintain web applications using Next.js, GSAP, Tailwind CSS",
  },
  {
    role: "Software Developer Intern",
    duration: "AUG 2025 - JAN 2025",
    company: "Flattr",
    location: "Srinagar",
    description: "Built and maintained 20+ APIs of the system - used Node.js, and Express.js to develop the backend API, and MongoDB for data storage.  Refactored front-end code by optimizing API routes for efficient data fetching, improving output formatting, enhancing data handling to streamline development, and feature testing"
  },
  {
    role: "Full-Stack Engineer Intern",
    duration: "FEB 2024 - AUG 2024",
    company: "WazirOne",
    location: "Srinagar",
    description: "Collaborated with a team of 4 developers to design, develop, and deploy web applications in an agile environment tailored to client requirements. Built and maintained front-end and back-end components of the system - used React.js as a front-end library, Shad/cn and Tailwind CSS for UI, Node.js, and Express.js to develop the backend API, MongoDB and AWS S3 for storage, and Vercel automatic CI and CD.",
  }
  ,
  {
    role: "Frontend Engineer Intern",
    duration: "NOV 2023 - JAN 2024",
    company: "Eonify Tech",
    location: "Srinagar",
    description: " Collaborated with a team of 3 developers to design and develop a web-based LMS application. Developed a responsive and dynamic front-end for an LMS-based application using React.js library and Bootstrap for styling components, and integrated WebSocket for real-time chat functionality.",
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
      x: -30,
      duration: 0.8,
      ease: "expo.out",
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
        y: 20,
        duration: 0.6,
        delay: index * 0.1,
        ease: "expo.out",
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
            className="text-5xl md:text-7xl font-bold tracking-tighter text-red-500 h-fit"
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
                  <h3 className="text-2xl font-bold text-white">{item.role}</h3>
                  {item.status && (
                    <span className="px-3 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider border border-orange-200">
                      {item.status}
                    </span>
                  )}
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-6 text-white text-sm font-medium">
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
                <p className="text-lg text-white leading-relaxed max-w-xl bg-red-500 px-2 py-1">
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
