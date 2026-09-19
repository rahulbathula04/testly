/**
 * Testly Assessment Intelligence System — Master API & Data Barrel
 */

// 1. Provenance & Governance
export * from './provenance/provenanceModel';
export * from './governance/copyrightGovernance';

// 2. Exam Specifications & Versions
export * from './exams/registry';
export * from './exams/versions/gre';
export * from './exams/versions/toefl';
export * from './exams/versions/ielts';
export * from './exams/versions/pte';
export * from './exams/versions/det';
export * from './exams/versions/gmat';
export * from './exams/versions/sat';
export * from './exams/versions/lsat';
export * from './exams/versions/act';
export * from './exams/versions/oet';

// 3. Constructs, Blueprints & Scoring
export * from './constructs/constructsRegistry';
export * from './blueprints/blueprintsRegistry';
export * from './scoring/scoringModels';
export * from './benchmarks/benchmarksRegistry';

// 4. Psychometrics & Readiness
export * from './psychometrics/psychometricsEngine';
export * from './readiness/readinessScoreEngine';

// 5. Question Bank, Item Factories & Compilers
export * from './questionBank/questionSchema';
export * from './questionBank/sampleBank';
export * from './itemFactories/factoryRegistry';
export * from './generator/blueprintCompiler';
export * from './generator/mockCompiler';

// 6. Decoupled Institutional Intelligence
export * from './institutionRequirements/institutionRegistry';
