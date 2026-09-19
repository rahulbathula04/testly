/**
 * Testly Assessment Spine — GRE Vertical
 * 
 * Foundational Assessment Hierarchy:
 * EXAM -> SECTION -> DOMAIN -> SKILL -> QUESTION -> RESPONSE -> PERFORMANCE -> READINESS -> NEXT ACTION
 */

export const GRE_ASSESSMENT_SPINE = {
  exam: {
    id: 'GRE',
    name: 'GRE® General Test',
    provider: 'Educational Testing Service (ETS)',
    currentVersion: 'GRE-2023-CURRENT',
    effectiveDate: '2023-09-22',
    lastVerifiedDate: 'September 2026',
    durationMinutes: 118, // 1h 58m
    totalItems: 55, // 1 Analytical Writing + 27 Verbal + 27 Quant
    scoreScale: {
      verbal: { min: 130, max: 170, step: 1 },
      quant: { min: 130, max: 170, step: 1 },
      writing: { min: 0.0, max: 6.0, step: 0.5 },
      composite: { min: 260, max: 340, step: 1 }
    },
    sources: [
      {
        title: 'ETS GRE General Test Structure and Timing',
        url: 'https://www.ets.org/gre/test-takers/general-test/prepare/test-structure.html',
        verified: 'September 2026'
      },
      {
        title: 'ETS GRE Analytical Writing Measure Content',
        url: 'https://www.ets.org/gre/score-users/about/general-test/content-structure.html',
        verified: 'September 2026'
      }
    ]
  },

  sections: [
    {
      id: 'AW',
      name: 'Analytical Writing',
      order: 1,
      durationMinutes: 30,
      itemCount: 1,
      isAdaptive: false,
      domains: [
        {
          id: 'AW_ISSUE',
          name: 'Critical Argumentation',
          skills: [
            {
              id: 'AW_ISSUE_ANALYSIS',
              name: 'Analyze an Issue',
              construct: 'Articulating and supporting complex ideas, constructing focused arguments, sustaining coherent analysis.'
            }
          ]
        }
      ]
    },
    {
      id: 'VERBAL',
      name: 'Verbal Reasoning',
      order: 2,
      structure: 'Two sections: Section 1 (12 questions, 18 min), Section 2 (15 questions, 23 min - adaptive)',
      durationMinutes: 41,
      itemCount: 27,
      isAdaptive: true,
      adaptationLevel: 'SECTION_LEVEL_ADAPTIVE',
      adaptationRule: 'Performance on Section 1 determines whether Section 2 difficulty is Easy, Medium, or Hard.',
      domains: [
        {
          id: 'V_READING',
          name: 'Comprehension & Inference',
          weightPercent: 50,
          skills: [
            {
              id: 'V_RC_MAIN_IDEA',
              name: 'Reading Comprehension',
              subskills: ['Primary Purpose', 'Implicit Inference', 'Rhetorical Tone', 'Select-in-Passage'],
              construct: 'Understanding passage structure, evaluating argumentation, drawing inferences from implicit evidence.'
            }
          ]
        },
        {
          id: 'V_VOCAB_CONTEXT',
          name: 'Lexical & Syntactic Reasoning',
          weightPercent: 50,
          skills: [
            {
              id: 'V_TC',
              name: 'Text Completion',
              subskills: ['1-Blank Sentences', '2-Blank Sentences', '3-Blank Paragraphs'],
              construct: 'Recognizing semantic direction, contrast markers, and vocabulary in complex academic contexts.'
            },
            {
              id: 'V_SE',
              name: 'Sentence Equivalence',
              subskills: ['Synonym Pairs', 'Collocation Fit', 'Contextual Equivalence'],
              construct: 'Selecting two distinct answer choices that both produce a coherent sentence with identical meaning.'
            }
          ]
        }
      ]
    },
    {
      id: 'QUANT',
      name: 'Quantitative Reasoning',
      order: 3,
      structure: 'Two sections: Section 1 (12 questions, 21 min), Section 2 (15 questions, 26 min - adaptive)',
      durationMinutes: 47,
      itemCount: 27,
      isAdaptive: true,
      adaptationLevel: 'SECTION_LEVEL_ADAPTIVE',
      calculatorAllowed: true,
      calculatorType: 'On-screen basic four-function with square root and transfer button',
      domains: [
        {
          id: 'Q_ARITHMETIC',
          name: 'Arithmetic',
          weightPercent: 25,
          skills: [
            {
              id: 'Q_NUM_PROPERTIES',
              name: 'Arithmetic',
              subskills: ['Number Properties', 'Divisibility & Primes', 'Ratios & Percentages', 'Sequences'],
              construct: 'Facility with elementary mathematical concepts, estimation, and numeric relationships.'
            }
          ]
        },
        {
          id: 'Q_ALGEBRA',
          name: 'Algebra',
          weightPercent: 30,
          skills: [
            {
              id: 'Q_EQUATIONS_INEQUALITIES',
              name: 'Algebra',
              subskills: ['Linear & Quadratic Equations', 'Inequalities & Absolute Value', 'Functions & Coordinate Geometry'],
              construct: 'Symbolic manipulation, algebraic modeling, solving simultaneous systems and inequalities.'
            }
          ]
        },
        {
          id: 'Q_GEOMETRY',
          name: 'Geometry',
          weightPercent: 15,
          skills: [
            {
              id: 'Q_GEOMETRY_PROPERTIES',
              name: 'Geometry',
              subskills: ['Triangles & Polygons', 'Circles', '3D Solids', 'Perimeter & Area'],
              construct: 'Geometric deduction, spatial reasoning, applying coordinate formulas to figures.'
            }
          ]
        },
        {
          id: 'Q_DATA_ANALYSIS',
          name: 'Data Analysis',
          weightPercent: 30,
          skills: [
            {
              id: 'Q_STATS_PROBABILITY',
              name: 'Data Analysis',
              subskills: ['Descriptive Statistics', 'Normal Distribution', 'Counting & Probability', 'Graphical Interpretation'],
              construct: 'Interpreting graphical displays, calculating statistical measures, and probabilistic reasoning.'
            }
          ]
        }
      ]
    }
  ]
};

/**
 * Question difficulty scale used across the Testly Assessment Spine.
 */
export const DIFFICULTY_TIERS = {
  E1: { code: 'E1', label: 'Introductory', weight: 0.8, targetPercentile: '25th' },
  E2: { code: 'E2', label: 'Foundational', weight: 1.0, targetPercentile: '50th' },
  E3: { code: 'E3', label: 'Standard GRE', weight: 1.25, targetPercentile: '70th' },
  E4: { code: 'E4', label: 'Challenging', weight: 1.5, targetPercentile: '85th' },
  E5: { code: 'E5', label: 'Advanced / Top Tier', weight: 1.8, targetPercentile: '95th+' }
};
