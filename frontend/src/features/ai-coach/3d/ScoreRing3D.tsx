import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface ScoreRing3DProps {
  score: number | null;
  position?: [number, number, number];
}

function getScoreColor(score: number | null): string {
  if (score === null) return "#64748b"; // slate
  if (score >= 90) return "#34d399"; // emerald
  if (score >= 75) return "#60a5fa"; // blue
  if (score >= 50) return "#fbbf24"; // amber
  return "#f87171"; // red
}

export function ScoreRing3D({ score, position = [0, 0, 0] }: ScoreRing3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  const displayScore = score ?? 0;
  const targetColor = new THREE.Color(getScoreColor(score));

  useFrame(() => {
    if (!groupRef.current || !ringRef.current || !materialRef.current) return;
    
    // Smoothly rotate the ring
    ringRef.current.rotation.z -= 0.01;

    // Smooth color interpolation
    materialRef.current.color.lerp(targetColor, 0.1);
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Background track */}
      <mesh>
        <ringGeometry args={[0.8, 0.9, 64]} />
        <meshBasicMaterial color="#0f172a" transparent opacity={0.1} />
      </mesh>

      {/* Foreground animated ring (arc based on score) */}
      <mesh ref={ringRef} rotation={[0, 0, Math.PI / 2]}>
        <ringGeometry args={[0.8, 0.9, 64, 1, 0, (displayScore / 100) * Math.PI * 2]} />
        <meshBasicMaterial ref={materialRef} color={getScoreColor(score)} side={THREE.DoubleSide} />
      </mesh>

      {/* Score Text */}
      <Text
        position={[0, 0, 0]}
        fontSize={0.5}
        color="#0f172a"
        anchorX="center"
        anchorY="middle"
      >
        {score !== null ? Math.round(score).toString() : "--"}
      </Text>
    </group>
  );
}
