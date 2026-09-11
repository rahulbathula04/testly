import React, { useState } from 'react';
import { Search, X, ArrowRight, Tag, BookOpen, ShieldCheck, Sparkles } from 'lucide-react';

export default function SearchModal({ isOpen, onClose, onBookTest, onCheckPrice }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const items = [
    { title: 'TOEFL iBT® Official Voucher', category: 'Test Voucher', price: '₹14,999', official: '₹17,999.72', action: () => onBookTest('TOEFL') },
    { title: 'PTE Academic Voucher', category: 'Test Voucher', price: '₹16,499', official: '₹18,900.00', action: () => onBookTest('PTE') },
    { title: 'GRE® General Exam Discount', category: 'Test Voucher', price: '₹20,999', official: '₹22,550.00', action: () => onBookTest('GRE') },
    { title: 'GMAT Focus Edition Voucher', category: 'Test Voucher', price: '₹20,500', official: '₹29,559.00', action: () => onCheckPrice('GMAT') },
    { title: 'Duolingo English Test Coupon', category: 'Test Voucher', price: '₹4,200', official: '₹6,404.45', action: () => onCheckPrice('Duolingo') },
    { title: 'LSAT Law Entrance Discount', category: 'Test Voucher', price: '₹16,800', official: '₹23,450.14', action: () => onCheckPrice('LSAT') },
    { title: '₹199 Specialist Booking Counselling', category: 'Professional Service', price: '₹199', official: 'Flat Fee', action: () => onBookTest('TOEFL') },
    { title: 'Full-length Free Mock Simulator', category: 'Practice & Mocks', price: 'FREE', official: '₹0', action: () => onBookTest('TOEFL') }
  ];

  const filtered = items.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#102A56]/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E5EAF2] overflow-hidden">
        
        {/* Search Input Top Bar */}
        <div className="p-4 sm:p-6 border-b border-[#E5EAF2] flex items-center gap-3">
          <Search className="w-6 h-6 text-[#1769E0] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search test vouchers (e.g. TOEFL, GRE, PTE, GMAT, ₹199 service)..."
            className="w-full text-base sm:text-lg font-bold text-[#102A56] placeholder-[#667085] bg-transparent outline-none"
          />
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#667085] hover:bg-[#F2F7FF] hover:text-[#102A56] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto divide-y divide-[#E5EAF2]/60">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onClose();
                  item.action();
                }}
                className="py-3.5 px-3 rounded-2xl hover:bg-[#F2F7FF] transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1769E0]/10 flex items-center justify-center text-[#1769E0] group-hover:bg-[#1769E0] group-hover:text-white transition-colors">
                    <Tag className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#102A56] group-hover:text-[#1769E0] transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-right">
                  <div>
                    <span className="text-sm font-black text-[#18A957] block">{item.price}</span>
                    <span className="text-[10px] font-semibold text-[#667085] line-through">{item.official}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#667085] group-hover:text-[#1769E0] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-[#667085] text-sm font-medium">
              No matching test vouchers found. Try searching "PTE", "TOEFL", "GRE" or "GMAT".
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#F7FAFF] p-4 text-xs font-bold text-[#667085] text-center border-t border-[#E5EAF2]">
          💡 Click any item to open instant specialist slot booking or savings details.
        </div>

      </div>
    </div>
  );
}
