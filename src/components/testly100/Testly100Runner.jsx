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
  RotateCcw,
  ShieldCheck,
  Award,
  ArrowRight,
  Pause,
  Play
} from 'lucide-react';
import { GRE_QUESTION_BANK } from '../../data/gre/greQuestionBank';
import { logTelemetryEvent } from '../../data/testly100/testly100Store';

export default function Testly100Runner({ participant, onComplete, onExit }) {
  const participantId = participant?.id || 'guest';
  const participantNumber = participant?.participant_number || 'TESTLY-GUEST';

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [flagged, setFlagged] = useState(new Set());
  const [currentSection, setCurrentSection] = useState('Quantitative Reasoning');

  // Timer (25 minutes = 1500 seconds per section)
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(1500);
  const [isPaused, setIsPaused] = useState(false);

  // Review & Calculator modals
  const [calcOpen, setCalcOpen] = useState(false);
  const [calcInput, setCalcInput] = useState('0');
  const [reviewOpen, setReviewOpen] = useState(false);

  // Initialize questions and session
  useEffect(() => {
    // 12-question calibrated subset
    const subset = GRE_QUESTION_BANK.slice(0, 12);
    setQuestions(subset);

    // Try to restore saved session if page was refreshed
    try {
      const saved = localStorage.getItem(`testly_100_session_${participantId}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.responses) setResponses(parsed.responses);
        if (parsed.currentIndex) setCurrentIndex(parsed.currentIndex);
        if (parsed.timeLeftSeconds) setTimeLeftSeconds(parsed.timeLeftSeconds);
        if (parsed.flagged) setFlagged(new Set(parsed.flagged));
      }
    } catch {}

    // Emit initial telemetry
    logTelemetryEvent(participantId, 'TEST_STARTED', {
      currentSection: 'Quantitative Reasoning',
      currentQuestion: 1,
      progress: 5,
      timeRemaining: '25:00',
      status: 'ACTIVE',
      label: `Started assessment on Section: Quantitative Reasoning`
    });
  }, [participantId]);

  // Section Timer & Heartbeat tick
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Periodic Telemetry Heartbeat (every 10s)
  useEffect(() => {
    const heartbeat = setInterval(() => {
      const mins = Math.floor(timeLeftSeconds / 60);
      const secs = timeLeftSeconds % 60;
      const formattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      const progress = questions.length > 0 ? Math.round(((currentIndex + 1) / questions.length) * 100) : 0;

      logTelemetryEvent(participantId, 'HEARTBEAT', {
        currentSection,
        currentQuestion: currentIndex + 1,
        progress,
        timeRemaining: formattedTime,
        status: isPaused ? 'PAUSED' : 'ACTIVE'
      });

      // Autosave session state to prevent refresh data loss
      try {
        localStorage.setItem(`testly_100_session_${participantId}`, JSON.stringify({
          responses,
          currentIndex,
          timeLeftSeconds,
          flagged: Array.from(flagged)
        }));
      } catch {}
    }, 10000);

    return () => clearInterval(heartbeat);
  }, [participantId, currentIndex, currentSection, timeLeftSeconds, isPaused, questions.length, responses, flagged]);

  const currentQ = questions[currentIndex];

  const handleSelectAnswer = (optionId) => {
    if (!currentQ) return;
    const qId = currentQ.questionId;
    const isMultiple = currentQ.questionType === 'SELECT_TWO_EQUIVALENT';

    let currentSelected = responses[qId]?.selectedAnswer || [];

    let nextSelected;
    if (isMultiple) {
      if (currentSelected.includes(optionId)) {
        nextSelected = currentSelected.filter(id => id !== optionId);
      } else {
        if (currentSelected.length < 2) {
          nextSelected = [...currentSelected, optionId];
        } else {
          nextSelected = [currentSelected[1], optionId];
        }
      }
    } else {
      nextSelected = [optionId];
    }

    const updated = {
      ...responses,
      [qId]: {
        selectedAnswer: nextSelected,
        timeSpentSeconds: (responses[qId]?.timeSpentSeconds || 0) + 10,
        question: currentQ
      }
    };
    setResponses(updated);

    // Emit answered event
    logTelemetryEvent(participantId, 'QUESTION_ANSWERED', {
      currentSection,
      currentQuestion: currentIndex + 1,
      progress: Math.round(((currentIndex + 1) / questions.length) * 100),
      label: `Answered Q${currentIndex + 1} (${currentQ.skill})`
    });
  };

  const toggleFlag = () => {
    if (!currentQ) return;
    const next = new Set(flagged);
    if (next.has(currentQ.questionId)) {
      next.delete(currentQ.questionId);
    } else {
      next.add(currentQ.questionId);
      logTelemetryEvent(participantId, 'QUESTION_FLAGGED', {
        currentQuestion: currentIndex + 1,
        label: `Flagged Question ${currentIndex + 1} for review`
      });
    }
    setFlagged(next);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      if (nextIdx === 6) setCurrentSection('Verbal Reasoning');

      logTelemetryEvent(participantId, 'QUESTION_VIEWED', {
        currentQuestion: nextIdx + 1,
        currentSection: nextIdx >= 6 ? 'Verbal Reasoning' : 'Quantitative Reasoning',
        label: `Navigated to Question ${nextIdx + 1}`
      });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmitTest = () => {
    // Calculate uninflated diagnostic score
    let totalCorrect = 0;
    Object.values(responses).forEach(r => {
      const q = r.question;
      if (!q) return;
      const selected = Array.isArray(r.selectedAnswer) ? [...r.selectedAnswer].sort().join('') : r.selectedAnswer;
      const correct = Array.isArray(q.answer) ? [...q.answer].sort().join('') : q.answer;
      if (selected === correct) totalCorrect += 1;
    });

    const accuracy = questions.length > 0 ? Math.round((totalCorrect / questions.length) * 100) : 0;
    const quantScaled = 150 + Math.round(totalCorrect * 1.5);
    const verbalScaled = 148 + Math.round(totalCorrect * 1.3);

    const score = {
      quantitative: Math.min(170, quantScaled),
      verbal: Math.min(170, verbalScaled),
      total: Math.min(340, quantScaled + verbalScaled),
      accuracyPercent: accuracy,
      questionsAttempted: Object.keys(responses).length,
      totalQuestions: questions.length,
      correctCount: totalCorrect
    };

    logTelemetryEvent(participantId, 'TEST_SUBMITTED', {
      status: 'COMPLETED',
      progress: 100,
      score,
      label: `Completed simulation with Testly Score: ${score.total}`
    });

    try {
      localStorage.removeItem(`testly_100_session_${participantId}`);
    } catch {}

    if (onComplete) {
      onComplete({ responses, score, participant });
    }
  };

  const mins = Math.floor(timeLeftSeconds / 60);
  const secs = timeLeftSeconds % 60;
  const timerFormatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  if (!currentQ) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-slate-900 text-white font-mono">
        Loading Testly 100 Assessment Engine...
      </div>
    );
  }

  const selectedAnswers = responses[currentQ.questionId]?.selectedAnswer || [];
  const isFlagged = flagged.has(currentQ.questionId);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A] font-[Inter,system-ui,sans-serif] flex flex-col select-none">
      
      {/* ── TOP ETS-STYLE CONTROL BAR ── */}
      <header className="h-14 bg-[#0F172A] text-white px-4 sm:px-8 flex items-center justify-between border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
            {participantNumber}
          </span>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="text-slate-200 font-semibold">{currentSection}</span>
        </div>

        {/* Section Timer */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm bg-slate-900 border border-slate-700 px-3 py-1 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-white font-bold">{timerFormatted}</span>
          </div>

          <button
            onClick={() => setCalcOpen(!calcOpen)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1 font-mono"
            title="Open On-Screen Calculator"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Calc</span>
          </button>

          <button
            onClick={toggleFlag}
            className={`p-1.5 rounded-lg text-xs flex items-center gap-1 font-mono transition-colors cursor-pointer ${
              isFlagged
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
            title="Flag item for review"
          >
            <Flag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isFlagged ? 'Flagged' : 'Flag'}</span>
          </button>

          <button
            onClick={() => setReviewOpen(true)}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
          >
            Review ({Object.keys(responses).length}/{questions.length})
          </button>
        </div>
      </header>

      {/* ── QUESTION AREA ── */}
      <main className="flex-grow max-w-4xl w-full mx-auto p-4 sm:p-8 space-y-6 flex flex-col justify-between">
        <div className="space-y-6">
          
          {/* Question Metadata Bar */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs font-mono text-slate-500">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold uppercase">
              {currentQ.skill}
            </span>
          </div>

          {/* Question Stem */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
            {currentQ.questionType === 'SELECT_TWO_EQUIVALENT' && (
              <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1E3A8A] bg-blue-50 px-2 py-0.5 rounded inline-block">
                Select the TWO answer choices that best complete the sentence.
              </p>
            )}
            
            <p className="text-base sm:text-lg text-[#0F172A] leading-relaxed font-serif">
              {currentQ.question}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options?.map((opt) => {
              const isSelected = selectedAnswers.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectAnswer(opt.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer active:scale-99 ${
                    isSelected
                      ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-xs'
                      : 'bg-white hover:bg-slate-50 text-[#0F172A] border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {opt.id}
                    </span>
                    <span className="text-sm font-medium">{opt.text}</span>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />}
                </button>
              );
            })}
          </div>

        </div>

        {/* ── BOTTOM NAVIGATION CONTROLS ── */}
        <div className="border-t border-slate-200 pt-4 flex items-center justify-between shrink-0">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-3">
            {currentIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmitTest}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
              >
                <span>Submit Assessment</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </main>

      {/* ── CALCULATOR POPUP ── */}
      {calcOpen && (
        <div className="fixed top-16 right-6 z-40 bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-slate-800 w-64 font-mono space-y-3">
          <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
            <span>ETS Standard Calc</span>
            <button onClick={() => setCalcOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-lg text-right text-lg font-bold text-emerald-400 border border-slate-800 overflow-x-auto">
            {calcInput}
          </div>
          <div className="grid grid-cols-4 gap-1.5 text-xs">
            {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map((btn) => (
              <button
                key={btn}
                onClick={() => {
                  if (btn === '=') {
                    try {
                      // Safe arithmetic evaluate
                      const sanitized = calcInput.replace(/[^0-9+\-*/.]/g, '');
                      setCalcInput(String(Function(`'use strict'; return (${sanitized})`)()));
                    } catch {
                      setCalcInput('Error');
                    }
                  } else {
                    setCalcInput(prev => prev === '0' || prev === 'Error' ? btn : prev + btn);
                  }
                }}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-center font-bold"
              >
                {btn}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCalcInput('0')}
            className="w-full py-1 text-[11px] bg-slate-800 hover:bg-rose-900/40 text-slate-300 rounded-lg font-bold"
          >
            Clear
          </button>
        </div>
      )}

      {/* ── QUESTION REVIEW MODAL ── */}
      {reviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-5 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-[#0F172A]">Section Review Sheet</h3>
                <p className="text-xs text-slate-500">Jump directly to any item or review flagged questions.</p>
              </div>
              <button onClick={() => setReviewOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-72 overflow-y-auto p-1 font-mono text-xs">
              {questions.map((q, idx) => {
                const isAnswered = responses[q.questionId]?.selectedAnswer?.length > 0;
                const isFlg = flagged.has(q.questionId);
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={q.questionId}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setReviewOpen(false);
                    }}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      isCurrent
                        ? 'border-[#1E3A8A] bg-blue-50 text-[#1E3A8A] font-bold ring-2 ring-[#1E3A8A]'
                        : isAnswered
                        ? 'bg-slate-50 border-slate-200 text-slate-800'
                        : 'bg-white border-slate-200 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span>Q{idx + 1}</span>
                      {isFlg && <Flag className="w-3 h-3 text-amber-500 fill-amber-500" />}
                    </div>
                    <span className="text-[10px] block opacity-70 mt-0.5">
                      {isAnswered ? 'Answered' : 'Unanswered'}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                Answered: {Object.keys(responses).length} of {questions.length}
              </span>
              <button
                onClick={() => setReviewOpen(false)}
                className="bg-[#0F172A] text-white font-bold px-4 py-2 rounded-xl"
              >
                Resume Section
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
