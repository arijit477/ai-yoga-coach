import type { Exercise } from '../../types/exercise';
import { Clock, Activity } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  onSelect: (exercise: Exercise) => void;
}

export default function ExerciseCard({ exercise, onSelect }: ExerciseCardProps) {
  return (
    <div 
      className="glass rounded-3xl hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden flex flex-col h-full cursor-pointer transform hover:-translate-y-2 group bg-white/40"
      onClick={() => onSelect(exercise)}
    >
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-3xl font-display font-bold text-gray-800 mb-4">{exercise.name}</h3>
        
        <div className="flex items-center gap-5 mb-6 text-sm font-bold text-wellness-600 bg-white/60 backdrop-blur-sm p-3 rounded-xl border border-white/50 w-fit">
          <div className="flex items-center gap-1.5">
            <Activity size={18} />
            <span className="uppercase tracking-wider">{exercise.difficulty}</span>
          </div>
          <div className="w-1 h-1 bg-wellness-300 rounded-full"></div>
          <div className="flex items-center gap-1.5">
            <Clock size={18} />
            <span>{Math.floor(exercise.duration / 60)} min {exercise.duration % 60 > 0 ? `${exercise.duration % 60} s` : ''}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-8 flex-grow leading-relaxed font-medium">
          {exercise.description}
        </p>
        
        <button 
          className="mt-4 w-full py-4 rounded-2xl font-bold text-wellness-700 bg-wellness-100 hover:bg-wellness-200 transition-all duration-300 shadow-sm transform hover:scale-[1.02]"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(exercise);
          }}
        >
          Start Practice
        </button>
      </div>
    </div>
  );
}
