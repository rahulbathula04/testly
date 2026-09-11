import React from 'react';
import { Video, BookOpen, FileCheck, MessageSquare, Target, ArrowRight } from 'lucide-react';

export default function PreparationSection({ onOpenPrepModal }) {
  const prepFeatures = [
    { icon: Video, label: 'Live online classes' },
    { icon: BookOpen, label: 'Practice material' },
    { icon: FileCheck, label: 'Mock tests' },
    { icon: MessageSquare, label: 'Doubt support' },
    { icon: Target, label: 'Test-specific training' }
  ];

  return (
    <section id="preparation" className="py-16 bg-[#F7FAFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-[#102A56] to-[#0A1B38] rounded-3xl overflow-hidden text-white shadow-xl relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Content Left Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-8 z-10">
              
              <div className="space-y-3">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#FFF4C2] bg-[#FFF4C2]/10 border border-[#FFF4C2]/20 px-3 py-1 rounded-full inline-block">
                  Optional Online Preparation
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  Need help preparing too?
                </h2>
                <p className="text-base sm:text-lg text-white/80 font-medium max-w-xl">
                  Online test preparation to help you score higher. Book your test first, prepare with us if you need it.
                </p>
              </div>

              {/* 5 Feature Pills */}
              <div className="flex flex-wrap gap-3">
                {prepFeatures.map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div 
                      key={idx}
                      className="bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-lg bg-[#1769E0] text-white flex items-center justify-center shrink-0">
                        <IconComp className="w-3.5 h-3.5" />
                      </div>
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  onClick={onOpenPrepModal}
                  className="bg-[#1769E0] hover:bg-white hover:text-[#102A56] text-white font-extrabold text-base py-4 px-8 rounded-xl shadow-lg transition-all flex items-center gap-3 transform hover:-translate-y-0.5"
                >
                  <span>VIEW PREPARATION COURSES</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

            </div>

            {/* Visual Right Column */}
            <div className="lg:col-span-5 relative h-72 lg:h-full min-h-[380px] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=800&q=80" 
                alt="Student studying online" 
                className="w-full h-full object-cover object-center opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#102A56] via-[#102A56]/40 to-transparent"></div>

              {/* Overlay Handwritten Graphics */}
              <div className="absolute top-8 right-8 text-right space-y-1">
                <span className="font-handwriting text-3xl font-bold text-[#FFF4C2] block drop-shadow-md">
                  Prepare. Practice. Perform.
                </span>
                <span className="text-xs font-semibold text-white/90 bg-[#102A56]/70 px-2.5 py-1 rounded-md inline-block">
                  Same Destination • A Stronger You
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
