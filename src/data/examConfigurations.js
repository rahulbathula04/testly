// Dedicated Exam Configurations for All 7 Global Exams
// Supports GRE, TOEFL iBT, IELTS Academic, PTE Academic, Duolingo DET, GMAT Focus, LSAT

import { GRE_QUESTION_BANK } from './questionBank.js';

export const EXAM_CONFIGURATIONS = {
  GRE: {
    id: 'GRE',
    name: 'GRE® General Test',
    totalTime: '1h 58m',
    scoreScale: '260 – 340',
    calculatorAllowed: true,
    sections: [
      { id: 'w1', name: 'Analytical Writing (Essay)', time: 1800, questions: GRE_QUESTION_BANK.WRITING },
      { id: 'v1', name: 'Verbal Reasoning - Section 1', time: 1080, questions: GRE_QUESTION_BANK.VERBAL_SECTION_1 },
      { id: 'v2', name: 'Verbal Reasoning - Section 2 (Adaptive)', time: 1380, isAdaptive: true, type: 'VERBAL' },
      { id: 'q1', name: 'Quantitative Reasoning - Section 1', time: 1260, questions: GRE_QUESTION_BANK.QUANT_SECTION_1 },
      { id: 'q2', name: 'Quantitative Reasoning - Section 2 (Adaptive)', time: 1560, isAdaptive: true, type: 'QUANT' }
    ]
  },

  TOEFL: {
    id: 'TOEFL',
    name: 'TOEFL iBT® Test',
    totalTime: '2h 00m',
    scoreScale: '0 – 120',
    calculatorAllowed: false,
    sections: [
      { 
        id: 'r1', 
        name: 'Reading Section', 
        time: 2100, 
        questions: [
          {
            id: 'toefl_r1',
            skill: 'Reading Comprehension',
            questionType: 'SINGLE_CHOICE',
            passage: 'Geothermal energy is heat derived within the sub-surface of the earth. Water and steam carry the geothermal energy to the Earth’s surface. Depending on its characteristics, geothermal energy can be used for heating and cooling purposes or be harnessed to generate clean electricity.',
            prompt: 'According to the passage, how is geothermal energy transported to the surface of the Earth?',
            options: ['A. By solar radiation', 'B. By water and steam', 'C. By wind currents', 'D. By magnetic fields'],
            correctAnswer: 1,
            explanation: 'The text states: "Water and steam carry the geothermal energy to the Earth’s surface."'
          }
        ] 
      },
      { 
        id: 'l1', 
        name: 'Listening Section', 
        time: 2160, 
        questions: [
          {
            id: 'toefl_l1',
            skill: 'Listening Comprehension',
            questionType: 'SINGLE_CHOICE',
            prompt: 'Listen to the conversation between the student and academic advisor regarding course registration deadlines.',
            options: ['A. To drop a course', 'B. To request a late registration waiver', 'C. To declare a major', 'D. To pay tuition fees'],
            correctAnswer: 1,
            explanation: 'The student seeks assistance with late course registration waiver approval.'
          }
        ] 
      },
      { id: 's1', name: 'Speaking Section', time: 960, questions: [] },
      { id: 'w1', name: 'Writing Section (Academic Discussion)', time: 1800, questions: [] }
    ]
  },

  IELTS: {
    id: 'IELTS',
    name: 'IELTS Academic Test',
    totalTime: '2h 45m',
    scoreScale: '0.0 – 9.0',
    calculatorAllowed: false,
    sections: [
      { id: 'l1', name: 'Listening Section (40 Questions)', time: 1800, questions: [] },
      { id: 'r1', name: 'Academic Reading (3 Passages)', time: 3600, questions: [] },
      { id: 'w1', name: 'Academic Writing (Task 1 & Task 2)', time: 3600, questions: [] }
    ]
  },

  PTE: {
    id: 'PTE',
    name: 'PTE Academic',
    totalTime: '2h 00m',
    scoreScale: '10 – 90',
    calculatorAllowed: false,
    sections: [
      { id: 'sw1', name: 'Speaking & Writing', time: 3600, questions: [] },
      { id: 'r1', name: 'Reading Section', time: 1800, questions: [] },
      { id: 'l1', name: 'Listening Section', time: 2400, questions: [] }
    ]
  },

  DET: {
    id: 'DET',
    name: 'Duolingo English Test',
    totalTime: '1h 00m',
    scoreScale: '10 – 160',
    calculatorAllowed: false,
    sections: [
      { id: 'cat1', name: 'Computer Adaptive Test (Literacy, Comprehension, Conversation, Production)', time: 2700, questions: [] }
    ]
  },

  GMAT: {
    id: 'GMAT',
    name: 'GMAT Focus Edition',
    totalTime: '2h 15m',
    scoreScale: '205 – 805',
    calculatorAllowed: true, // Only in Data Insights
    sections: [
      { id: 'q1', name: 'Quantitative Reasoning (21 Questions)', time: 2700, questions: [] },
      { id: 'v1', name: 'Verbal Reasoning (23 Questions)', time: 2700, questions: [] },
      { id: 'di1', name: 'Data Insights (20 Questions)', time: 2700, questions: [] }
    ]
  },

  LSAT: {
    id: 'LSAT',
    name: 'LSAT Law Entrance',
    totalTime: '2h 00m',
    scoreScale: '120 – 180',
    calculatorAllowed: false,
    sections: [
      { id: 'lr1', name: 'Logical Reasoning - Section 1', time: 2100, questions: [] },
      { id: 'lr2', name: 'Logical Reasoning - Section 2', time: 2100, questions: [] },
      { id: 'rc1', name: 'Reading Comprehension', time: 2100, questions: [] }
    ]
  }
};
