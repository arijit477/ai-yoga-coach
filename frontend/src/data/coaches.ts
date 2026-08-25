import type { Coach } from '../types/coach';

export const coaches: Coach[] = [
  {
    id: 'maya',
    name: 'Maya',
    gender: 'female',
    description: 'A gentle and supportive guide, perfect for relaxation and mindfulness.',
    avatarModel: '/models/maya.fbx',
    personality: 'Calm and supportive',
    voice: 'calm female',
    greeting: "Hi! I'm Maya, your calm and supportive yoga coach."
  },
  {
    id: 'arjun',
    name: 'Arjun',
    gender: 'male',
    description: 'An enthusiastic and motivating instructor for an energetic session.',
    avatarModel: '/models/arjun.fbx',
    personality: 'Energetic and encouraging',
    voice: 'male',
    greeting: "Hey! I'm Arjun. Let's make today's session energetic and focused."
  }
];
