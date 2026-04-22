"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, GraduationCap, MapPin } from "lucide-react";

interface EducationItem {
  degree: string;
  tag?: string;
  duration: string;
  institution: string;
  location: string;
  description: string;
}

const Education = ({ education }: { education: EducationItem[] }) => {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!education) return;
    gsap.from(titleRef.current, {
      scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
      opacity: 0, x: -30, duration: 0.8, ease: "expo.out"
    });

    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: "top 90%" },
        opacity: 0, y: 20, duration: 0.6, delay: index * 0.08, ease: "expo.out"
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-24 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
        <div className="flex justify-start md:justify-end">
          <h2 ref={titleRef} className="text-5xl md:text-7xl font-bold tracking-tighter text-red-500">Education</h2>
        </div>
        <div className="flex flex-col gap-12">
          {education?.map((item, index) => (
            <div key={index} ref={el => { itemRefs.current[index] = el; }} className="pb-12 border-b border-black/5 last:border-none">
              <div className="flex flex-col gap-4 text-left">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-bold text-white leading-tight">{item.degree}</h3>
                  {item.tag && <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 text-[10px] font-bold uppercase tracking-widest border border-black/10">{item.tag}</span>}
                </div>
                <div className="flex flex-wrap items-center gap-6 text-white text-sm">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{item.duration}</span></div>
                  <div className="flex items-center gap-2"><GraduationCap className="w-4 h-4" /><span>{item.institution}</span></div>
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>{item.location}</span></div>
                </div>
                <p className="text-white bg-red-500 px-2 py-1 text-lg leading-relaxed max-w-xl">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
