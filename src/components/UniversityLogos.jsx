import React from 'react';

export default function UniversityLogos() {
  const universities = [
    { name: 'Stanford University', logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&auto=format&fit=crop&q=80', tag: 'Stanford' },
    { name: 'Harvard University', logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=120&auto=format&fit=crop&q=80', tag: 'Harvard' },
    { name: 'Massachusetts Institute of Technology', logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=120&auto=format&fit=crop&q=80', tag: 'MIT' },
    { name: 'UC Berkeley', logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=120&auto=format&fit=crop&q=80', tag: 'UC Berkeley' },
    { name: 'University of Melbourne', logo: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=120&auto=format&fit=crop&q=80', tag: 'Melbourne' },
    { name: 'University of Toronto', logo: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=120&auto=format&fit=crop&q=80', tag: 'Toronto' }
  ];

  return (
    <section className="py-10 bg-white border-y border-[#E5EAF2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-[#667085] mb-8">
          ACCEPTED AT 10,000+ UNIVERSITIES & INSTITUTIONS WORLDWIDE
        </p>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 items-center justify-items-center opacity-80 hover:opacity-100 transition-opacity">
          {universities.map((u, idx) => (
            <div key={idx} className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#F7FAFF] border border-[#E5EAF2] hover:border-[#1769E0]/30 transition-all shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1769E0]"></span>
              <span className="text-sm font-extrabold text-[#102A56] tracking-tight">{u.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
