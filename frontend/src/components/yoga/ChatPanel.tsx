import React, { useState, useRef, useEffect } from 'react';
import type { Coach } from '../../types/coach';
import type { Exercise } from '../../types/exercise';
import { X, Bot } from 'lucide-react';
import { askCoach } from '../../services/api';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

interface ChatPanelProps {
  coach: Coach;
  exercise: Exercise;
  onClose: () => void;
  speak: (text: string) => void;
  isMuted: boolean;
  toggleMute: () => void;
}

interface Message {
  role: 'user' | 'coach';
  content: string;
}

export default function ChatPanel({ coach, exercise, onClose, speak, isMuted, toggleMute }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'coach', content: `Hi, I'm ${coach.name}. How can I help you with ${exercise.name}?` }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text: string) => {
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setIsLoading(true);

    try {
      const data = await askCoach(coach.id, exercise.id, text);
      setMessages(prev => [...prev, { role: 'coach', content: data.message }]);
      speak(data.message);
    } catch (error) {
      const errorMsg = "I'm having trouble connecting right now. Let's focus on our breathing for a moment.";
      setMessages(prev => [...prev, { role: 'coach', content: errorMsg }]);
      speak(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute inset-y-0 right-0 w-full md:w-[420px] bg-white/70 backdrop-blur-2xl shadow-[-20px_0_40px_rgba(0,0,0,0.05)] z-40 flex flex-col border-l border-white/60 transform transition-transform duration-300 animate-in slide-in-from-right">
      
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/50 bg-white/40">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-wellness-400 to-wellness-600 flex items-center justify-center text-white font-display font-bold text-xl shadow-md">
            {coach.name[0]}
          </div>
          <div>
            <h3 className="font-bold font-display text-gray-900 text-lg">{coach.name}</h3>
            <p className="text-xs text-wellness-600 font-bold uppercase tracking-wider">AI Yoga Assistant</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-900 hover:bg-white/60 rounded-full transition-colors border border-transparent hover:border-white/50"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-transparent custom-scrollbar">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} role={msg.role} content={msg.content} />
        ))}
        
        {isLoading && (
          <div className="flex gap-4 animate-in fade-in duration-300">
            <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-wellness-100 to-wellness-200 text-wellness-700 shadow-sm">
              <Bot size={18} />
            </div>
            <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl rounded-tl-sm px-5 py-4 shadow-sm flex items-center gap-1.5 h-[52px]">
              <div className="w-2 h-2 bg-wellness-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-wellness-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
              <div className="w-2 h-2 bg-wellness-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input */}
      <ChatInput 
        onSend={handleSend} 
        isLoading={isLoading} 
        isMuted={isMuted} 
        onToggleMute={toggleMute} 
      />

    </div>
  );
}
