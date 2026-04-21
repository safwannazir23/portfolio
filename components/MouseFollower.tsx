"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const MouseFollower = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const followers = container.current?.querySelectorAll(".follower");
    if (!followers) return;

    // Initial state: centered and hidden
    gsap.set(followers, {
      xPercent: -50,
      yPercent: -50,
      opacity: 0
    });

    const xSetters = Array.from(followers).map(f => gsap.quickSetter(f, "x", "px"));
    const ySetters = Array.from(followers).map(f => gsap.quickSetter(f, "y", "px"));
    const opacitySetters = Array.from(followers).map(f => gsap.quickSetter(f, "opacity"));

    const onMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      followers.forEach((_, i) => {
        // Use quickSetter for high-frequency updates
        if (i === 0) {
            xSetters[i](clientX);
            ySetters[i](clientY);
            opacitySetters[i](1);
        } else {
            // Add a slight lag for the second layer using conventional tween but with very short duration
            gsap.to(followers[i], {
              x: clientX,
              y: clientY,
              opacity: 1,
              duration: 0.1,
              ease: "power2.out"
            });
        }
      });
    };

    const onLeave = () => {
      gsap.to(followers, { opacity: 0, duration: 0.4, ease: "power2.inOut" });
    };

    const onEnter = () => {
      gsap.to(followers, { opacity: 1, duration: 0.4, ease: "power2.inOut" });
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, { scope: container });

  return (
    <div ref={container} className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Layer 1: Core Aim */}
      <div className="follower absolute w-4 h-4 border-2 border-red-600 rounded-full flex items-center justify-center">
        <div className="w-1 h-1 bg-red-600 rounded-full"></div>
      </div>

      {/* Layer 2: Motion Blur */}
      <div className="follower absolute w-8 h-8 border border-red-500/30 rounded-full bg-red-500/5 blur-[2px]"></div>

    </div>
  );
};

export default MouseFollower;
