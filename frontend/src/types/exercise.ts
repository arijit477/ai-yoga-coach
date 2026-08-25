import type { AvatarState } from '../hooks/useAvatarAnimation';

export interface Exercise {
  id: string;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // in seconds
  animationState: AvatarState;
  instructions: string[];
  corrections: {
    losing_balance: string;
    dont_understand: string;
    posture: string;
  };
}
