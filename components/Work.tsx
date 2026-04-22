"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Briefcase, MapPin } from "lucide-react";
interface WorkItem {
  role: string;
  status?: string;
  duration: string;
  company: string;
  location: string;
  description: string;
}

const Work = ({ work }: { work: WorkItem[] }) => {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!work) return;
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
          {work?.map((item, index) => (
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
