"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const contactLinks = [
  { name: "Mail", href: "mailto:hello@safwan.dev" },
  { name: "GitHub", href: "https://github.com" },
  { name: "LinkedIn", href: "https://linkedin.com" },
];

const Contact = () => {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement|null)[]>([]);

  useGSAP(() => {
    gsap.from(titleRef.current, {
      scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
      opacity: 0, x: -50, duration: 1, ease: "power3.out"
    });

    linkRefs.current.forEach((link, index) => {
      if (!link) return;
      gsap.from(link, {
        scrollTrigger: { trigger: link, start: "top 95%" },
        opacity: 0, x: 20, duration: 0.6, delay: 0.2 + (index * 0.1), ease: "power3.out"
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-24 px-8 bg-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
        <div className="flex justify-start md:justify-end">
          <h2 ref={titleRef} className="text-5xl md:text-7xl font-bold tracking-tighter text-white">Contact</h2>
        </div>
        <div className="flex flex-col gap-6">
          {contactLinks.map((link, index) => (
            <a 
              key={link.name}
              href={link.href}
              ref={el => { linkRefs.current[index] = el; }}
              className="group flex items-center gap-3 text-2xl md:text-3xl font-bold text-zinc-500 hover:text-white transition-colors duration-500 w-fit"
            >
              <span>{link.name}</span>
              <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
