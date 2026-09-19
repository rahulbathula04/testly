import React, { useState } from 'react';
import {
  ShieldAlert,
  Play,
  Sparkles,
  Database,
  ExternalLink
} from 'lucide-react';

import {
  EXAM_LIST,
  SAMPLE_QUESTION_BANK,
  ITEM_FACTORIES,
  compileTestInstance,
  COPYRIGHT_CLASSES,
  validateContentAuthorization,
  calculateExposureSecurity
} from '../../data/assessmentIntelligence';

export default function AssessmentEngineCommandCenter({ onNavigateHome }) {
  const [activeAdminTab, setActiveAdminTab] = useState('REGISTRY'); // REGISTRY, FACTORY, QUESTION_BANK, COMPLIANCE, MOCK_COMPILER
  const [selectedExamId, setSelectedExamId] = useState('GRE');
  
  // Factory Generation Test State
  const [generatedItem, setGeneratedItem] = useState(null);
  const [selectedFactoryKey, setSelectedFactoryKey] = useState('generateAlgebraItem');

  // Mock Compiler State
  const [compiledMock, setCompiledMock] = useState(null);
  const [mockMode, setMockMode] = useState('MOCK');

  // Compliance Test State
  const [complianceError, setComplianceError] = useState(null);

  const triggerFactoryGeneration = () => {
    const factory = ITEM_FACTORIES[selectedFactoryKey];
    if (factory) {
      const item = factory({ difficulty: 'E3', exam: selectedExamId });
      setGeneratedItem(item);
    }
  };

  const triggerMockCompilation = () => {
    const instance = compileTestInstance({
      examId: selectedExamId,
      mode: mockMode
    });
    setCompiledMock(instance);
  };

  const testClassDBlock = () => {
    setComplianceError(null);
    try {
      validateContentAuthorization({
        question_id: 'TEST-ILLEGAL-001',
        copyrightClass: 'D',
        question: 'Scraped proprietary question text'
      });
    } catch (err) {
      setComplianceError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 sm:p-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Database className="w-3.5 h-3.5" />
            <span>Internal Assessment Engine • Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Testly Assessment Engine & Editorial Studio
          </h1>
          <p className="text-xs text-slate-400">
            Internal psychometric pipeline, version registry, blueprint compiler, and copyright compliance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/assessment-intelligence"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Student View</span>
            <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
          </a>
          <button
            onClick={onNavigateHome}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-colors cursor-pointer"
          >
            Return Home
          </button>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-bold border-b border-slate-800 pb-3">
        {[
          { id: 'REGISTRY', label: 'Exam Registry & Versions' },
          { id: 'FACTORY', label: 'Item Factory & Generator' },
          { id: 'QUESTION_BANK', label: 'Question Bank & Lifecycle' },
          { id: 'COMPLIANCE', label: 'Copyright & Compliance Center' },
          { id: 'MOCK_COMPILER', label: 'Mock Compiler (#TEST-Instance)' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id)}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeAdminTab === tab.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── TAB 1: EXAM REGISTRY ── */}
      {activeAdminTab === 'REGISTRY' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXAM_LIST.map((exam) => (
              <div key={exam.examId} className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-white">{exam.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                    {exam.currentVersion.status}
                  </span>
                </div>

                <div className="text-xs text-slate-400 space-y-1">
                  <div>Version: <strong className="text-slate-200">{exam.currentVersion.versionId}</strong></div>
                  <div>Effective Date: <span className="text-slate-300">{exam.currentVersion.effectiveFrom}</span></div>
                  <div>Provider: <span className="text-slate-300">{exam.provider}</span></div>
                  <div>Sections: <span className="text-slate-300">{exam.sections.length}</span></div>
                </div>

                {exam.currentVersion.provenance?.sourceUrl && (
                  <a
                    href={exam.currentVersion.provenance.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-blue-400 hover:underline inline-flex items-center gap-1 pt-2 border-t border-slate-700 w-full"
                  >
                    <span>Audited Official Specification</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 2: ITEM FACTORY STUDIO ── */}
      {activeAdminTab === 'FACTORY' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">Item Factory Production Studio</h3>
                <p className="text-xs text-slate-400">Generate calibrated Class A original items bound to specific domain constraints.</p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={selectedFactoryKey}
                  onChange={(e) => setSelectedFactoryKey(e.target.value)}
                  className="bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none"
                >
                  <option value="generateAlgebraItem">Algebra Item Factory (GRE/SAT)</option>
                  <option value="generateReadingInferenceItem">Reading Inference Factory (GRE/GMAT)</option>
                  <option value="generateTOEFLAcademicDiscussionItem">TOEFL 2026 Academic Discussion Factory</option>
                  <option value="generatePTERepeatSentenceItem">PTE Repeat Sentence Acoustic Factory</option>
                </select>

                <button
                  onClick={triggerFactoryGeneration}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Execute Factory</span>
                </button>
              </div>
            </div>

            {/* Generated Output */}
            {generatedItem && (
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 space-y-3 font-mono text-xs text-slate-200">
                <div className="flex items-center justify-between text-blue-400 font-bold border-b border-slate-800 pb-2">
                  <span>ID: {generatedItem.question_id}</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">
                    CLASS {generatedItem.copyright_class} — TESTLY ORIGINAL
                  </span>
                </div>
                <div><span className="text-slate-500">Domain:</span> {generatedItem.domain} ({generatedItem.skill})</div>
                <div><span className="text-slate-500">Stimulus:</span> {generatedItem.stimulus}</div>
                <div><span className="text-slate-500">Question:</span> {generatedItem.question}</div>
                {generatedItem.options.length > 0 && (
                  <div className="pl-4 space-y-1">
                    {generatedItem.options.map((opt, i) => (
                      <div key={i} className={i === generatedItem.correct_answer ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                        [{i}] {opt} {i === generatedItem.correct_answer && '✓ (Correct)'}
                      </div>
                    ))}
                  </div>
                )}
                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  <span className="text-slate-500">Explanation:</span> {generatedItem.explanation}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── TAB 3: QUESTION BANK & LIFECYCLE ── */}
      {activeAdminTab === 'QUESTION_BANK' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Showing {SAMPLE_QUESTION_BANK.length} Calibrated Production Items</span>
            <span className="text-emerald-400 font-bold">100% Class A Original</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {SAMPLE_QUESTION_BANK.map((item) => {
              const exposure = calculateExposureSecurity(item.psychometrics?.attempt_count);
              return (
                <div key={item.question_id} className="bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-blue-400">{item.question_id}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">{item.exam}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-700 text-slate-300 font-bold">{item.difficulty}</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-slate-400">Exposure: <strong className="text-emerald-400">{exposure.tier}</strong> ({item.psychometrics?.attempt_count} attempts)</span>
                      <span className="text-slate-400">p-value: <strong className="text-white">{item.psychometrics?.p_correct}</strong></span>
                      <span className="text-slate-400">r_pb: <strong className="text-white">{item.psychometrics?.point_biserial}</strong></span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">STATUS: {item.status}</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 space-y-1">
                    <div className="font-bold text-white">{item.domain} — {item.skill}</div>
                    <div className="text-slate-400 line-clamp-2">{item.stimulus}</div>
                    <div className="font-medium text-slate-200">{item.question}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── TAB 4: COMPLIANCE & COPYRIGHT CENTER ── */}
      {activeAdminTab === 'COMPLIANCE' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 5-Tier Classification Overview */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white">5-Tier Copyright Classification</h3>
              <div className="space-y-2 text-xs">
                {Object.values(COPYRIGHT_CLASSES).map((cls) => (
                  <div key={cls.code} className="p-3 rounded-xl bg-slate-900 border border-slate-700/80 space-y-1">
                    <div className="flex items-center justify-between font-bold">
                      <span className={cls.code === 'D' ? 'text-red-400' : 'text-blue-400'}>
                        CLASS {cls.code} — {cls.name}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${cls.canDeployToLive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                        {cls.canDeployToLive ? 'Live Deployment Allowed' : 'Blocked from Live'}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px]">{cls.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Technical Enforcement Test */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-base font-bold text-white">Automated Anti-Scraping Technical Guard</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Testly assessment generator includes hard validation: any attempt to ingest, import, or generate Class D restricted content triggers an uncatchable fatal exception.
                </p>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 font-mono text-xs text-slate-300">
                  <code>
                    {"if (content.copyrightClass === 'D') {"}<br />
                    &nbsp;&nbsp;{"throw new Error('Restricted content cannot enter assessment generation.');"}<br />
                    {"}"}
                  </code>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-700">
                <button
                  onClick={testClassDBlock}
                  className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Simulate Attempt to Ingest Class D Restricted Material
                </button>

                {complianceError && (
                  <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">Hard System Guard Triggered:</strong>
                      <span>{complianceError}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 5: MOCK COMPILER ── */}
      {activeAdminTab === 'MOCK_COMPILER' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">Test Instance Compiler Studio</h3>
                <p className="text-xs text-slate-400">Compile Blueprint + Question Bank + Timing into reproducible #TEST instances.</p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={selectedExamId}
                  onChange={(e) => setSelectedExamId(e.target.value)}
                  className="bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none"
                >
                  <option value="GRE">GRE General Test</option>
                  <option value="TOEFL">TOEFL iBT (2026 Format)</option>
                  <option value="GMAT">GMAT Exam</option>
                  <option value="PTE">PTE Academic</option>
                  <option value="SAT">Digital SAT</option>
                </select>

                <select
                  value={mockMode}
                  onChange={(e) => setMockMode(e.target.value)}
                  className="bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none"
                >
                  <option value="MOCK">Full Mock Simulation</option>
                  <option value="DIAGNOSTIC">Diagnostic Mode</option>
                  <option value="ADAPTIVE">Adaptive Session</option>
                  <option value="COACHING">Coaching Loop</option>
                </select>

                <button
                  onClick={triggerMockCompilation}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Compile Test Instance</span>
                </button>
              </div>
            </div>

            {compiledMock && (
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-blue-400 font-black text-sm">{compiledMock.testInstanceId}</span>
                    <span className="text-slate-400 ml-3">Exam: {compiledMock.examName} ({compiledMock.versionId})</span>
                  </div>
                  <span className="text-emerald-400 font-bold bg-emerald-500/20 px-2.5 py-0.5 rounded text-[10px]">
                    COMPILED OK
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-300">
                  <div>Mode: <strong className="text-white">{compiledMock.mode?.name}</strong></div>
                  <div>Duration: <strong className="text-white">{compiledMock.totalDurationMinutes} minutes</strong></div>
                  <div>Provenance: <strong className="text-emerald-400">{compiledMock.copyrightProvenance}</strong></div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="text-slate-400 font-bold">Compiled Sections ({compiledMock.sections.length}):</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {compiledMock.sections.map((s, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-[11px] flex justify-between items-center">
                        <span className="text-white">{s.name}</span>
                        <span className="text-slate-400">{s.durationMinutes}m • {s.items.length} items</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
