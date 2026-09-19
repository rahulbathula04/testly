import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Award,
  Layers,
  Scale,
  Clock,
  CheckCircle2,
  ExternalLink,
  AlertTriangle,
  Brain,
  Building2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import {
  EXAM_LIST,
  getExamById,
  getConstructByExam,
  getBlueprintByExam,
  getScoringModelByExam,
  BENCHMARKS_REGISTRY,
  calculateTestlyReadinessScore,
  TRS_VERSION,
  ASSESSMENT_MODES,
  getRequirementsByExam
} from '../data/assessmentIntelligence';

export default function AssessmentIntelligencePage({ onOpenBooking, onNavigate }) {
  const [selectedExamId, setSelectedExamId] = useState('GRE');
  const [activeTier, setActiveTier] = useState(1);
  const [activeLayer, setActiveLayer] = useState('SPECIFICATION'); // SPECIFICATION, CONSTRUCT, BLUEPRINT, SCORING, BENCHMARKS, INSTITUTIONS

  // Testly Readiness Score Interactive Playground States
  const [accuracyInput, setAccuracyInput] = useState(78);
  const [masteryInput, setMasteryInput] = useState(82);
  const [speedInput, setSpeedInput] = useState(75);
  const [consistencyInput, setConsistencyInput] = useState(80);

  useEffect(() => {
    document.title = "Assessment Intelligence System | Testly Standards & Blueprint Registry";
    window.scrollTo(0, 0);
  }, []);

  const currentExam = getExamById(selectedExamId) || EXAM_LIST[0];
  const currentConstruct = getConstructByExam(selectedExamId);
  const currentBlueprint = getBlueprintByExam(selectedExamId);
  const currentScoring = getScoringModelByExam(selectedExamId);
  const currentReqs = getRequirementsByExam(selectedExamId);

  // Compute live TRS
  const simulatedReadiness = calculateTestlyReadinessScore({
    examId: selectedExamId,
    attempts: Array.from({ length: 40 }, (_, i) => ({
      difficulty: i % 4 === 0 ? 'E4' : i % 3 === 0 ? 'E3' : 'E2',
      isCorrect: i < Math.round(40 * (accuracyInput / 100))
    })),
    domainScores: {
      'Primary Domain': masteryInput,
      'Secondary Domain': Math.max(40, masteryInput - 12),
      'Pacing & Speed': speedInput
    },
    avgTimeEfficiencyPct: speedInput,
    consistencyPct: consistencyInput
  });

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col font-sans text-[#0F172A] selection:bg-[#1E3A8A] selection:text-white">
      <Navbar onOpenBooking={onOpenBooking} onNavigate={onNavigate} />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 w-full">
        
        {/* ── 1. MISSION & FOUNDATIONAL PRINCIPLE BANNER ── */}
        <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#1E3A8A] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Assessment Architecture & Research</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight font-['DM_Serif_Display',Georgia,serif] leading-tight">
              Testly Assessment Intelligence System
            </h1>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-sm sm:text-base font-medium leading-relaxed text-slate-200">
              <strong className="text-white block font-bold mb-1">Our Core Architectural Standard:</strong>
              “Testly does not reproduce exams. Testly models the skills, specifications and assessment logic of exams and creates original practice experiences around them.”
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Field-Level Provenance
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Exam Version Registry
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Strict Scoring Separation
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Class A Original Items
              </span>
            </div>
          </div>
        </div>

        {/* ── 2. EXAM SELECTOR MATRIX (TIER 1 & TIER 2) ── */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-3">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-[#0F172A] tracking-tight">
                Exam Standards Master Registry
              </h2>
              <p className="text-xs text-[#64748B]">
                Select an exam to explore documented constructs, 2026 specifications, official blueprints, and scoring models.
              </p>
            </div>

            {/* Tier Tabs */}
            <div className="flex items-center p-1 bg-slate-200/80 rounded-xl self-start sm:self-auto text-xs font-bold">
              <button
                onClick={() => setActiveTier(1)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTier === 1 ? 'bg-white text-[#0F172A] shadow-xs' : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                Tier 1 — Core Launch (8)
              </button>
              <button
                onClick={() => setActiveTier(2)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTier === 2 ? 'bg-white text-[#0F172A] shadow-xs' : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                Tier 2 — Expansion (2)
              </button>
            </div>
          </div>

          {/* Exam Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {EXAM_LIST.filter(e => e.tier === activeTier).map((exam) => {
              const isSelected = exam.examId === selectedExamId;
              return (
                <button
                  key={exam.examId}
                  onClick={() => setSelectedExamId(exam.examId)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[82px] ${
                    isSelected
                      ? 'bg-white border-[#1E3A8A] ring-2 ring-blue-600/20 shadow-md scale-[1.02]'
                      : 'bg-white/80 border-[#E2E8F0] hover:border-slate-400 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm font-black text-[#0F172A]">{exam.examId}</span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-[#1E3A8A]" />}
                  </div>
                  <span className="text-[10px] text-[#64748B] font-medium leading-tight line-clamp-1">
                    {exam.category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 3. SELECTED EXAM BANNER & VERSION CONTEXT ── */}
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-[#1E3A8A] bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-lg">
                  {currentExam.currentVersion.versionId}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Status: {currentExam.currentVersion.status}
                </span>
                <span className="text-xs text-[#64748B] font-medium">
                  Effective: {currentExam.currentVersion.effectiveFrom}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
                {currentExam.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B]">
                Official Body: <strong className="text-slate-800">{currentExam.provider}</strong> • Primary Target: <span className="text-slate-800">{currentExam.primaryAudience}</span>
              </p>
            </div>

            {/* Source Provenance Link */}
            {currentExam.currentVersion.provenance?.sourceUrl && (
              <a
                href={currentExam.currentVersion.provenance.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors shrink-0"
              >
                <span>Official Specification Source</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
              </a>
            )}
          </div>

          {/* 5-LAYER NAVIGATION TABS */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold">
            {[
              { id: 'SPECIFICATION', label: 'Layer 1: Test Specification', icon: Clock },
              { id: 'CONSTRUCT', label: 'Layer 2: Construct Definition', icon: Brain },
              { id: 'BLUEPRINT', label: 'Layer 3: Assessment Blueprint', icon: Layers },
              { id: 'SCORING', label: 'Layer 4: Scoring Architecture', icon: Scale },
              { id: 'BENCHMARKS', label: 'Layer 5: Benchmarks & CEFR', icon: Award },
              { id: 'INSTITUTIONS', label: 'University Requirements', icon: Building2 }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeLayer === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveLayer(tab.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'bg-slate-100 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-200'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* LAYER 1: SPECIFICATION & SECTIONS */}
          {activeLayer === 'SPECIFICATION' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Duration</span>
                  <div className="text-lg font-black text-slate-900 mt-0.5">
                    {typeof currentExam.currentVersion.totalDurationMinutes === 'number'
                      ? `${currentExam.currentVersion.totalDurationMinutes} minutes`
                      : currentExam.currentVersion.totalDurationMinutes}
                  </div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Delivery & Calculator</span>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">
                    {currentExam.currentVersion.deliveryMode}
                  </div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Adaptivity Type</span>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">
                    {currentExam.currentVersion.adaptivityType || (currentExam.currentVersion.adaptive ? 'Computer Adaptive' : 'Linear / Fixed Form')}
                  </div>
                </div>
              </div>

              {/* Section List */}
              <div className="space-y-3">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                  Documented Exam Sections ({currentExam.sections.length})
                </h4>

                <div className="grid grid-cols-1 gap-3">
                  {currentExam.sections.map((sec, idx) => (
                    <div
                      key={sec.sectionId || idx}
                      className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="text-sm font-bold text-slate-900">{sec.name}</span>
                          {sec.isAdaptive && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                              Adaptive Module
                            </span>
                          )}
                        </div>
                        {sec.constructSummary && (
                          <p className="text-xs text-slate-600 pl-8 leading-relaxed">
                            {sec.constructSummary}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-4 pl-8 md:pl-0 text-xs text-slate-600 font-semibold shrink-0">
                        {sec.itemCount && <span>{sec.itemCount} items</span>}
                        {sec.durationMinutes && <span>{sec.durationMinutes} min</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Version History Diff */}
              {currentExam.historicalVersions && currentExam.historicalVersions.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-2">
                  <div className="font-bold flex items-center gap-1.5 text-amber-950">
                    <AlertTriangle className="w-4 h-4 text-amber-700" />
                    <span>Version Registry & Historical Diff:</span>
                  </div>
                  {currentExam.historicalVersions.map(hv => (
                    <div key={hv.versionId} className="pl-5 border-l-2 border-amber-300 space-y-0.5">
                      <div className="font-semibold">{hv.versionName} ({hv.effectiveFrom} to {hv.effectiveUntil})</div>
                      <div className="text-amber-800">{hv.notes}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* LAYER 2: CONSTRUCTS */}
          {activeLayer === 'CONSTRUCT' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 text-xs text-blue-900 leading-relaxed">
                <strong className="block font-bold mb-0.5">What is a Construct?</strong>
                A construct represents the actual latent ability or cognitive competency the exam measures (e.g. deductive reasoning, lexical decoding), rather than just the outward appearance of questions.
              </div>

              {currentConstruct?.domains ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentConstruct.domains.map((dom) => (
                    <div key={dom.domainId} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2">
                      <h4 className="text-sm font-black text-slate-900">{dom.name}</h4>
                      <p className="text-xs text-slate-700 leading-relaxed">{dom.latentAbility}</p>
                      {dom.subconstructs && dom.subconstructs.length > 0 && (
                        <ul className="text-[11px] text-slate-600 space-y-1 list-disc pl-4 pt-1">
                          {dom.subconstructs.map((sub, sIdx) => (
                            <li key={sIdx}>{sub}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500">No constructs registered for this exam yet.</p>
              )}
            </div>
          )}

          {/* LAYER 3: BLUEPRINTS */}
          {activeLayer === 'BLUEPRINT' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                <strong className="block font-bold mb-0.5">Testly Assessment Blueprint Engine</strong>
                Governs the percentage distribution of questions across domains and difficulty tiers. Testly question writers write strictly against these documented blueprints.
              </div>

              {currentBlueprint ? (
                <div className="space-y-4">
                  {Object.entries(currentBlueprint.sections).map(([secKey, secBlueprint]) => (
                    <div key={secKey} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                          Section: {secKey}
                        </h4>
                        {secBlueprint.totalItems && (
                          <span className="text-xs font-bold text-slate-600">
                            Total: {secBlueprint.totalItems} Items
                          </span>
                        )}
                      </div>

                      {/* Distribution breakdown */}
                      {(secBlueprint.distribution || secBlueprint.domainWeights || secBlueprint.taskBreakdown || secBlueprint.itemTypes) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-2">
                          {(secBlueprint.distribution || secBlueprint.domainWeights || secBlueprint.taskBreakdown || secBlueprint.itemTypes).map((item, dIdx) => (
                            <div key={dIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
                              <div className="font-bold text-slate-900">{item.domain || item.skill || item.task || item.type}</div>
                              {item.weightPercent && (
                                <div className="text-[11px] text-blue-700 font-semibold">{item.weightPercent}% weight</div>
                              )}
                              {item.approximateItems && (
                                <div className="text-[11px] text-slate-500">~{item.approximateItems} questions</div>
                              )}
                              {item.focus && (
                                <div className="text-[11px] text-slate-600 italic">{item.focus}</div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500">Blueprint specifications currently being compiled for {currentExam.name}.</p>
              )}
            </div>
          )}

          {/* LAYER 4: SCORING (STRICT SEPARATION) */}
          {activeLayer === 'SCORING' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Official Provider Scoring */}
                <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Official Provider Scale</span>
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300">Authoritative</span>
                  </div>
                  <h4 className="text-lg font-black">{currentExam.name} Official Scale</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentScoring?.officialScoringModel?.scoreScaleDescription || 'Documented official score scales.'}
                  </p>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-400 space-y-1">
                    <div className="font-bold text-white">Equating & Scaling Policy:</div>
                    <div>{currentScoring?.officialScoringModel?.equatingMethod || 'Scores are derived from psychometric equating.'}</div>
                  </div>
                </div>

                {/* Testly Practice Metrics */}
                <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 text-slate-900 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">Testly Practice Model</span>
                    <span className="text-[10px] bg-blue-200/80 px-2 py-0.5 rounded text-blue-900 font-bold">Proprietary</span>
                  </div>
                  <h4 className="text-lg font-black">Testly Diagnostic Metrics</h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Testly computes practice estimates and domain readiness indices based on item response accuracy, pacing, and difficulty parameters.
                  </p>
                  <div className="space-y-1.5 pt-1">
                    {currentScoring?.testlyPracticeMetrics?.metrics?.map((m, mIdx) => (
                      <div key={mIdx} className="p-2 rounded-lg bg-white border border-blue-200/60 text-xs flex items-center justify-between">
                        <span className="font-bold text-slate-800">{m.name}</span>
                        {m.unit && <span className="text-[10px] text-slate-500">{m.unit}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-medium">
                <strong>Legal Scoring Disclosure:</strong> Testly practice scores are calibrated diagnostic estimates for preparation purposes. Testly does not issue official scores, and official test bodies (ETS, College Board, GMAC, IDP, Pearson) do not publish universal public raw-score conversion tables.
              </div>
            </div>
          )}

          {/* LAYER 5: BENCHMARKS & CEFR */}
          {activeLayer === 'BENCHMARKS' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                <strong className="block font-bold mb-0.5">CEFR & Proficiency Benchmarks</strong>
                {BENCHMARKS_REGISTRY.CEFR_MAPPING.caveat}
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs bg-white">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="p-3">CEFR Level</th>
                      <th className="p-3">Descriptor</th>
                      <th className="p-3">IELTS Band</th>
                      <th className="p-3">TOEFL 2026</th>
                      <th className="p-3">PTE Score</th>
                      <th className="p-3">DET Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    {BENCHMARKS_REGISTRY.CEFR_MAPPING.levels.map((lvl) => (
                      <tr key={lvl.level} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 font-black text-blue-900">{lvl.level}</td>
                        <td className="p-3 text-slate-600">{lvl.descriptor}</td>
                        <td className="p-3 font-semibold">{lvl.ieltsBand}</td>
                        <td className="p-3 font-semibold">{lvl.toefl2026}</td>
                        <td className="p-3 font-semibold">{lvl.pteScore}</td>
                        <td className="p-3 font-semibold">{lvl.detScore}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* INSTITUTION REQUIREMENTS */}
          {activeLayer === 'INSTITUTIONS' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                <strong className="block font-bold mb-0.5">Institution Requirements Intelligence</strong>
                Decoupled from the core exam database. University cutoffs change frequently and are stored with verifiable intake years and source URLs.
              </div>

              {currentReqs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentReqs.map((req) => (
                    <div key={req.requirementId} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-xs">
                      <div>
                        <div className="text-[10px] font-bold text-[#1E3A8A] uppercase tracking-wider">{req.country}</div>
                        <h4 className="text-base font-black text-slate-900">{req.institution}</h4>
                        <div className="text-xs text-slate-600">{req.program} ({req.intake})</div>
                      </div>

                      <div className="space-y-1.5 pt-1 border-t border-slate-100">
                        {req.requirements.map((r, rIdx) => (
                          <div key={rIdx} className="p-2.5 rounded-xl bg-slate-50 text-xs space-y-0.5">
                            <div className="flex items-center justify-between font-bold text-slate-900">
                              <span>{r.exam} Requirement</span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">{r.requirementType}</span>
                            </div>
                            {r.quantMin && <div className="text-[11px] text-slate-700">Quant: {r.quantMin}, Verbal: {r.verbalMin}</div>}
                            {r.overallMin && <div className="text-[11px] text-slate-700">Minimum: {r.overallMin}</div>}
                            {r.medianScore && <div className="text-[11px] text-slate-700">Reported Median: {r.medianScore}</div>}
                            {r.notes && <div className="text-[10px] text-slate-500 italic mt-0.5">{r.notes}</div>}
                          </div>
                        ))}
                      </div>

                      {req.provenance?.sourceUrl && (
                        <a
                          href={req.provenance.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-bold text-[#1E3A8A] hover:underline inline-flex items-center gap-1 pt-1"
                        >
                          <span>Verified Admissions Page</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500">No specific cutoff profiles registered for {selectedExamId} yet.</p>
              )}
            </div>
          )}
        </div>

        {/* ── 4. INTERACTIVE TESTLY READINESS SCORE™ (TRS v0.1) SIMULATOR ── */}
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                {TRS_VERSION} Proprietary Algorithm
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Testly Readiness Score™ Simulator
              </h3>
              <p className="text-xs text-[#64748B]">
                Synthesizes accuracy, domain mastery, pacing, and consistency into an actionable 0–100 index.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Sliders */}
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span>Accuracy on Standard/Challenging Items (E3–E4)</span>
                  <span className="text-blue-600">{accuracyInput}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={accuracyInput}
                  onChange={(e) => setAccuracyInput(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span>Domain Mastery Depth</span>
                  <span className="text-blue-600">{masteryInput}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={masteryInput}
                  onChange={(e) => setMasteryInput(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span>Pacing & Speed Efficiency</span>
                  <span className="text-blue-600">{speedInput}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={speedInput}
                  onChange={(e) => setSpeedInput(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span>Section-to-Section Consistency</span>
                  <span className="text-blue-600">{consistencyInput}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={consistencyInput}
                  onChange={(e) => setConsistencyInput(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                />
              </div>
            </div>

            {/* Live Computed Readiness Output Card */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-400">
                  Calibrated Readiness Output
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black font-['DM_Serif_Display',Georgia,serif]">
                    {simulatedReadiness.overallReadiness}
                  </span>
                  <span className="text-lg text-slate-400 font-bold">/ 100</span>
                </div>
                <div className="text-xs text-slate-300">
                  Confidence Tier: <strong className="text-emerald-400">{simulatedReadiness.confidenceTier}</strong>
                </div>
              </div>

              <div className="space-y-2 border-t border-slate-800 pt-4 text-xs">
                <div className="font-bold text-slate-200">Recommended Next Learning Loop:</div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-[11px] leading-relaxed">
                  {simulatedReadiness.recommendedNextStep}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 5. THE FIVE TESTLY ASSESSMENT MODES ── */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-black text-slate-900">
              The 5 Testly Assessment Modes
            </h3>
            <p className="text-xs text-[#64748B]">
              The assessment engine remains constant; the mode dictates the pedagogical objective.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {Object.values(ASSESSMENT_MODES).map((m) => (
              <div
                key={m.id}
                className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2 hover:border-[#1E3A8A] transition-all flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase text-[#1E3A8A] bg-blue-50 px-2 py-0.5 rounded">
                    {m.id}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">{m.name}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{m.purpose}</p>
                </div>
                <div className="text-[10px] font-semibold text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span>{m.timed ? '⏱️ Timed' : '⏳ Untimed'}</span>
                  <span>{m.immediateFeedback ? '💡 Instant Solution' : '🔒 Test Conditions'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer
        onOpenAdmin={() => onNavigate('/admin')}
        onNavigate={onNavigate}
        onOpenAgreement={() => {}}
      />
    </div>
  );
}
