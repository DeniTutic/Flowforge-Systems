"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group } from "three";

function FloatingNetwork() {
  const nodesRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (nodesRef.current) {
      nodesRef.current.rotation.y += delta * 4.5;
    }
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshBasicMaterial wireframe color="#4ade80" opacity={0.16} transparent />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#22c55e"
          emissive="#22c55e"
          emissiveIntensity={0.7}
          metalness={0.1}
          roughness={0.3}
        />
      </mesh>

      <group ref={nodesRef}>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 1.8;
          return (
            <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * 0.6, Math.sin(angle) * radius]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.6} />
            </mesh>
          );
        })}
      </group>

      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={0.8} />
      <directionalLight position={[-4, -2, -3]} intensity={0.3} color="#22c55e" />
    </group>
  );
}

export default function ThreeHeroCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-0 opacity-100">
      <Canvas camera={{ position: [0, 0, 4], fov: 55 }}>
        <Suspense fallback={null}>
          <group position={[0, 0.2, 0]}>
            <FloatingNetwork />
          </group>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            autoRotate
            autoRotateSpeed={4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
