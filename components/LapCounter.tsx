"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LapCounter = () => {
  const [currentLap, setCurrentLap] = useState(1);
  const totalLaps = 7;
  const lapRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const sections = [
      "#hero",
      "#proficiencies",
      "#work",
      "#education",
      "#certificates",
      "#projects",
      "#contact",
    ];

    sections.forEach((id, index) => {
      ScrollTrigger.create({
        trigger: id,
        start: "top center",
        end: "bottom center",
        onEnter: () => setCurrentLap(index + 1),
        onEnterBack: () => setCurrentLap(index + 1),
      });
    });
  }, []);

  // Animate on lap change
  useEffect(() => {
    if (lapRef.current) {
      gsap.fromTo(lapRef.current,
        { scale: 1.5, color: "#ef4444" },
        { scale: 1, color: "#000000", duration: 0.5, ease: "back.out(2)" }
      );
    }
  }, [currentLap]);

  return (
    <div className="fixed bottom-10 right-10 z-[100] pointer-events-none sm:block hidden">
      <div className="flex flex-col items-end">
        <div className="bg-black text-white px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase mb-1">
          Telemetry Active
        </div>
        <div className="flex items-baseline gap-2 bg-white/80 backdrop-blur-md border-2 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-zinc-400 uppercase leading-none">Lap</span>
            <span ref={lapRef} className="text-6xl font-black italic tracking-tighter leading-none text-black">
              {currentLap}
            </span>
          </div>
          <div className="h-10 w-px bg-zinc-200 self-center mx-2"></div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-zinc-400 uppercase leading-none">Total</span>
            <span className="text-3xl font-black text-red-500 italic leading-none">
              {totalLaps}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LapCounter;
