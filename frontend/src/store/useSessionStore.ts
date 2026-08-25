import { create } from 'zustand';
import type { Exercise } from '../types/exercise';

interface SessionState {
  selectedExercise: Exercise | null;
  setSelectedExercise: (exercise: Exercise) => void;
  clearExercise: () => void;

  // Active Session State
  isPaused: boolean;
  timeRemaining: number;
  currentInstructionIndex: number;
  sessionKey: number; // Used to trigger animation replay
  
  // Actions
  startSession: (duration: number) => void;
  pauseSession: () => void;
  resumeSession: () => void;
  tickTimer: () => void;
  resetSession: () => void;
  nextInstruction: () => void;
  replayAnimation: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  selectedExercise: null,
  
  setSelectedExercise: (exercise) => set({ 
    selectedExercise: exercise,
    timeRemaining: exercise.duration,
    isPaused: false,
    currentInstructionIndex: 0,
    sessionKey: Date.now()
  }),
  
  clearExercise: () => set({ 
    selectedExercise: null,
    isPaused: false,
    timeRemaining: 0,
    currentInstructionIndex: 0
  }),

  isPaused: false,
  timeRemaining: 0,
  currentInstructionIndex: 0,
  sessionKey: 0,

  startSession: (duration) => set({ 
    timeRemaining: duration, 
    isPaused: false,
    currentInstructionIndex: 0 
  }),
  
  pauseSession: () => set({ isPaused: true }),
  
  resumeSession: () => set({ isPaused: false }),
  
  tickTimer: () => set((state) => ({ 
    timeRemaining: Math.max(0, state.timeRemaining - 1) 
  })),
  
  resetSession: () => set((state) => ({
    timeRemaining: state.selectedExercise?.duration || 0,
    isPaused: false,
    currentInstructionIndex: 0,
    sessionKey: Date.now()
  })),

  nextInstruction: () => set((state) => {
    if (!state.selectedExercise) return state;
    const maxIdx = state.selectedExercise.instructions.length - 1;
    return {
      currentInstructionIndex: Math.min(state.currentInstructionIndex + 1, maxIdx)
    };
  }),

  replayAnimation: () => set({ sessionKey: Date.now() })
}));
