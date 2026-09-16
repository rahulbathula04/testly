/**
 * Testly Sales CRM Storage & Real-time Lead Dispatcher
 * Centralized store for leads, qualification records, follow-ups, and sales metrics.
 */

export const SALES_AGENTS = ['Arjun', 'Priya', 'Kavya', 'Rahul'];

export const LEAD_STATUSES = [
  'New',
  'Contacted',
  'Connected',
  'Qualified',
  'Interested',
  'Price Shared',
  'Payment Pending',
  'Paid',
  'Registration Pending',
  'Registration Completed',
  'Follow-up',
  'Not Interested',
  'Lost',
  'Invalid',
];

export const OBJECTIONS = [
  'Is the voucher genuine?',
  'Wants lower price / More discount',
  'Wants to compare with official website',
  'Needs parent / family approval',
  'Exam date not decided yet',
  'Not ready / Needs more prep time',
  'Doesn\'t trust online payment / wants offline meet',
  'Looking for classroom coaching instead',
  'Already booked directly',
  'Other',
];

export const INITIAL_MOCK_LEADS = [
  {
    id: 'LEAD-1048',
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    exam: 'GRE',
    timing: 'Within 15 days',
    needs: ['Get a discounted exam voucher', 'Complete my registration', 'Check passport/name details'],
    source: 'Meta Ads',
    campaign: 'GRE ₹7,500 Saving',
    status: 'Interested',
    priority: 'HOT',
    assignedTo: 'Arjun',
    nextAction: 'Call today 5:30 PM',
    lastContact: '10 min ago',
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    qualification: {
      hasPassport: true,
      hasAccount: false,
      readyToRegister: 'Today',
      priceShared: true,
      targetDate: '15 Oct 2026',
      objection: 'Wants to compare with official website',
    },
    notes: [
      { author: 'Arjun', text: 'Spoke for 4 mins. Student aiming for Fall 2027 MS in US. Explained voucher validity & ₹199 passport check. Very receptive.', time: '10 min ago' }
    ]
  },
  {
    id: 'LEAD-1047',
    name: 'Priya Reddy',
    phone: '+91 91234 56789',
    exam: 'TOEFL',
    timing: 'Within 1 month',
    needs: ['Get a discounted exam voucher', 'Complete my registration'],
    source: 'Google Search',
    campaign: 'TOEFL iBT Discount Hyderabad',
    status: 'New',
    priority: 'HOT',
    assignedTo: 'Priya',
    nextAction: 'First call pending',
    lastContact: 'Just now',
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    qualification: {
      hasPassport: true,
      hasAccount: false,
      readyToRegister: 'This week',
      priceShared: false,
      targetDate: '28 Oct 2026',
      objection: '',
    },
    notes: []
  },
  {
    id: 'LEAD-1046',
    name: 'Anjali Varma',
    phone: '+91 98480 12345',
    exam: 'PTE',
    timing: '1–3 months',
    needs: ['Understand the exam', 'Get a discounted exam voucher'],
    source: 'Instagram',
    campaign: 'Australia PTE Fast Booking',
    status: 'Follow-up',
    priority: 'WARM',
    assignedTo: 'Kavya',
    nextAction: 'Follow up tomorrow 11:00 AM',
    lastContact: 'Yesterday',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    qualification: {
      hasPassport: true,
      hasAccount: true,
      readyToRegister: 'Later',
      priceShared: true,
      targetDate: '15 Nov 2026',
      objection: 'Needs parent / family approval',
    },
    notes: [
      { author: 'Kavya', text: 'Sent PTE official syllabus + savings breakdown over WhatsApp. Will discuss with parents tonight.', time: 'Yesterday' }
    ]
  },
  {
    id: 'LEAD-1045',
    name: 'Vikram Aditya',
    phone: '+91 99887 76655',
    exam: 'GMAT',
    timing: 'Within 15 days',
    needs: ['Get a discounted exam voucher', 'Complete my registration'],
    source: 'Meta Ads',
    campaign: 'GMAT Focus ₹6,000 Off',
    status: 'Payment Pending',
    priority: 'HOT',
    assignedTo: 'Arjun',
    nextAction: 'Payment link sent — confirm by 6 PM',
    lastContact: '1 hour ago',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    qualification: {
      hasPassport: true,
      hasAccount: true,
      readyToRegister: 'Today',
      priceShared: true,
      targetDate: '05 Oct 2026',
      objection: '',
    },
    notes: [
      { author: 'Arjun', text: 'Slot chosen at Hyderabad Madhapur Pearson center. Sent UPI payment details for ₹22,000 voucher + ₹199 service.', time: '1 hour ago' }
    ]
  },
  {
    id: 'LEAD-1044',
    name: 'Sneha Patel',
    phone: '+91 94401 55667',
    exam: 'IELTS',
    timing: 'Within 1 month',
    needs: ['Check passport/name details', 'Complete my registration'],
    source: 'Direct / Organic',
    campaign: 'Organic Search',
    status: 'Registration Completed',
    priority: 'HOT',
    assignedTo: 'Kavya',
    nextAction: 'Voucher delivered & slot booked',
    lastContact: '3 hours ago',
    createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    qualification: {
      hasPassport: true,
      hasAccount: false,
      readyToRegister: 'Today',
      priceShared: true,
      targetDate: '12 Oct 2026',
      objection: '',
    },
    notes: [
      { author: 'Kavya', text: 'IDP booking done. Passport name matched 100%. Confirmation emailed to candidate.', time: '3 hours ago' }
    ]
  },
  {
    id: 'LEAD-1043',
    name: 'Karthik Nair',
    phone: '+91 97000 88990',
    exam: 'Duolingo',
    timing: 'Within 15 days',
    needs: ['Get a discounted exam voucher'],
    source: 'Instagram',
    campaign: 'DET 48h Results',
    status: 'Paid',
    priority: 'HOT',
    assignedTo: 'Rahul',
    nextAction: 'Assign registration specialist',
    lastContact: '4 hours ago',
    createdAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    qualification: {
      hasPassport: true,
      hasAccount: false,
      readyToRegister: 'Today',
      priceShared: true,
      targetDate: 'Immediate Online',
      objection: '',
    },
    notes: [
      { author: 'Rahul', text: 'Payment received ₹4,699. Voucher code procured. Booking session scheduled.', time: '4 hours ago' }
    ]
  },
  {
    id: 'LEAD-1042',
    name: 'Mohammed Faisal',
    phone: '+91 98111 22334',
    exam: 'GRE',
    timing: '3–6 months',
    needs: ['Understand the exam', 'Not sure yet'],
    source: 'Meta Ads',
    campaign: 'General Awareness',
    status: 'Lost',
    priority: 'COLD',
    assignedTo: 'Arjun',
    nextAction: 'Nurture via WhatsApp newsletter',
    lastContact: '2 days ago',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    qualification: {
      hasPassport: false,
      hasAccount: false,
      readyToRegister: 'Later',
      priceShared: true,
      targetDate: 'March 2027',
      objection: 'Not ready / Needs more prep time',
    },
    notes: [
      { author: 'Arjun', text: 'Candidate currently in 3rd year engineering. Added to quarterly intake nurture group.', time: '2 days ago' }
    ]
  }
];

