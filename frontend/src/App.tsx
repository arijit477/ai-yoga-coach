import { useEffect } from 'react';
import { AICoachPage } from './features/ai-coach/components/AICoachPage';
import { initAsanaRegistry } from './features/ai-coach/data/AsanaRegistry';
import { GlobalErrorBoundary } from './components/GlobalErrorBoundary';

function App() {
  useEffect(() => {
    initAsanaRegistry().catch(console.error);
  }, []);

  return (
    <GlobalErrorBoundary>
      <div className="min-h-screen bg-[#f9fdfb]">
        <AICoachPage />
      </div>
    </GlobalErrorBoundary>
  );
}

export default App;