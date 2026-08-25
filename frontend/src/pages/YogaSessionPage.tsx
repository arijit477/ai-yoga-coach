import React, { useEffect } from 'react';
import AvatarScene from '../components/avatar/AvatarScene';
import { useCoachStore } from '../store/useCoachStore';
import { useSessionStore } from '../store/useSessionStore';
import { ArrowLeft, Play, Pause, RotateCcw, Repeat, HelpCircle, MessageCircle } from 'lucide-react';
import { useCoachVoice } from '../hooks/useCoachVoice';
import CorrectionPanel from '../components/yoga/CorrectionPanel';
import ChatPanel from '../components/yoga/ChatPanel';

export default function YogaSessionPage() {
  const [showCorrectionPanel, setShowCorrectionPanel] = React.useState(false);
  const [showChatPanel, setShowChatPanel] = React.useState(false);
  const { selectedCoach } = useCoachStore();
  const { 
    selectedExercise, 
    clearExercise,
    isPaused,
    timeRemaining,
    currentInstructionIndex,
    sessionKey,
    pauseSession,
    resumeSession,
    tickTimer,
    resetSession,
    nextInstruction,
    replayAnimation
  } = useSessionStore();

  const { speak, isMuted, toggleMute, isSpeaking } = useCoachVoice(selectedCoach!);

  // Timer Effect
  useEffect(() => {
    if (isPaused || timeRemaining <= 0) return;
    
    const timer = setInterval(() => {
      tickTimer();
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isPaused, timeRemaining, tickTimer]);

  if (!selectedCoach || !selectedExercise) return null;

  const currentInstruction = selectedExercise.instructions[currentInstructionIndex] || "Keep breathing steadily.";
  
  const progressPercent = ((selectedExercise.duration - timeRemaining) / selectedExercise.duration) * 100;
  
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="glass rounded-3xl overflow-hidden max-w-[1200px] w-full flex flex-col md:flex-row relative shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-white/50 animate-in fade-in zoom-in-95 duration-700">
      <button 
        onClick={clearExercise}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-wellness-700 transition-colors bg-white/60 hover:bg-white p-3 rounded-xl shadow-sm z-20 backdrop-blur-md border border-white/40"
        title="Back to Exercises"
      >
        <ArrowLeft size={20} />
      </button>

      {/* LEFT / MAIN AREA */}
      <div className="flex-1 relative bg-gradient-to-b from-white/20 to-wellness-50/30 flex flex-col items-center">
        
        <div className="absolute top-8 text-center z-10 w-full">
          <h2 className="text-sm font-bold text-wellness-600 tracking-[0.2em] uppercase bg-white/40 backdrop-blur-sm px-6 py-2 rounded-full inline-block border border-white/40 shadow-sm">
            {selectedCoach.name} — AI Coach
          </h2>
        </div>

        <div className="w-full h-[500px] md:h-[650px] relative">
          <AvatarScene 
            avatarState={isSpeaking ? 'TALKING' : selectedExercise.animationState} 
            modelPath={selectedCoach.avatarModel} 
            isPaused={isPaused}
            sessionKey={sessionKey}
          />
        </div>

        <div className="absolute bottom-8 text-center w-full px-8 z-10">
          <h3 className="text-4xl font-display font-extrabold text-gray-800 mb-4 drop-shadow-md tracking-wider">
            {selectedExercise.name}
          </h3>
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/50 inline-block max-w-lg mx-auto">
            <p className="text-xl text-gray-800 font-medium leading-relaxed">"{currentInstruction}"</p>
          </div>
        </div>
      </div>

      {/* RIGHT / SIDE PANEL */}
      <div className="w-full md:w-[420px] bg-white/60 backdrop-blur-xl border-l border-white/50 flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.02)] z-10 relative">
        
        {/* Info Header */}
        <div className="p-8 border-b border-white/40">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-3xl font-display font-bold text-gray-900">{selectedExercise.name}</h2>
              <span className="inline-block mt-2 text-xs px-3 py-1 bg-wellness-100 text-wellness-700 rounded-full font-bold tracking-wider uppercase">
                {selectedExercise.difficulty} Level
              </span>
            </div>
            <div className="text-4xl font-display font-bold text-wellness-600 drop-shadow-sm">
              {formatTime(timeRemaining)}
            </div>
          </div>
          
          {/* Progress Indicator */}
          <div className="w-full bg-white/50 rounded-full h-4 mb-2 overflow-hidden shadow-inner border border-white/40">
            <div 
              className="bg-gradient-to-r from-wellness-400 to-wellness-600 h-4 rounded-full transition-all duration-1000 ease-linear relative overflow-hidden"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute inset-0 bg-white/20 w-full h-full animate-[pulse_2s_ease-in-out_infinite]"></div>
            </div>
          </div>
          <p className="text-sm text-right text-gray-500 font-medium">{Math.floor(progressPercent)}% completed</p>
        </div>

        {/* Description & Current Instruction */}
        <div className="p-8 flex-grow flex flex-col gap-8 overflow-y-auto custom-scrollbar">
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Description</h4>
            <p className="text-gray-600 leading-relaxed font-medium">
              {selectedExercise.description}
            </p>
          </div>
          
          <div className="bg-wellness-50/50 backdrop-blur-sm p-6 rounded-2xl border border-wellness-100/50 shadow-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <h4 className="text-xs font-bold text-wellness-500 uppercase tracking-widest mb-3 relative z-10">
              Step {currentInstructionIndex + 1} of {selectedExercise.instructions.length}
            </h4>
            <p className="text-wellness-900 font-medium leading-relaxed relative z-10 text-lg">
              {currentInstruction}
            </p>
            {currentInstructionIndex < selectedExercise.instructions.length - 1 && (
              <button 
                onClick={nextInstruction}
                className="mt-6 text-sm font-bold text-wellness-600 hover:text-wellness-800 transition-colors relative z-10 flex items-center gap-1"
              >
                Next Step <ArrowLeft size={16} className="rotate-180" />
              </button>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="p-6 bg-white/50 backdrop-blur-md border-t border-white/50 grid grid-cols-2 gap-4 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          {isPaused ? (
            <button 
              onClick={resumeSession}
              className="col-span-2 py-4 bg-gradient-to-r from-wellness-500 to-wellness-600 hover:from-wellness-600 hover:to-wellness-700 text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
            >
              <Play size={20} className="fill-current" /> Resume Session
            </button>
          ) : (
            <button 
              onClick={pauseSession}
              className="col-span-2 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
            >
              <Pause size={20} className="fill-current" /> Pause Session
            </button>
          )}
          
          <button 
            onClick={replayAnimation}
            className="py-3 bg-white/80 hover:bg-white border border-white text-gray-700 font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow"
          >
            <Repeat size={18} /> Show Again
          </button>
          
          <button 
            onClick={resetSession}
            className="py-3 bg-white/80 hover:bg-white border border-white text-gray-700 font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow"
          >
            <RotateCcw size={18} /> Restart
          </button>
          
          <button 
            onClick={() => {
              pauseSession();
              setShowCorrectionPanel(true);
            }}
            className="col-span-1 py-3 bg-rose-50/80 hover:bg-rose-100 border border-rose-100/50 text-rose-700 font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <HelpCircle size={18} /> Need Help
          </button>
          
          <button 
            onClick={() => {
              pauseSession();
              setShowChatPanel(true);
            }}
            className="col-span-1 py-3 bg-indigo-50/80 hover:bg-indigo-100 border border-indigo-100/50 text-indigo-700 font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <MessageCircle size={18} /> Ask Coach
          </button>
        </div>

        {/* Correction Panel Overlay */}
        {showCorrectionPanel && (
          <CorrectionPanel 
            exercise={selectedExercise}
            coach={selectedCoach}
            onClose={() => setShowCorrectionPanel(false)}
            onReplay={() => {
              replayAnimation();
              setShowCorrectionPanel(false);
            }}
          />
        )}

        {/* AI Chat Panel Overlay */}
        {showChatPanel && (
          <ChatPanel 
            exercise={selectedExercise}
            coach={selectedCoach}
            onClose={() => setShowChatPanel(false)}
            speak={speak}
            isMuted={isMuted}
            toggleMute={toggleMute}
          />
        )}
      </div>
      
    </div>
  );
}
