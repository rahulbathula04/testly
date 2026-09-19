import React, { useState, useEffect } from 'react';
import GreNavbar from '../components/gre/GreNavbar';
import GreIntelligenceSpine from '../components/gre/GreIntelligenceSpine';
import GreDiagnosticRunner from '../components/gre/GreDiagnosticRunner';
import GreReportView from '../components/gre/GreReportView';
import GrePracticeEngine from '../components/gre/GrePracticeEngine';
import GreMockCenter from '../components/gre/GreMockCenter';
import Footer from '../components/Footer';
import { evaluateDiagnosticAttempt } from '../data/gre/greDiagnosticEngine';

export default function GreProductPage({ subview = 'intelligence', onNavigate, onOpenBooking }) {
  const [activeTab, setActiveTab] = useState(subview || 'intelligence');
  const [diagnosticResult, setDiagnosticResult] = useState(null);
  const [practiceSkillTarget, setPracticeSkillTarget] = useState('All Skills');

  // Sync with prop if subview changes
  useEffect(() => {
    if (subview && ['intelligence', 'diagnostic', 'practice', 'mock', 'report', 'results'].includes(subview)) {
      setActiveTab(subview === 'results' ? 'report' : subview);
    }
  }, [subview]);

  // Load persistent diagnostic report if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('testly_gre_diagnostic_result');
      if (saved) {
        setDiagnosticResult(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    document.title = "Testly / GRE — Assessment Intelligence & Practice";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    if (onNavigate) {
      const url = tabId === 'intelligence' ? '/gre' : `/gre/${tabId}`;
      window.history.pushState({}, '', url);
    }
  };

  const handleDiagnosticComplete = (responses) => {
    const evaluated = evaluateDiagnosticAttempt(responses);
    setDiagnosticResult(evaluated);
    try {
      localStorage.setItem('testly_gre_diagnostic_result', JSON.stringify(evaluated));
    } catch {
      // ignore
    }
    setActiveTab('report');
    if (onNavigate) {
      window.history.pushState({}, '', '/gre/results');
    }
  };

  const handleStartPracticeSkill = (skillName) => {
    setPracticeSkillTarget(skillName || 'All Skills');
    setActiveTab('practice');
    if (onNavigate) {
      window.history.pushState({}, '', '/gre/practice');
    }
  };

  const handleLaunchMock = (mockId) => {
    // Launch diagnostic runner as mock runner
    setActiveTab('diagnostic');
    if (onNavigate) {
      window.history.pushState({}, '', '/gre/mock');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col font-[Inter,system-ui,sans-serif] text-[#0F172A] selection:bg-[#1E3A8A] selection:text-white">
      {/* Dedicated Testly / GRE Navigation */}
      <GreNavbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onNavigate={onNavigate}
        onOpenBooking={onOpenBooking}
      />

      {/* Main Content Area */}
      <main className="flex-grow px-4 sm:px-6 lg:px-8">
        {activeTab === 'intelligence' && (
          <GreIntelligenceSpine
            onStartDiagnostic={() => handleSelectTab('diagnostic')}
            onStartPractice={() => handleSelectTab('practice')}
            onStartMock={() => handleSelectTab('mock')}
            onOpenReport={() => handleSelectTab('report')}
          />
        )}

        {activeTab === 'diagnostic' && (
          <GreDiagnosticRunner
            onComplete={handleDiagnosticComplete}
            onExit={() => handleSelectTab('intelligence')}
          />
        )}

        {activeTab === 'report' && (
          <GreReportView
            diagnosticResult={diagnosticResult}
            onStartPractice={handleStartPracticeSkill}
            onRetakeDiagnostic={() => handleSelectTab('diagnostic')}
            onExploreMocks={() => handleSelectTab('mock')}
          />
        )}

        {activeTab === 'practice' && (
          <GrePracticeEngine
            initialSkill={practiceSkillTarget}
          />
        )}

        {activeTab === 'mock' && (
          <GreMockCenter
            onLaunchMock={handleLaunchMock}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => onNavigate && onNavigate('/admin')}
        onNavigate={onNavigate}
        onOpenAgreement={() => {}}
      />
    </div>
  );
}
