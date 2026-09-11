import React, { useState } from 'react';
import { ShieldCheck, Menu, X, Search, ArrowRight, Play, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenBooking, onOpenFreeMock, onOpenAuth, onOpenSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-black text-sm tracking-tighter">
            T
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black text-slate-900 tracking-tight leading-none">TESTLY</span>
            <span className="text-[9px] font-bold text-slate-500 tracking-widest uppercase mt-0.5">Professional Advisory</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <a href="#professional-services" className="hover:text-blue-600 transition-colors">
            Services (Starts at ₹199)
          </a>
          <a href="#coupons" className="hover:text-blue-600 transition-colors">
            Voucher Store
          </a>
          <a href="#pricing" className="hover:text-blue-600 transition-colors">
            Price Comparison
          </a>
          <a href="#practice-hub" className="hover:text-blue-600 transition-colors flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Free Practice Portal</span>
          </a>
          <a href="#how-it-works" className="hover:text-blue-600 transition-colors">
            Workflow
          </a>
        </nav>

        {/* Header Right Actions */}
        <div className="hidden md:flex items-center gap-2.5">
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            title="Search Tests & Advisory Services"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenFreeMock}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Play className="w-3 h-3 fill-slate-700 text-slate-700" />
            <span>Free Practice</span>
          </button>

          <button 
            onClick={() => onOpenBooking('TOEFL')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>Book Service (₹199)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button 
            onClick={onOpenFreeMock}
            className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1"
          >
            <Play className="w-3 h-3 fill-white" />
            <span>Free Mock</span>
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-slate-700 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 text-xs font-bold uppercase tracking-wider text-slate-800">
          <a href="#professional-services" onClick={() => setMobileMenuOpen(false)} className="block py-1.5">
            Services (Starts at ₹199)
          </a>
          <a href="#coupons" onClick={() => setMobileMenuOpen(false)} className="block py-1.5">
            Voucher Coupons
          </a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block py-1.5">
            Pricing
          </a>
          <a href="#practice-hub" onClick={() => setMobileMenuOpen(false)} className="block py-1.5">
            Free Practice Portal
          </a>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenFreeMock(); }} 
              className="w-full bg-slate-100 text-slate-900 text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-slate-900" />
              <span>Start Free Practice</span>
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenBooking('TOEFL'); }} 
              className="w-full bg-blue-600 text-white text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2"
            >
              <span>Book Advisory Service (₹199)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
