import { create } from "zustand";
import type { Asana } from "../types/asana";
import type { CoachPersona } from "../types/coach-session";
import { FREE_ASANAS } from "../data/freeAsanas";
import { ensureAsanaRules } from "../analysis/rules/poseRulesRegistry";

interface AICoachState {
  selectedCoach: CoachPersona;
  sessionAsanas: Asana[];
  sessionLength: number;
  currentAsanaIndex: number;
  currentAsana: Asana;
  isSessionRunning: boolean;
  completedAsanaIds: string[];
  skippedAsanaIds: string[];

  // Actions
  setSelectedCoach: (coach: CoachPersona) => void;
  setSessionLength: (length: number) => void;
  setCurrentAsana: (asana: Asana) => void;
  setCurrentAsanaIndex: (index: number) => void;
  skipToAsanaIndex: (index: number) => void;
  goBackToAsanaIndex: (index: number) => void;
  markAsanaCompleted: (asanaId: string) => void;
  canAccessAsanaIndex: (index: number) => boolean;
  getActiveSessionAsanas: () => Asana[];
  nextAsana: () => Asana | null;
  previousAsana: () => Asana | null;
  setSessionAsanas: (asanas: Asana[]) => void;
  resetSession: () => void;
}

const initialAsanas = FREE_ASANAS;
const initialAsana = initialAsanas[0];

// Register initial asana rules
if (initialAsana) {
  ensureAsanaRules(initialAsana.id);
}

export const useAICoachStore = create<AICoachState>((set, get) => ({
  selectedCoach: "alice",
  sessionAsanas: initialAsanas,
  sessionLength: initialAsanas.length,
  currentAsanaIndex: 0,
  currentAsana: initialAsana,
  isSessionRunning: false,
  completedAsanaIds: [],
  skippedAsanaIds: [],

  setSelectedCoach: (coach) => set({ selectedCoach: coach }),

  setSessionLength: (length) => {
    const validLength = Math.max(1, Math.min(length, get().sessionAsanas.length));
    set({ sessionLength: validLength });
  },

  getActiveSessionAsanas: () => {
    const { sessionAsanas, sessionLength } = get();
    return sessionAsanas.slice(0, sessionLength);
  },

  markAsanaCompleted: (asanaId) => {
    set((state) => {
      if (state.completedAsanaIds.includes(asanaId)) {
        return state;
      }
      return { completedAsanaIds: [...state.completedAsanaIds, asanaId] };
    });
  },

  canAccessAsanaIndex: (index) => {
    const { completedAsanaIds, sessionLength } = get();
    if (index < 0 || index >= sessionLength) return false;
    // An asana is accessible if it's the very next one after completed, or already completed, or index 0
    return index <= completedAsanaIds.length;
  },

  setCurrentAsana: (asana) => {
    ensureAsanaRules(asana.id);
    const index = get().sessionAsanas.findIndex((a) => a.id === asana.id);
    set({
      currentAsana: asana,
      currentAsanaIndex: index !== -1 ? index : get().currentAsanaIndex,
    });
  },

  setCurrentAsanaIndex: (index) => {
    const { sessionAsanas, sessionLength, canAccessAsanaIndex } = get();
    if (index >= 0 && index < sessionLength && canAccessAsanaIndex(index)) {
      const targetAsana = sessionAsanas[index];
      ensureAsanaRules(targetAsana.id);
      set({
        currentAsanaIndex: index,
        currentAsana: targetAsana,
      });
    }
  },

  skipToAsanaIndex: (index) => {
    const { sessionAsanas, sessionLength, currentAsanaIndex, skippedAsanaIds } = get();
    if (index <= 0 || index >= sessionLength) return;
    // Mark all asanas between current and target as skipped (if not already completed)
    const newSkipped = [...skippedAsanaIds];
    for (let i = currentAsanaIndex; i < index; i++) {
      const id = sessionAsanas[i].id;
      if (!newSkipped.includes(id)) {
        newSkipped.push(id);
      }
    }
    const targetAsana = sessionAsanas[index];
    ensureAsanaRules(targetAsana.id);
    set({
      currentAsanaIndex: index,
      currentAsana: targetAsana,
      skippedAsanaIds: newSkipped,
    });
  },

  goBackToAsanaIndex: (index) => {
    const { sessionAsanas, currentAsanaIndex, skippedAsanaIds, completedAsanaIds } = get();
    if (index < 0 || index >= currentAsanaIndex) return;
    const targetAsana = sessionAsanas[index];
    ensureAsanaRules(targetAsana.id);
    // Un-skip the target if it was skipped, and un-skip everything after it that was skipped
    const newSkipped = skippedAsanaIds.filter((id) => {
      const idx = sessionAsanas.findIndex((a) => a.id === id);
      return idx < index;
    });
    // Also remove completed marks for asanas at index and beyond (they're being re-done)
    const newCompleted = completedAsanaIds.filter((id) => {
      const idx = sessionAsanas.findIndex((a) => a.id === id);
      return idx < index;
    });
    set({
      currentAsanaIndex: index,
      currentAsana: targetAsana,
      skippedAsanaIds: newSkipped,
      completedAsanaIds: newCompleted,
    });
  },

  nextAsana: () => {
    const { sessionAsanas, sessionLength, currentAsanaIndex } = get();
    const nextIndex = currentAsanaIndex + 1;
    if (nextIndex < sessionLength) {
      const next = sessionAsanas[nextIndex];
      ensureAsanaRules(next.id);
      set({
        currentAsanaIndex: nextIndex,
        currentAsana: next,
      });
      return next;
    }
    return null;
  },

  previousAsana: () => {
    const { sessionAsanas, currentAsanaIndex } = get();
    const prevIndex = currentAsanaIndex - 1;
    if (prevIndex >= 0) {
      const prev = sessionAsanas[prevIndex];
      ensureAsanaRules(prev.id);
      set({
        currentAsanaIndex: prevIndex,
        currentAsana: prev,
      });
      return prev;
    }
    return null;
  },

  setSessionAsanas: (asanas) => {
    if (asanas.length > 0) {
      const first = asanas[0];
      ensureAsanaRules(first.id);
      set({
        sessionAsanas: asanas,
        sessionLength: asanas.length,
        currentAsanaIndex: 0,
        currentAsana: first,
        completedAsanaIds: [],
      });
    }
  },

  resetSession: () => {
    const first = get().sessionAsanas[0] ?? initialAsana;
    ensureAsanaRules(first.id);
    set({
      currentAsanaIndex: 0,
      currentAsana: first,
      isSessionRunning: false,
      completedAsanaIds: [],
      skippedAsanaIds: [],
    });
  },
}));
