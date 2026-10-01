import React, { useEffect } from 'react';
import Navbar from '../components/Navbar'; import Footer from '../components/Footer';
import { ArrowRight, MapPin, BookOpen } from 'lucide-react';
import { getExam, INDIA_GEO_CITIES } from '../data/seo/geoData';
import { updatePageMeta, injectBreadcrumbSchema } from '../utils/seoEngine';

export default function ExamSeoPage({ examSlug, onOpenBooking, onNavigate }) {
  const exam = getExam(examSlug);
  useEffect(() => {
    if (!exam) return;
    updatePageMeta({ title: exam.label + ' in India: Fees, Registration, Centres & Guides | Testly', description: exam.description + ' Compare current fees, registration steps, city-specific centre guidance and preparation resources.', canonicalUrl: 'https://www.testly.co.in/exams/' + exam.slug });
    injectBreadcrumbSchema([{ name: 'Home', url: 'https://www.testly.co.in/' }, { name: 'Exams', url: 'https://www.testly.co.in/exams' }, { name: exam.name, url: 'https://www.testly.co.in/exams/' + exam.slug }]);
  }, [exam]);
  if (!exam) return null;
  return <div className="min-h-screen bg-[#FAF9F6] flex flex-col text-slate-900">
    <Navbar onOpenBooking={onOpenBooking} onNavigate={onNavigate} />
    <main className="flex-grow">
      <section className="py-16 bg-white border-b border-slate-200"><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700">India exam guide</span>
        <h1 className="mt-3 text-4xl sm:text-5xl font-serif tracking-tight">{exam.label} in India</h1>
        <p className="mt-5 max-w-3xl text-lg text-slate-600 leading-relaxed">{exam.description} Testly is an independent registration assistance and information service, not the exam provider.</p>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="bg-[#FAF9F6] border border-slate-200 rounded-2xl p-5"><h2 className="font-bold">Fees</h2><p className="mt-2 text-sm text-slate-600">Check the current India fee and final payable amount before booking.</p></div>
          <div className="bg-[#FAF9F6] border border-slate-200 rounded-2xl p-5"><h2 className="font-bold">Registration</h2><p className="mt-2 text-sm text-slate-600">Review identity requirements, delivery mode, dates and cancellation rules.</p></div>
          <div className="bg-[#FAF9F6] border border-slate-200 rounded-2xl p-5"><h2 className="font-bold">Preparation</h2><p className="mt-2 text-sm text-slate-600">Use Testly guides and diagnostic resources to plan your preparation.</p></div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3"><button onClick={() => onOpenBooking(exam.name)} className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold px-5 py-3 rounded-xl">Check {exam.name} registration <ArrowRight className="w-4 h-4" /></button><button onClick={() => onNavigate('/exam-fees')} className="border border-slate-300 font-bold px-5 py-3 rounded-xl">Open fee index</button></div>
      </div></section>
      <section className="py-14"><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold">Find {exam.name} information by city</h2><div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {INDIA_GEO_CITIES.map(city => <button key={city.slug} onClick={() => onNavigate('/locations/' + city.slug + '/' + exam.slug)} className="bg-white border border-slate-200 rounded-xl p-4 text-left hover:border-blue-300"><div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-700" /><span className="font-bold">{city.name}</span></div><p className="mt-1 text-xs text-slate-500">{city.state} · {city.region}</p></button>)}
      </div></div></section>
      <section className="py-14 bg-white border-t border-slate-200"><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-4">
        <button onClick={() => onNavigate('/guides')} className="bg-[#FAF9F6] border border-slate-200 rounded-2xl p-5 text-left"><BookOpen className="w-5 h-5 text-blue-700" /><h2 className="mt-3 font-bold">Guides</h2><p className="mt-1 text-sm text-slate-600">Read current registration, fee and preparation guides.</p></button>
        <button onClick={() => onNavigate('/locations')} className="bg-[#FAF9F6] border border-slate-200 rounded-2xl p-5 text-left"><MapPin className="w-5 h-5 text-blue-700" /><h2 className="mt-3 font-bold">City centres</h2><p className="mt-1 text-sm text-slate-600">Compare the exam by Indian city.</p></button>
        <button onClick={() => onNavigate('/exam-fees')} className="bg-[#FAF9F6] border border-slate-200 rounded-2xl p-5 text-left"><BookOpen className="w-5 h-5 text-blue-700" /><h2 className="mt-3 font-bold">Fee index</h2><p className="mt-1 text-sm text-slate-600">Check the latest fee information before payment.</p></button>
      </div></section>
    </main><Footer onNavigate={onNavigate} onOpenAdmin={() => onNavigate('/admin')} /></div>;
}