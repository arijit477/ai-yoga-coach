import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface HoldProgress3DProps {
  isHolding: boolean;
  holdTime: number;
  targetHoldSeconds: number;
  position?: [number, number, number];
}

export function HoldProgress3D({ 
  isHolding, 
  holdTime, 
  targetHoldSeconds,
  position = [0, 0, 0] 
}: HoldProgress3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  // Calculate progress ratio (0 to 1)
  const progress = Math.min(Math.max(holdTime / targetHoldSeconds, 0), 1);
  const isComplete = progress >= 1;

  useFrame(({ clock }) => {
    if (!groupRef.current || !materialRef.current) return;
    
    // Scale up slightly when complete
    const targetScale = isComplete ? 1.1 : (isHolding ? 1.0 : 0);
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

    if (isComplete) {
      // Pulse color when complete
      const t = clock.getElapsedTime();
      const pulse = 0.5 + Math.sin(t * 10) * 0.5;
      materialRef.current.color.lerp(new THREE.Color().setHSL(0.4, 0.8, 0.5 + pulse * 0.2), 0.2);
    } else {
      materialRef.current.color.set("#34d399"); // standard emerald
    }
  });

  if (!isHolding && progress === 0) {
    return null; // hide completely if not active
  }

  return (
    <group ref={groupRef} position={position}>
      {/* Background ring */}
      <mesh>
        <ringGeometry args={[1, 1.1, 64]} />
        <meshBasicMaterial color="#0f172a" transparent opacity={0.1} />
      </mesh>

      {/* Progress ring */}
      {progress > 0 && (
        <mesh ref={ringRef} rotation={[0, 0, Math.PI / 2]}>
          <ringGeometry args={[1, 1.1, 64, 1, 0, progress * Math.PI * 2]} />
          <meshBasicMaterial ref={materialRef} color="#34d399" side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Text display */}
      <Text
        position={[0, 0.2, 0]}
        fontSize={0.3}
        color="#0f172a"
        anchorX="center"
        anchorY="middle"
      >
        HOLD
      </Text>
      <Text
        position={[0, -0.2, 0]}
        fontSize={0.2}
        color="#059669"
        anchorX="center"
        anchorY="middle"
      >
        {`${holdTime.toFixed(1)}s / ${targetHoldSeconds}s`}
      </Text>
    </group>
  );
}
