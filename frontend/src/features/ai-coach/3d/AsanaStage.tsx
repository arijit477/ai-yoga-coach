import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import type { Asana } from "../types/asana";

interface AsanaStageProps {
  currentAsana: Asana;
  position?: [number, number, number];
}

export function AsanaStage({ currentAsana, position = [0, 0, 0] }: AsanaStageProps) {
  const groupRef = useRef<THREE.Group>(null);
  const textRef = useRef<any>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const time = clock.getElapsedTime();
    
    // Gentle floating motion
    groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.1;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* 3D Floating Text for Asana Name */}
      <Text
        ref={textRef}
        position={[0, 0.5, 0]}
        fontSize={0.4}
        color="#0f172a"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#ffffff"
      >
        {currentAsana.name}
      </Text>

      {/* Decorative Stage/Base */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 1.55, 64]} />
        <meshBasicMaterial color="#94a3b8" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      
      <mesh position={[0, -0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.5, 64]} />
        <meshBasicMaterial color="#f1f5f9" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
