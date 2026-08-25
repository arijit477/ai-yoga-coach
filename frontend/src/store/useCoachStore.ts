import { create } from 'zustand';
import type { Coach } from '../types/coach';

interface CoachState {
  selectedCoach: Coach | null;
  setSelectedCoach: (coach: Coach) => void;
  clearCoach: () => void;
}

export const useCoachStore = create<CoachState>((set) => ({
  selectedCoach: null,
  setSelectedCoach: (coach) => set({ selectedCoach: coach }),
  clearCoach: () => set({ selectedCoach: null }),
}));
