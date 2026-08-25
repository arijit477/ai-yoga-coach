import type { Coach } from '../../types/coach';
import { Sparkles } from 'lucide-react';

interface CoachCardProps {
  coach: Coach;
  onSelect: (coach: Coach) => void;
}

export default function CoachCard({ coach, onSelect }: CoachCardProps) {
  return (
    <div 
      className="glass rounded-3xl hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden flex flex-col h-full cursor-pointer transform hover:-translate-y-2 group"
      onClick={() => onSelect(coach)}
    >
      <div className={`h-56 relative overflow-hidden transition-colors duration-500 ${coach.gender === 'female' ? 'bg-gradient-to-br from-rose-50 to-orange-50 group-hover:from-rose-100 group-hover:to-orange-100' : 'bg-gradient-to-br from-blue-50 to-indigo-50 group-hover:from-blue-100 group-hover:to-indigo-100'}`}>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-white/20 z-10 pointer-events-none" />
        <img 
          src={`/images/${coach.id}.jpg`} 
          alt={coach.name}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      
      <div className="p-8 flex flex-col flex-grow bg-white/40">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-3xl font-display font-bold text-gray-800">{coach.name}</h3>
          <span className={`text-xs px-4 py-1.5 rounded-full font-bold uppercase tracking-wider ${
            coach.gender === 'female' ? 'bg-rose-100/80 text-rose-700' : 'bg-blue-100/80 text-blue-700'
          }`}>
            {coach.personality}
          </span>
        </div>
        
        <p className="text-gray-600 mb-8 flex-grow leading-relaxed font-medium">
          {coach.description}
        </p>
        
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 relative border border-white/50 shadow-sm">
          <Sparkles size={18} className="absolute top-5 left-4 text-wellness-500" />
          <p className="text-sm italic text-gray-700 pl-8 leading-relaxed font-medium">
            "{coach.greeting}"
          </p>
        </div>
        
        <button 
          className="mt-8 w-full py-4 rounded-2xl font-bold text-white bg-wellness-600 hover:bg-wellness-700 transition-all duration-300 shadow-[0_8px_20px_-8px_rgba(74,106,99,0.5)] hover:shadow-[0_12px_24px_-8px_rgba(74,106,99,0.6)] transform hover:scale-[1.02]"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(coach);
          }}
        >
          Practice with {coach.name}
        </button>
      </div>
    </div>
  );
}
