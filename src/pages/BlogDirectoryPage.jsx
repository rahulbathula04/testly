import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  ArrowRight,
  BookOpen,
  MapPin,
  Calendar,
  Clock,
  ChevronRight,
  CheckCircle2,
  TrendingDown,
  Sparkles
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ExamLogo } from '../components/ExamLogos';
import { PUBLISHED_ARTICLES_LIST } from '../data/seo/publishedArticles';
import { ALL_CONTENT_OPPORTUNITIES } from '../data/seo/contentOpportunities';
import { getProfessionalById } from '../data/seo/professionalsData';
import { updatePageMeta } from '../utils/seoEngine';
import PassportNameValidator from '../components/tools/PassportNameValidator';

const EXAM_FILTERS = ['ALL', 'GRE', 'TOEFL', 'IELTS', 'PTE', 'GMAT', 'Duolingo'];
const CATEGORY_FILTERS = [
  'ALL',
  'Exam Fees & Savings',
  'Passport & ID Compliance',
  'Exam Comparisons',
  'Local Test Hubs',
  'Voucher Discounts'
];

export default function BlogDirectoryPage({ onOpenBooking, onNavigate }) {
  const [selectedExam, setSelectedExam] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    updatePageMeta({
      title: 'Exam Registration Guides, Fee Indexes & Savings Resources | Testly',
      description: 'Explore authoritative guides on GRE, TOEFL, IELTS, PTE, and GMAT in India. Learn official fee schedules, how to avoid forex markups, and fix passport name mismatches.',
      canonicalUrl: 'https://www.testly.co.in/guides'
    });
  }, []);

  const filteredArticles = PUBLISHED_ARTICLES_LIST.filter(a => {
    const matchesExam = selectedExam === 'ALL' || a.exam === selectedExam || a.exam === 'ALL';
    const matchesCategory = selectedCategory === 'ALL' || a.category === selectedCategory;
    const matchesSearch = !searchQuery.trim() ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesExam && matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col font-sans antialiased text-[#0F172A]">
      <Navbar onOpenBooking={onOpenBooking} onNavigate={onNavigate} />

      {/* ── Breadcrumb Bar ── */}
      <nav aria-label="Breadcrumb" className="bg-[#FAF9F6] border-b border-[#E5E7EB] py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-semibold text-[#64748B]">
          <button onClick={() => onNavigate('/')} className="hover:text-[#0F172A] transition-colors">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
          <span className="text-[#0F172A] font-bold">Guides & Research Intelligence</span>
        </div>
      </nav>

      <main className="flex-grow">

        {/* ── 1. Hero Header ── */}
        <section className="bg-gradient-to-b from-white via-[#FAF9F6] to-[#FAF9F6] py-14 lg:py-16 border-b border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 bg-[#EBF3FF] border border-blue-200/80 text-[#1E3A8A] px-3 py-1 rounded-full text-xs font-bold">
                <BookOpen className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>Testly Candidate Intelligence Library • Updated 2026</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-serif text-[#0F172A] tracking-tight leading-[1.1]">
                Exam Registration Guides, <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6]">
                  Fee Indexes & Savings Intelligence
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                Objective, data-driven guides written by certified test strategists. Learn official fee schedules, how to bypass 3.5% foreign card conversion markups, and how to format Indian passports to guarantee zero test-day rejection.
              </p>
            </div>

            {/* Search Input */}
            <div className="max-w-2xl relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by exam, city, fee question, or passport rule..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all shadow-sm"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-bold text-slate-400 mr-1">Filter by Exam:</span>
              {EXAM_FILTERS.map(exam => (
                <button
                  key={exam}
                  onClick={() => setSelectedExam(exam)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedExam === exam
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-400'
                  }`}
                >
                  {exam}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 mr-1">Filter by Topic:</span>
              {CATEGORY_FILTERS.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-700 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── 2. Published Articles Grid ── */}
        <section className="py-14 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Featured Verified Guides ({filteredArticles.length})
              </h2>
              <button
                onClick={() => onNavigate('/exam-fees')}
                className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
              >
                <span>View Live Exam Fee Tracker</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="p-12 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <p className="font-bold text-slate-700 text-sm">No articles match your search filter</p>
                <p className="text-xs text-slate-500">
                  Try clearing your filters or search for another keyword.
                </p>
                <button
                  onClick={() => {
                    setSelectedExam('ALL');
                    setSelectedCategory('ALL');
                    setSearchQuery('');
                  }}
                  className="bg-slate-900 text-white font-bold text-xs px-4 py-2 rounded-xl"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map(article => {
                  const author = getProfessionalById(article.authorId);
                  return (
                    <div
                      key={article.slug}
                      className="bg-white border border-slate-200 hover:border-slate-400 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group cursor-pointer"
                      onClick={() => onNavigate(`/guides/${article.slug}`)}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-800 px-2.5 py-0.5 rounded-md border border-blue-200">
                            {article.category}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{article.readTime}</span>
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                          {article.title}
                        </h3>

                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-medium">
                          {article.summary}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center">
                            {author.avatar}
                          </div>
                          <span className="text-xs font-semibold text-slate-700">{author.name}</span>
                        </div>

                        <span className="text-xs font-bold text-blue-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          <span>Read</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Interactive Candidate Tool Section */}
            <div className="pt-8">
              <PassportNameValidator onOpenBooking={onOpenBooking} />
            </div>
          </div>
        </section>

        {/* ── 3. Content Intelligence Matrix Highlight ── */}
        <section className="py-14 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Scalable Coverage
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                India-Wide Exam Knowledge Network
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                Testly’s intelligence database tracks {ALL_CONTENT_OPPORTUNITIES.length}+ test-taking scenarios across 8 major exams and 15 education hubs.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <p className="text-xs text-slate-500 font-medium">Tracked Opportunities</p>
                <p className="text-2xl font-black text-slate-900 mt-1">1,000+</p>
                <p className="text-[11px] text-blue-600 font-semibold mt-0.5">Continuous India monitoring</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <p className="text-xs text-slate-500 font-medium">Cities Monitored</p>
                <p className="text-2xl font-black text-slate-900 mt-1">15 Hubs</p>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Hyderabad, Bengaluru, Mumbai, etc.</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <p className="text-xs text-slate-500 font-medium">Verified Test Centers</p>
                <p className="text-2xl font-black text-slate-900 mt-1">45+ Venues</p>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Prometric & Pearson hubs</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <p className="text-xs text-slate-500 font-medium">Registration Fee</p>
                <p className="text-2xl font-black text-emerald-600 mt-1">₹199 Flat</p>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Zero-defect human pre-check</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer onOpenAdmin={() => onNavigate('/admin')} onNavigate={onNavigate} />
    </div>
  );
}