// Helper to get leads from localStorage
export function getStoredLeads() {
  try {
    const raw = localStorage.getItem('testly_crm_leads');
    if (!raw) {
      localStorage.setItem('testly_crm_leads', JSON.stringify(INITIAL_MOCK_LEADS));
      return INITIAL_MOCK_LEADS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_MOCK_LEADS;
  }
}

// Helper to save leads to localStorage
export function saveStoredLeads(leads) {
  try {
    localStorage.setItem('testly_crm_leads', JSON.stringify(leads));
    window.dispatchEvent(new CustomEvent('testly_leads_updated', { detail: leads }));
  } catch (e) {}
}

// Assign agent via round-robin
let roundRobinIndex = 0;
export function getNextAgent() {
  const agent = SALES_AGENTS[roundRobinIndex % SALES_AGENTS.length];
  roundRobinIndex++;
  return agent;
}

// Create new lead from the landing page form
export function createNewLead({ name, phone, exam, timing, needs = [], source = 'Landing Page', campaign = 'Direct' }) {
  const leads = getStoredLeads();
  const assignedAgent = getNextAgent();

  // Priority scoring based on exam timeline
  let priority = 'WARM';
  if (timing === 'Within 15 days' || timing === 'Within 1 month') {
    priority = 'HOT';
  } else if (timing === '3–6 months' || timing === 'Not decided') {
    priority = 'COLD';
  }

  const newLead = {
    id: `LEAD-${1049 + leads.length}`,
    name: name.trim() || 'Candidate',
    phone: phone.trim(),
    exam: exam || 'GRE',
    timing: timing || 'Within 1 month',
    needs: needs.length ? needs : ['Get a discounted exam voucher', 'Complete my registration'],
    source,
    campaign,
    status: 'New',
    priority,
    assignedTo: assignedAgent,
    nextAction: 'First call pending (Call within 15 min)',
    lastContact: 'Just now',
    createdAt: new Date().toISOString(),
    qualification: {
      hasPassport: false,
      hasAccount: false,
      readyToRegister: timing === 'Within 15 days' ? 'Today' : 'This week',
      priceShared: false,
      targetDate: '',
      objection: '',
    },
    notes: [
      {
        author: 'System',
        text: `Lead captured from landing page for ${exam}. Assigned to ${assignedAgent} via Round-Robin.`,
        time: 'Just now'
      }
    ]
  };

  const updated = [newLead, ...leads];
  saveStoredLeads(updated);

  // Trigger audio or browser notification if available
  try {
    window.dispatchEvent(new CustomEvent('testly_new_lead_alert', { detail: newLead }));
  } catch (e) {}

  return newLead;
}
