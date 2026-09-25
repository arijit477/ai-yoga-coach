import { useCoachStore } from '../store/useCoachStore';

export default function ExerciseSelectionPage() {
  const { selectedCoach } = useCoachStore();

  if (!selectedCoach) return null;

  return (
    <div className="w-full flex flex-col items-center p-6">
      <h2 className="text-xl font-semibold mb-4">Selected Coach: {selectedCoach.name}</h2>
    </div>
  );
}

