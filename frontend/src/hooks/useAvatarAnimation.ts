import { useEffect } from 'react';
import type { RefObject } from 'react';
import { useAnimations } from '@react-three/drei';
import { AnimationClip, Group } from 'three';

export type AvatarState = 'IDLE' | 'TALKING' | 'TREE_POSE' | 'DOWNWARD_DOG' | 'WARRIOR_TWO';

export function useAvatarAnimation(
  groupRef: RefObject<Group | null>, 
  animations: AnimationClip[], 
  currentState: AvatarState,
  isPaused: boolean = false,
  sessionKey: number = 0
) {
  const { actions, names } = useAnimations(animations, groupRef);

  // Log available animations on mount (Dev requirement)
  useEffect(() => {
    console.log('Available animation clips in GLB:', names);
  }, [names]);

  useEffect(() => {
    // Abort if no animations are present in the model
    if (!names || names.length === 0) return;

    // 1. Identify target clip name based on current state with fuzzy matching
    let targetClipName = '';
    // Identify target clip name based on current state with fuzzy matching

    if (currentState === 'IDLE') {
      targetClipName = names.find(n => n.toLowerCase().includes('idle')) || names[0];
    } else if (currentState === 'TALKING') {
      targetClipName = names.find(n => n.toLowerCase().includes('talk') || n.toLowerCase().includes('speak')) || '';
    } else if (currentState === 'TREE_POSE') {
      targetClipName = names.find(n => n.toLowerCase().includes('tree')) || '';
    } else if (currentState === 'DOWNWARD_DOG') {
      targetClipName = names.find(n => n.toLowerCase().includes('down') && n.toLowerCase().includes('dog')) || '';
    } else if (currentState === 'WARRIOR_TWO') {
      targetClipName = names.find(n => n.toLowerCase().includes('warrior') && (n.toLowerCase().includes('2') || n.toLowerCase().includes('two'))) || '';
    }

    // Fallback to idle if animation not found
    if (!targetClipName || !actions[targetClipName]) {
      console.warn(`[useAvatarAnimation] Animation for state "${currentState}" not found. Gracefully falling back to IDLE.`);
      targetClipName = names.find(n => n.toLowerCase().includes('idle')) || names[0];
    }

    // If still nothing valid, abort
    if (!targetClipName || !actions[targetClipName]) return;

    // 2. Play the animation with crossfading
    const action = actions[targetClipName];
    
    // Reset and fade in the new animation over 0.5s
    action?.reset().fadeIn(0.5).play();

    return () => {
      // Fade out this animation smoothly when the state changes
      action?.fadeOut(0.5);
    };
  }, [currentState, actions, names, sessionKey]);

  // Handle play/pause
  useEffect(() => {
    if (!names || names.length === 0) return;
    
    let targetClipName = '';
    

    if (currentState === 'IDLE') {
      targetClipName = names.find(n => n.toLowerCase().includes('idle')) || names[0];
    } else if (currentState === 'TALKING') {
      targetClipName = names.find(n => n.toLowerCase().includes('talk') || n.toLowerCase().includes('speak')) || '';
    } else if (currentState === 'TREE_POSE') {
      targetClipName = names.find(n => n.toLowerCase().includes('tree')) || '';
    } else if (currentState === 'DOWNWARD_DOG') {
      targetClipName = names.find(n => n.toLowerCase().includes('down') && n.toLowerCase().includes('dog')) || '';
    } else if (currentState === 'WARRIOR_TWO') {
      targetClipName = names.find(n => n.toLowerCase().includes('warrior') && (n.toLowerCase().includes('2') || n.toLowerCase().includes('two'))) || '';
    }

    if (!targetClipName || !actions[targetClipName]) {
      targetClipName = names.find(n => n.toLowerCase().includes('idle')) || names[0];
    }
    
    const action = targetClipName ? actions[targetClipName] : null;
    if (action) {
      action.paused = isPaused;
    }
  }, [isPaused, currentState, actions, names]);

  return { availableAnimations: names };
}
