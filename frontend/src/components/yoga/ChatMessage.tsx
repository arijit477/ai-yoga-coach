import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'coach';
  content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isCoach = role === 'coach';

  return (
    <div className={`flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300 ${!isCoach ? 'flex-row-reverse' : ''}`}>
      <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm ${
        isCoach ? 'bg-gradient-to-br from-wellness-100 to-wellness-200 text-wellness-700' : 'bg-gray-100 text-gray-500'
      }`}>
        {isCoach ? <Bot size={18} /> : <User size={18} />}
      </div>
      <div className={`max-w-[75%] rounded-3xl px-5 py-3.5 text-[15px] font-medium leading-relaxed ${
        !isCoach 
          ? 'bg-wellness-600 text-white rounded-tr-sm shadow-md' 
          : 'bg-white/80 backdrop-blur-md border border-white/50 text-gray-800 rounded-tl-sm shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)]'
      }`}>
        {content}
      </div>
    </div>
  );
}
