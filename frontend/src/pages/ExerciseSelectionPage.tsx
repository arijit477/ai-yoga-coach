import React from 'react';
import ExerciseSelector from '../components/yoga/ExerciseSelector';
import { useCoachStore } from '../store/useCoachStore';
import { ArrowLeft } from 'lucide-react';

export default function ExerciseSelectionPage() {
  const { selectedCoach, clearCoach } = useCoachStore();

  if (!selectedCoach) return null;

  return (
    <div className="w-full flex flex-col items-center">
      <ExerciseSelector coach={selectedCoach} />
    </div>
  );
}
