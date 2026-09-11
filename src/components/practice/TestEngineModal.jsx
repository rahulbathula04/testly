import React, { useState, useEffect } from 'react';
import { X, Clock, Calculator, Flag, ArrowRight, ArrowLeft, Grid } from 'lucide-react';
import { GRE_QUESTION_BANK } from '../../data/questionBank';
import { EXAM_CONFIGURATIONS } from '../../data/examConfigurations';
import { determineGRESection2Difficulty } from '../../utils/adaptiveEngine';
import { evaluateAttempt, sanitizeQuestionsForClient } from '../../utils/scoringEngine';
import { saveActiveSession, getActiveSession, clearActiveSession } from '../../utils/sessionStorage';
import QuestionRenderer from './QuestionRenderer';
import ReviewScreen from './ReviewScreen';
import GRECalculator from './GRECalculator';
import DiagnosticReportModal from './DiagnosticReportModal';

export default function TestEngineModal({ isOpen, onClose, mode = 'MOCK', defaultExam = 'GRE' }) {
  const examConfig = EXAM_CONFIGURATIONS[defaultExam] || EXAM_CONFIGURATIONS.GRE;

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState({});
  
  const [sec2VerbalDiff, setSec2VerbalDiff] = useState('MEDIUM');
  const [sec2QuantDiff, setSec2QuantDiff] = useState('MEDIUM');

  const [showReviewScreen, setShowReviewScreen] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [scoreResults, setScoreResults] = useState(null);

  const [timeLeft, setTimeLeft] = useState(1080);

  // Session Recovery Check on Open
  useEffect(() => {
    if (isOpen) {
      const saved = getActiveSession();
      if (saved && saved.exam === defaultExam && saved.mode === mode) {
        if (window.confirm('Active practice session detected. Would you like to resume where you left off?')) {
          setCurrentSectionIndex(saved.currentSectionIndex || 0);
          setCurrentQuestionIndex(saved.currentQuestionIndex || 0);
          setUserAnswers(saved.userAnswers || {});
          setFlaggedQuestions(saved.flaggedQuestions || {});
          setSec2VerbalDiff(saved.sec2VerbalDiff || 'MEDIUM');
          setSec2QuantDiff(saved.sec2QuantDiff || 'MEDIUM');
          setTimeLeft(saved.timeLeft || 1080);
          return;
        } else {
          clearActiveSession();
        }
      }
      resetState();
    }
  }, [isOpen, defaultExam, mode]);

  const resetState = () => {
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setSec2VerbalDiff('MEDIUM');
    setSec2QuantDiff('MEDIUM');
    setShowReport(false);
    setShowReviewScreen(false);
    if (examConfig.sections && examConfig.sections[0]) {
      setTimeLeft(examConfig.sections[0].time || 1080);
    }
  };

  // Determine active section questions dynamically based on adaptive difficulty
  const getActiveSectionQuestions = () => {
    const secConfig = examConfig.sections[currentSectionIndex];
    if (!secConfig) return [];

    let rawQuestions = [];
    if (secConfig.isAdaptive) {
      if (secConfig.type === 'VERBAL') {
        rawQuestions = sec2VerbalDiff === 'EASY' 
          ? GRE_QUESTION_BANK.VERBAL_SECTION_2_EASY 
          : sec2VerbalDiff === 'HARD' 
          ? GRE_QUESTION_BANK.VERBAL_SECTION_2_HARD 
          : GRE_QUESTION_BANK.VERBAL_SECTION_2_MEDIUM;
      } else if (secConfig.type === 'QUANT') {
        rawQuestions = sec2QuantDiff === 'EASY' 
          ? GRE_QUESTION_BANK.QUANT_SECTION_2_EASY 
          : sec2QuantDiff === 'HARD' 
          ? GRE_QUESTION_BANK.QUANT_SECTION_2_HARD 
          : GRE_QUESTION_BANK.QUANT_SECTION_2_MEDIUM;
      }
    } else {
      rawQuestions = secConfig.questions || [];
    }

    // Sanitize questions for client in active MOCK mode
    return sanitizeQuestionsForClient(rawQuestions, mode);
  };

  const currentQuestions = getActiveSectionQuestions();
  const currentQuestion = currentQuestions[currentQuestionIndex] || currentQuestions[0];
  const currentSection = examConfig.sections[currentSectionIndex] || examConfig.sections[0];

  // Autosave Session State
  useEffect(() => {
    if (isOpen && !showReport) {
      saveActiveSession({
        exam: defaultExam,
        mode,
        currentSectionIndex,
        currentQuestionIndex,
        userAnswers,
        flaggedQuestions,
        sec2VerbalDiff,
        sec2QuantDiff,
        timeLeft
      });
    }
  }, [isOpen, currentSectionIndex, currentQuestionIndex, userAnswers, flaggedQuestions, timeLeft, showReport]);

  // Timer Countdown
  useEffect(() => {
    if (!isOpen || showReport) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleNextSection();
          return 1080;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, currentSectionIndex, showReport]);

  if (!isOpen) return null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (val) => {
    if (!currentQuestion) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: val
    }));
  };

  const handleToggleFlag = () => {
    if (!currentQuestion) return;
    setFlaggedQuestions(prev => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id]
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowReviewScreen(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextSection = () => {
    // Dynamic Adaptive Routing for GRE Verbal 1
    if (currentSectionIndex === 1) {
      let v1Correct = 0;
      GRE_QUESTION_BANK.VERBAL_SECTION_1.forEach(q => {
        if (userAnswers[q.id] === q.correctAnswer) v1Correct++;
      });
      const diff = determineGRESection2Difficulty(v1Correct, GRE_QUESTION_BANK.VERBAL_SECTION_1.length);
      setSec2VerbalDiff(diff);
    }

    // Dynamic Adaptive Routing for GRE Quant 1
    if (currentSectionIndex === 3) {
      let q1Correct = 0;
      GRE_QUESTION_BANK.QUANT_SECTION_1.forEach(q => {
        if (userAnswers[q.id] === q.correctAnswer || String(userAnswers[q.id]) === String(q.correctAnswer)) q1Correct++;
      });
      const diff = determineGRESection2Difficulty(q1Correct, GRE_QUESTION_BANK.QUANT_SECTION_1.length);
      setSec2QuantDiff(diff);
    }

    if (currentSectionIndex < examConfig.sections.length - 1) {
      const nextIdx = currentSectionIndex + 1;
      setCurrentSectionIndex(nextIdx);
      setCurrentQuestionIndex(0);
      setShowReviewScreen(false);
      setTimeLeft(examConfig.sections[nextIdx].time || 1080);
    } else {
      finishTest();
    }
  };

  const finishTest = () => {
    clearActiveSession();

    // Evaluate full attempt using deterministic post-submission scoring engine
    const res = evaluateAttempt({
      userAnswers,
      questionBank: GRE_QUESTION_BANK,
      sec2VerbalDiff,
      sec2QuantDiff
    });

    setScoreResults(res);
    setShowReport(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0F172A] text-white overflow-hidden selection:bg-[#1769E0] selection:text-white">
      
      {/* Top Test Header Bar */}
      <div className="bg-[#1E293B] px-6 py-4 border-b border-slate-700/80 flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black text-white">TESTLY</span>
          <span className="text-slate-500">|</span>
          <span className="text-sm font-bold text-slate-300">{examConfig.name}</span>
          <span className="text-xs bg-[#1769E0]/20 text-[#60A5FA] font-black px-3 py-0.5 rounded-full uppercase">
            {mode === 'MOCK' ? '100% Free Full Mock Mode' : 'Practice Mode'}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Section Timer */}
          <div className="flex items-center gap-2 bg-red-500/15 border border-red-500/30 text-red-400 font-mono font-bold px-4 py-1.5 rounded-xl text-sm">
            <Clock className="w-4 h-4 animate-pulse" />
            <span>Section Time: {formatTime(timeLeft)}</span>
          </div>

          {/* Calculator Trigger Button */}
          {examConfig.calculatorAllowed && (
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-extrabold transition-colors"
            >
              <Calculator className="w-4 h-4 text-[#1769E0]" />
              <span>Calculator</span>
            </button>
          )}

          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to exit the current test session? Progress is autosaved.')) {
                onClose();
              }
            }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Sub Header / Section Progress Indicator */}
      <div className="bg-[#152338] px-6 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs font-bold text-slate-300 shrink-0">
        <div className="flex items-center gap-2">
          <span>Section {currentSectionIndex + 1} of {examConfig.sections.length}:</span>
          <span className="text-white font-extrabold">{currentSection.name}</span>
        </div>

        <div className="flex items-center gap-4">
          <span>Question {currentQuestionIndex + 1} of {currentQuestions.length || 1}</span>
          <button
            onClick={() => setShowReviewScreen(!showReviewScreen)}
            className="text-[#60A5FA] hover:underline flex items-center gap-1"
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Review Grid</span>
          </button>
        </div>
      </div>

      {/* Main Screen Content Body */}
      <div className="flex-grow p-6 sm:p-10 overflow-y-auto max-w-5xl mx-auto w-full">
        {showReviewScreen ? (
          <ReviewScreen
            questions={currentQuestions}
            userAnswers={userAnswers}
            flaggedQuestions={flaggedQuestions}
            onSelectQuestion={(idx) => setCurrentQuestionIndex(idx)}
            onClose={() => setShowReviewScreen(false)}
          />
        ) : (
          <QuestionRenderer
            question={currentQuestion}
            userAnswer={currentQuestion ? userAnswers[currentQuestion.id] : undefined}
            onAnswerChange={handleAnswerChange}
            isFlagged={currentQuestion ? flaggedQuestions[currentQuestion.id] : false}
            onToggleFlag={handleToggleFlag}
            showExplanation={mode === 'PRACTICE'}
          />
        )}
      </div>

      {/* Bottom Navigation Control Bar */}
      <div className="bg-[#1E293B] px-6 py-4 border-t border-slate-700/80 flex items-center justify-between shrink-0">
        <button
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 font-extrabold text-xs text-white flex items-center gap-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Question</span>
        </button>

        <div className="flex items-center gap-3">
          {currentQuestionIndex < (currentQuestions.length || 1) - 1 ? (
            <button
              onClick={handleNextQuestion}
              className="px-8 py-3 rounded-xl bg-[#1769E0] hover:bg-[#102A56] font-extrabold text-xs text-white flex items-center gap-2 shadow-md transition-all"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleNextSection}
              className="px-8 py-3 rounded-xl bg-[#18A957] hover:bg-[#128342] font-black text-xs text-white flex items-center gap-2 shadow-md transition-all"
            >
              <span>{currentSectionIndex < examConfig.sections.length - 1 ? 'Complete Section →' : 'Submit & View Report →'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Floating GRE Calculator Widget */}
      <GRECalculator
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)}
        onTransferValue={(val) => {
          if (currentQuestion && currentQuestion.questionType === 'NUMERIC_ENTRY') {
            handleAnswerChange(val);
          }
        }}
      />

      {/* Score Diagnostic Report Modal */}
      <DiagnosticReportModal
        isOpen={showReport}
        onClose={() => {
          setShowReport(false);
          onClose();
        }}
        scoreData={scoreResults}
        onStartPractice={() => {
          setShowReport(false);
          onClose();
        }}
      />

    </div>
  );
}
