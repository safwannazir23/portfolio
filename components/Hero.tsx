"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const container = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(nameRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      delay: 0.5,
    })
      .from(
        imageRef.current,
        {
          scale: 0.8,
          opacity: 0,
          duration: 1,
        },
        "-=0.8"
      )
      .from(
        infoRef.current,
        {
          x: 50,
          opacity: 0,
          duration: 1,
        },
        "-=0.6"
      )
      .from(
        bioRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 1,
        },
        "-=0.4"
      );
  }, { scope: container });

  return (
    <section ref={container} className="relative min-h-screen pt-40 pb-20 px-8 flex flex-col justify-between overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12 z-10 w-full max-w-7xl mx-auto">
        {/* Name */}
        <div className="flex-1">
          <h1
            ref={nameRef}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none"
          >
            Safwan Nazir
          </h1>
        </div>

        {/* Portrait and Info Container */}
        <div className="flex flex-col md:flex-row gap-12 items-center md:items-end">
          {/* Portrait Image */}
          <div ref={imageRef} className="relative group">
            <div className="absolute -inset-4 border border-white/10 rounded-2xl -z-10 group-hover:scale-105 transition-transform duration-500"></div>
            {/* The actual grid background for the image like in mockup */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
              style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            <div className="w-64 h-80 relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
                alt="Safwan Nazir Portrait"
                fill
                className="object-cover"
                sizes="256px"
                priority
              />

            </div>
          </div>

          {/* About Info */}
          <div ref={infoRef} className="flex flex-col gap-8 max-w-xs">
            <div className="space-y-4 pt-12">
              <h3 className="text-xl font-bold uppercase tracking-widest text-white">About</h3>
              <div className="space-y-1 text-zinc-400 font-medium">
                <p>Software Developer</p>
                <p>Based in Srinagar</p>
                <p>1+ Years Experience</p>
                <p className="text-white">Open to Work</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bio at the bottom */}
      <div className="mt-20 z-10 w-full max-w-7xl mx-auto border-t border-white/5 pt-12">
        <div ref={bioRef} className="max-w-xl self-end ml-auto">
          <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed">
            When I'm not coding, you'll find me on the <span className="text-white">tennis court</span>, gaming, or sharing a good meal with friends.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
