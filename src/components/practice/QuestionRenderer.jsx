import React, { useState } from 'react';
import { Flag, Eye, EyeOff } from 'lucide-react';

export default function QuestionRenderer({
  question,
  userAnswer,
  onAnswerChange,
  isFlagged,
  onToggleFlag,
  showExplanation = false
}) {
  const [essayText, setEssayText] = useState(userAnswer || '');
  const [strikethroughs, setStrikethroughs] = useState({});

  if (!question) return null;

  const handleEssayChange = (e) => {
    setEssayText(e.target.value);
    onAnswerChange(e.target.value);
  };

  const toggleStrikethrough = (idx) => {
    setStrikethroughs(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const wordCount = essayText.trim() === '' ? 0 : essayText.trim().split(/\s+/).length;

  return (
    <div className="space-y-6">
      
      {/* Question Header & Flagging Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-[#1769E0] bg-[#1769E0]/10 px-3 py-1 rounded-full uppercase">
            {question.skill}
          </span>
          <span className="text-xs font-semibold text-slate-400">
            Difficulty: <strong className="text-slate-200">{question.difficulty || 'MEDIUM'}</strong>
          </span>
        </div>

        <button
          onClick={onToggleFlag}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all border ${
            isFlagged 
              ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' 
              : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
          }`}
        >
          <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-yellow-400' : ''}`} />
          <span>{isFlagged ? 'Flagged for Review' : 'Flag Question'}</span>
        </button>
      </div>

      {/* Passage Area (If RC) */}
      {question.passage && (
        <div className="bg-[#1E293B] p-5 rounded-2xl border border-slate-700/80 max-h-56 overflow-y-auto text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
          <p className="font-bold text-slate-200 mb-2 uppercase text-[11px] tracking-wider">Passage:</p>
          <p>{question.passage}</p>
        </div>
      )}

      {/* Main Question Prompt */}
      <div className="bg-[#1E293B] p-5 sm:p-6 rounded-2xl border border-slate-700 space-y-3">
        <p className="text-sm sm:text-base font-semibold text-white leading-relaxed whitespace-pre-line">
          {question.prompt}
        </p>
      </div>

      {/* Question Type 1: ESSAY WRITING */}
      {question.questionType === 'ESSAY' && (
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>Type your response below:</span>
            <span>Word Count: <strong className="text-white">{wordCount}</strong></span>
          </div>
          <textarea
            value={essayText}
            onChange={handleEssayChange}
            rows={12}
            placeholder="Begin writing your response here..."
            className="w-full p-4 rounded-xl bg-[#1E293B] border border-slate-700 text-sm text-white font-mono leading-relaxed outline-none focus:border-[#1769E0] resize-y"
          />
        </div>
      )}

      {/* Question Type 2: DOUBLE BLANK */}
      {question.questionType === 'DOUBLE_BLANK' && question.optionsGroup && (
        <div className="grid grid-cols-2 gap-4">
          {question.optionsGroup.map((colOptions, colIdx) => (
            <div key={colIdx} className="bg-[#1E293B] p-4 rounded-2xl border border-slate-700 space-y-2">
              <p className="text-xs font-extrabold text-slate-300">Blank ({colIdx + 1})</p>
              <div className="space-y-2">
                {colOptions.map((opt, optIdx) => {
                  const currentSelection = Array.isArray(userAnswer) ? userAnswer : [];
                  const isSelected = currentSelection[colIdx] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => {
                        const newAns = [...currentSelection];
                        newAns[colIdx] = optIdx;
                        onAnswerChange(newAns);
                      }}
                      className={`w-full p-3 rounded-xl text-left text-xs font-extrabold transition-all border ${
                        isSelected 
                          ? 'bg-[#1769E0] text-white border-[#1769E0]' 
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Question Type 3: NUMERIC ENTRY */}
      {question.questionType === 'NUMERIC_ENTRY' && (
        <div className="bg-[#1E293B] p-6 rounded-2xl border border-slate-700 space-y-3 max-w-sm">
          <label className="block text-xs font-extrabold text-slate-300">Enter your numeric answer:</label>
          <input
            type="text"
            value={userAnswer || ''}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="e.g. 72"
            className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-base font-black text-white outline-none focus:border-[#1769E0]"
          />
        </div>
      )}

      {/* Question Type 4: SINGLE / MULTI CHOICE / QUANT COMPARE */}
      {(question.questionType === 'SINGLE_BLANK' || 
        question.questionType === 'SINGLE_CHOICE' || 
        question.questionType === 'SELECT_TWO' || 
        question.questionType === 'QUANT_COMPARE') && question.options && (
        <div className="space-y-2.5">
          {question.options.map((opt, idx) => {
            let isSelected = false;
            if (question.questionType === 'SELECT_TWO') {
              const currentArr = Array.isArray(userAnswer) ? userAnswer : [];
              isSelected = currentArr.includes(idx);
            } else {
              isSelected = userAnswer === idx;
            }

            const isStriked = strikethroughs[idx];

            return (
              <div key={idx} className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (question.questionType === 'SELECT_TWO') {
                      const currentArr = Array.isArray(userAnswer) ? userAnswer : [];
                      let newArr;
                      if (currentArr.includes(idx)) {
                        newArr = currentArr.filter(i => i !== idx);
                      } else {
                        newArr = [...currentArr, idx].slice(-2);
                      }
                      onAnswerChange(newArr);
                    } else {
                      onAnswerChange(idx);
                    }
                  }}
                  className={`flex-grow p-4 rounded-xl text-left text-xs sm:text-sm font-extrabold transition-all border ${
                    isSelected 
                      ? 'bg-[#1769E0] text-white border-[#1769E0] shadow-md' 
                      : 'bg-[#1E293B] text-slate-200 border-slate-700 hover:bg-slate-800'
                  } ${isStriked ? 'line-through opacity-40' : ''}`}
                >
                  {opt}
                </button>

                {/* Strikethrough Eliminate Choice Toggle */}
                <button
                  onClick={() => toggleStrikethrough(idx)}
                  className="p-2.5 rounded-xl bg-[#1E293B] border border-slate-700 text-slate-400 hover:text-white"
                  title="Eliminate choice"
                >
                  {isStriked ? <EyeOff className="w-4 h-4 text-red-400" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Explanation Box (Practice Mode Only) */}
      {showExplanation && question.explanation && (
        <div className="bg-[#18A957]/10 p-5 rounded-2xl border border-[#18A957]/30 text-xs sm:text-sm text-slate-200 space-y-2">
          <p className="font-black text-[#18A957] uppercase text-xs">Explanation & Solution:</p>
          <p className="leading-relaxed">{question.explanation}</p>
        </div>
      )}

    </div>
  );
}
