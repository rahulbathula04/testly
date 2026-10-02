export const EXAM_DIRECTORY = [
  { slug: 'gre', name: 'GRE', label: 'GRE General Test', description: 'GRE registration, fees, test-centre information and preparation resources for students in India.' },
  { slug: 'ielts', name: 'IELTS', label: 'IELTS Academic & General Training', description: 'IELTS registration, fees, test-centre information and preparation resources for Indian students.' },
  { slug: 'toefl', name: 'TOEFL', label: 'TOEFL iBT', description: 'TOEFL iBT registration, fees, test-centre information and preparation resources for Indian students.' },
  { slug: 'pte', name: 'PTE', label: 'PTE Academic', description: 'PTE Academic registration, fees, test-centre information and preparation resources for Indian students.' },
  { slug: 'gmat', name: 'GMAT', label: 'GMAT Exam', description: 'GMAT registration, fees, test-centre information and preparation resources for Indian students.' },
  { slug: 'sat', name: 'SAT', label: 'SAT', description: 'SAT registration, fees, test-centre information and preparation resources for students in India.' },
  { slug: 'duolingo', name: 'Duolingo', label: 'Duolingo English Test', description: 'Duolingo English Test information, pricing, eligibility and preparation resources for Indian students.' },
];

export const INDIA_GEO_CITIES = [
  { slug: 'hyderabad', name: 'Hyderabad', state: 'Telangana', region: 'South India', priority: 1, areas: ['Madhapur','Gachibowli','Hitech City','Kondapur','Kukatpally','Begumpet','Ameerpet','Secunderabad'], note: 'Hyderabad has multiple official exam locations. Test dates and centres vary by exam and provider and should be verified before payment.' },
  { slug: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', region: 'South India', priority: 1, areas: ['Whitefield','Electronic City','Koramangala','Indiranagar','HSR Layout','Jayanagar','Malleshwaram'], note: 'Bengaluru is a major student and technology hub. Centre availability varies by exam and provider.' },
  { slug: 'mumbai', name: 'Mumbai', state: 'Maharashtra', region: 'West India', priority: 1, areas: ['Andheri','Bandra','BKC','Powai','Lower Parel','Thane','Navi Mumbai'], note: 'Mumbai and the surrounding metropolitan region have multiple exam locations. Verify the exact venue and delivery mode for your exam.' },
  { slug: 'pune', name: 'Pune', state: 'Maharashtra', region: 'West India', priority: 1, areas: ['Viman Nagar','Kothrud','Shivajinagar','Hinjewadi','Baner','Wakad','Aundh'], note: 'Pune is a large student market with exam availability that varies by provider and test format.' },
  { slug: 'delhi-ncr', name: 'Delhi NCR', state: 'Delhi', region: 'North India', priority: 1, areas: ['Connaught Place','South Delhi','Nehru Place','Noida','Gurugram','Dwarka'], note: 'Delhi NCR spans multiple cities and test-centre markets. Search by the exact city and exam before selecting a slot.' },
  { slug: 'chennai', name: 'Chennai', state: 'Tamil Nadu', region: 'South India', priority: 1, areas: ['Anna Nagar','Adyar','Guindy','T Nagar','Nungambakkam','OMR'], note: 'Chennai has established English-proficiency and admissions-test demand. Availability changes by exam and test mode.' },
  { slug: 'kolkata', name: 'Kolkata', state: 'West Bengal', region: 'East India', priority: 2, areas: ['Salt Lake','New Town','Park Street','Ballygunge','Alipore'], note: 'Kolkata candidates can compare available exam locations and delivery formats before booking.' },
  { slug: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', region: 'West India', priority: 2, areas: ['Navrangpura','Satellite','Prahlad Nagar','Bodakdev','SG Highway'], note: 'Ahmedabad has a growing international-study candidate base and provider-specific test locations.' },
  { slug: 'jaipur', name: 'Jaipur', state: 'Rajasthan', region: 'North India', priority: 2, areas: ['Malviya Nagar','C-Scheme','Mansarovar','Vaishali Nagar'], note: 'Jaipur candidates should verify the latest provider centre list and available test dates.' },
  { slug: 'chandigarh', name: 'Chandigarh', state: 'Chandigarh', region: 'North India', priority: 2, areas: ['Sector 17','Sector 22','Sector 34','Mohali','Panchkula'], note: 'Chandigarh and the Tricity region serve candidates from Chandigarh, Mohali and Panchkula.' },
  { slug: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh', region: 'North India', priority: 2, areas: ['Gomti Nagar','Hazratganj','Aliganj','Indira Nagar'], note: 'Lucknow candidates can use Testly to compare registration steps and current provider information.' },
  { slug: 'kochi', name: 'Kochi', state: 'Kerala', region: 'South India', priority: 2, areas: ['Kakkanad','Edappally','Kaloor','Ernakulam'], note: 'Kochi is a major Kerala hub for international study and English-proficiency testing.' },
  { slug: 'indore', name: 'Indore', state: 'Madhya Pradesh', region: 'Central India', priority: 2, areas: ['Vijay Nagar','Palasia','Bhawarkua','Rau'], note: 'Indore candidates should check current exam-specific availability before booking.' },
  { slug: 'visakhapatnam', name: 'Visakhapatnam', state: 'Andhra Pradesh', region: 'South India', priority: 2, areas: ['MVP Colony','Dwaraka Nagar','Madhurawada','Gajuwaka'], note: 'Visakhapatnam is a regional education hub serving candidates from coastal Andhra.' },
  { slug: 'vijayawada', name: 'Vijayawada', state: 'Andhra Pradesh', region: 'South India', priority: 2, areas: ['Benz Circle','Moghalrajpuram','Labbipet','Governorpet'], note: 'Vijayawada candidates can compare exam registration and centre information before selecting a date.' },
];

export function getCity(slug) { return INDIA_GEO_CITIES.find(city => city.slug === slug) || null; }
export function getExam(slug) { return EXAM_DIRECTORY.find(exam => exam.slug === slug) || null; }