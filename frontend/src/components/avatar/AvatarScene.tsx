import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei';
import YogaAvatar from './YogaAvatar';
import type { AvatarState } from '../../hooks/useAvatarAnimation';

interface AvatarSceneProps {
  avatarState: AvatarState;
  modelPath: string;
  isPaused?: boolean;
  sessionKey?: number;
}

// Simple 3D Yoga Hall component
function YogaHall() {
  return (
    <group>
      {/* Wooden Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#e8cda4" roughness={0.7} metalness={0.1} />
      </mesh>
      
      {/* Back Wall */}
      <mesh position={[0, 4.5, -8]} receiveShadow>
        <planeGeometry args={[30, 12]} />
        <meshStandardMaterial color="#faf8f5" roughness={0.9} />
      </mesh>
      
      {/* Side Wall Left */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-8, 4.5, 0]} receiveShadow>
        <planeGeometry args={[30, 12]} />
        <meshStandardMaterial color="#f0ede6" roughness={0.9} />
      </mesh>
      
      {/* Side Wall Right */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[8, 4.5, 0]} receiveShadow>
        <planeGeometry args={[30, 12]} />
        <meshStandardMaterial color="#f0ede6" roughness={0.9} />
      </mesh>
    </group>
  );
}

export default function AvatarScene({ avatarState, modelPath, isPaused = false, sessionKey = 0 }: AvatarSceneProps) {
  return (
    <div className="w-full h-full min-h-[500px] bg-[#faf8f5] rounded-xl overflow-hidden shadow-inner relative">
      <Canvas shadows camera={{ position: [0, 1.5, 6], fov: 45 }}>
        {/* Soft studio lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[2, 6, 2]} 
          intensity={1.2} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024} 
        />
        <Environment preset="city" />
        
        {/* Environment */}
        <YogaHall />
        
        {/* Avatar */}
        <YogaAvatar modelPath={modelPath} avatarState={avatarState} isPaused={isPaused} sessionKey={sessionKey} />
        
        {/* Soft shadow directly under the avatar for grounding */}
        <ContactShadows 
          position={[0, -1.49, 0]} 
          opacity={0.7} 
          scale={5} 
          blur={1.5} 
          far={2} 
        />
        
        <OrbitControls 
          enablePan={false} 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2 - 0.05} 
          minDistance={3} 
          maxDistance={8}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}
