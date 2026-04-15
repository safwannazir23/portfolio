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
      {/* Car Scene Canvas */}
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
