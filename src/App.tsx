import React from 'react';
import { InputSection } from './components/InputSection';
import { ReportSection } from './components/ReportSection';
import { analyzeFounderInput } from './services/geminiService';
import { CognitiveAnalysis } from './types';
import { BrainCircuit, Info, AlertTriangle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [analysis, setAnalysis] = React.useState<CognitiveAnalysis | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleAnalyze = async (input: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeFounderInput(input);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setError("Failed to process cognitive load. The Twin might be offline or rate-limited.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation / Header */}
      <nav className="h-20 flex items-center justify-between px-10 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 text-white p-2 rounded-lg shadow-sm">
            <BrainCircuit size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">AI Cognitive Twin</p>
            <h1 className="text-lg font-light tracking-tight">Founder Analysis: <span className="font-medium text-slate-900">Live Workspace</span></h1>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
              <p className="text-[11px] font-semibold uppercase tracking-tight text-slate-600">Cognitive Load: Elevated</p>
            </div>
            <span className="h-4 w-px bg-slate-200"></span>
            <p className="text-[11px] text-slate-400 font-medium">Last sync: Just now</p>
          </div>
          {analysis && (
            <button 
              onClick={reset}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-tight text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <RefreshCw size={14} /> New Sync
            </button>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-10 pt-16">
        <AnimatePresence mode="wait">
          {!analysis ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto space-y-12"
            >
              <header className="space-y-6 text-center md:text-left">
                <h2 className="text-6xl font-light tracking-tight leading-[1.1] text-slate-900">
                  Verify your narrative. <br />
                  <span className="font-semibold text-indigo-600">Sync with reality.</span>
                </h2>
                <p className="text-xl text-slate-500 max-w-2xl font-light leading-relaxed">
                  Analyzing raw signals from Slack, transcripts, and notes to expose structural risks and disconnects before they become bottlenecks.
                </p>
              </header>

              <InputSection onAnalyze={handleAnalyze} isLoading={isLoading} />
              
              {error && (
                <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex gap-3 items-center">
                  <AlertTriangle size={16} /> {error}
                </div>
              )}

              <footer className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-slate-200">
                 <FeatureInfo 
                  icon={<AlertTriangle size={18} className="text-red-500" />}
                  title="Inconsistency Check"
                  desc="Flags contradictions between promised features and internal capacity."
                />
                <FeatureInfo 
                  icon={<BrainCircuit size={18} className="text-indigo-500" />}
                  title="Decision Extraction"
                  desc="Distills high-stakes commitments from unstructured founder logs."
                />
                <FeatureInfo 
                  icon={<Info size={18} className="text-slate-400" />}
                  title="Strategic Alignment"
                  desc="Detects when teams lose synchronization on core milestones."
                />
              </footer>
            </motion.div>
          ) : (
            <ReportSection analysis={analysis} />
          )}
        </AnimatePresence>
      </main>

      {/* Floating Status Bar */}
      <div className="fixed bottom-8 left-8 text-[10px] font-bold uppercase tracking-widest bg-white border border-slate-200 px-5 py-3 flex items-center gap-6 shadow-xl rounded-full">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
          System Online
        </span>
        <span className="w-px h-3 bg-slate-200" />
        <span className="text-slate-400 font-mono tracking-tighter">TWIN.LIVE // ACTIVE_MONITORING: ON</span>
      </div>
    </div>
  );
}

function FeatureInfo({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 text-sm font-bold tracking-tight text-slate-900">
        {icon} <span>{title}</span>
      </div>
      <p className="text-sm text-slate-500 leading-relaxed font-light">{desc}</p>
    </div>
  );
}

