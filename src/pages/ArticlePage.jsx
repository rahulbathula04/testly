import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Clock,
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ChevronRight,
  Share2,
  MessageCircle,
  TrendingDown,
  BookOpen,
  MapPin,
  ChevronDown,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ExamLogo } from '../components/ExamLogos';
import { EXAM_DATA } from '../components/PriceProof';
import { getArticleBySlug, PUBLISHED_ARTICLES_LIST } from '../data/seo/publishedArticles';
import { getProfessionalById } from '../data/seo/professionalsData';
import {
  injectArticleSchema,
  injectFAQSchema,
  injectBreadcrumbSchema,
  updatePageMeta
} from '../utils/seoEngine';

export default function ArticlePage({ slug, onOpenBooking, onNavigate }) {
  const article = getArticleBySlug(slug);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  useEffect(() => {
    if (!article) return;

    // Update document title and primary SEO meta tags
    updatePageMeta({
      title: `${article.metaTitle || article.title} | Testly`,
      description: article.metaDescription,
      canonicalUrl: `https://www.testly.co.in/guides/${article.slug}`
    });

    const author = getProfessionalById(article.authorId);

    // Inject Schema.org JSON-LD Structured Data
    injectArticleSchema({
      article,
      author,
      url: `https://www.testly.co.in/guides/${article.slug}`
    });

    if (article.faqs && article.faqs.length) {
      injectFAQSchema(article.faqs);
    }

    injectBreadcrumbSchema([
      { name: 'Home', url: 'https://www.testly.co.in/' },
      { name: 'Guides & Research', url: 'https://www.testly.co.in/guides' },
      { name: article.title, url: `https://www.testly.co.in/guides/${article.slug}` }
    ]);
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-[Inter,system-ui,sans-serif]">
        <Navbar onOpenBooking={onOpenBooking} onNavigate={onNavigate} />
        <div className="flex-grow flex items-center justify-center p-8 text-center">
          <div className="max-w-md space-y-4">
            <h1 className="text-2xl font-bold text-slate-900">Guide Under Editorial Review</h1>
            <p className="text-sm text-slate-600">
              This guide is currently being updated with verified 2026 testing agency guidelines and fee schedules.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => onNavigate('/guides')}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs"
              >
                Browse All Published Guides
              </button>
              <button
                onClick={() => onOpenBooking('GRE')}
                className="text-xs text-blue-600 font-bold hover:underline"
              >
                Speak Directly with an Exam Strategist
              </button>
            </div>
          </div>
        </div>
        <Footer onOpenAdmin={() => onNavigate('/admin')} onNavigate={onNavigate} />
      </div>
    );
  }

  const author = getProfessionalById(article.authorId);
  const reviewer = getProfessionalById(article.reviewerId);
  const pricing = EXAM_DATA[article.exam] || EXAM_DATA.GRE;

  const relatedArticles = PUBLISHED_ARTICLES_LIST
    .filter(a => a.slug !== article.slug)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Guide link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-[Inter,system-ui,sans-serif] antialiased text-slate-900">
      <Navbar onOpenBooking={onOpenBooking} onNavigate={onNavigate} />

      {/* ── Breadcrumb Bar ── */}
      <nav aria-label="Breadcrumb" className="bg-slate-50 border-b border-slate-200 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-semibold text-slate-500 overflow-x-auto whitespace-nowrap">
          <button onClick={() => onNavigate('/')} className="hover:text-slate-900 transition-colors">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <button onClick={() => onNavigate('/guides')} className="hover:text-slate-900 transition-colors">
            Guides & Research
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-900 font-bold truncate">{article.title}</span>
        </div>
      </nav>

      <main className="flex-grow">

        {/* ── 1. Article Hero Header ── */}
        <header className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-200 pt-10 pb-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

            {/* Badges & Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-blue-50 border border-blue-200 text-blue-800 text-[11px] font-bold px-2.5 py-1 rounded-md">
                {article.category}
              </span>
              <span className="bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5">
                <ExamLogo examId={article.exam} className="h-3.5" />
                <span>{article.exam} Focus</span>
              </span>
              {article.location && (
                <span className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  <span>{article.location}</span>
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              {article.title}
            </h1>

            {/* Subtitle / Summary */}
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-4xl">
              {article.summary}
            </p>

            {/* E-E-A-T Author & Reviewer Metadata Strip */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">

                {/* Author */}
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs shrink-0">
                    {author.avatar}
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium">Written by</p>
                    <p className="font-bold text-slate-900">{author.name}</p>
                  </div>
                </div>

                {/* Reviewer */}
                <div className="flex items-center gap-2.5 border-l border-slate-200 pl-4 sm:pl-6">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs shrink-0">
                    {reviewer.avatar}
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium">Fact-Checked by</p>
                    <p className="font-bold text-slate-900">{reviewer.name}</p>
                  </div>
                </div>

                {/* Verification Date */}
                <div className="hidden md:flex flex-col border-l border-slate-200 pl-6">
                  <span className="text-slate-500 font-medium">Price & Rules Verified</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{article.lastVerifiedDate}</span>
                  </span>
                </div>

              </div>

              {/* Share */}
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-bold px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Guide</span>
              </button>
            </div>

          </div>
        </header>

        {/* ── 2. Two-Column Content Layout ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Main Content Area (8 Cols) */}
            <article className="lg:col-span-8 space-y-10">

              {/* Table of Contents */}
              {article.toc && article.toc.length > 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    <span>Table of Contents</span>
                  </p>
                  <ul className="space-y-2 text-xs font-semibold text-slate-700">
                    {article.toc.map(item => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="hover:text-blue-700 hover:underline transition-colors flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                          <span>{item.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Rendered Content Sections */}
              <div className="space-y-10">
                {article.sections.map(sec => (
                  <section key={sec.id} id={sec.id} className="scroll-mt-20 space-y-4">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight border-b border-slate-100 pb-2">
                      {sec.title}
                    </h2>
                    <div className="text-sm sm:text-[15px] text-slate-700 leading-relaxed font-normal whitespace-pre-line space-y-3">
                      {sec.content}
                    </div>
                  </section>
                ))}
              </div>

              {/* Dynamic Live Price & Savings Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      Live Verified Pricing • India 2026
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5">
                      {pricing.label} Voucher & Registration Rates
                    </h3>
                  </div>
                  <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full">
                    Save ₹{pricing.saving.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
                    <p className="text-slate-400">Standard Test Fee</p>
                    <p className="text-base font-bold text-slate-400 line-through mt-0.5">
                      ₹{pricing.refPrice.toLocaleString('en-IN')}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">With card forex markup</p>
                  </div>

                  <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
                    <p className="text-slate-400">Testly Voucher Price</p>
                    <p className="text-xl font-black text-white mt-0.5">
                      ₹{pricing.testlyPrice.toLocaleString('en-IN')}
                    </p>
                    <p className="text-[10px] text-emerald-400 mt-1">Direct INR payment via UPI</p>
                  </div>

                  <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
                    <p className="text-slate-400">Your Net Savings</p>
                    <p className="text-xl font-black text-emerald-400 mt-0.5">
                      ₹{pricing.saving.toLocaleString('en-IN')}
                    </p>
                    <p className="text-[10px] text-slate-300 mt-1">+ ₹199 Passport Pre-check</p>
                  </div>
                </div>

                <button
                  onClick={() => onOpenBooking(article.exam)}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3.5 rounded-xl text-xs sm:text-sm transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Claim {pricing.label} Voucher & Registration Assistance</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* ₹199 Zero-Defect Passport Assurance Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                    <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
                    <span>Need Help with Passport or Slot Verification?</span>
                  </div>
                  <p className="text-xs text-blue-800 leading-relaxed font-medium">
                    Testly provides a comprehensive ₹199 human verification service. We audit your passport character-by-character against testing agency databases to ensure zero test-day entry denial.
                  </p>
                </div>
                <button
                  onClick={() => onOpenBooking(article.exam)}
                  className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-5 py-3 rounded-xl whitespace-nowrap shrink-0 transition-colors shadow-sm"
                >
                  Get ₹199 Pre-Check →
                </button>
              </div>

              {/* Real Student FAQs Section with Accordion */}
              {article.faqs && article.faqs.length > 0 && (
                <section id="faq" className="scroll-mt-20 space-y-4 pt-6">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-3">
                    {article.faqs.map((faq, idx) => {
                      const isOpen = openFaqIndex === idx;
                      return (
                        <div
                          key={idx}
                          className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all shadow-2xs"
                        >
                          <button
                            onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                            className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:bg-slate-50 transition-colors"
                          >
                            <span>{faq.question}</span>
                            <ChevronDown
                              className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed font-medium border-t border-slate-100 pt-3">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

            </article>

            {/* Sidebar (4 Cols) */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">

              {/* Quick Lead Capture Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Reserve Your Exam Savings</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Speak with a Testly strategist today. We verify your passport details and lock in discounted official vouchers.
                </p>
                <button
                  onClick={() => onOpenBooking(article.exam)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Check Savings for {article.exam}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href={`https://wa.me/919347379041?text=Hi%20Testly%2C%20I%20read%20your%20guide%20on%20${encodeURIComponent(article.title)}.%20I%20need%20voucher%20assistance.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Author & Fact Checker Bio Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 text-xs">
                <p className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">
                  Editorial & Review Standards
                </p>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-sm shrink-0">
                    {author.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{author.name}</p>
                    <p className="text-[11px] text-blue-700 font-semibold">{author.role}</p>
                    <p className="text-[10px] text-slate-500 mt-1 leading-snug">{author.credentials}</p>
                  </div>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed pt-1 border-t border-slate-200">
                  {author.bio}
                </p>
                <button
                  onClick={() => onNavigate('/professionals')}
                  className="text-blue-700 font-bold text-[11px] hover:underline flex items-center gap-1"
                >
                  <span>View Full Testly Advisory Board</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Related High-Priority Guides */}
              {relatedArticles.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
                  <p className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">
                    Related Exam Guides
                  </p>
                  <div className="space-y-2.5">
                    {relatedArticles.map(rel => (
                      <button
                        key={rel.slug}
                        onClick={() => onNavigate(`/guides/${rel.slug}`)}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 flex flex-col space-y-1"
                      >
                        <span className="text-[10px] font-bold text-blue-700">{rel.category}</span>
                        <span className="text-xs font-bold text-slate-900 line-clamp-2">{rel.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </aside>

          </div>
        </div>

      </main>

      <Footer onOpenAdmin={() => onNavigate('/admin')} onNavigate={onNavigate} />
    </div>
  );
}
