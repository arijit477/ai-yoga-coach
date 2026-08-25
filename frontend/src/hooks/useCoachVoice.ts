import { useState, useEffect, useCallback } from 'react';
import type { Coach } from '../types/coach';

export function useCoachVoice(coach: Coach) {
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const updateVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };
    
    // Some browsers need this event to load voices initially
    window.speechSynthesis.onvoiceschanged = updateVoices;
    updateVoices();
    
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (isMuted || !window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // Stop anything currently playing

    const utterance = new SpeechSynthesisUtterance(text);
    
    const preferredGender = coach.gender;
    
    // Extremely basic heuristic to find male/female sounding voices from the system list
    let selectedVoice = voices.find(v => {
      const name = v.name.toLowerCase();
      if (preferredGender === 'female') {
        return name.includes('female') || name.includes('samantha') || name.includes('zira') || name.includes('victoria');
      } else {
        return name.includes('male') || name.includes('david') || name.includes('mark') || name.includes('george');
      }
    });

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [coach.gender, isMuted, voices]);

  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      if (!prev) stop();
      return !prev;
    });
  }, [stop]);

  return { speak, stop, toggleMute, isMuted, isSpeaking };
}
