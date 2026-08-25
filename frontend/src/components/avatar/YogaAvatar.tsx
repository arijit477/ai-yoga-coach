import { Suspense, Component, useRef } from 'react';
import type { ReactNode } from 'react';
import { useFBX, Html } from '@react-three/drei';
import { Group } from 'three';
import { useAvatarAnimation, type AvatarState } from '../../hooks/useAvatarAnimation';

interface YogaAvatarProps {
  modelPath: string;
  avatarState: AvatarState;
  isPaused?: boolean;
  sessionKey?: number;
}

function Model({ modelPath, avatarState, isPaused = false, sessionKey = 0 }: YogaAvatarProps) {
  const groupRef = useRef<Group>(null);
  
  // Load model and its animations
  const fbx = useFBX(modelPath);
  
  // Attach the animation controller
  useAvatarAnimation(groupRef, fbx.animations || [], avatarState, isPaused, sessionKey);

  return (
    <group ref={groupRef}>
      <primitive object={fbx} scale={0.015} position={[0, -1.5, 0]} />
    </group>
  );
}

function Loader() {
  return (
    <Html center>
      <div className="text-indigo-600 font-medium whitespace-nowrap bg-white/90 px-4 py-2 rounded-full shadow-sm">
        Loading Avatar...
      </div>
    </Html>
  );
}

class AvatarErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Html center>
          <div className="text-red-500 font-medium whitespace-nowrap bg-white px-4 py-2 rounded-full shadow">
            Failed to load 3D model
          </div>
        </Html>
      );
    }
    return this.props.children;
  }
}

export default function YogaAvatar({ modelPath, avatarState, isPaused, sessionKey }: YogaAvatarProps) {
  return (
    <AvatarErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Model modelPath={modelPath} avatarState={avatarState} isPaused={isPaused} sessionKey={sessionKey} />
      </Suspense>
    </AvatarErrorBoundary>
  );
}

// Models are loaded dynamically based on the coach selection
