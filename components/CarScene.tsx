"use client";

import React, { useRef, Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, PerspectiveCamera, ContactShadows } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Preload the model
useGLTF.preload("/model/f1.glb");

const CarModel = ({ params }: { params: any }) => {
  const { scene } = useGLTF("/model/f1.glb");
  const modelRef = useRef<THREE.Group>(null);
  const vibrationRef = useRef<THREE.Group>(null);

  useGSAP(() => {
    if (!modelRef.current) return;

    // Power Refresh to ensure correct scroll height
    const scrollTask = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: params.scrub,
        invalidateOnRefresh: true,
      },
    });

    // We define the starting position directly in the first frame of the timeline
    // This prevents "jumps" during refreshes
    tl.set(modelRef.current.position, { y: params.startY, x: 0 }, 0);

    const totalSections = params.sections || 7;

    for (let i = 0; i < totalSections; i++) {
      const nextY = params.startY - ((i + 1) * (params.startY - params.endY) / totalSections);

      tl.to(modelRef.current.position, {
        y: nextY,
        ease: "power2.inOut",
        duration: params.moveDuration
      });

      tl.to(modelRef.current.position, {
        y: nextY,
        duration: params.pauseDuration
      });
    }

    // Vibration on the INNER group so it doesn't fight with the scroll position
    if (vibrationRef.current) {
      gsap.killTweensOf(vibrationRef.current.position);
      gsap.to(vibrationRef.current.position, {
        y: `+=${params.vibration}`,
        repeat: -1,
        yoyo: true,
        duration: 0.1,
        ease: "none"
      });
    }

    return () => {
      clearTimeout(scrollTask);
      tl.kill();
    };

  }, { dependencies: [scene, params] });

  return (
    <group ref={modelRef} scale={params.scale} rotation={[Math.PI / 2.5, 0, 0]}>
      {/* Vibration happens on this inner group */}
      <group ref={vibrationRef}>
        <primitive object={scene} />
      </group>
    </group>
  );
};

const CarScene = () => {
  const [params, setParams] = useState({
    scale: 0.6,
    scrub: 1.9,
    startY: 6,
    endY: -6.5,
    sections: 7,
    moveDuration: 1,
    pauseDuration: 0.6,
    vibration: 0.01,
    ambientIntensity: 0.8,
    spotIntensity: 3,
    dirIntensity: 2
  });

  const [isOpen, setIsOpen] = useState(false);

  // Global refresh for initial load stabilization
  React.useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={`fixed top-4 right-4 z-[9999] bg-zinc-900/95 border border-white/10 p-6 rounded-2xl backdrop-blur-2xl w-80 transition-all duration-500 shadow-2xl max-h-[90vh] overflow-y-auto ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-[calc(100%+16px)] opacity-0'} pointer-events-auto custom-scrollbar`}>
        <button
          onClick={() => setIsOpen(false)}
          className="absolute -left-12 top-0 bg-zinc-900/90 border border-white/10 p-2 rounded-l-xl text-white hover:bg-white hover:text-black transition-colors"
        >
          {isOpen ? "→" : "←"}
        </button>

        <h2 className="text-white font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-[10px]">
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
          Advanced Control Panel
        </h2>

        <div className="space-y-6 pb-4">
          {/* Transform */}
          <div className="space-y-4 pt-2">
            <h3 className="text-[9px] text-zinc-600 font-black uppercase tracking-[0.2em] border-b border-white/5 pb-2">Transform</h3>
            {[
              { label: 'Scale', key: 'scale', min: 0.1, max: 2, step: 0.1 },
              { label: 'Start Y', key: 'startY', min: 0, max: 10, step: 0.5 },
              { label: 'End Y', key: 'endY', min: -10, max: 0, step: 0.5 },
            ].map(item => (
              <div key={item.key} className="space-y-2">
                <label className="text-[9px] text-zinc-400 uppercase flex justify-between">{item.label} <span>{params[item.key as keyof typeof params]}</span></label>
                <input type="range" min={item.min} max={item.max} step={item.step} value={params[item.key as keyof typeof params]}
                  onChange={(e) => setParams({ ...params, [item.key]: parseFloat(e.target.value) })}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500" />
              </div>
            ))}
          </div>

          {/* Animation */}
          <div className="space-y-4 pt-2">
            <h3 className="text-[9px] text-zinc-600 font-black uppercase tracking-[0.2em] border-b border-white/5 pb-2">Animation</h3>
            {[
              { label: 'Scrub Smooth', key: 'scrub', min: 0, max: 5, step: 0.1 },
              { label: 'Total Stops', key: 'sections', min: 1, max: 15, step: 1 },
              { label: 'Move Time', key: 'moveDuration', min: 0.1, max: 5, step: 0.1 },
              { label: 'Pause Time', key: 'pauseDuration', min: 0.1, max: 5, step: 0.1 },
              { label: 'Vibration', key: 'vibration', min: 0, max: 0.2, step: 0.01 },
            ].map(item => (
              <div key={item.key} className="space-y-2">
                <label className="text-[9px] text-zinc-400 uppercase flex justify-between">{item.label} <span>{params[item.key as keyof typeof params]}</span></label>
                <input type="range" min={item.min} max={item.max} step={item.step} value={params[item.key as keyof typeof params]}
                  onChange={(e) => setParams({ ...params, [item.key]: parseFloat(e.target.value) })}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500" />
              </div>
            ))}
          </div>

          {/* Lighting */}
          <div className="space-y-4 pt-2">
            <h3 className="text-[9px] text-zinc-600 font-black uppercase tracking-[0.2em] border-b border-white/5 pb-2">Environment</h3>
            {[
              { label: 'Ambient', key: 'ambientIntensity', min: 0, max: 3, step: 0.1 },
              { label: 'Spotlight', key: 'spotIntensity', min: 0, max: 10, step: 0.5 },
              { label: 'Glow Color', key: 'dirIntensity', min: 0, max: 5, step: 0.1 },
            ].map(item => (
              <div key={item.key} className="space-y-2">
                <label className="text-[9px] text-zinc-400 uppercase flex justify-between">{item.label} <span>{params[item.key as keyof typeof params]}</span></label>
                <input type="range" min={item.min} max={item.max} step={item.step} value={params[item.key as keyof typeof params]}
                  onChange={(e) => setParams({ ...params, [item.key]: parseFloat(e.target.value) })}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 right-0 z-[9999] bg-orange-600 text-white p-2 pr-4 rounded-l-xl font-bold text-[10px] uppercase tracking-widest pointer-events-auto shadow-lg hover:bg-orange-500 transition-colors"
        >
          Master Controls
        </button>
      )}

      <div className="fixed inset-0 z-[100] pointer-events-none w-full h-full">
        <Canvas dpr={[1, 2]} shadows gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
          <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={40} />
          <Suspense fallback={null}>
            <CarModel params={params} />
            <Environment preset="night" />
            <ambientLight intensity={params.ambientIntensity} />
            <spotLight position={[0, 10, 5]} angle={0.3} penumbra={1} intensity={params.spotIntensity} castShadow />
            <directionalLight position={[-5, 5, 5]} intensity={params.dirIntensity} color="#ff8800" />
            <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={24} far={4.5} />
          </Suspense>
        </Canvas>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </>
  );
};

export default CarScene;
