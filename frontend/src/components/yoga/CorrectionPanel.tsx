import { useState } from 'react';
import type { Exercise } from '../../types/exercise';
import type { Coach } from '../../types/coach';
import { X, AlertCircle } from 'lucide-react';

interface CorrectionPanelProps {
  exercise: Exercise;
  coach: Coach;
  onClose: () => void;
  onReplay: () => void;
}

export default function CorrectionPanel({ exercise, coach, onClose, onReplay }: CorrectionPanelProps) {
  const [selectedCorrection, setSelectedCorrection] = useState<string | null>(null);

  const handleReplay = () => {
    onReplay();
    onClose();
  };

  return (
    <div className="absolute inset-0 bg-white/70 backdrop-blur-xl z-30 flex flex-col items-center justify-center p-6 border-l border-white/50 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-gray-500 hover:text-gray-900 transition-colors bg-white/50 hover:bg-white p-3 rounded-xl shadow-sm backdrop-blur-md border border-white/50"
      >
        <X size={20} />
      </button>

      {!selectedCorrection ? (
        <div className="w-full max-w-sm flex flex-col gap-4 animate-in fade-in duration-500">
          <div className="flex items-center gap-3 mb-6 text-wellness-700 justify-center">
            <AlertCircle size={28} />
            <h3 className="text-2xl font-display font-bold">What's difficult?</h3>
          </div>
          
          <button 
            onClick={() => setSelectedCorrection(exercise.corrections.losing_balance)}
            className="w-full text-left px-6 py-5 bg-white/80 backdrop-blur-md border border-white/50 hover:border-wellness-400 hover:shadow-lg rounded-2xl shadow-sm transition-all font-medium text-gray-700 hover:text-wellness-700 transform hover:-translate-y-1"
          >
            1. I'm losing balance
          </button>
          
          <button 
            onClick={() => setSelectedCorrection(exercise.corrections.dont_understand)}
            className="w-full text-left px-6 py-5 bg-white/80 backdrop-blur-md border border-white/50 hover:border-wellness-400 hover:shadow-lg rounded-2xl shadow-sm transition-all font-medium text-gray-700 hover:text-wellness-700 transform hover:-translate-y-1"
          >
            2. I don't understand the pose
          </button>
          
          <button 
            onClick={() => setSelectedCorrection(exercise.corrections.posture)}
            className="w-full text-left px-6 py-5 bg-white/80 backdrop-blur-md border border-white/50 hover:border-wellness-400 hover:shadow-lg rounded-2xl shadow-sm transition-all font-medium text-gray-700 hover:text-wellness-700 transform hover:-translate-y-1"
          >
            3. I need to correct my posture
          </button>
          
          <button 
            onClick={handleReplay}
            className="w-full text-left px-6 py-5 mt-2 bg-gradient-to-r from-wellness-100 to-wellness-50 border border-wellness-200 hover:border-wellness-400 hover:shadow-lg rounded-2xl shadow-sm transition-all font-bold text-wellness-700 hover:text-wellness-900 transform hover:-translate-y-1"
          >
            4. Show me again
          </button>
        </div>
      ) : (
        <div className="w-full max-w-sm flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-wellness-400 to-wellness-600 flex items-center justify-center font-display font-bold text-white text-3xl mb-6 shadow-lg shadow-wellness-200">
            {coach.name[0]}
          </div>
          <h4 className="font-bold text-gray-900 text-xl mb-4 font-display">Coach {coach.name} says:</h4>
          
          <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-white/50 shadow-lg relative mb-8 w-full">
            <p className="text-gray-800 text-lg leading-relaxed font-medium">
              "{selectedCorrection}"
            </p>
          </div>
          
          <div className="flex gap-4 w-full">
            <button 
              onClick={() => setSelectedCorrection(null)}
              className="flex-1 py-4 bg-white/60 hover:bg-white text-gray-700 font-bold rounded-2xl shadow-sm transition-all border border-white"
            >
              Back
            </button>
            <button 
              onClick={onClose}
              className="flex-1 py-4 bg-gradient-to-r from-wellness-500 to-wellness-600 hover:from-wellness-600 hover:to-wellness-700 text-white font-bold rounded-2xl shadow-lg transition-all hover:scale-[1.02]"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
