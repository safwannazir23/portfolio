"use client";

import React, { useRef, Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, PerspectiveCamera, ContactShadows } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
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
  const { camera, scene: threeScene } = useThree();
  const modelRef = useRef<THREE.Group>(null);
  const vibrationRef = useRef<THREE.Group>(null);
  
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentDragX = useRef(0);
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

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
    tl.set(modelRef.current.position, { y: params.startY }, 0);

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

    // Drag Logic
    const onMouseDown = (e: MouseEvent | PointerEvent) => {
        mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        raycaster.current.setFromCamera(mouse.current, camera);
        
        const intersects = raycaster.current.intersectObjects(scene.children, true);
        if (intersects.length > 0) {
            isDragging.current = true;
            startX.current = e.clientX;
            document.body.style.cursor = 'grabbing';
        }
    };

    const onMouseMove = (e: MouseEvent | PointerEvent) => {
        // Handle cursor hover
        if (!isDragging.current) {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
            raycaster.current.setFromCamera(mouse.current, camera);
            const intersects = raycaster.current.intersectObjects(scene.children, true);
            if (intersects.length > 0) {
                if (document.body.style.cursor !== 'grab') document.body.style.cursor = 'grab';
            } else {
                if (document.body.style.cursor === 'grab') document.body.style.cursor = 'default';
            }
        }

        if (!isDragging.current) return;

        const delta = (e.clientX - startX.current) * 0.015;
        startX.current = e.clientX;
        currentDragX.current = Math.max(-5, Math.min(5, currentDragX.current + delta));

        gsap.to(modelRef.current.position, {
            x: currentDragX.current,
            duration: 0.6,
            ease: "power3.out"
        });

        // Add some banking/roll when dragging
        gsap.to(modelRef.current.rotation, {
            z: -currentDragX.current * 0.15,
            duration: 0.8,
            ease: "power2.out"
        });
    };

    const onMouseUp = () => {
        isDragging.current = false;
        document.body.style.cursor = 'default';

        // Return to original state quickly when released
        if (modelRef.current) {
            gsap.to(modelRef.current.position, {
                x: 0,
                duration: 1.2,
                ease: "elastic.out(1.1, 0.6)"
            });
            gsap.to(modelRef.current.rotation, {
                z: 0,
                duration: 1.2,
                ease: "elastic.out(1.1, 0.6)"
            });
        }
        currentDragX.current = 0;
    };

    window.addEventListener('pointerdown', onMouseDown);
    window.addEventListener('pointermove', onMouseMove);
    window.addEventListener('pointerup', onMouseUp);

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
      window.removeEventListener('pointerdown', onMouseDown);
      window.removeEventListener('pointermove', onMouseMove);
      window.removeEventListener('pointerup', onMouseUp);
      document.body.style.cursor = 'default';
    };

  }, [scene, params, camera]);

  return (
    <group ref={modelRef} scale={params.scale} rotation={[Math.PI / 2.5, 0, 0]} position={[0, params.startY, 0]}>
      {/* Vibration happens on this inner group */}
      <group ref={vibrationRef}>
        <primitive object={scene} />
      </group>
    </group>
  );
};

const CarScene = () => {
  const [params, setParams] = useState({
    scale: 0.5,
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
        {/* We keep pointer-events-none on the canvas to allow clicking through to links, 
            but we handle drag via window listeners inside the component */}
        <Canvas dpr={[1, 2]} shadows gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }} style={{ pointerEvents: 'none' }}>
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
