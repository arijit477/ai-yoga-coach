import { Mic, MicOff } from 'lucide-react';

interface VoiceButtonProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

export default function VoiceButton({ isMuted, onToggleMute }: VoiceButtonProps) {
  return (
    <button
      type="button"
      className={`p-3 rounded-xl transition-colors ${isMuted ? 'text-gray-400 hover:text-red-600 hover:bg-red-50' : 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'}`}
      title={isMuted ? "Unmute Voice" : "Mute Voice"}
      onClick={onToggleMute}
    >
      {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
    </button>
  );
}
