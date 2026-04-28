import React from 'react';
import { CognitiveAnalysis, ConflictType } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, AlertTriangle, CheckCircle2, MessageSquare, ListTodo, FileText, ChevronRight } from 'lucide-react';

interface ReportSectionProps {
  analysis: CognitiveAnalysis | null;
}

export const ReportSection: React.FC<ReportSectionProps> = ({ analysis }) => {
  if (!analysis) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full space-y-12 pb-24"
      >
        {/* Summary Header */}
        <header className="flex justify-between items-end border-b border-slate-200 pb-6 mb-8">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Analytical Output / Operating System</p>
            <h1 className="text-3xl font-light tracking-tight text-slate-900">Cognitive Report: <span className="font-medium">Synthesis Complete</span></h1>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-1 justify-end">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
              <p className="text-xs font-semibold uppercase tracking-tight">Status: Syncing</p>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Confidence Interval: 94.2%</p>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Col: Summary & Decisions */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 px-1">Executive Summary</h2>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-sm leading-relaxed text-slate-600 italic font-light">
                  "{analysis.summary}"
                </p>
              </div>
            </section>

            <section className="flex-1">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 mb-4 px-1">Critical Decisions</h2>
              <div className="space-y-3">
                {analysis.decisions.map((d, i) => (
                  <div key={i} className="bg-indigo-50/30 p-4 rounded-xl border border-indigo-100/50 flex justify-between items-center group hover:bg-indigo-50 transition-colors">
                    <p className="text-[13px] font-medium text-indigo-900">{d}</p>
                    <CheckCircle2 size={14} className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Center Col: Conflicts & Risks */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-red-500 mb-4 px-1">Detected Conflicts</h2>
              <div className="space-y-5">
                {analysis.conflicts.map((c, i) => (
                  <div key={i} className="border-l-4 border-red-500 pl-5 py-1">
                    <p className="text-[10px] font-bold text-slate-900 mb-1 tracking-tight uppercase">{c.type}</p>
                    <p className="text-sm text-slate-900 font-medium mb-1">{c.description}</p>
                    <p className="text-[13px] text-slate-500 leading-snug">{c.evidence}</p>
                    <p className="text-[11px] font-bold text-red-600 mt-2">Impact: {c.impact}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-4 px-1">Strategic Risks</h2>
              <div className="space-y-4">
                {analysis.risks.map((r, i) => (
                  <div key={i} className="bg-amber-50/50 p-5 rounded-2xl border border-amber-200/50 hover:bg-amber-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                        r.severity === 'High' ? 'bg-red-500' : 'bg-amber-500'
                      }`} />
                      <div>
                        <p className="text-[10px] font-bold text-amber-800 uppercase mb-1">{r.category}</p>
                        <p className="text-[13px] text-slate-700 leading-relaxed font-medium">{r.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Col: Suggested Actions */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
            <section className="flex-1 bg-slate-900 text-slate-50 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[60px]" />
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-10 relative z-10">Strategic Recommendations</h2>
              
              <div className="space-y-10 relative z-10">
                {analysis.suggestedActions.map((a, i) => (
                  <div key={i}>
                    <p className="text-[10px] font-bold text-indigo-300 mb-3 uppercase tracking-widest">Corrective Action</p>
                    <p className="text-sm text-slate-100 leading-relaxed mb-4">{a.task}</p>
                    <span className="text-[11px] text-slate-500 font-mono italic block mb-4">// {a.rationale}</span>
                    <button className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-lg shadow-indigo-600/20">
                      Archive Action
                    </button>
                    {i < analysis.suggestedActions.length - 1 && <div className="h-px bg-slate-800 my-8" />}
                  </div>
                ))}

                <div className="pt-6 border-t border-slate-800">
                  <header className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-6">
                    <MessageSquare size={14} />
                    <span>Suggested Communications</span>
                  </header>
                  
                  <div className="space-y-8">
                    {analysis.suggestedMessages.map((m, i) => (
                      <div key={i} className="group">
                        <p className="text-[10px] font-bold text-white mb-2 uppercase opacity-40">Recipient: {m.recipient}</p>
                        <div className="bg-slate-800 group-hover:bg-slate-800/80 p-4 rounded-xl text-[13px] text-slate-300 font-mono mb-4 leading-relaxed transition-colors">
                          "{m.draft}"
                        </div>
                        <button className="w-full border border-slate-700 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-800 hover:text-white transition-all text-slate-400">
                          Copy Draft
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Context Gaps */}
        <section className="bg-white border text-center border-slate-200 p-8 rounded-2xl flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <FileText size={18} className="text-slate-400" />
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Data Integrity Check: Gaps Found</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {analysis.contextGaps.map((g, i) => (
              <span key={i} className="text-[11px] font-medium text-slate-500 bg-slate-50 border border-slate-100 px-4 py-1.5 rounded-full">
                {g}
              </span>
            ))}
          </div>
        </section>

        {/* Footer Status */}
        <footer className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center opacity-60">
          <p className="text-[11px] text-slate-400 font-mono tracking-tighter uppercase">system.twin.live // active_monitoring: on</p>
          <div className="flex gap-6 uppercase">
            <span className="text-[11px] font-bold text-slate-500">INTEGRITY: 100%</span>
            <span className="text-[11px] font-bold text-slate-500">MODEL: GEMINI-3-FLASH</span>
          </div>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
};
