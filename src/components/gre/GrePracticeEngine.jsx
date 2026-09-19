import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Filter,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Calculator
} from 'lucide-react';
import { GRE_QUESTION_BANK } from '../../data/gre/greQuestionBank';

const SKILLS = [
  'All Skills',
  'Reading Comprehension',
  'Text Completion',
  'Sentence Equivalence',
  'Arithmetic',
  'Algebra',
  'Geometry',
  'Data Analysis'
];

export default function GrePracticeEngine({ initialSkill = 'All Skills' }) {
  const [selectedSkill, setSelectedSkill] = useState(initialSkill);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [numericInput, setNumericInput] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [practiceHistory, setPracticeHistory] = useState({});

  // Filter questions
  const filteredQuestions = selectedSkill === 'All Skills'
    ? GRE_QUESTION_BANK
    : GRE_QUESTION_BANK.filter(q => q.skill.toLowerCase() === selectedSkill.toLowerCase());

  const currentQ = filteredQuestions[activeQuestionIndex] || filteredQuestions[0];
  const isMultiSelect = currentQ?.questionType === 'SELECT_TWO_EQUIVALENT';

  const handleSelectOption = (optId) => {
    if (showExplanation) return; // locked after check

    if (isMultiSelect) {
      if (selectedOptions.includes(optId)) {
        setSelectedOptions(selectedOptions.filter(id => id !== optId));
      } else {
        if (selectedOptions.length >= 2) {
          setSelectedOptions([selectedOptions[1], optId]);
        } else {
          setSelectedOptions([...selectedOptions, optId]);
        }
      }
    } else {
      setSelectedOptions([optId]);
    }
  };

  const checkAnswer = () => {
    if (!currentQ) return;
    setShowExplanation(true);

    const userAns = currentQ.questionType === 'NUMERIC_ENTRY'
      ? [numericInput.trim()]
      : [...selectedOptions].sort();

    const correctAns = [...currentQ.answer].sort();
    const isCorrect = userAns.length === correctAns.length &&
      userAns.every((val, index) => val === correctAns[index]);

    setPracticeHistory(prev => ({
      ...prev,
      [currentQ.questionId]: {
        isCorrect,
        userAns
      }
    }));
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    setSelectedOptions([]);
    setNumericInput('');
    if (activeQuestionIndex < filteredQuestions.length - 1) {
      setActiveQuestionIndex(activeQuestionIndex + 1);
    } else {
      setActiveQuestionIndex(0);
    }
  };

  const handleSkillChange = (skill) => {
    setSelectedSkill(skill);
    setActiveQuestionIndex(0);
    setShowExplanation(false);
    setSelectedOptions([]);
    setNumericInput('');
  };

  if (!currentQ) {
    return (
      <div className="text-center py-12 text-slate-500 font-mono text-xs">
        No questions currently loaded for {selectedSkill}.
      </div>
    );
  }

  const userAttempt = practiceHistory[currentQ.questionId];
  const correctAnswers = currentQ.answer || [];

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 space-y-8 font-[Inter,system-ui,sans-serif]">
      
      {/* ── HEADER & SKILL FILTER PILLS ── */}
      <div className="space-y-4 border-b border-slate-200 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-[#1E3A8A] tracking-wider">
              PRACTICE ENGINE · STAGE 02
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] font-['DM_Serif_Display',Georgia,serif]">
              GRE Topic Drills
            </h1>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            {filteredQuestions.length} Original Testly Items Available
          </div>
        </div>

        {/* Skill Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
          {SKILLS.map((s) => {
            const isSelected = selectedSkill === s;
            return (
              <button
                key={s}
                onClick={() => handleSkillChange(s)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0F172A] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── QUESTION CARD ── */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        
        {/* Item Metadata Banner */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0F172A]">
              ITEM {activeQuestionIndex + 1} OF {filteredQuestions.length}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-600">{currentQ.skill}</span>
            {currentQ.subskill && <span className="text-slate-400 hidden sm:inline">({currentQ.subskill})</span>}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-50 text-[#1E3A8A] border border-blue-200">
              Tier {currentQ.difficulty || 'E3'}
            </span>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              Class A Original
            </span>
          </div>
        </div>

        {/* Passage (if Reading Comp) */}
        {currentQ.passage && (
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-2 max-h-56 overflow-y-auto">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
              Passage Excerpt
            </span>
            <p>{currentQ.passage}</p>
          </div>
        )}

        {/* Quant Comparison: Quant A vs Quant B */}
        {currentQ.questionType === 'QUANT_COMPARISON' && (
          <div className="space-y-4">
            <div className="text-sm sm:text-base font-medium text-slate-900 leading-relaxed">
              {currentQ.question}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-500">QUANTITY A</span>
                <div className="text-sm font-bold text-[#0F172A]">{currentQ.quantityA}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-500">QUANTITY B</span>
                <div className="text-sm font-bold text-[#0F172A]">{currentQ.quantityB}</div>
              </div>
            </div>
          </div>
        )}

        {/* Standard Question Prompt */}
        {currentQ.questionType !== 'QUANT_COMPARISON' && (
          <div className="text-sm sm:text-base font-medium text-slate-900 leading-relaxed">
            {currentQ.question}
          </div>
        )}

        {/* Options */}
        {currentQ.options && (
          <div className="space-y-2.5 pt-2">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOptions.includes(opt.id);
              const isCorrectAnswer = correctAnswers.includes(opt.id);

              let optionStyle = 'bg-white border-slate-200 hover:border-slate-300';
              if (showExplanation) {
                if (isCorrectAnswer) {
                  optionStyle = 'bg-emerald-50/80 border-emerald-500 text-emerald-950 font-medium';
                } else if (isSelected && !isCorrectAnswer) {
                  optionStyle = 'bg-rose-50/80 border-rose-400 text-rose-950';
                }
              } else if (isSelected) {
                optionStyle = 'bg-blue-50/60 border-[#1E3A8A] ring-1 ring-[#1E3A8A]';
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={showExplanation}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${optionStyle}`}
                >
                  <span
                    className={`w-5 h-5 mt-0.5 rounded-${isMultiSelect ? 'md' : 'full'} border flex items-center justify-center text-[11px] font-mono font-bold shrink-0 ${
                      showExplanation && isCorrectAnswer
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : isSelected
                        ? 'bg-[#1E3A8A] border-[#1E3A8A] text-white'
                        : 'border-slate-300 bg-white text-slate-600'
                    }`}
                  >
                    {opt.id}
                  </span>
                  <span className="text-xs sm:text-sm leading-relaxed pt-0.5">
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Numeric Entry */}
        {currentQ.questionType === 'NUMERIC_ENTRY' && (
          <div className="pt-2 space-y-3">
            <label className="text-xs font-mono font-bold text-slate-700 block">
              Enter your numeric answer:
            </label>
            <input
              type="text"
              disabled={showExplanation}
              value={numericInput}
              onChange={(e) => setNumericInput(e.target.value)}
              placeholder="e.g. 2"
              className="w-48 p-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-[#0F172A] focus:outline-hidden focus:border-[#1E3A8A]"
            />
          </div>
        )}

        {/* Action Button: Check Solution or Next */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          {!showExplanation ? (
            <button
              onClick={checkAnswer}
              disabled={selectedOptions.length === 0 && !numericInput}
              className="bg-[#0F172A] hover:bg-[#1E3A8A] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer active:scale-95"
            >
              Check Solution & Rationale
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="bg-[#1E3A8A] hover:bg-[#0F172A] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Next Practice Question</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-300" />
            </button>
          )}

          <span className="text-xs text-slate-400 font-mono">
            {currentQ.questionId}
          </span>
        </div>

        {/* ── STEP-BY-STEP EXPLANATION (REVEALED ON CHECK) ── */}
        {showExplanation && (
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E3A8A]">
                Step-by-Step Rationale & Distractor Analysis
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                Author: {currentQ.author}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200/80 font-mono text-xs font-bold text-slate-900">
              Official Correct Answer:{' '}
              <span className="text-emerald-700 font-black">
                {Array.isArray(currentQ.answer) ? currentQ.answer.join(', ') : currentQ.answer}
              </span>
            </div>

            <p className="leading-relaxed text-slate-700 whitespace-pre-line">
              {currentQ.explanation}
            </p>
          </div>
        )}

      </div>

    </div>
  );
}
