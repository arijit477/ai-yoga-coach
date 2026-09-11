import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useCoachState } from "../../../hooks/useCoachState";
import type { CoachPersona } from "../types/coach-session";

interface ParticleFieldProps {
  count?: number;
  coachState?: ReturnType<typeof useCoachState>;
  coach?: CoachPersona;
}

export function ParticleField({ count = 200, coachState = "idle", coach = "alice" }: ParticleFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate random initial positions and phases
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 15 - 5;
      const factor = Math.random() * 0.5 + 0.5;
      const speed = Math.random() * 0.01 + 0.005;
      temp.push({ x, y, z, factor, speed, initialY: y });
    }
    return temp;
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const time = clock.getElapsedTime();
    
    // Adjust speed/behavior based on coach state
    let speedMultiplier = 1;
    if (coachState === "analyzing" || coachState === "detecting") {
      speedMultiplier = 2.5; // Faster when active
    } else if (coachState === "holding" || coachState === "good_form") {
      speedMultiplier = 0.5; // Calmer when holding or good form
    }

    particles.forEach((particle, i) => {
      let { x, z, factor, speed, initialY } = particle;

      // Gentle floating up and down
      const y = initialY + Math.sin(time * speed * 100 * speedMultiplier + factor) * 2;
      const hoverX = x + Math.cos(time * speed * 50 * speedMultiplier) * 0.5;
      const hoverZ = z + Math.sin(time * speed * 50 * speedMultiplier) * 0.5;

      dummy.position.set(hoverX, y, hoverZ);
      
      // Pulse scale
      const scale = 0.5 + Math.sin(time * 2 + i) * 0.2;
      dummy.scale.set(scale, scale, scale);
      
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  const particleColor = coach === "kevin" ? "#39ff14" : "#00f3ff";

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial 
        color={particleColor} 
        transparent 
        opacity={0.3} 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}
