/**
 * TESTLY INDIA LOCATION INTELLIGENCE DATABASE
 * Structured knowledge graph of verified Indian student hubs, test centers,
 * regional passport compliance challenges, and candidate demographics.
 * 
 * STRICT RULE: No doorway/templated filler. All venues and data points must be authentic.
 */

export const INDIA_LOCATIONS = {
  hyderabad: {
    id: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    region: 'South India',
    tier: 'Tier 1',
    isHub: true,
    localSupportAvailable: true,
    supportType: 'Walk-in Support Desk & WhatsApp VIP',
    deskAddress: 'Plot 42, Cyber Hills Corridor, Near Durgam Cheruvu Metro & Cyber Towers, Madhapur, Hyderabad - 500081',
    helpline: '+91 93473 79041',
    metroConnectivity: 'Durgam Cheruvu Metro Station (Blue Line) - 2 min walk',
    studentDemographics: 'Major hub for engineering graduates from JNTUH, Osmania, CBIT, VNR VJIET, Vasavi, and IIIT Hyderabad targeting US STEM Masters & German universities.',
    passportQuirks: 'Very high prevalence of single-name passports (Blank Surname) and initial-only expansion issues. Prometric Madhapur strictly rejects test-takers if ETS name format does not match passport legal format.',
    testVenues: [
      {
        name: 'Prometric Testing Center (Madhapur)',
        code: 'PRO-HYD-01',
        exams: ['GRE', 'TOEFL iBT'],
        address: 'Hitech City Main Rd, near Cyber Towers, Madhapur',
        notes: 'Strict physical Indian passport requirement. Morning 8:00 AM slots fill 3 weeks in advance.'
      },
      {
        name: 'Pearson Professional Centers (Begumpet)',
        code: 'PEAR-HYD-01',
        exams: ['PTE Academic', 'GMAT Focus'],
        address: '1st Floor, Oxford Plaza, Sardar Patel Road, Begumpet',
        notes: 'Biometric palm-vein screening. Arrive 45 mins early.'
      },
      {
        name: 'IDP IELTS Official Test Center (Somajiguda)',
        code: 'IDP-HYD-01',
        exams: ['IELTS Academic', 'IELTS General Training'],
        address: 'Raj Bhavan Road, Somajiguda',
        notes: 'Computer-delivered and paper-based slots available weekly.'
      },
      {
        name: 'Pearson Test Center (Hitech City)',
        code: 'PEAR-HYD-02',
        exams: ['PTE Academic'],
        address: 'Near Mindspace IT Park, Kondapur Corridor',
        notes: 'High demand among working IT professionals planning Australia/Canada PR.'
      }
    ],
    primaryLocalities: ['Madhapur', 'Hitech City', 'Gachibowli', 'Kondapur', 'Kukatpally', 'Begumpet', 'Ameerpet', 'Somajiguda']
  },

  bengaluru: {
    id: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    region: 'South India',
    tier: 'Tier 1',
    isHub: true,
    localSupportAvailable: true,
    supportType: 'Virtual Zero-Defect Desk & Scheduled Meetups',
    deskAddress: 'Indiranagar / MG Road Tech Corridor, Bengaluru - 560038',
    helpline: '+91 93473 79041',
    metroConnectivity: 'Trinity & MG Road Metro (Purple Line)',
    studentDemographics: 'Heavy concentration of software engineers and graduates from IISc, RVCE, BMSCE, PES University, and Ramaiah targeting US MS in CS/AI and Global MBAs.',
    passportQuirks: 'Passport given-name split discrepancies often cause Pearson VUE profile lockouts. Candidates often use shortened first names on test accounts.',
    testVenues: [
      {
        name: 'Pearson Professional Centers (MG Road)',
        code: 'PEAR-BLR-01',
        exams: ['PTE Academic', 'GMAT Focus'],
        address: 'Prestige Meridian II, MG Road, Bengaluru',
        notes: 'Primary Pearson hub in Central Bengaluru. Strict biometric checks.'
      },
      {
        name: 'Prometric Testing Center (Whitefield)',
        code: 'PRO-BLR-01',
        exams: ['GRE', 'TOEFL iBT'],
        address: 'Brigade Tech Park, Whitefield, Bengaluru',
        notes: 'Serves East Bengaluru IT belt. Weekend slots require early reservation.'
      },
      {
        name: 'IDP IELTS Center (St. Marks Road)',
        code: 'IDP-BLR-01',
        exams: ['IELTS Academic', 'IELTS General'],
        address: 'Near Bishop Cotton School, St. Marks Road',
        notes: 'Fast computer-delivered testing rooms with modern soundproof headphones.'
      }
    ],
    primaryLocalities: ['Koramangala', 'Indiranagar', 'Whitefield', 'HSR Layout', 'Electronic City', 'Jayanagar', 'Malleshwaram']
  },

  mumbai: {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    region: 'West India',
    tier: 'Tier 1',
    isHub: true,
    localSupportAvailable: true,
    supportType: 'Virtual Desk & Remote Passport Audit',
    deskAddress: 'Bandra-Kurla Complex (BKC) / Andheri East Corridor, Mumbai - 400051',
    helpline: '+91 93473 79041',
    metroConnectivity: 'Western Express Highway Metro & BKC Stations',
    studentDemographics: 'Large candidate pool from IIT Bombay, VJTI, SPJIMR, NMIMS, and HR College planning US Finance/Data Science Masters and UK/European Business Schools.',
    passportQuirks: 'Middle names listed on Maharashtra passports frequently missing from ETS registration profiles, leading to test-morning verification holds.',
    testVenues: [
      {
        name: 'Pearson Professional Centers (Andheri East)',
        code: 'PEAR-MUM-01',
        exams: ['PTE Academic', 'GMAT Focus'],
        address: 'Times Square, Andheri-Kurla Road, Marol, Andheri East',
        notes: 'Adjacent to Marol Metro. High slot availability.'
      },
      {
        name: 'Prometric Testing Center (Goregaon East)',
        code: 'PRO-MUM-01',
        exams: ['GRE', 'TOEFL iBT'],
        address: 'Nesco IT Park, Western Express Highway, Goregaon East',
        notes: 'Flagship computerized test center for Western suburbs.'
      },
      {
        name: 'IDP IELTS Flagship (BKC)',
        code: 'IDP-MUM-01',
        exams: ['IELTS Academic', 'IELTS General'],
        address: 'Trade Centre, Bandra Kurla Complex',
        notes: 'State-of-the-art computer-delivered testing suites.'
      }
    ],
    primaryLocalities: ['Andheri East', 'BKC', 'Bandra', 'Powai', 'Dadar', 'Borivali', 'Thane', 'Navi Mumbai']
  },

  pune: {
    id: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    region: 'West India',
    tier: 'Tier 1',
    isHub: true,
    localSupportAvailable: true,
    supportType: 'Virtual Verification & Student Hotline',
    deskAddress: 'Senapati Bapat Road / Viman Nagar Corridor, Pune - 411016',
    helpline: '+91 93473 79041',
    metroConnectivity: 'Pune Metro Line 1 & Line 2',
    studentDemographics: 'Known as the "Oxford of the East" with strong candidate volumes from COEP, MIT-WPU, Symbiosis, Cummins, and PICT targeting engineering and MBA programs abroad.',
    passportQuirks: 'Father\'s name added to given name in regional passports leads to 3-part name mismatches on ETS and Pearson accounts.',
    testVenues: [
      {
        name: 'Pearson Professional Centers (Viman Nagar)',
        code: 'PEAR-PUN-01',
        exams: ['PTE Academic', 'GMAT Focus'],
        address: 'Sky Vista, Ground Floor, Viman Nagar, Pune',
        notes: 'Near Pune Airport. Popular for PTE test-takers.'
      },
      {
        name: 'Prometric Testing Venue (Kothrud/Shivajinagar)',
        code: 'PRO-PUN-01',
        exams: ['GRE', 'TOEFL iBT'],
        address: 'Off Senapati Bapat Road, Shivajinagar corridor',
        notes: 'High demand during September to December application season.'
      },
      {
        name: 'IDP IELTS Test Centre (Shivajinagar)',
        code: 'IDP-PUN-01',
        exams: ['IELTS Academic', 'IELTS General'],
        address: 'FC Road / Shivajinagar Junction',
        notes: 'Weekly computer-delivered slots.'
      }
    ],
    primaryLocalities: ['Viman Nagar', 'Kothrud', 'Shivajinagar', 'Hinjewadi', 'Aundh', 'Baner', 'Wakad']
  },

  delhi_ncr: {
    id: 'delhi_ncr',
    name: 'Delhi NCR',
    state: 'Delhi',
    region: 'North India',
    tier: 'Tier 1',
    isHub: true,
    localSupportAvailable: true,
    supportType: 'Online Advisory & Delhi Helpline',
    deskAddress: 'Barakhamba Road / Connaught Place, New Delhi - 110001',
    helpline: '+91 93473 79041',
    metroConnectivity: 'Barakhamba Road Metro (Blue Line) & Rajiv Chowk Metro (Yellow Line)',
    studentDemographics: 'Aspirants from IIT Delhi, DTU, NSUT, Delhi University (SRCC, St. Stephens), and Ashoka University aiming for Ivy League, UK Russell Group, and European MBAs.',
    passportQuirks: 'Initials in surnames and mismatched date of birth order (DD/MM vs MM/DD) are frequent causes of booking rejections.',
    testVenues: [
      {
        name: 'Pearson Professional Centers (Nehru Place)',
        code: 'PEAR-DEL-01',
        exams: ['PTE Academic', 'GMAT Focus'],
        address: 'Eros Corporate Tower, Nehru Place, New Delhi',
        notes: 'Extremely busy center; biometric security is strict.'
      },
      {
        name: 'Prometric Testing Center (Barakhamba Road)',
        code: 'PRO-DEL-01',
        exams: ['GRE', 'TOEFL iBT'],
        address: 'Antriksh Bhawan, KG Marg / Barakhamba Road, Connaught Place',
        notes: 'Central location right next to Metro. Morning slots in high demand.'
      },
      {
        name: 'IDP IELTS Head Office & Test Center (Connaught Place)',
        code: 'IDP-DEL-01',
        exams: ['IELTS Academic', 'IELTS General'],
        address: 'Suit 610-616, Narain Manzil, Barakhamba Road',
        notes: 'Official IELTS testing venue with high frequency of sessions.'
      }
    ],
    primaryLocalities: ['Connaught Place', 'Nehru Place', 'South Extension', 'Noida Sector 62', 'Gurugram Cyber Hub', 'Dwarka']
  },

  chennai: {
    id: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    region: 'South India',
    tier: 'Tier 1',
    isHub: true,
    localSupportAvailable: true,
    supportType: 'Virtual Desk & WhatsApp Support',
    deskAddress: 'Nungambakkam High Road, Chennai - 600034',
    helpline: '+91 93473 79041',
    metroConnectivity: 'AG-DMS & Thousand Lights Metro Stations',
    studentDemographics: 'High volume of mechanical, electrical, and computer engineering students from IIT Madras, Anna University (CEG), SSN College, and SRM University targeting US and German Masters.',
    passportQuirks: 'Tamil patronymic naming systems (Father\'s name initial followed by Given name) cause frequent rejections on ETS and Pearson databases unless mapped as FNU or expanded properly.',
    testVenues: [
      {
        name: 'Pearson Professional Centers (Nungambakkam)',
        code: 'PEAR-CHE-01',
        exams: ['PTE Academic', 'GMAT Focus'],
        address: 'Chamber of Commerce Building, Nungambakkam, Chennai',
        notes: 'Prime test center with dedicated biometric stations.'
      },
      {
        name: 'Prometric Testing Center (Sholinganallur / OMR)',
        code: 'PRO-CHE-01',
        exams: ['GRE', 'TOEFL iBT'],
        address: 'OMR IT Corridor, Sholinganallur, Chennai',
        notes: 'Serves the engineering and IT belt along Old Mahabalipuram Road.'
      },
      {
        name: 'IDP IELTS Center (Cathedral Road)',
        code: 'IDP-CHE-01',
        exams: ['IELTS Academic', 'IELTS General'],
        address: 'Near US Consulate, Cathedral Road, Gopalapuram',
        notes: 'Popular venue with regular computer-delivered slots.'
      }
    ],
    primaryLocalities: ['Nungambakkam', 'OMR', 'Velachery', 'Anna Nagar', 'Adyar', 'Tambaram', 'T. Nagar']
  }
};

export const ALL_LOCATIONS_LIST = Object.values(INDIA_LOCATIONS);

export function getLocationById(id) {
  if (!id) return null;
  return INDIA_LOCATIONS[id.toLowerCase()] || null;
}
