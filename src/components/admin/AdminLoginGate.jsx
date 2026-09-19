import React, { useState, useEffect } from 'react';
import { Lock, Mail, KeyRound, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff, Globe } from 'lucide-react';
import RealAdminPortal from './RealAdminPortal';
import BrandLogo from '../BrandLogo';

const AUTH_KEY = 'testly_admin_session';
const ADMIN_EMAIL = 'rahulbathula04@gmail.com';
const ADMIN_PASS = '9347379041Ra';

export default function AdminLoginGate({ onNavigateHome }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('rahulbathula04@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_KEY);
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        if (parsed.email === ADMIN_EMAIL && parsed.token) {
          setIsAuthenticated(true);
        }
      }
    } catch (e) {}
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASS) {
        const sessionData = {
          email: ADMIN_EMAIL,
          name: 'Rahul Bathula',
          role: 'Super Admin & Managing Director',
          token: 'sec_' + Math.random().toString(36).substring(2),
          loginAt: new Date().toISOString()
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(sessionData));
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        setError('Invalid credentials. Please enter the authorized email and password.');
        setIsLoading(false);
      }
    }, 400);
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    setPassword('');
  };

  // If already authenticated, show the Real Admin Portal
  if (isAuthenticated) {
    return (
      <RealAdminPortal
        onNavigateHome={onNavigateHome}
        adminUser={{
          name: 'Rahul Bathula',
          email: ADMIN_EMAIL,
          role: 'Super Admin'
        }}
        onLogout={handleLogout}
      />
    );
  }

  // Otherwise, show secure Enterprise Login Screen in Pure Testly Branding
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A] flex flex-col justify-between p-4 sm:p-6 antialiased selection:bg-[#1E3A8A] selection:text-white font-[Inter,system-ui,sans-serif]">

      {/* Top bar */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between py-2 border-b border-[#E5E7EB] pb-4">
        <div className="flex items-center gap-2">
          <BrandLogo variant="horizontal" size="sm" />
          <span className="text-[10px] font-bold uppercase bg-blue-50 text-[#1E3A8A] border border-blue-200 px-2.5 py-0.5 rounded-full ml-1 font-mono">
            Administration Console
          </span>
        </div>

        <button
          onClick={onNavigateHome}
          className="text-xs font-semibold text-slate-500 hover:text-[#0F172A] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Back to Public Website</span>
        </button>
      </div>

      {/* Login Card */}
      <div className="max-w-md mx-auto w-full my-auto py-10">
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-8 shadow-sm space-y-6">

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-blue-50 border border-blue-200 text-[#1E3A8A] rounded-2xl flex items-center justify-center mx-auto shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#0F172A] tracking-tight">
              Testly Administration
            </h2>
            <p className="text-xs text-[#64748B]">
              Authorized administrator access to TESTLY 100 cohort, invite rail & candidate records.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-rose-700">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                <span>{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full bg-slate-50 text-xs font-semibold text-[#0F172A] pl-10 pr-3 py-3 rounded-xl border border-slate-200 focus:border-[#0F172A] focus:bg-white outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                Security Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-50 text-xs font-semibold text-[#0F172A] pl-10 pr-10 py-3 rounded-xl border border-slate-200 focus:border-[#0F172A] focus:bg-white outline-none transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button in Master Ink #0F172A */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0F172A] hover:bg-[#1E3A8A] text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              {isLoading ? (
                <span>Verifying Administrator Access...</span>
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight className="w-4 h-4 text-blue-300" />
                </>
              )}
            </button>
          </form>


        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="max-w-6xl mx-auto w-full text-center py-2">
        <p className="text-[11px] text-slate-600">
          Internal operating system for Testly Inc. Unauthorized access attempts are logged and monitored.
        </p>
      </div>

    </div>
  );
}
