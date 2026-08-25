import { exercises } from '../../data/exercises';
import ExerciseCard from './ExerciseCard';
import { useSessionStore } from '../../store/useSessionStore';
import type { Coach } from '../../types/coach';

interface ExerciseSelectorProps {
  coach: Coach;
}

export default function ExerciseSelector({ coach }: ExerciseSelectorProps) {
  const setSelectedExercise = useSessionStore(state => state.setSelectedExercise);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-6 drop-shadow-sm">Select Your Practice</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
          <span className="font-bold text-wellness-600">{coach.name}</span> is ready. Choose a yoga pose to focus on for today's session.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {exercises.map(exercise => (
          <ExerciseCard 
            key={exercise.id} 
            exercise={exercise} 
            onSelect={(selected) => setSelectedExercise(selected)} 
          />
        ))}
      </div>
    </div>
  );
}
