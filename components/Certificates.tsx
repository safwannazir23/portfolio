"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CertificateItem {
  title: string;
  date: string;
  issuer: string;
  link?: string;
}

const Certificates = ({ certificates }: { certificates: CertificateItem[] }) => {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!certificates) return;
    gsap.from(titleRef.current, {
      scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
      opacity: 0, x: -30, duration: 0.8, ease: "expo.out"
    });

    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: "top 90%" },
        opacity: 0, y: 15, duration: 0.5, delay: index * 0.05, ease: "expo.out"
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
          {certificates?.map((cert, index) => (
            <div key={index} ref={el => { itemRefs.current[index] = el; }} className="p-2 border-b border-black/5 last:border-none bg-red-500">
              <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
              <p className="text-white font-medium">{cert.date} at {cert.issuer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
