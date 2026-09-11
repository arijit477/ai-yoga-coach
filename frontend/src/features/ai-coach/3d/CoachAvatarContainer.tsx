import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { CoachPersona } from "../types/coach-session";
import { useCoachState } from "../../../hooks/useCoachState";

interface CoachAvatarContainerProps {
  coachId: CoachPersona;
  coachState: ReturnType<typeof useCoachState>;
  position?: [number, number, number];
}

export function CoachAvatarContainer({ 
  coachId, 
  coachState,
  position = [0, 0, 0] 
}: CoachAvatarContainerProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  const isKevin = coachId === "kevin";
  const primaryColor = isKevin ? "#39ff14" : "#00f3ff";
  const secondaryColor = isKevin ? "#064e3b" : "#1e3a8a";

  useFrame(({ clock }) => {
    if (!meshRef.current || !outerRef.current) return;
    const time = clock.getElapsedTime();

    // Base rotation
    meshRef.current.rotation.y = time * 0.2;
    meshRef.current.rotation.z = time * 0.1;
    
    outerRef.current.rotation.y = -time * 0.1;
    outerRef.current.rotation.x = time * 0.15;

    // Breathing / state animation
    let scaleMultiplier = 1;
    if (coachState === "correcting" || coachState === "get_ready") {
      scaleMultiplier = 1.1 + Math.sin(time * 10) * 0.05;
    } else if (coachState === "analyzing") {
      scaleMultiplier = 1 + Math.sin(time * 5) * 0.02;
    }

    const baseScale = 1 + Math.sin(time * 2) * 0.05; // natural breathing
    const finalScale = baseScale * scaleMultiplier;
    
    meshRef.current.scale.setScalar(finalScale);
    outerRef.current.scale.setScalar(finalScale * 1.2);
  });

  return (
    <group position={position}>
      {/* Outer subtle glow/glass shell */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          color={secondaryColor}
          transmission={0.9}
          opacity={1}
          metalness={0}
          roughness={0.1}
          ior={1.5}
          thickness={0.5}
          transparent
        />
      </mesh>

      {/* Inner solid/glowing core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color={primaryColor}
          emissive={primaryColor}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Point light to cast glow on surroundings */}
      <pointLight 
        color={primaryColor} 
        intensity={coachState === "correcting" ? 1.5 : 0.8} 
        distance={5} 
      />
    </group>
  );
}
