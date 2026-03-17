"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

function MiniNetwork() {
  return (
    <group>
      {/* Wireframe ring */}
      <mesh rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[1.2, 0.05, 16, 80]} />
        <meshBasicMaterial wireframe color="#38bdf8" opacity={0.22} transparent />
      </mesh>

      {/* Inner core */}
      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshStandardMaterial
          color="#22c55e"
          emissive="#22c55e"
          emissiveIntensity={0.9}
          metalness={0.15}
          roughness={0.35}
        />
      </mesh>

      {/* Small orbiting nodes */}
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * Math.PI * 2;
        const radius = 1.4;
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * 0.4, Math.sin(angle) * radius]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.7} />
          </mesh>
        );
      })}

      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 3, 4]} intensity={0.9} />
      <directionalLight position={[-3, -2, -4]} intensity={0.3} color="#22c55e" />
    </group>
  );
}

export default function ThreeMiniCanvas() {
  return (
    <div className="h-64 sm:h-72 lg:h-80 w-full rounded-3xl overflow-hidden border border-gray-200/90 dark:border-gray-800/70 shadow-xl bg-gradient-to-br from-white via-gray-50 to-sky-50 dark:from-gray-900 dark:via-slate-900 dark:to-black">
      <Canvas camera={{ position: [0, 0.4, 3.2], fov: 50 }}>
        <Suspense fallback={null}>
          <MiniNetwork />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            autoRotate
            autoRotateSpeed={0.45}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

