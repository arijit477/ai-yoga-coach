import { coaches } from '../../data/coaches';
import CoachCard from './CoachCard';
import { useCoachStore } from '../../store/useCoachStore';

export default function CoachSelector() {
  const setSelectedCoach = useCoachStore(state => state.setSelectedCoach);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-6 drop-shadow-sm">Choose Your Coach</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
          Select the AI yoga coach that best matches your preferred teaching style and energy for today's session.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {coaches.map(coach => (
          <CoachCard 
            key={coach.id} 
            coach={coach} 
            onSelect={(selected) => setSelectedCoach(selected)} 
          />
        ))}
      </div>
    </div>
  );
}
