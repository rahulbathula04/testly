import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  Calculator,
  Flag,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  X,
  RotateCcw
} from 'lucide-react';
import { getDiagnosticSubset } from '../../data/gre/greQuestionBank';

export default function GreDiagnosticRunner({ onComplete, onExit }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Responses: { [qId]: { selectedAnswer: string[], timeSpentSeconds: number, question: object } }
  const [responses, setResponses] = useState({});
  const [flagged, setFlagged] = useState(new Set());
  
  // Section Timing (Starts at 25:00 minutes = 1500 seconds)
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(1500);
  const [timerRunning, setTimerRunning] = useState(true);
  
  // Per-item time tracking
  const itemStartTimestamp = useRef(Date.now());
  const itemElapsedMap = useRef({});

  // Calculator modal state
  const [calcOpen, setCalcOpen] = useState(false);
  const [calcInput, setCalcInput] = useState('0');
  const [calcMemory, setCalcMemory] = useState(null);
  const [calcOp, setCalcOp] = useState(null);

  // Review sheet modal
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  useEffect(() => {
    const subset = getDiagnosticSubset();
    setQuestions(subset);
    itemStartTimestamp.current = Date.now();
  }, []);

  // Section Timer Tick
  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  // Record elapsed seconds on question change
  const recordCurrentItemTime = () => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;
    const qId = currentQ.questionId;
    const elapsedNow = Math.round((Date.now() - itemStartTimestamp.current) / 1000);
    const existing = itemElapsedMap.current[qId] || 0;
    itemElapsedMap.current[qId] = existing + elapsedNow;
    itemStartTimestamp.current = Date.now();
  };

  const handleSelectOption = (optId) => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;
    const qId = currentQ.questionId;
    const isMultiSelect = currentQ.questionType === 'SELECT_TWO_EQUIVALENT' || currentQ.questionType === 'MULTI_ANSWER';

    const currentSelected = responses[qId]?.selectedAnswer || [];

    let updatedSelected = [];
    if (isMultiSelect) {
      if (currentSelected.includes(optId)) {
        updatedSelected = currentSelected.filter(id => id !== optId);
      } else {
        // Limit to max 2 for sentence equivalence
        if (currentQ.questionType === 'SELECT_TWO_EQUIVALENT' && currentSelected.length >= 2) {
          updatedSelected = [currentSelected[1], optId];
        } else {
          updatedSelected = [...currentSelected, optId];
        }
      }
    } else {
      updatedSelected = [optId];
    }

    setResponses(prev => ({
      ...prev,
      [qId]: {
        selectedAnswer: updatedSelected,
        question: currentQ,
        timeSpentSeconds: itemElapsedMap.current[qId] || 45
      }
    }));
  };

  const handleNumericInput = (val) => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;
    const qId = currentQ.questionId;

    setResponses(prev => ({
      ...prev,
      [qId]: {
        selectedAnswer: [val],
        question: currentQ,
        timeSpentSeconds: itemElapsedMap.current[qId] || 45
      }
    }));
  };

  const toggleFlag = () => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;
    const qId = currentQ.questionId;
    setFlagged(prev => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  const goToNext = () => {
    recordCurrentItemTime();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setReviewModalOpen(true);
    }
  };

  const goToPrev = () => {
    recordCurrentItemTime();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const jumpToQuestion = (index) => {
    recordCurrentItemTime();
    setCurrentIndex(index);
    setReviewModalOpen(false);
  };

  const handleSubmitTest = () => {
    recordCurrentItemTime();
    setTimerRunning(false);
    
    // Inject final accurate time spent into responses
    const finalResponses = { ...responses };
    questions.forEach(q => {
      const qId = q.questionId;
      const spent = itemElapsedMap.current[qId] || 50;
      if (!finalResponses[qId]) {
        finalResponses[qId] = {
          selectedAnswer: [],
          question: q,
          timeSpentSeconds: spent
        };
      } else {
        finalResponses[qId].timeSpentSeconds = spent;
      }
    });

    if (onComplete) {
      onComplete(finalResponses);
    }
  };

  // Simple On-Screen Calculator
  const handleCalcButton = (btn) => {
    if (btn === 'C') {
      setCalcInput('0');
      setCalcMemory(null);
      setCalcOp(null);
    } else if (btn === '√') {
      const num = parseFloat(calcInput);
      if (num >= 0) setCalcInput(String(Math.sqrt(num).toFixed(4).replace(/\.?0+$/, '')));
    } else if (['+', '-', '×', '÷'].includes(btn)) {
      setCalcMemory(parseFloat(calcInput));
      setCalcOp(btn);
      setCalcInput('0');
    } else if (btn === '=') {
      if (calcOp && calcMemory !== null) {
        const cur = parseFloat(calcInput);
        let res = 0;
        if (calcOp === '+') res = calcMemory + cur;
        if (calcOp === '-') res = calcMemory - cur;
        if (calcOp === '×') res = calcMemory * cur;
        if (calcOp === '÷') res = cur !== 0 ? calcMemory / cur : 'Error';
        setCalcInput(String(typeof res === 'number' ? Number(res.toFixed(4)) : res));
        setCalcMemory(null);
        setCalcOp(null);
      }
    } else {
      // number or decimal
      if (calcInput === '0' && btn !== '.') {
        setCalcInput(btn);
      } else if (btn === '.' && calcInput.includes('.')) {
        // ignore duplicate dot
      } else {
        setCalcInput(calcInput + btn);
      }
    }
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-500 font-mono text-xs">
        Loading Testly GRE Diagnostic Session...
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const qId = currentQ.questionId;
  const isFlagged = flagged.has(qId);
  const selectedAnswer = responses[qId]?.selectedAnswer || [];
  const isQuant = currentQ.section === 'QUANT';

  // Format Timer mm:ss
  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A] flex flex-col font-[Inter,system-ui,sans-serif]">
      
      {/* ── TOP ASSESSMENT SYSTEM BAR ── */}
      <div className="bg-[#0F172A] text-white px-4 sm:px-8 py-3 border-b border-slate-800 flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="font-black text-sm tracking-tight text-white font-['DM_Serif_Display',Georgia,serif]">
            TESTLY / GRE
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-blue-400 font-bold uppercase tracking-wider hidden sm:inline">
            {currentQ.section === 'QUANT' ? 'QUANTITATIVE REASONING' : 'VERBAL REASONING'}
          </span>
          <span className="text-slate-500 text-[11px] bg-slate-800 px-2 py-0.5 rounded hidden md:inline">
            DIAGNOSTIC SECTION 01
          </span>
        </div>

        {/* Center: Calculator button if Quant */}
        <div className="flex items-center gap-4">
          {isQuant && (
            <button
              onClick={() => setCalcOpen(true)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Open On-Screen Calculator"
            >
              <Calculator className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Calculator</span>
            </button>
          )}

          {/* Section Timer */}
          <div className="flex items-center gap-1.5 font-mono text-sm sm:text-base font-black px-3 py-1 bg-slate-900 border border-slate-700 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span className={timeLeftSeconds < 300 ? 'text-amber-400 animate-pulse' : 'text-slate-200'}>
              {timeFormatted}
            </span>
          </div>

          <button
            onClick={() => setReviewModalOpen(true)}
            className="text-xs text-slate-300 hover:text-white underline cursor-pointer"
          >
            Review ({Object.keys(responses).length}/{questions.length})
          </button>
        </div>
      </div>

      {/* ── QUESTION WORKSPACE ── */}
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10 space-y-8">
        {/* Item Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="space-y-0.5">
            <div className="font-mono text-xs text-slate-500 uppercase tracking-wider font-semibold">
              QUESTION {currentIndex + 1} OF {questions.length}
            </div>
            <div className="text-xs font-semibold text-[#1E3A8A]">
              Skill: {currentQ.skill} {currentQ.subskill && `• ${currentQ.subskill}`}
            </div>
          </div>

          {/* Mark for review button */}
          <button
            onClick={toggleFlag}
            className={`text-xs font-mono font-bold px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors cursor-pointer ${
              isFlagged
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'
            }`}
          >
            <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-500 text-amber-600' : 'text-slate-400'}`} />
            <span>{isFlagged ? 'MARKED' : 'MARK FOR REVIEW'}</span>
          </button>
        </div>

        {/* Question Body */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          {/* If Reading Comprehension Passage */}
          {currentQ.passage && (
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-2 max-h-56 overflow-y-auto">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                Reading Passage
              </span>
              <p>{currentQ.passage}</p>
            </div>
          )}

          {/* Quantitative Comparison: Quant A vs Quant B */}
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

          {/* Multi-Select instruction banner */}
          {currentQ.questionType === 'SELECT_TWO_EQUIVALENT' && (
            <div className="text-[11px] font-mono text-[#1E3A8A] bg-blue-50/70 border border-blue-200/70 rounded-lg p-2.5 font-semibold">
              Select exactly TWO answer choices that produce complete, coherent sentences with identical meaning.
            </div>
          )}

          {/* Answer Choices (Options) */}
          {currentQ.options && (
            <div className="space-y-2.5 pt-2">
              {currentQ.options.map((opt) => {
                const isSelected = selectedAnswer.includes(opt.id);
                const isMulti = currentQ.questionType === 'SELECT_TWO_EQUIVALENT';

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? 'bg-blue-50/60 border-[#1E3A8A] ring-1 ring-[#1E3A8A] shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 mt-0.5 rounded-${isMulti ? 'md' : 'full'} border flex items-center justify-center text-[11px] font-mono font-bold shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#1E3A8A] border-[#1E3A8A] text-white'
                          : 'border-slate-300 bg-white text-slate-600'
                      }`}
                    >
                      {opt.id}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-800 leading-relaxed pt-0.5">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Numeric Entry Box */}
          {currentQ.questionType === 'NUMERIC_ENTRY' && (
            <div className="pt-2 space-y-3">
              <label className="text-xs font-mono font-bold text-slate-700 block">
                Enter your numeric answer in the box:
              </label>
              <input
                type="text"
                value={selectedAnswer[0] || ''}
                onChange={(e) => handleNumericInput(e.target.value)}
                placeholder="e.g. 2"
                className="w-48 p-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-[#0F172A] focus:outline-hidden focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100"
              />
            </div>
          )}
        </div>
      </main>

      {/* ── BOTTOM ACTION STRIP ── */}
      <footer className="bg-white border-t border-slate-200 py-3.5 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className="text-xs font-mono font-bold px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>PREV</span>
          </button>

          <div className="text-xs font-mono text-slate-500">
            {currentIndex + 1} / {questions.length}
          </div>

          <div className="flex items-center gap-2">
            {currentIndex < questions.length - 1 ? (
              <button
                onClick={goToNext}
                className="bg-[#0F172A] hover:bg-[#1E3A8A] text-white text-xs font-mono font-bold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>NEXT</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setReviewModalOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>COMPLETE & SUBMIT</span>
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* ── ON-SCREEN CALCULATOR MODAL ── */}
      {calcOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-slate-900 text-white rounded-2xl p-5 w-72 shadow-2xl border border-slate-700 space-y-4 font-mono">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-blue-400" /> GRE On-Screen Calculator
              </span>
              <button onClick={() => setCalcOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Display */}
            <div className="bg-slate-800 p-3 rounded-xl text-right text-xl font-bold font-mono tracking-wider overflow-hidden">
              {calcInput}
            </div>

            {/* Buttons Grid */}
            <div className="grid grid-cols-4 gap-2 text-sm font-bold">
              {['C', '√', '÷', '×', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '=', '0', '.'].map((btn, bIdx) => (
                <button
                  key={bIdx}
                  onClick={() => handleCalcButton(btn)}
                  className={`p-2.5 rounded-lg border transition-colors cursor-pointer ${
                    btn === '='
                      ? 'col-span-1 bg-blue-600 border-blue-500 text-white hover:bg-blue-500'
                      : ['+', '-', '×', '÷', '√'].includes(btn)
                      ? 'bg-slate-800 border-slate-700 text-blue-400 hover:bg-slate-700'
                      : btn === 'C'
                      ? 'bg-red-900/50 border-red-800 text-red-200 hover:bg-red-800/50'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── REVIEW & SUBMIT MODAL ── */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-[#0F172A] font-['DM_Serif_Display',Georgia,serif]">
                  Section Question Review
                </h3>
                <p className="text-xs text-slate-500">
                  Click any question number to review or change your response.
                </p>
              </div>
              <button onClick={() => setReviewModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigator Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 text-xs font-mono">
              {questions.map((q, idx) => {
                const isAnswered = responses[q.questionId]?.selectedAnswer?.length > 0;
                const isItemFlagged = flagged.has(q.questionId);
                const isCurrent = currentIndex === idx;

                return (
                  <button
                    key={q.questionId}
                    onClick={() => jumpToQuestion(idx)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer relative ${
                      isCurrent
                        ? 'ring-2 ring-[#1E3A8A] font-black'
                        : ''
                    } ${
                      isAnswered
                        ? 'bg-blue-50 border-blue-200 text-[#1E3A8A] font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}
                  >
                    <div>Q{idx + 1}</div>
                    {isItemFlagged && (
                      <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-1 right-1" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span>Answered: {Object.keys(responses).length} of {questions.length}</span>
              <span>Marked: {flagged.size}</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setReviewModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Return to Test
              </button>
              <button
                onClick={handleSubmitTest}
                className="flex-1 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Submit Diagnostic
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
