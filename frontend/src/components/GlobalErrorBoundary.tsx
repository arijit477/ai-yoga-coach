import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[GlobalErrorBoundary] Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    // A hard reload is safest to reset WebGL contexts or corrupt React state
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-[#0e131f] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
          <div className="max-w-md w-full bg-slate-900 rounded-3xl border border-slate-800 p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-rose-500 to-amber-500" />
            
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-500/10 mb-6">
              <AlertTriangle size={32} className="text-rose-500" />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
            
            <p className="text-slate-400 mb-6 text-sm leading-relaxed">
              We hit a snag running the AI Coach. This is usually caused by a camera permission error, a WebGL context crash, or an unexpected network drop.
            </p>

            <div className="bg-black/40 rounded-xl p-4 mb-8 border border-white/5 text-left overflow-hidden">
              <p className="text-xs font-mono text-rose-300/80 truncate">
                {this.state.error?.message || "Unknown error occurred"}
              </p>
            </div>

            <button
              onClick={this.handleReset}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 transition active:scale-95 shadow-lg shadow-emerald-900/20 cursor-pointer"
            >
              <RefreshCcw size={18} />
              <span>Restart Application</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
