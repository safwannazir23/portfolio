"use client";

import React, { useRef } from "react";
import { Menu } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const NavBar = () => {
  const navRef = useRef(null);

  useGSAP(() => {
    const showAnim = gsap.from(navRef.current, {
      yPercent: -100,
      paused: true,
      duration: 0.2
    }).progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        self.direction === -1 ? showAnim.play() : showAnim.reverse();
      }
    });
  }, { scope: navRef });

  return (
    <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-checkered border-b-2 border-black h-16">

    </nav>
  );
};

export default NavBar;
