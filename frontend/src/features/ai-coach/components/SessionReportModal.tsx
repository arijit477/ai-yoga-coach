import { useEffect, useState } from "react";
import { CheckCircle2, Award, ArrowRight, Loader2 } from "lucide-react";
import type { Asana } from "../types/asana";

interface SessionReportModalProps {
  completedAsanas: Array<{ asana: Asana; score: number }>;
  onClose: () => void;
}

export function SessionReportModal({
  completedAsanas,
  onClose,
}: SessionReportModalProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchSummary() {
      if (completedAsanas.length === 0) return;
      setIsLoading(true);
      
      try {
        const response = await fetch("http://localhost:8000/api/ai-coach/chat/summary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            asanas: completedAsanas.map(a => ({
              name: a.asana.name,
              score: a.score
            }))
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          if (isMounted) {
            setSummary(data.summary);
          }
        }
      } catch (err) {
        console.error("Failed to fetch session summary", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    
    fetchSummary();
    
    return () => {
      isMounted = false;
    };
  }, [completedAsanas]);

  const averageScore = completedAsanas.length > 0 
    ? Math.round(completedAsanas.reduce((sum, a) => sum + a.score, 0) / completedAsanas.length)
    : 0;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-emerald-950/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white/95 rounded-3xl shadow-2xl border border-emerald-100 max-w-lg w-full p-6 sm:p-8 flex flex-col gap-6 transform transition-all">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm mb-2">
            <Award className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-emerald-950" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            Session Complete
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Great job! You've completed {completedAsanas.length} poses today.
          </p>
        </div>

        {/* Stats */}
        <div className="bg-slate-50/50 rounded-2xl p-4 flex justify-around border border-slate-100">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Poses</span>
            <span className="text-xl font-bold text-emerald-900">{completedAsanas.length}</span>
          </div>
          <div className="w-px bg-slate-200" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Avg Score</span>
            <span className="text-xl font-bold text-emerald-900">{averageScore}%</span>
          </div>
        </div>

        {/* Breakdown */}
        <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
          {completedAsanas.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-emerald-50 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
                <span className="font-semibold text-sm text-slate-700">{item.asana.name}</span>
              </div>
              <span className={`font-bold text-sm ${item.score >= 80 ? 'text-emerald-600' : 'text-amber-500'}`}>
                {item.score}%
              </span>
            </div>
          ))}
        </div>

        {/* LLM Summary */}
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2 flex items-center gap-2">
            Coach's Feedback
            {isLoading && <Loader2 className="w-3 h-3 animate-spin text-emerald-600" />}
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed min-h-[60px]">
            {isLoading 
              ? "Analyzing your session and preparing personalized feedback..." 
              : summary || "You demonstrated excellent commitment today. Keep up the great practice and your alignment will continue to improve!"}
          </p>
        </div>

        {/* Actions */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 rounded-2xl font-bold transition-all shadow-lg active:scale-[0.98]"
          >
            Return to Dashboard
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
