import React, { useState } from 'react';
import { X, Mail, Lock, User, GraduationCap, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#102A56]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#E5EAF2] overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#667085] hover:bg-[#F2F7FF] hover:text-[#102A56] transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Decorative Header */}
        <div className="bg-gradient-to-r from-[#102A56] to-[#1769E0] p-6 text-white text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/10 mx-auto flex items-center justify-center mb-3 backdrop-blur-md">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-black">{isSignUp ? 'Create Your Testly Account' : 'Welcome Back to Testly'}</h3>
          <p className="text-xs text-white/80 font-medium mt-1">
            {isSignUp ? 'Unlock exclusive discounts & track official mock scores' : 'Log in to manage your bookings and practice tests'}
          </p>
        </div>

        {/* Modal Form Content */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-[#18A957]/10 rounded-full flex items-center justify-center text-[#18A957] mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-[#102A56]">
                {isSignUp ? 'Account Created Successfully!' : 'Logged In Successfully!'}
              </h4>
              <p className="text-xs text-[#667085] font-medium">Redirecting you to your Testly Dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {isSignUp && (
                <div>
                  <label className="block text-xs font-bold text-[#102A56] mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#667085] absolute left-3.5 top-3.5" />
                    <input 
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Aishwarya Sharma"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5EAF2] text-sm text-[#102A56] focus:border-[#1769E0] focus:ring-2 focus:ring-[#1769E0]/20 outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#102A56] mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#667085] absolute left-3.5 top-3.5" />
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5EAF2] text-sm text-[#102A56] focus:border-[#1769E0] focus:ring-2 focus:ring-[#1769E0]/20 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102A56] mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#667085] absolute left-3.5 top-3.5" />
                  <input 
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5EAF2] text-sm text-[#102A56] focus:border-[#1769E0] focus:ring-2 focus:ring-[#1769E0]/20 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1769E0] hover:bg-[#102A56] text-white font-extrabold text-sm py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>{isSignUp ? 'Create Account' : 'Log In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-xs font-bold text-[#1769E0] hover:underline"
                >
                  {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up free"}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
