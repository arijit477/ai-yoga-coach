import React, { useState } from 'react';
import { Send } from 'lucide-react';
import VoiceButton from './VoiceButton';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
}

export default function ChatInput({ onSend, isLoading, isMuted, onToggleMute }: ChatInputProps) {
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim() || isLoading) return;
    onSend(inputText);
    setInputText('');
  };

  return (
    <div className="p-6 bg-white/40 backdrop-blur-md border-t border-white/50 relative z-10">
      <div className="flex items-end gap-3 bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-2 focus-within:border-wellness-300 focus-within:ring-4 focus-within:ring-wellness-100 transition-all shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)]">
        <VoiceButton isMuted={isMuted} onToggleMute={onToggleMute} />
        
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Ask a question..."
          className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 text-[15px] font-medium p-3 outline-none text-gray-800 placeholder-gray-400"
          rows={1}
        />
        
        <button
          onClick={handleSend}
          disabled={!inputText.trim() || isLoading}
          className="p-4 bg-gradient-to-r from-wellness-500 to-wellness-600 hover:from-wellness-600 hover:to-wellness-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-2xl transition-all shadow-md transform hover:scale-105 disabled:hover:scale-100"
        >
          <Send size={18} className={isLoading ? 'opacity-50' : ''} />
        </button>
      </div>
      <p className="text-[11px] font-medium text-gray-500 text-center mt-3 uppercase tracking-wider">
        AI cannot see your posture. Seek medical advice for pain.
      </p>
    </div>
  );
}
