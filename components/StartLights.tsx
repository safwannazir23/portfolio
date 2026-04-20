"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const StartLights = () => {
  const container = useRef<HTMLDivElement>(null);
  const lightsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!container.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "+=400", // Sequence completes in first 400px of scroll
        scrub: 0.5,
        onLeave: () => {
          gsap.to(container.current, {
            y: -200,
            opacity: 0,
            duration: 0.8,
            ease: "power2.in"
          });
        },
        onEnterBack: () => {
          gsap.to(container.current, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      },
    });

    // 5 Red Lights Sequence
    lightsRef.current.forEach((light, i) => {
      if (!light) return;

      // Find the red circles in this light pair
      const reds = light.querySelectorAll('.light-red');

      tl.to(reds, {
        backgroundColor: "#ff0000",
        boxShadow: "0 0 30px #ff0000, 0 0 60px #ff0000",
        duration: 0.1,
      }, i * 0.15); // Staggering based on scroll
    });

    // Transition to Green (Lights Out)
    const allReds = document.querySelectorAll('.light-red');
    const allGreens = document.querySelectorAll('.light-green');

    tl.to(allReds, {
      backgroundColor: "#222",
      boxShadow: "none",
      duration: 0.05,
    }, 0.8)
      .to(allGreens, {
        backgroundColor: "#00ff00",
        boxShadow: "0 0 40px #00ff00, 0 0 80px #00ff00",
        duration: 0.05,
      }, 0.8)
      .to({}, { duration: 0.2 }); // Hold green for a bit

  }, { scope: container });

  return (
    <div
      ref={container}
      className="fixed top-10 left-1/2 -translate-x-1/2 z-[200] pointer-events-none flex flex-col items-center scale-90 md:scale-100"
    >
      <div className="bg-zinc-900 p-3 rounded-lg shadow-[0_15px_40px_rgba(0,0,0,0.5)] border-2 border-zinc-800 flex gap-2 pr-4 pl-4 relative">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            ref={(el) => { lightsRef.current[i] = el; }}
            className="flex flex-col gap-2 p-1.5 bg-zinc-950 rounded border border-white/5 relative overflow-hidden"
          >
            {/* LED 1 */}
            <div className="relative w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-900 transition-shadow duration-200">
              <div className="light-red absolute inset-0 rounded-full bg-red-600"></div>
              <div className="light-green absolute inset-0 rounded-full bg-red-600"></div>
            </div>
            {/* LED 2 */}
            <div className="relative w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-900 transition-shadow duration-200">
              <div className="light-red absolute inset-0 rounded-full bg-red-600"></div>
              <div className="light-green absolute inset-0 rounded-full bg-red-600"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartLights;
