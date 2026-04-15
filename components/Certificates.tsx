"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const certificatesData = [
  { name: "Software Architecture Foundations", year: "2025", provider: "LinkedIn Learning" },
  { name: "Infosys Foundation’s Certificate Course on Artificial Intelligence", year: "2025", provider: "Infosys" },
  { name: "Harvard University’s  CS50", year: "2024", provider: "edX" },
  { name: "Web Development Bootcamp", year: "2024", provider: "Udemy" },
  { name: "Al Fluency Framework & Foundations", year: "2026", provider: "Anthropic" },
  { name: "Claude 101", year: "2026", provider: "Anthropic" },
  { name: "Claude Code in Action", year: "2026", provider: "Anthropic" },
];

const Certificates = () => {
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
        opacity: 0, y: 20, duration: 0.6, delay: index * 0.1, ease: "power3.out"
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-24 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
        <div className="flex justify-start md:justify-end">
          <h2 ref={titleRef} className="text-5xl md:text-7xl font-bold tracking-tighter text-red-500">Certificates</h2>
        </div>
        <div className="flex flex-col gap-10">
          {certificatesData.map((cert, index) => (
            <div key={index} ref={el => { itemRefs.current[index] = el; }} className="pb-6 border-b border-black/5 last:border-none">
              <h3 className="text-xl font-bold text-black mb-2">{cert.name}</h3>
              <p className="text-zinc-600 font-medium">{cert.year} at {cert.provider}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
