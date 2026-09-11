import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useCoachState } from "../../../hooks/useCoachState";

interface VoiceVisualizerProps {
  coachState: ReturnType<typeof useCoachState>;
  color?: string;
  position?: [number, number, number];
}

export function VoiceVisualizer({ 
  coachState, 
  color = "#818cf8",
  position = [0, -1.5, 0] 
}: VoiceVisualizerProps) {
  const ringsRef = useRef<THREE.Group>(null);
  
  // Mapping coach state to a "voice state" for visualization
  // In a real app with WebRTC/audio, this would be driven by audio frequency data
  const isSpeaking = coachState === "correcting" || coachState === "get_ready";
  const isThinking = coachState === "analyzing" || coachState === "detecting";

  useFrame(({ clock }) => {
    if (!ringsRef.current) return;
    const time = clock.getElapsedTime();

    ringsRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const material = mesh.material as THREE.MeshBasicMaterial;
      
      // Base rotation
      mesh.rotation.z = time * (0.2 + i * 0.1);

      if (isSpeaking) {
        // Active waveform
        const scale = 1 + Math.sin(time * 15 + i * Math.PI / 2) * 0.2;
        mesh.scale.setScalar(scale);
        material.opacity = 0.6 + Math.sin(time * 10 + i) * 0.2;
      } else if (isThinking) {
        // Gentle pulse
        const scale = 1 + Math.sin(time * 3 + i) * 0.05;
        mesh.scale.setScalar(scale);
        material.opacity = 0.3 + Math.sin(time * 2 + i) * 0.1;
      } else {
        // Idle
        mesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        material.opacity = THREE.MathUtils.lerp(material.opacity, 0.1, 0.1);
      }
    });
  });

  return (
    <group position={position} ref={ringsRef} rotation={[-Math.PI / 2, 0, 0]}>
      {[0.5, 0.8, 1.1].map((radius, i) => (
        <mesh key={i}>
          <torusGeometry args={[radius, 0.02, 16, 64]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.1} 
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
