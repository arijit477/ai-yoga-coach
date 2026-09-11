import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function SceneLighting() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Gentle, slow pulsing/movement of lights
      const t = clock.getElapsedTime() * 0.2;
      groupRef.current.position.y = Math.sin(t) * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Soft ambient lighting for wellness feel */}
      <ambientLight intensity={0.4} />

      {/* Main directional light, soft shadows */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        color="#f8f9fa"
      />

      {/* Subtle fill light */}
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.3}
        color="#a5b4fc" // Soft indigo tint
      />

      {/* Point light for a bit of rim/glow effect */}
      <pointLight position={[0, -2, -5]} intensity={0.5} color="#818cf8" distance={15} />
    </group>
  );
}
