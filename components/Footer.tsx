"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Footer = () => {
  const container = useRef<HTMLDivElement>(null);
  const leftFlag = useRef<HTMLDivElement>(null);
  const rightFlag = useRef<HTMLDivElement>(null);
  const leftCloth = useRef<HTMLDivElement>(null);
  const rightCloth = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 90%",
        toggleActions: "play none none none",
      }
    });

    // Entrance animation
    tl.from([leftFlag.current, rightFlag.current], {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      stagger: 0.1
    })
      .from(leftFlag.current, { x: -100, rotation: -20, duration: 1.2, ease: "back.out(1.7)" }, "-=0.8")
      .from(rightFlag.current, { x: 100, rotation: 20, duration: 1.2, ease: "back.out(1.7)" }, "-=1.2");

    // Continuous Waving Animation for Left Flag
    gsap.to(leftCloth.current, {
      skewY: 5,
      scaleX: 0.95,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Continuous Waving Animation for Right Flag (offset)
    gsap.to(rightCloth.current, {
      skewY: -5,
      scaleX: 0.95,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.2
    });

    // Subtle Pole Sway
    gsap.to([leftFlag.current, rightFlag.current], {
      rotation: (i) => i === 0 ? "+=2" : "-=2",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, { scope: container });

  return (
    <footer ref={container} className="relative py-32 px-8 overflow-hidden border-t border-black/5">
      {/* Left Flag */}
      <div
        ref={leftFlag}
        className="hidden md:flex absolute left-16 md:left-24 bottom-0 flex-col items-center pointer-events-none origin-bottom"
      >
        {/* Pole Finial */}
        <div className="w-4 h-4 bg-zinc-800 rounded-full mb-[-4px] shadow-md z-20" />
        {/* Pole */}
        <div className="w-1.5 h-64 bg-gradient-to-b from-zinc-700 to-black rounded-t-full shadow-lg z-10" />
        {/* Flag Cloth */}
        <div
          ref={leftCloth}
          className="absolute top-6 left-1 w-40 h-24 bg-checkered border-2 border-zinc-900 rounded-sm shadow-2xl origin-left"
          style={{
            boxShadow: 'inset -20px 0 50px rgba(0,0,0,0.1)',
            transformStyle: 'preserve-3d'
          }}
        />
      </div>

      {/* Right Flag */}
      <div
        ref={rightFlag}
        className="hidden md:flex absolute right-16 md:right-24 bottom-0 flex-col items-center pointer-events-none origin-bottom"
      >
        <div className="w-4 h-4 bg-zinc-800 rounded-full mb-[-4px] shadow-md z-20" />
        <div className="w-1.5 h-64 bg-gradient-to-b from-zinc-700 to-black rounded-t-full shadow-lg z-10" />
        <div
          ref={rightCloth}
          className="absolute top-6 right-1 w-40 h-24 bg-checkered border-2 border-zinc-900 rounded-sm shadow-2xl origin-right"
          style={{
            boxShadow: 'inset 20px 0 50px rgba(0,0,0,0.1)',
            transformStyle: 'preserve-3d'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center relative z-0">
        <div className="mb-8 p-4 bg-red-600 text-white px-8 rotate-[-2deg] shadow-2xl inline-block">
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">
            FINISH LINE
          </h3>
        </div>

        <p className="text-xl text-zinc-500 font-medium max-w-lg leading-relaxed mb-12">
          Congratulations! You've successfully navigated through the track.
          Ready to start the next project?
        </p>

        <a
          href="mailto:sawfan.nazir@enablenow.com"
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, {
              scale: 1.1,
              backgroundColor: "#b91c1c",
              boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.2)",
              duration: 0.3
            });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, {
              scale: 1,
              backgroundColor: "#dc2626",
              boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
              duration: 0.3
            });
          }}
          className="px-12 py-4 bg-red-600 text-white font-black uppercase tracking-[0.2em] rounded-none shadow-xl mb-16 inline-block"
        >
          Get In Touch
        </a>

        <div className="mx-auto">
          <p
            onMouseEnter={(e) => gsap.to(e.currentTarget, { letterSpacing: "0.3em", color: "#000", duration: 0.5 })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { letterSpacing: "0.2em", color: "#52525b", duration: 0.5 })}
            className="text-sm font-bold text-zinc-600 uppercase tracking-[0.2em] cursor-default transition-all"
          >
            &copy; {new Date().getFullYear()} SAFWAN NAZIR
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
