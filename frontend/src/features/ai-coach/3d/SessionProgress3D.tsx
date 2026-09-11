import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import type { Asana } from "../types/asana";

interface SessionProgress3DProps {
  asanas: Asana[];
  currentIndex: number;
  position?: [number, number, number];
}

export function SessionProgress3D({ 
  asanas, 
  currentIndex,
  position = [0, 0, 0] 
}: SessionProgress3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  const total = asanas.length;
  // Spacing between nodes
  const spacing = 0.5;
  const startX = -((total - 1) * spacing) / 2;

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    // Gentle floating
    groupRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime()) * 0.05;
  });

  return (
    <group ref={groupRef} position={position}>
      {asanas.map((asana, index) => {
        const isCurrent = index === currentIndex;
        const isCompleted = index < currentIndex;
        
        let color = "#94a3b8"; // default (future) - slate-400
        if (isCurrent) color = "#818cf8"; // current - indigo-400
        if (isCompleted) color = "#34d399"; // completed - emerald-400

        const xPos = startX + index * spacing;

        return (
          <group key={asana.id} position={[xPos, 0, 0]}>
            {/* Connection line to next node */}
            {index < total - 1 && (
              <mesh position={[spacing / 2, 0, 0]}>
                <boxGeometry args={[spacing, 0.02, 0.02]} />
                <meshBasicMaterial 
                  color={isCompleted ? "#10b981" : "#cbd5e1"} 
                  transparent 
                  opacity={0.5} 
                />
              </mesh>
            )}

            {/* Node sphere */}
            <mesh>
              <sphereGeometry args={[isCurrent ? 0.08 : 0.05, 16, 16]} />
              <meshBasicMaterial color={color} />
            </mesh>

            {/* Optional glow for current */}
            {isCurrent && (
              <mesh>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshBasicMaterial 
                  color={color} 
                  transparent 
                  opacity={0.3} 
                  blending={THREE.AdditiveBlending}
                  depthWrite={false}
                />
              </mesh>
            )}

            {/* Number label for current or all? Maybe just current to keep it clean */}
            {isCurrent && (
              <Text
                position={[0, 0.2, 0]}
                fontSize={0.15}
                color="#0f172a"
                anchorX="center"
                anchorY="middle"
              >
                {`${index + 1} / ${total}`}
              </Text>
            )}
          </group>
        );
      })}
    </group>
  );
}
