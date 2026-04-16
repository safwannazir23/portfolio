"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface LapFinishedIndicatorProps {
  lap: number;
}

const LapFinishedIndicator = ({ lap }: LapFinishedIndicatorProps) => {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineTop = useRef<HTMLDivElement>(null);
  const lineBottom = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(lineTop.current, { scaleX: 0, duration: 1, ease: "power4.inOut" })
      .from(lineBottom.current, { scaleX: 0, duration: 1, ease: "power4.inOut" }, "-=0.8")
      .from(textRef.current, {
        y: 40,
        opacity: 0,
        filter: "blur(4px)",
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.5");
  }, { scope: container });

  return (
    <div
      ref={container}
      className="relative w-full py-16 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-4 bg-checkered opacity-30"></div>
      <div className="absolute inset-x-0 bottom-0 h-4 bg-checkered opacity-30"></div>

      {/* Finishing Lines */}
      <div ref={lineTop} className="w-full h-1 bg-red-600 mb-8 transform origin-center"></div>

      <div ref={textRef} className="z-10 flex flex-col items-center px-4">
        <div className="flex flex-col items-center">
            <h3 className="text-4xl md:text-6xl font-black italic tracking-tighter text-black uppercase leading-tight">
                {lap === 7 ? "RACE COMPLETE" : <>LAP <span className="text-red-600">{lap}</span> COMPLETE</>}
            </h3>
            <div className="h-0.5 w-24 bg-red-600 mt-2"></div>
        </div>
        
        <div className="flex gap-12 mt-6">
            <div className="flex flex-col items-center">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em]">Status</span>
                <span className="text-sm font-bold text-zinc-400 mt-1 uppercase">{lap === 7 ? "Checkered Flag" : "Green Flag"}</span>
            </div>
            <div className="flex flex-col items-center border-x border-zinc-200 px-12">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em]">Next Stage</span>
                <span className="text-sm font-bold text-black mt-1 uppercase italic">{lap === 7 ? "Podium" : `Sector ${lap + 1}`}</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em]">Interval</span>
                <span className="text-sm font-bold text-red-600 mt-1 uppercase">{lap === 7 ? "P1" : "+0.000s"}</span>
            </div>
        </div>
      </div>

      <div ref={lineBottom} className="w-full h-1 bg-red-600 mt-8 transform origin-center"></div>
    </div>
  );
};

export default LapFinishedIndicator;
