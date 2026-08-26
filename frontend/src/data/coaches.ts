import type { Coach } from '../types/coach';

export const coaches: Coach[] = [
  {
    id: 'alice',
    name: 'Alice',
    gender: 'female',
    description: 'A gentle and supportive guide, perfect for relaxation and mindfulness.',
    avatarModel: '/models/Alice.fbx',
    personality: 'Calm and supportive',
    voice: 'calm female',
    greeting: "Hi! I'm Alice, your calm and supportive yoga coach."
  },
  {
    id: 'diego',
    name: 'Diego',
    gender: 'male',
    description: 'An enthusiastic and motivating instructor for an energetic session.',
    avatarModel: '/models/Diego.fbx',
    personality: 'Energetic and encouraging',
    voice: 'male',
    greeting: "Hey! I'm Diego. Let's make today's session energetic and focused."
  }
];
