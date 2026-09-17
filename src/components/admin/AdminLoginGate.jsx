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

  // Otherwise, show secure Enterprise Login Screen
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-6 antialiased selection:bg-emerald-500 selection:text-white">

      {/* Top bar */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <BrandLogo variant="horizontal" size="sm" theme="light" />
          <span className="text-[10px] font-bold uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full ml-1">
            Admin Portal
          </span>
        </div>

        <button
          onClick={onNavigateHome}
          className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Back to Public Website</span>
        </button>
      </div>

      {/* Login Card */}
      <div className="max-w-md mx-auto w-full my-auto py-10">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Testly CRM Login
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Authorized personnel only. Access voucher inventory & candidate records.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 flex items-start gap-2.5 text-xs text-rose-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block uppercase tracking-wider">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full bg-slate-950 text-xs font-semibold text-white pl-10 pr-3 py-3 rounded-xl border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block uppercase tracking-wider">
                Security Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 text-xs font-semibold text-white pl-10 pr-10 py-3 rounded-xl border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <span>Verifying Security Token...</span>
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security note */}
          <div className="pt-2 border-t border-slate-800/80 text-center">
            <p className="text-[11px] text-slate-500 font-mono">
              Role: Super Admin • Node: Secure HYD-MDPR-1
            </p>
          </div>

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
