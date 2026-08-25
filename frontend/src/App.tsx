import React from 'react';
import CoachSelector from './components/coach/CoachSelector';
import ExerciseSelectionPage from './pages/ExerciseSelectionPage';
import YogaSessionPage from './pages/YogaSessionPage';
import { useCoachStore } from './store/useCoachStore';
import { useSessionStore } from './store/useSessionStore';
import { ArrowLeft } from 'lucide-react';

function App() {
  const { selectedCoach, clearCoach } = useCoachStore();
  const { selectedExercise } = useSessionStore();

  const handleClearCoach = () => {
    clearCoach();
  };

  return (
    <div className="min-h-screen mesh-bg flex flex-col items-center">
      
      {/* Premium Glassmorphic Header */}
      <header className="w-full glass sticky top-0 z-50 py-4 px-6 sm:px-10 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-wellness-400 to-wellness-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
            <span className="text-white font-display font-bold text-xl drop-shadow-md">Y</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-gray-800 tracking-tight">AI Yoga Coach</h1>
        </div>
        
        {selectedCoach && !selectedExercise && (
          <button 
            onClick={handleClearCoach}
            className="text-sm font-medium text-wellness-700 hover:text-wellness-900 bg-white/50 hover:bg-white px-4 py-2 rounded-full transition-all flex items-center gap-2 shadow-sm border border-white"
          >
            <ArrowLeft size={16} />
            Change Coach
          </button>
        )}
      </header>

      <main className="bg-transparent w-full flex flex-col items-center flex-grow p-4 md:p-8">
        
        {!selectedCoach ? (
          <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <CoachSelector />
          </div>
        ) : !selectedExercise ? (
          <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <ExerciseSelectionPage />
          </div>
        ) : (
          <div className="w-full max-w-6xl animate-in fade-in zoom-in-95 duration-700 flex justify-center">
            <YogaSessionPage />
          </div>
        )}
        
      </main>
    </div>
  );
}

export default App;
