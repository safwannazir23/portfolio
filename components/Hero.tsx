"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/Observer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}

const Hero = () => {
  const container = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".char", {
      y: 140,
      opacity: 0,
      stagger: 0.05,
      duration: 1,
      ease: "power4.out",
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

    // Advanced Marquee Animation
    const marqueeItems = gsap.utils.toArray(".marquee-item");
    const loop = horizontalLoop(marqueeItems, {
      repeat: -1,
      paddingRight: 50,
      speed: 1.5,
    });

    Observer.create({
      onChangeY(self) {
        let factor = 2.5;
        gsap
          .timeline({
            defaults: {
              ease: "none",
            },
          })
          .to(loop, { timeScale: factor * 2.5, duration: 0.2, overwrite: true })
          .to(loop, { timeScale: 1, duration: 1 }, "+=0.3");
      },
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative min-h-screen pt-40 pb-20 px-8 flex flex-col justify-between overflow-hidden">

      {/* Removed local background grid as global is now active */}


      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 z-10 w-full mx-auto">
        {/* Name */}
        <div className="flex-1">
          <h1
            ref={nameRef}
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-none py-2 overflow-hidden whitespace-nowrap"
          >
            {"SAFWAN NAZIR".split("").map((char, index) => (
              <span key={index} className="char inline-block min-w-[0.1em]">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
        </div>

        {/* Portrait and Info Container */}
        <div className="flex flex-col md:flex-row gap-12 items-center md:items-end">
          {/* Portrait Image */}

          {/* GSAP Marquee */}
          <div className="absolute top-[45vh] left-0 w-full overflow-hidden whitespace-nowrap pointer-events-none z-0">
            <div className="marquee-inner flex whitespace-nowrap text-[18vw] font-black uppercase leading-none text-red-500 select-none">
              <span className="marquee-item mr-20">HELLO WORLD</span>
              <span className="marquee-item mr-20">HELLO WORLD</span>
              <span className="marquee-item mr-20">HELLO WORLD</span>
              <span className="marquee-item mr-20">HELLO WORLD</span>
              <span className="marquee-item mr-20">HELLO WORLD</span>
              <span className="marquee-item mr-20">HELLO WORLD</span>
            </div>
          </div>

          {/* About Info */}
          <div ref={infoRef} className="flex flex-col gap-2 max-w-xs">
            <div className="space-y-4 mt-6">
              <div className="space-y-1 text-zinc-600 font-medium bg-red-500 p-2">
                <p className="bg-white p-1">Software Developer</p>
                <p className="bg-white p-1">Based in Srinagar</p>
                <p className="bg-white p-1">1+ Years Experience</p>
                <p className="text-white p-1">Open to Work</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bio at the bottom */}
      <div className="mt-20 z-10 w-full max-w-7xl mx-auto pt-12">
        <div ref={bioRef} className="max-w-xl self-end ml-auto">
          <p className="text-xl md:text-2xl leading-relaxed hover:bg-red-500 hover:text-white hover:p-2 transition-all duration-300">
            When I'm not coding, you'll find me on the <span className="text-black font-semibold">tennis court</span>, gaming, or sharing a good meal with friends.
          </p>
        </div>
      </div>
    </section>
  )
};


export default Hero;

/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.
*/
function horizontalLoop(items: any[], config: any) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: "none" },
    onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
  }),
    length = items.length,
    startX = items[0].offsetLeft,
    times: any[] = [],
    widths: any[] = [],
    xPercents: any[] = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v: any) => v : gsap.utils.snap(config.snap || 1),
    totalWidth: number,
    curX: number,
    distanceToStart: number,
    distanceToLoop: number,
    item: any,
    i: number;

  gsap.set(items, {
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px") as string) / w) * 100 + (gsap.getProperty(el, "xPercent") as number)
      );
      return xPercents[i];
    },
  });
  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth * (gsap.getProperty(items[length - 1], "scaleX") as number) +
    (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop = distanceToStart + widths[i] * (gsap.getProperty(item, "scaleX") as number);
    tl.to(
      item,
      { xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100), duration: distanceToLoop / pixelsPerSecond },
      0
    )
      .fromTo(
        item,
        { xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100) },
        {
          xPercent: xPercents[i],
          duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index: number, vars: any) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 && (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  tl.next = (vars: any) => toIndex(curIndex + 1, vars);
  tl.previous = (vars: any) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index: number, vars: any) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}
