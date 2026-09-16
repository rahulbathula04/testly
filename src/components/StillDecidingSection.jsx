import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function StillDecidingSection({ onBookTest, onOpenChat }) {
  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* LEFT: Already know your exam */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Already Know Your Exam?
              </h3>
              <p className="text-sm text-slate-600 font-medium">
                We'll help you book it for less.
              </p>
            </div>
            <button
              onClick={() => onBookTest && onBookTest('GRE')}
              className="bg-slate-900 hover:bg-slate-700 text-white font-bold text-sm px-6 py-3 rounded-md transition-colors flex items-center gap-2"
            >
              Check Your Exam & Savings
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* RIGHT: Still deciding */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-1">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  Still Deciding Which Exam to Take?
                </h3>
                <p className="text-sm text-slate-600 font-medium">
                  We'll help you understand the available exams, their formats, rules and registration requirements so you can make an informed choice.
                </p>
              </div>
              <div className="hidden sm:block w-20 h-20 shrink-0 rounded-xl overflow-hidden">
                <img
                  src="/assets/images/global-university-campus.jpg"
                  alt="Better paths"
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
            </div>
            <button
              onClick={() => onBookTest && onBookTest('GRE')}
              className="flex items-center gap-2 bg-white border border-slate-300 hover:border-slate-500 text-slate-800 font-semibold text-sm px-5 py-2.5 rounded-md transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Talk to Testly
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
