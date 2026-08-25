import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import YogaAvatar from './YogaAvatar';
import type { AvatarState } from '../../hooks/useAvatarAnimation';

interface AvatarSceneProps {
  avatarState: AvatarState;
  modelPath: string;
  isPaused?: boolean;
  sessionKey?: number;
}

export default function AvatarScene({ avatarState, modelPath, isPaused = false, sessionKey = 0 }: AvatarSceneProps) {
  return (
    <div className="w-full h-[500px] bg-gradient-to-b from-blue-50 to-indigo-50 rounded-xl overflow-hidden shadow-inner relative">
      <Canvas camera={{ position: [0, 1, 4], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 5, 2]} intensity={1.5} castShadow />
        
        <YogaAvatar modelPath={modelPath} avatarState={avatarState} isPaused={isPaused} sessionKey={sessionKey} />
        
        {/* Soft ground shadow beneath the avatar */}
        <ContactShadows 
          position={[0, -1.5, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2} 
          far={4} 
        />
        
        <OrbitControls 
          enablePan={false} 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2 + 0.1} 
          minDistance={2} 
          maxDistance={6}
        />
      </Canvas>
    </div>
  );
}
