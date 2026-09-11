import React, { useState } from 'react';
import { Flag, CheckCircle, ArrowLeft, X } from 'lucide-react';

export default function ReviewScreen({
  questions,
  userAnswers,
  flaggedQuestions,
  onSelectQuestion,
  onClose
}) {
  const [filter, setFilter] = useState('ALL');

  const filteredQuestions = questions.filter((q, idx) => {
    const isAnswered = userAnswers[q.id] !== undefined && userAnswers[q.id] !== '';
    const isFlagged = flaggedQuestions[q.id];

    if (filter === 'FLAGGED') return isFlagged;
    if (filter === 'UNANSWERED') return !isAnswered;
    return true;
  });

  return (
    <div className="bg-[#1E293B] p-6 rounded-2xl border border-slate-700 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-700">
        <div>
          <h3 className="text-lg font-black text-white">Section Question Review Screen</h3>
          <p className="text-xs text-slate-400 font-medium">Review your answers or jump directly to any question before submitting.</p>
        </div>
        <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
            filter === 'ALL' ? 'bg-[#1769E0] text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          All Questions ({questions.length})
        </button>

        <button
          onClick={() => setFilter('FLAGGED')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
            filter === 'FLAGGED' ? 'bg-yellow-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Flagged
        </button>

        <button
          onClick={() => setFilter('UNANSWERED')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
            filter === 'UNANSWERED' ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Unanswered
        </button>
      </div>

      {/* Question Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {filteredQuestions.map((q) => {
          const originalIndex = questions.findIndex(item => item.id === q.id);
          const isAnswered = userAnswers[q.id] !== undefined && userAnswers[q.id] !== '';
          const isFlagged = flaggedQuestions[q.id];

          return (
            <button
              key={q.id}
              onClick={() => {
                onSelectQuestion(originalIndex);
                onClose();
              }}
              className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                isAnswered
                  ? 'bg-slate-800 border-slate-600 text-white'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <div>
                <span className="text-xs font-black block">Question {originalIndex + 1}</span>
                <span className="text-[10px] font-bold text-slate-400 block">{q.skill}</span>
              </div>

              <div className="flex items-center gap-1.5">
                {isFlagged && <Flag className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />}
                {isAnswered ? (
                  <span className="text-[10px] font-black bg-green-500/20 text-green-400 px-2 py-0.5 rounded">Answered</span>
                ) : (
                  <span className="text-[10px] font-bold bg-slate-700 text-slate-300 px-2 py-0.5 rounded">Unanswered</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer Return Action */}
      <div className="pt-4 border-t border-slate-700">
        <button
          onClick={onClose}
          className="bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs px-6 py-3 rounded-xl flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Current Question</span>
        </button>
      </div>

    </div>
  );
}
