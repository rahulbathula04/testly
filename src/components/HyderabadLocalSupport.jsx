import React, { useState } from 'react';
import { MapPin, Navigation, Phone, CheckCircle2, ShieldCheck, Laptop, Clock, ArrowRight } from 'lucide-react';

export default function HyderabadLocalSupport({ onBookService, onOpenFreeMock }) {
  const [selectedHub, setSelectedHub] = useState('madhapur');

  const hubs = [
    {
      id: 'madhapur',
      name: 'Madhapur Hitec City Hub',
      distance: '1.2 km from Madhapur Metro',
      address: 'Plot 42, Opp. Cyber Towers, Hitec City Main Road, Madhapur, Hyderabad - 500081',
      landmark: 'Opposite Cyber Towers / Near Metro Station',
      timing: '9:00 AM – 8:30 PM (Mon-Sat)',
      phone: '+91 98765 43210',
      nearestCenter: 'Pearson Professional Center Madhapur (800m away)'
    },
    {
      id: 'kondapur',
      name: 'Kondapur Main Desk',
      distance: '2.8 km from Madhapur',
      address: 'Level 2, Capital Towers, Near Sarath City Capital Mall, Kondapur, Hyderabad - 500084',
      landmark: 'Next to Sarath City Capital Mall',
      timing: '9:30 AM – 8:00 PM (Mon-Sat)',
      phone: '+91 98765 43211',
      nearestCenter: 'Pearson Vue Test Center Gachibowli'
    },
    {
      id: 'gachibowli',
      name: 'Gachibowli Financial Hub',
      distance: '4.1 km from Madhapur',
      address: '3rd Floor, DLF Cybercity Road, Gachibowli, Hyderabad - 500032',
      landmark: 'Near Wipro Circle & DLF Gate 2',
      timing: '9:00 AM – 8:30 PM (Mon-Sat)',
      phone: '+91 98765 43212',
      nearestCenter: 'Prometric Test Center Hitec City'
    },
    {
      id: 'jubileehills',
      name: 'Jubilee Hills Checkpost Desk',
      distance: '3.9 km from Madhapur',
      address: 'Road No. 36, Near Jubilee Hills Checkpost Metro Station, Hyderabad - 500033',
      landmark: 'Above Union Bank / 50m from Metro Gate 2',
      timing: '9:00 AM – 8:00 PM (Mon-Sat)',
      phone: '+91 98765 43213',
      nearestCenter: 'IDP IELTS Hyderabad Center'
    }
  ];

  const activeHub = hubs.find(h => h.id === selectedHub) || hubs[0];

  return (
    <section id="hyderabad-hubs" className="relative py-16 md:py-24 bg-slate-900 text-white border-b border-slate-800 overflow-hidden">
      {/* AI Background Image Layer - Hyderabad Tech Hub Lounge */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 pointer-events-none mix-blend-luminosity"
        style={{ backgroundImage: `url('/assets/images/hyderabad-tech-hub.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/95 to-slate-900 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Minimal Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Hyderabad Advisory Desks • Services Start at ₹199</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Local Offline Advisory Support. <br />
            <span className="text-blue-400">Begumpet & Madhapur Centers.</span>
          </h2>

          <p className="text-base text-slate-300 font-medium max-w-2xl mx-auto">
            Visit our local advisory desks near Madhapur & Cyber Towers for in-person passport detail audits, exam voucher purchases, and free practice kiosks.
          </p>
        </div>

        {/* Location Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 max-w-4xl mx-auto">
          {hubs.map((hub) => (
            <button
              key={hub.id}
              onClick={() => setSelectedHub(hub.id)}
              className={`p-3.5 rounded-xl text-left transition-colors border ${
                selectedHub === hub.id 
                  ? 'bg-blue-600 text-white border-blue-600 font-bold' 
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <span className="text-xs font-bold block">{hub.name}</span>
              <span className="text-[10px] text-slate-300 font-medium block mt-0.5">{hub.distance}</span>
            </button>
          ))}
        </div>

        {/* Active Hub Card */}
        <div className="max-w-4xl mx-auto bg-slate-800/80 rounded-2xl p-6 sm:p-8 border border-slate-700 space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase bg-blue-500/10 text-blue-400 px-2.5 py-0.5 rounded-md border border-blue-500/20">
                  {activeHub.distance}
                </span>
                <span className="text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                  Free Candidate Portal Access
                </span>
              </div>

              <h3 className="text-xl font-black text-white">{activeHub.name}</h3>

              <div className="space-y-1.5 font-medium leading-relaxed">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{activeHub.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Landmark: {activeHub.landmark}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Timing: {activeHub.timing}</span>
                </p>
              </div>

              <div className="pt-2 border-t border-slate-700 grid grid-cols-2 gap-2 text-xs font-bold text-slate-200">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Passport Legal Audit</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>₹199 Service Desk</span>
                </div>
              </div>
            </div>

            {/* Right Action */}
            <div className="lg:col-span-5 bg-slate-900 p-5 rounded-xl border border-slate-700 text-center space-y-3">
              <h4 className="text-sm font-bold text-white">Book Advisory & Support</h4>
              <p className="text-xs text-slate-400 font-medium">
                Walk-in for free practice portal access or request candidate registration advisory.
              </p>

              <button
                onClick={() => onBookService && onBookService('TOEFL')}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>Book Advisory Service (₹199)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onOpenFreeMock && onOpenFreeMock()}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Laptop className="w-3.5 h-3.5" />
                <span>Free Practice Portal Kiosk</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
