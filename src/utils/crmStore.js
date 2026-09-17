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

// Helper to get leads from localStorage — defaults to EMPTY array for production
export function getStoredLeads() {
  try {
    const raw = localStorage.getItem('testly_crm_leads');
    if (!raw) {
      return [];
    }
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

// Helper to save leads to localStorage
export function saveStoredLeads(leads) {
  try {
    localStorage.setItem('testly_crm_leads', JSON.stringify(leads));
    window.dispatchEvent(new CustomEvent('testly_leads_updated', { detail: leads }));
  } catch (e) {}
}

// Clear all leads from storage (returns to completely clean 0 state)
export function clearAllLeads() {
  try {
    localStorage.setItem('testly_crm_leads', JSON.stringify([]));
    window.dispatchEvent(new CustomEvent('testly_leads_updated', { detail: [] }));
  } catch (e) {}
}

// Assign agent via round-robin
let roundRobinIndex = 0;
export function getNextAgent() {
  const agent = SALES_AGENTS[roundRobinIndex % SALES_AGENTS.length];
  roundRobinIndex++;
  return agent;
}

// Create new lead from the landing page form or manual entry
export function createNewLead({
  name,
  phone,
  exam,
  timing,
  needs = [],
  pricing = null,
  source = 'Landing Page Form',
  campaign = 'Direct',
  landing_page = null,
  city = null,
  keyword = null
}) {
  const leads = getStoredLeads();
  const assignedAgent = getNextAgent();

  // Determine current page & location if not explicitly provided
  let detectedPage = landing_page;
  let detectedCity = city;
  if (typeof window !== 'undefined') {
    if (!detectedPage) detectedPage = window.location.pathname || '/';
    if (!detectedCity) {
      if (detectedPage.includes('hyderabad') || detectedPage.includes('madhapur')) detectedCity = 'Hyderabad';
      else if (detectedPage.includes('bengaluru')) detectedCity = 'Bengaluru';
      else if (detectedPage.includes('mumbai')) detectedCity = 'Mumbai';
      else if (detectedPage.includes('pune')) detectedCity = 'Pune';
      else if (detectedPage.includes('delhi')) detectedCity = 'Delhi NCR';
      else if (detectedPage.includes('chennai')) detectedCity = 'Chennai';
      else detectedCity = 'India (Online)';
    }
  }

  // Priority scoring based on exam timeline
  let priority = 'WARM';
  if (timing === 'Within 15 days' || timing === 'Within 1 month') {
    priority = 'HOT';
  } else if (timing === '3–6 months' || timing === 'Not decided') {
    priority = 'COLD';
  }

  const now = new Date();
  const formattedDate = now.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const newLead = {
    id: `LEAD-${1001 + leads.length}`,
    name: name.trim() || 'Candidate',
    phone: phone.trim(),
    exam: exam || 'GRE',
    timing: timing || 'Within 1 month',
    needs: needs.length ? needs : ['Get a discounted exam voucher', 'Complete my registration'],
    pricing: pricing || {
      refPrice: 26542,
      testlyPrice: 20499,
      saving: 6043
    },
    source,
    campaign,
    landing_page: detectedPage || '/',
    city: detectedCity || 'India',
    keyword: keyword || 'Organic Search',
    status: 'New',
    priority,
    assignedTo: assignedAgent,
    nextAction: 'First call pending (Call within 15 min)',
    lastContact: 'Just now',
    createdAt: now.toISOString(),
    submittedAtFormatted: formattedDate,
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
        text: `Form submitted on landing page for ${exam} (${timing}). Looking for: ${needs.join(', ') || 'Voucher & Registration'}.`,
        time: formattedDate
      }
    ]
  };

  const updated = [newLead, ...leads];
  saveStoredLeads(updated);

  try {
    window.dispatchEvent(new CustomEvent('testly_new_lead_alert', { detail: newLead }));
  } catch (e) {}

  return newLead;
}
