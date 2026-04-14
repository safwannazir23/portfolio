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

  useGSAP(() => {
    if (!modelRef.current) return;

    // Refresh ScrollTrigger to catch current page height
    ScrollTrigger.refresh();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: params.scrub,
      },
    });

    // Viewport bounds check: At Z=15, FOV=40, screen height is ~11 units.
    // So moving from Y=4 to Y=-4 covers most of the visible screen.
    const startY = 4.5;
    const endY = -4.5;
    const totalDist = startY - endY;
    
    // Initial position
    modelRef.current.position.y = startY;
    modelRef.current.position.x = 0;

    const totalSections = 7;
    const moveDuration = 1;
    const pauseDuration = 0.6; // Slightly longer pause for clarity
    
    for (let i = 0; i < totalSections; i++) {
        // Calculate the next "stop" within the visible screen area
        const nextY = startY - ((i + 1) * totalDist / totalSections);
        
        tl.to(modelRef.current.position, {
            y: nextY,
            ease: "power2.inOut",
            duration: moveDuration
        });
        
        tl.to(modelRef.current.position, {
            y: nextY,
            duration: pauseDuration
        });
    }

    // Gentle engine vibration effect - Moved OUTSIDE the scroll timeline
    gsap.to(modelRef.current.position, {
        y: "+=0.03",
        repeat: -1,
        yoyo: true,
        duration: 0.1,
        ease: "none"
    });

  }, { dependencies: [scene, params] });

  return (
    <group ref={modelRef} scale={params.scale} position={[0, 4.5, 0]} rotation={[Math.PI / 2.5, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
};

const CarScene = () => {
  const [params, setParams] = useState({
    scale: 0.6,
    scrub: 1.5,
    ambientIntensity: 0.8,
    spotIntensity: 3
  });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={`fixed top-4 right-4 z-[9999] bg-zinc-900/95 border border-white/10 p-6 rounded-2xl backdrop-blur-2xl w-72 transition-all duration-500 shadow-2xl ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-[calc(100%+16px)] opacity-0'} pointer-events-auto`}>
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute -left-12 top-0 bg-zinc-900/90 border border-white/10 p-2 rounded-l-xl text-white hover:bg-white hover:text-black transition-colors"
        >
          {isOpen ? "→" : "←"}
        </button>
        
        <h2 className="text-white font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-[10px]">
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
          Display Config
        </h2>

        <div className="space-y-6">
          <div className="space-y-2">
             <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter flex justify-between">
                Car Size <span>{params.scale.toFixed(1)}</span>
             </label>
             <input type="range" min="0.5" max="3" step="0.1" value={params.scale}
                    onChange={(e) => setParams({...params, scale: parseFloat(e.target.value)})}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500" />
          </div>

          <div className="space-y-2">
             <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter flex justify-between">
                Scroll Response <span>{params.scrub}</span>
             </label>
             <input type="range" min="0.5" max="4" step="0.1" value={params.scrub}
                    onChange={(e) => setParams({...params, scrub: parseFloat(e.target.value)})}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500" />
          </div>
        </div>
      </div>

      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed top-4 right-0 z-[9999] bg-orange-600 text-white p-2 pr-4 rounded-l-xl font-bold text-[10px] uppercase tracking-widest pointer-events-auto shadow-lg hover:bg-orange-500 transition-colors"
        >
          Adjust
        </button>
      )}

      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
        <Canvas dpr={[1, 2]} shadows gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
          <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={40} />
          <Suspense fallback={null}>
            <CarModel params={params} />
            <Environment preset="night" />
            <ambientLight intensity={params.ambientIntensity} />
            <spotLight position={[0, 10, 5]} angle={0.3} penumbra={1} intensity={params.spotIntensity} castShadow />
            <directionalLight position={[-5, 5, 5]} intensity={2} color="#ff8800" />
            <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={24} far={4.5} />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
};

export default CarScene;
