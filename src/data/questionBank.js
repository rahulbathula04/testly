// Original Testly Question Bank - Complete Adaptive Coverage with IRT Parameters

export const GRE_QUESTION_BANK = {
  WRITING: [
    {
      id: 'gre_w1',
      exam: 'GRE',
      section: 'ANALYTICAL_WRITING',
      title: 'Analyze an Issue Task',
      skill: 'Analytical Writing',
      questionType: 'ESSAY',
      prompt: `As innovation accelerates, dependence on technological automation diminishes human critical thinking capacity.

Write a response in which you discuss the extent to which you agree or disagree with the statement and explain your reasoning for the position you take. In developing and supporting your position, you should consider ways in which the statement might or might not hold true and explain how these considerations shape your position.`,
      timeLimit: 1800,
      scoringType: 'ESSAY_EVALUATION',
      irtb: 0.0,
      irta: 1.0,
      calibrationStatus: 'CALIBRATED'
    }
  ],

  VERBAL_SECTION_1: [
    {
      id: 'gre_v1_q1',
      exam: 'GRE',
      section: 'VERBAL_1',
      skill: 'Text Completion',
      questionType: 'SINGLE_BLANK',
      difficulty: 'MEDIUM',
      prompt: 'Despite initial skepticism from peers, the researcher’s experimental results were eventually validated by ______ empirical evidence collected over a three-year longitudinal study.',
      options: ['A. equivocal', 'B. irrefutable', 'C. nebulous', 'D. precarious', 'E. dubious'],
      correctAnswer: 1, // B
      explanation: 'The context indicates that skepticism was overcome because the evidence validated the results. "Irrefutable" (indisputable) best fits this context.',
      tags: ['Vocabulary', 'Text Completion'],
      irtb: 0.2,
      irta: 1.4,
      irtc: 0.2,
      calibrationStatus: 'CALIBRATED'
    },
    {
      id: 'gre_v1_q2',
      exam: 'GRE',
      section: 'VERBAL_1',
      skill: 'Text Completion',
      questionType: 'DOUBLE_BLANK',
      difficulty: 'MEDIUM',
      prompt: 'The manager’s strategy was surprisingly (i)______; while it promised immediate quarterly cost reductions, it ultimately caused (ii)______ damage to the company’s long-term brand equity.',
      optionsGroup: [
        ['A. farsighted', 'B. shortsighted', 'C. judicious'],
        ['D. negligible', 'E. irreparable', 'F. transient']
      ],
      correctAnswer: [1, 4], // B, E
      explanation: 'The contrast between "immediate reductions" and "long-term damage" indicates a "shortsighted" strategy that caused "irreparable" damage.',
      tags: ['Vocabulary', 'Text Completion'],
      irtb: 0.5,
      irta: 1.6,
      irtc: 0.1,
      calibrationStatus: 'CALIBRATED'
    },
    {
      id: 'gre_v1_q3',
      exam: 'GRE',
      section: 'VERBAL_1',
      skill: 'Sentence Equivalence',
      questionType: 'SELECT_TWO',
      difficulty: 'MEDIUM',
      prompt: 'Though the novel was praised for its stylistic elegance, its underlying plot remained strikingly ______, lacking any compelling conflict or narrative momentum.',
      options: [
        'A. tedious',
        'B. insipid',
        'C. intricate',
        'D. vapid',
        'E. profound',
        'F. labyrinthine'
      ],
      correctAnswer: [1, 3], // B (insipid) & D (vapid)
      explanation: 'Insipid and vapid both mean dull/lacking substance and produce sentences of equivalent meaning.',
      tags: ['Sentence Equivalence', 'Synonyms'],
      irtb: 0.1,
      irta: 1.3,
      irtc: 0.15,
      calibrationStatus: 'CALIBRATED'
    },
    {
      id: 'gre_v1_q4',
      exam: 'GRE',
      section: 'VERBAL_1',
      skill: 'Reading Comprehension',
      questionType: 'SINGLE_CHOICE',
      difficulty: 'MEDIUM',
      passage: `Recent archaeological excavations at the Bronze Age site of Tel Megiddo have disrupted long-held assumptions regarding early urban trade networks. Previously, historians posited that long-distance trade in luxury resin goods was monopolized by royal elites. However, chemical residue analysis of unglazed storage jars retrieved from domestic residential quarters reveals widespread household access to imported aromatic resins. This suggests that trade networks were considerably more decentralized and accessible to non-elite merchant households than earlier models proposed.`,
      prompt: 'The primary purpose of the passage is to:',
      options: [
        'A. refute the validity of chemical residue analysis in archaeological research.',
        'B. challenge a traditional model of ancient trade networks based on new empirical findings.',
        'C. demonstrate that royal elites held exclusive control over luxury imports.',
        'D. argue that ancient trade was strictly confined to local agricultural commodities.',
        'E. contrast Bronze Age architectural styles at Tel Megiddo with contemporary sites.'
      ],
      correctAnswer: 1, // B
      explanation: 'The passage presents new residue analysis findings to challenge the traditional model of trade monopolized exclusively by royal elites.',
      tags: ['Reading Comprehension', 'Main Idea'],
      irtb: 0.3,
      irta: 1.5,
      irtc: 0.2,
      calibrationStatus: 'CALIBRATED'
    }
  ],

  VERBAL_SECTION_2_EASY: [
    {
      id: 'gre_v2e_q1',
      exam: 'GRE',
      section: 'VERBAL_2_EASY',
      skill: 'Text Completion',
      questionType: 'SINGLE_BLANK',
      difficulty: 'EASY',
      prompt: 'The speaker’s speech was noticeably ______, lasting less than ten minutes.',
      options: ['A. verbose', 'B. brief', 'C. lengthy', 'D. protracted', 'E. redundant'],
      correctAnswer: 1, // B
      explanation: 'Lasting less than ten minutes indicates a brief speech.',
      tags: ['Vocabulary', 'Text Completion'],
      irtb: -1.2,
      irta: 1.1,
      irtc: 0.2,
      calibrationStatus: 'CALIBRATED'
    }
  ],

  VERBAL_SECTION_2_MEDIUM: [
    {
      id: 'gre_v2m_q1',
      exam: 'GRE',
      section: 'VERBAL_2_MEDIUM',
      skill: 'Sentence Equivalence',
      questionType: 'SELECT_TWO',
      difficulty: 'MEDIUM',
      prompt: 'The committee’s findings were surprisingly ______, offering a thorough and lucid explanation of the complex economic phenomena.',
      options: ['A. ambiguous', 'B. perspicuous', 'C. pellucid', 'D. opaque', 'E. convoluted', 'F. obscure'],
      correctAnswer: [1, 2], // B, C
      explanation: 'Perspicuous and pellucid both mean clear and easy to understand.',
      tags: ['Sentence Equivalence', 'Vocabulary'],
      irtb: 0.2,
      irta: 1.4,
      irtc: 0.15,
      calibrationStatus: 'CALIBRATED'
    }
  ],

  VERBAL_SECTION_2_HARD: [
    {
      id: 'gre_v2h_q1',
      exam: 'GRE',
      section: 'VERBAL_2_HARD',
      skill: 'Text Completion',
      questionType: 'SINGLE_BLANK',
      difficulty: 'HARD',
      prompt: 'Far from being a model of ______, the committee’s deliberations were marked by fierce factionalism and intransigent ideological posturing.',
      options: ['A. discord', 'B. concord', 'C. belligerence', 'D. controversy', 'E. acrimony'],
      correctAnswer: 1, // B
      explanation: 'Concord (harmony/agreement) fits the contrast with factionalism.',
      tags: ['Vocabulary', 'Text Completion'],
      irtb: 1.8,
      irta: 1.8,
      irtc: 0.2,
      calibrationStatus: 'CALIBRATED'
    }
  ],

  QUANT_SECTION_1: [
    {
      id: 'gre_q1_q1',
      exam: 'GRE',
      section: 'QUANT_1',
      skill: 'Quantitative Comparison',
      questionType: 'QUANT_COMPARE',
      difficulty: 'MEDIUM',
      prompt: 'Quantity A: 4^15 \nQuantity B: 8^10',
      options: [
        'A. Quantity A is greater.',
        'B. Quantity B is greater.',
        'C. The two quantities are equal.',
        'D. The relationship cannot be determined from the information given.'
      ],
      correctAnswer: 2, // C
      explanation: 'Quantity A = (2^2)^15 = 2^30. Quantity B = (2^3)^10 = 2^30. Therefore, Quantity A = Quantity B.',
      tags: ['Algebra', 'Exponents'],
      irtb: 0.1,
      irta: 1.4,
      irtc: 0.25,
      calibrationStatus: 'CALIBRATED'
    },
    {
      id: 'gre_q1_q2',
      exam: 'GRE',
      section: 'QUANT_1',
      skill: 'Numeric Entry',
      questionType: 'NUMERIC_ENTRY',
      difficulty: 'MEDIUM',
      prompt: 'If a rectangle has a perimeter of 36 inches and its length is twice its width, what is the area of the rectangle in square inches?',
      options: [],
      correctAnswer: '72',
      explanation: 'Perimeter = 2(L + W) = 36 => L + W = 18. L = 2W => 3W = 18 => W = 6, L = 12. Area = 12 * 6 = 72.',
      tags: ['Geometry', 'Area & Perimeter'],
      irtb: 0.4,
      irta: 1.5,
      irtc: 0.0,
      calibrationStatus: 'CALIBRATED'
    },
    {
      id: 'gre_q1_q3',
      exam: 'GRE',
      section: 'QUANT_1',
      skill: 'Multiple Choice',
      questionType: 'SINGLE_CHOICE',
      difficulty: 'MEDIUM',
      prompt: 'The average (arithmetic mean) of 5 consecutive integers is 24. What is the greatest of these integers?',
      options: ['A. 22', 'B. 24', 'C. 26', 'D. 28', 'E. 30'],
      correctAnswer: 2, // C
      explanation: 'For 5 consecutive integers, average is middle integer (24). Integers: 22, 23, 24, 25, 26. Greatest is 26.',
      tags: ['Statistics', 'Averages'],
      irtb: 0.0,
      irta: 1.2,
      irtc: 0.2,
      calibrationStatus: 'CALIBRATED'
    }
  ],

  QUANT_SECTION_2_EASY: [
    {
      id: 'gre_q2e_q1',
      exam: 'GRE',
      section: 'QUANT_2_EASY',
      skill: 'Multiple Choice',
      questionType: 'SINGLE_CHOICE',
      difficulty: 'EASY',
      prompt: 'If 3x + 5 = 20, what is the value of x?',
      options: ['A. 3', 'B. 5', 'C. 7', 'D. 9', 'E. 10'],
      correctAnswer: 1, // B
      explanation: '3x = 15 => x = 5.',
      tags: ['Algebra', 'Equations'],
      irtb: -1.5,
      irta: 1.0,
      irtc: 0.2,
      calibrationStatus: 'CALIBRATED'
    }
  ],

  QUANT_SECTION_2_MEDIUM: [
    {
      id: 'gre_q2m_q1',
      exam: 'GRE',
      section: 'QUANT_2_MEDIUM',
      skill: 'Quantitative Comparison',
      questionType: 'QUANT_COMPARE',
      difficulty: 'MEDIUM',
      prompt: 'x > 0 \nQuantity A: (x + 1)^2 \nQuantity B: x^2 + 1',
      options: [
        'A. Quantity A is greater.',
        'B. Quantity B is greater.',
        'C. The two quantities are equal.',
        'D. The relationship cannot be determined from the information given.'
      ],
      correctAnswer: 0, // A
      explanation: '(x + 1)^2 = x^2 + 2x + 1. Since x > 0, 2x > 0, so (x + 1)^2 > x^2 + 1.',
      tags: ['Algebra', 'Inequalities'],
      irtb: 0.2,
      irta: 1.3,
      irtc: 0.25,
      calibrationStatus: 'CALIBRATED'
    }
  ],

  QUANT_SECTION_2_HARD: [
    {
      id: 'gre_q2h_q1',
      exam: 'GRE',
      section: 'QUANT_2_HARD',
      skill: 'Quantitative Comparison',
      questionType: 'QUANT_COMPARE',
      difficulty: 'HARD',
      prompt: 'x > 0 and y > 0 \nQuantity A: (x + y)^2 \nQuantity B: x^2 + y^2',
      options: [
        'A. Quantity A is greater.',
        'B. Quantity B is greater.',
        'C. The two quantities are equal.',
        'D. The relationship cannot be determined from the information given.'
      ],
      correctAnswer: 0, // A
      explanation: '(x + y)^2 = x^2 + 2xy + y^2. Since x, y > 0, 2xy > 0.',
      tags: ['Algebra', 'Inequalities'],
      irtb: 1.6,
      irta: 1.7,
      irtc: 0.25,
      calibrationStatus: 'CALIBRATED'
    }
  ]
};

export const QUESTION_BANK = {
  GRE: [
    ...GRE_QUESTION_BANK.WRITING,
    ...GRE_QUESTION_BANK.VERBAL_SECTION_1,
    ...GRE_QUESTION_BANK.VERBAL_SECTION_2_EASY,
    ...GRE_QUESTION_BANK.VERBAL_SECTION_2_MEDIUM,
    ...GRE_QUESTION_BANK.VERBAL_SECTION_2_HARD,
    ...GRE_QUESTION_BANK.QUANT_SECTION_1,
    ...GRE_QUESTION_BANK.QUANT_SECTION_2_EASY,
    ...GRE_QUESTION_BANK.QUANT_SECTION_2_MEDIUM,
    ...GRE_QUESTION_BANK.QUANT_SECTION_2_HARD,
  ]
};
