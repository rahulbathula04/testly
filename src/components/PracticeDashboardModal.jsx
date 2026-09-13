import React from 'react';
import { X, Play, Award, CheckCircle2, LineChart, Ticket, ShieldCheck } from 'lucide-react';

export default function PracticeDashboardModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const orders = (() => {
    try {
      return JSON.parse(localStorage.getItem('testly_user_orders') || '[]');
    } catch (e) {
      return [];
    }
  })();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black">Testly</span>
            <span className="text-slate-500">|</span>
            <span className="text-xs font-bold text-slate-300">Candidate Portal & Dashboard</span>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex justify-between text-xs font-bold text-slate-600 uppercase tracking-wider">
          <span className="text-blue-600 font-black">Overview & Vouchers</span>
          <span>Practice Analytics</span>
          <span>Passport Audit</span>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6 text-center max-h-[80vh] overflow-y-auto">
          
          <div>
            <h3 className="text-xl font-black text-slate-900">Candidate Dashboard</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Real-time voucher status & practice performance</p>
          </div>

          {/* User Orders Section if present */}
          {orders.length > 0 ? (
            <div className="space-y-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-slate-700 tracking-wider">Active Orders & Vouchers</span>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                  {orders.length} Verified
                </span>
              </div>

              {orders.slice(0, 3).map((ord) => (
                <div key={ord.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between items-center font-black text-slate-900">
                    <span className="flex items-center gap-1.5 text-blue-600">
                      <Ticket className="w-4 h-4" />
                      {ord.test} Voucher ({ord.id})
                    </span>
                    <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded font-bold uppercase">
                      {ord.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>Candidate: {ord.candidateName}</span>
                    <span>City: {ord.city}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 pt-1 border-t border-slate-200">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Passport Name Verification Completed</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 font-medium space-y-1">
              <p className="font-bold text-slate-900">No active voucher bookings yet.</p>
              <p>Book any official exam voucher to track your passport audit status here!</p>
            </div>
          )}

          {/* 78% Circular Progress Gauge */}
          <div className="relative w-32 h-32 mx-auto flex items-center justify-center pt-2">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-600"
                strokeDasharray="78, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-slate-900">78%</span>
              <span className="text-[9px] font-bold text-slate-500 uppercase">Readiness Score</span>
            </div>
          </div>

          {/* 2 Stat Cards */}
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <p className="text-2xl font-black text-slate-900">12</p>
              <p className="text-xs font-bold text-slate-500">Mocks Completed</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <p className="text-2xl font-black text-emerald-600">+120</p>
              <p className="text-xs font-bold text-slate-500">Questions Solved</p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-slate-900 text-white font-bold text-xs py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Close Dashboard</span>
          </button>

        </div>

      </div>
    </div>
  );
}
