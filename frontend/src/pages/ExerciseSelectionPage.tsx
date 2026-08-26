import ExerciseSelector from '../components/yoga/ExerciseSelector';
import { useCoachStore } from '../store/useCoachStore';


export default function ExerciseSelectionPage() {
  const { selectedCoach } = useCoachStore();

  if (!selectedCoach) return null;

  return (
    <div className="w-full flex flex-col items-center">
      <ExerciseSelector coach={selectedCoach} />
    </div>
  );
}
