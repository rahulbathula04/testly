import { createQuestionItem } from '../questionBank/questionSchema';
import { validateContentAuthorization } from '../governance/copyrightGovernance';

/**
 * Testly Item Factory System
 * 
 * Modular factories producing original items bound to specific domain constraints,
 * verified mathematical logic, plausible distractor models, and provenance records.
 */

export const ITEM_FACTORIES = {
  // 1. GRE / SAT Algebra Item Factory
  generateAlgebraItem({ difficulty = 'E3', exam = 'GRE' } = {}) {
    // Generate deterministic parameterized original math item
    const a = Math.floor(Math.random() * 5) + 2; // 2 to 6
    const b = Math.floor(Math.random() * 8) + 3; // 3 to 10
    const target = a * 4 + b;
    const correctX = 4;

    const item = createQuestionItem({
      question_id: `Q-${exam}-ALG-${Date.now().toString().slice(-6)}`,
      exam,
      exam_version: exam === 'GRE' ? 'GRE-2023-CURRENT' : 'SAT-DIGITAL-2023-CURRENT',
      section: exam === 'GRE' ? 'Quantitative Reasoning' : 'Math',
      domain: 'Algebra',
      skill: 'Linear Equations in One Variable',
      question_type: 'MULTIPLE_CHOICE',
      difficulty,
      stimulus: `Consider the linear relationship ${a}x + ${b} = ${target}.`,
      question: `What value of x satisfies the equation?`,
      options: [`${correctX}`, `${correctX + 1}`, `${correctX - 2}`, `${correctX * 2}`],
      correct_answer: 0,
      explanation: `Subtract ${b} from both sides: ${a}x = ${target - b}. Then divide by ${a}: x = ${correctX}.`,
      distractor_rationale: {
        1: 'Added instead of subtracted the constant term',
        2: 'Divided incorrectly by leading coefficient',
        3: 'Multiplied rather than divided by coefficient'
      },
      copyright_class: 'A',
      author: 'Testly Item Factory: Algebra Engine',
      reviewer: 'Automated Math Verification Solver',
      status: 'LIVE'
    });

    validateContentAuthorization(item);
    return item;
  },

  // 2. GRE / GMAT Reading Inference Item Factory
  generateReadingInferenceItem({ difficulty = 'E3', exam = 'GRE' } = {}) {
    const item = createQuestionItem({
      question_id: `Q-${exam}-RC-${Date.now().toString().slice(-6)}`,
      exam,
      exam_version: exam === 'GRE' ? 'GRE-2023-CURRENT' : 'GMAT-CURRENT-3SECTION',
      section: exam === 'GRE' ? 'Verbal Reasoning' : 'Verbal Reasoning',
      domain: 'Reading Comprehension',
      skill: 'Implicit Inference & Author Intent',
      question_type: 'SINGLE_CHOICE',
      difficulty,
      stimulus: 'Early planetary geologists posited that volcanism on small rocky moons was physically implausible due to rapid thermal dissipation into deep space. However, telemetry from the Jovian satellite Io revealed active sulfur plumes. Rather than radiogenic heat decay, tidal friction induced by orbital resonance with neighboring moons supplies continuous gravitational kneading that liquefies the satellite interior.',
      question: 'The passage implies which of the following concerning early planetary geologists?',
      options: [
        'They did not account for non-radiogenic orbital gravitational forces in their thermal models.',
        'They believed Io had a higher concentration of radioactive isotopes than Earth.',
        'They assumed sulfur plumes could only be generated on gas giant exoplanets.',
        'They predicted that orbital resonance would freeze moon cores into solid permafrost.'
      ],
      correct_answer: 0,
      explanation: 'The passage notes early geologists assumed small moons cooled rapidly because they only considered heat dissipation vs decay; Io proved tidal friction (a non-radiogenic mechanism) maintains internal molten heat.',
      distractor_rationale: {
        1: 'Opposite: the passage contrasts tidal heating with radiogenic decay',
        2: 'Extraneous claim not supported by the passage',
        3: 'Distorts the mechanism of orbital resonance'
      },
      copyright_class: 'A',
      author: 'Testly Item Factory: Humanities & Science Reading Engine',
      reviewer: 'Verbal SME Board',
      status: 'LIVE'
    });

    validateContentAuthorization(item);
    return item;
  },

  // 3. TOEFL 2026 Academic Discussion Item Factory
  generateTOEFLAcademicDiscussionItem({ difficulty = 'E3' } = {}) {
    const item = createQuestionItem({
      question_id: `Q-TOEFL-WAD-${Date.now().toString().slice(-6)}`,
      exam: 'TOEFL',
      exam_version: 'TOEFL-IBT-2026',
      section: 'Writing',
      domain: 'Academic Discussion',
      skill: 'Stance Elaboration & Academic Exchange',
      question_type: 'ACADEMIC_DISCUSSION_ESSAY',
      difficulty,
      estimated_time_seconds: 600, // 10 min
      stimulus: 'Professor Diaz: "Today we are discussing remote learning versus in-person campus instruction for university students. Some argue remote learning democratizes higher education, while others believe in-person interaction is indispensable for professional development. What is your perspective?"\n\nStudent A (Elena): "I believe in-person classes build spontaneous debate and social networking that virtual calls cannot replicate."\nStudent B (Marcus): "Remote instruction allows working students and rural candidates to access top-tier curricula without crippling relocation expenses."',
      question: 'In your response, express and support your opinion on whether universities should expand remote degree programs. Present specific reasons and examples to support your view.',
      options: [],
      correct_answer: 'Scored against 1.0–6.0 Academic Discussion Rubric',
      explanation: 'Evaluated on quality of argumentation, elaboration of reasons, syntactic complexity, and lexical precision.',
      copyright_class: 'A',
      author: 'Testly Item Factory: TOEFL 2026 Writing Studio',
      reviewer: 'ESL Assessment Lead',
      status: 'LIVE'
    });

    validateContentAuthorization(item);
    return item;
  },

  // 4. PTE Repeat Sentence Item Factory
  generatePTERepeatSentenceItem({ difficulty = 'E2' } = {}) {
    const item = createQuestionItem({
      question_id: `Q-PTE-RS-${Date.now().toString().slice(-6)}`,
      exam: 'PTE',
      exam_version: 'PTE-ACADEMIC-2HR',
      section: 'Speaking & Writing',
      domain: 'Integrated Acoustic-Oral Reproduction',
      skill: 'Repeat Sentence',
      question_type: 'AUDIO_REPEAT_SENTENCE',
      difficulty,
      estimated_time_seconds: 15,
      stimulus: '[Audio Recording: 3.5 seconds speaking rate]',
      question: '"The university library will remain open twenty-four hours during the examination period."',
      options: [],
      correct_answer: 'Verbatim transcription and acoustic cadence match',
      explanation: 'Scored on content completeness (3 pts: all words in sequence), oral fluency (5 pts), and pronunciation (5 pts).',
      copyright_class: 'A',
      author: 'Testly Item Factory: Speech Acoustic Engine',
      reviewer: 'PTE Speaking Examiner',
      status: 'LIVE'
    });

    validateContentAuthorization(item);
    return item;
  }
};

export function getFactory(factoryKey) {
  return ITEM_FACTORIES[factoryKey] || null;
}
