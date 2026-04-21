"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, GraduationCap, MapPin } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const educationData = [
  {
    degree: "Bachelor of Technology in Computer Science and Engineering",
    tag: "Highest",
    duration: "2021 - 2025",
    institution: "IUST",
    location: "Awantipora, J&K",
    description: "DSA, OOPS, OS, DBMS, Software Engineering, Computer Networks, Cryptography, C/C++/Java Programming, Computer Architecture and Organisation, Microprocessors, AI, ML, NLP, FLAT, Compiler Design, Linux Internals, Discrete Mathematics, HPC, IoT, Digital Image Processing, and Organisational Behaviour. ",
  },
  {
    degree: "Higher Secondary School",
    duration: "2007 - 2019",
    institution: "Burn Hall",
    location: "Srinagar",
    description: "Completed my Higher Secondary School with a focus on Science stream, gaining a strong foundation in Physics, Chemistry, and Mathematics.",
  },
];

const Education = () => {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.from(titleRef.current, {
      scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
      opacity: 0, x: -50, duration: 1, ease: "power3.out"
    });

    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: "top 90%" },
        opacity: 0, y: 30, duration: 0.8, delay: index * 0.1, ease: "power3.out"
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
          {educationData.map((item, index) => (
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
