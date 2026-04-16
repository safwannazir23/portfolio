"use client";

import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const sections = [
    { id: "hero", label: "START", lap: 1 },
    { id: "proficiencies", label: "PROFICIENCIES", lap: 2 },
    { id: "work", label: "WORK", lap: 3 },
    { id: "education", label: "EDUCATION", lap: 4 },
    { id: "certificates", label: "CERTIFICATES", lap: 5 },
    { id: "projects", label: "PROJECTS", lap: 6 },
    { id: "contact", label: "CONTACT", lap: 7 },
];

const SectionNavigator = () => {
    const [activeSection, setActiveSection] = useState("hero");

    useGSAP(() => {
        sections.forEach((section) => {
            ScrollTrigger.create({
                trigger: `#${section.id}`,
                start: "top center",
                end: "bottom center",
                onEnter: () => setActiveSection(section.id),
                onEnterBack: () => setActiveSection(section.id),
            });
        });
    }, []);

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = element.offsetTop;
            window.scrollTo({
                top: offset,
                behavior: "smooth",
            });
        }
    };

    return (
        <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-1 pointer-events-auto sm:flex hidden">
            {sections.map((section, index) => (
                <button
                    key={section.id}
                    onClick={() => scrollTo(section.id)}
                    className="group relative flex items-center outline-none"
                    aria-label={`Scroll to ${section.label}`}
                >
                    {/* Shadow Layer for Stacked Effect */}
                    <div className={`absolute inset-0 bg-red-600 transform skew-x-[-15deg] transition-all duration-300 translate-x-1 translate-y-1 ${activeSection === section.id ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                        }`}></div>

                    {/* Main Tag Body */}
                    <div className={`relative px-4 py-2 transform skew-x-[-15deg] transition-all duration-300 border-l-2 ${activeSection === section.id
                            ? "bg-black text-white border-red-600 translate-x-2"
                            : "bg-white/80 backdrop-blur-sm text-black border-black border opacity-70 group-hover:opacity-100 group-hover:bg-black group-hover:text-white"
                        }`}>
                        <div className="flex items-center gap-3 transform skew-x-[15deg]">
                            <span className={`text-[10px] font-mono font-bold ${activeSection === section.id ? "text-red-500" : "text-zinc-400 group-hover:text-red-500"
                                }`}>
                                0{section.lap}
                            </span>
                            <span className="text-xs font-black italic tracking-[0.2em] whitespace-nowrap">
                                {section.label}
                            </span>
                        </div>
                    </div>

                    {/* Active Pointer */}
                    {activeSection === section.id && (
                        <div className="absolute -left-2 w-1 h-full bg-red-600"></div>
                    )}
                </button>
            ))}

            {/* Telemetry Line */}
            <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-zinc-200 -z-10"></div>
        </nav>
    );
};

export default SectionNavigator;
