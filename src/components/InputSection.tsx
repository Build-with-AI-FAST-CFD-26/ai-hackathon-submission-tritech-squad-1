import React from 'react';
import { Send, Loader2, Info } from 'lucide-react';
import { motion } from 'motion/react';

interface InputSectionProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, isLoading }) => {
  const [text, setText] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onAnalyze(text);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2 px-1 text-[10px] uppercase tracking-widest font-bold text-slate-400">
        <div className="w-1 h-1 bg-indigo-400 rounded-full"></div>
        <span>Import raw logs or meeting transcripts</span>
      </div>
      
      <form onSubmit={handleSubmit} className="relative group transition-all">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. 'Met with investor today. Promised Q3 launch for feature X, but engineering team says focus is on Y...'"
          className="w-full h-48 p-6 bg-white border border-slate-200 rounded-2xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/50 placeholder:text-slate-300 transition-all shadow-sm group-hover:shadow-md"
          disabled={isLoading}
        />
        
        <div className="absolute bottom-5 right-5">
          <button
            type="submit"
            disabled={isLoading || !text.trim()}
            className="flex items-center gap-2 bg-slate-900 text-white px-8 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-indigo-500/20 active:scale-95"
          >
            {isLoading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <>
                Analyze Signal <Send size={14} />
              </>
            )}
          </button>
        </div>
      </form>
      
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {EXAMPLE_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            onClick={() => setText(prompt.text)}
            className="flex-shrink-0 text-[10px] uppercase font-bold text-slate-500 border border-slate-200 rounded-lg px-4 py-1.5 hover:border-indigo-200 hover:bg-white hover:text-indigo-600 transition-all bg-slate-50/50"
          >
            {prompt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const EXAMPLE_PROMPTS = [
  {
    label: "Conflict",
    text: "Investor meeting: We told Sequoia that Q3 would have the multi-tenant feature. Internal sync: Engineering says multi-tenant is pushed to next year to focus on performance."
  },
  {
    label: "Risk",
    text: "Founder Log: Weekly roadmap review. Priorities: Hire new head of Sales, finish Series A pitch deck, approve final UI redesign. Afternoon: 6 back-to-back sales calls."
  },
  {
    label: "Context Gap",
    text: "Messages: Product team shipping New Feature Z. Marketing team prepping campaign for Feature Y. No sync scheduled for handoff."
  }
];
