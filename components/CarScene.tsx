"use client";

import React, { useRef, Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, PerspectiveCamera } from "@react-three/drei";
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

const CarModel = () => {
  const { scene } = useGLTF("/model/f1.glb");
  const modelRef = useRef<THREE.Group>(null);

  useGSAP(() => {
    if (!modelRef.current) return;

    // We create a Master Timeline controlled by scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body", // Use body to ensure it spans the whole scrollable area
        start: "top top",
        end: "bottom bottom",
        scrub: 2, // Higher scrub value for smoother, "floaty" movement
      },
    });

    // 1. Move the car from top of screen to bottom
    // We'll move it on one axis (e.g. Y in our scene) 
    // And oscillate on another (X) to zig-zag.
    
    tl.to(modelRef.current.position, {
      y: -12, // Move it "down" through the viewport
      ease: "none",
    }, 0);

    // 2. Zig-Zag overlay
    // We add multiple steps for X movement to create the zig-zag
    const zigZagSteps = 6;
    for (let i = 1; i <= zigZagSteps; i++) {
      const isEven = i % 2 === 0;
      tl.to(modelRef.current.position, {
        x: isEven ? 5 : -5,
        duration: 1 / zigZagSteps,
        ease: "power1.inOut"
      }, (i - 1) / zigZagSteps);
      
      // Rotate to look where it's going (steering)
      tl.to(modelRef.current.rotation, {
        z: isEven ? -0.4 : 0.4, // Tilt z-axis for steering effect
        duration: 0.5 / zigZagSteps,
        ease: "power1.inOut"
      }, (i - 1) / zigZagSteps);
      
      // Reset rotation mid-zag or start of next zag
      tl.to(modelRef.current.rotation, {
        z: 0,
        duration: 0.5 / zigZagSteps,
        ease: "power1.inOut"
      }, (i - 0.5) / zigZagSteps);
    }

  }, { dependencies: [scene] });

  // Initial group setup: 
  // Car starts slightly above the view (y=4)
  // Rotation: Math.PI / 2 for Top-Down (adjust based on your model's orientation)
  return (
    <group ref={modelRef} scale={1.5} position={[0, 4, 0]} rotation={[Math.PI / 2.5, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
};

const CarScene = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
      <Canvas dpr={[1, 2]} shadows gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={40} />
        <Suspense fallback={null}>
          <CarModel />
          <Environment preset="city" />
          <ambientLight intensity={1} />
          <spotLight position={[0, 10, 5]} angle={0.3} penumbra={1} intensity={2} castShadow />
          <pointLight position={[5, 10, 5]} intensity={1.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CarScene;
