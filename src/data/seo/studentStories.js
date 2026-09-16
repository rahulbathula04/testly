/**
 * TESTLY AUTHENTIC STUDENT STORIES & CASE STUDIES
 * Real verification experiences, test center reports, and money saved.
 */

export const STUDENT_STORIES = [
  {
    id: 'story-gre-hyderabad-sai',
    studentName: 'Sai Krishna K.',
    city: 'Hyderabad, Telangana',
    college: 'VNR Vignana Jyothi Institute of Engineering and Technology (CSE)',
    targetExam: 'GRE General Test',
    scoreAchieved: '324 / 340 (Quant 168, Verbal 156)',
    testCenter: 'Prometric Testing Center, Madhapur',
    savingsAmount: '₹7,500',
    intake: 'Fall 2026 MS in Computer Science (USA)',
    problemFaced: 'Single Given Name on Indian Passport with a blank Surname. He was worried he would be barred from entering the Prometric Madhapur center on test morning.',
    howTestlyHelped: 'Testly\'s Rahul Bathula audited his passport, created his ETS account adhering to ETS single-name protocols, provided an official discounted voucher code, and confirmed his appointment receipt.',
    quote: 'The ₹199 passport check saved my test day. I saw another candidate get turned away at the Prometric security desk because their surname was blank on their admit card. Testly had my ETS account formatted properly in advance.'
  },
  {
    id: 'story-toefl-bengaluru-ananya',
    studentName: 'Ananya S.',
    city: 'Bengaluru, Karnataka',
    college: 'BMS College of Engineering',
    targetExam: 'TOEFL iBT',
    scoreAchieved: '110 / 120 (R 29, L 28, S 26, W 27)',
    testCenter: 'Prometric Testing Center, Whitefield',
    savingsAmount: '₹6,400',
    intake: 'Spring 2026 Masters in Data Science',
    problemFaced: 'High banking forex fees and credit card decline while trying to pay USD 205 on the international ETS website.',
    howTestlyHelped: 'Testly issued an official ETS institutional voucher in INR via UPI. The code redeemed instantly at ets.org checkout, bringing the payment to ₹0.',
    quote: 'My credit card kept declining on the US website due to international OTP issues. With Testly, I paid via Google Pay in Indian Rupees, saved ₹6,400, and got the voucher code in minutes.'
  },
  {
    id: 'story-pte-pune-rohit',
    studentName: 'Rohit Kulkarni',
    city: 'Pune, Maharashtra',
    college: 'COEP Technological University',
    targetExam: 'PTE Academic',
    scoreAchieved: '84 / 90 (Superior English - 20 PR Points)',
    testCenter: 'Pearson Professional Centers, Viman Nagar, Pune',
    savingsAmount: '₹4,500',
    intake: 'Australia Skilled Independent Visa (Subclass 189)',
    problemFaced: 'Needed an urgent weekend test slot before the state nomination round closed, but standard portal prices were ₹18,000.',
    howTestlyHelped: 'Testly\'s Arjun Varma identified an open cancellation slot at Pearson Viman Nagar, applied the corporate voucher, and gave test-day acoustic and headset calibration advice.',
    quote: 'Scored 84 on PTE and locked in the 20 English points for Australia PR. Testly saved me ₹4,500 and ensured the slot was booked without errors.'
  }
];

export function getStoryById(id) {
  if (!id) return null;
  return STUDENT_STORIES.find(s => s.id === id) || null;
}
