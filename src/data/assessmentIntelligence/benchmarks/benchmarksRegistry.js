import { createProvenance, SOURCE_TYPES, VERIFICATION_STATUS } from '../provenance/provenanceModel';

export const BENCHMARKS_REGISTRY = {
  CEFR_MAPPING: {
    title: 'Common European Framework of Reference for Languages (CEFR) Mapping',
    caveat: 'The Council of Europe and exam owners emphasize that relationship to CEFR represents broad concordances rather than exact mathematical equivalents.',
    provenance: createProvenance({
      sourceType: SOURCE_TYPES.OFFICIAL,
      sourceTitle: 'IELTS and the CEFR Comparative Mapping',
      sourceUrl: 'https://www.ielts.org/organisations/ielts-for-organisations/compare-ielts/ielts-and-the-cefr',
      verificationStatus: VERIFICATION_STATUS.VERIFIED
    }),
    levels: [
      {
        level: 'C2',
        descriptor: 'Mastery / Highly Proficient',
        ieltsBand: '8.5 – 9.0',
        toefl2026: '5.5 – 6.0',
        pteScore: '85 – 90',
        detScore: '145 – 160',
        oetGrade: 'Grade A'
      },
      {
        level: 'C1',
        descriptor: 'Effective Operational Proficiency / Advanced',
        ieltsBand: '7.0 – 8.0',
        toefl2026: '4.5 – 5.0',
        pteScore: '66 – 84',
        detScore: '120 – 140',
        oetGrade: 'Grade B (350+)'
      },
      {
        level: 'B2',
        descriptor: 'Vantage / Independent User',
        ieltsBand: '5.5 – 6.5',
        toefl2026: '3.5 – 4.0',
        pteScore: '46 – 65',
        detScore: '95 – 115',
        oetGrade: 'Grade C+ / C'
      },
      {
        level: 'B1',
        descriptor: 'Threshold / Intermediate User',
        ieltsBand: '4.0 – 5.0',
        toefl2026: '2.5 – 3.0',
        pteScore: '30 – 45',
        detScore: '60 – 90',
        oetGrade: 'Grade D'
      }
    ]
  },

  GRADUATE_BENCHMARKS: {
    GRE: [
      { tier: 'Top 10% (Elite / Top-15 STEM Programs)', quantRange: '166 – 170', verbalRange: '162 – 170', awRange: '4.5 – 5.5' },
      { tier: 'Competitive (Top-50 US/UK Universities)', quantRange: '160 – 165', verbalRange: '155 – 161', awRange: '4.0 – 4.5' },
      { tier: 'Broad Eligibility (Reputable Global Programs)', quantRange: '152 – 159', verbalRange: '148 – 154', awRange: '3.5 – 4.0' }
    ],
    GMAT: [
      { tier: 'Top 10% (M7 / Top-10 Global MBA)', gmatScoreRange: '685 – 745+ (Old 730–770 equivalent)' },
      { tier: 'Top 25% (Top-25 Business Schools)', gmatScoreRange: '645 – 675' },
      { tier: 'Competitive (AACSB Accredited MBA)', gmatScoreRange: '585 – 635' }
    ]
  }
};
