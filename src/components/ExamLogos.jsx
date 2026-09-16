import React from 'react';

/**
 * Authentic brand logos for major exams:
 * - ETS GRE
 * - ETS TOEFL
 * - IELTS
 * - Pearson PTE
 * - Duolingo
 * - GMAT
 * - SAT
 * - LSAT
 */

// 1. ETS GRE Logo
export function EtsGreLogo({ className = "h-7" }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {/* ETS Oval Badge */}
      <svg viewBox="0 0 54 30" className="h-6 w-auto shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="52" height="28" rx="14" stroke="#0B3A75" strokeWidth="2.2" fill="#F0F6FC" />
        <text
          x="27"
          y="20"
          textAnchor="middle"
          fill="#0B3A75"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="13"
          letterSpacing="0.8px"
        >
          ETS
        </text>
      </svg>
      {/* GRE Wordmark */}
      <span className="font-extrabold text-[18px] tracking-tight text-[#0B3A75] font-sans leading-none">
        GRE<span className="text-[10px] font-bold align-super ml-0.5">®</span>
      </span>
    </div>
  );
}

// 2. ETS TOEFL Logo
export function EtsToeflLogo({ className = "h-7" }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {/* ETS Oval Badge */}
      <svg viewBox="0 0 54 30" className="h-6 w-auto shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="52" height="28" rx="14" stroke="#0B3A75" strokeWidth="2.2" fill="#F0F6FC" />
        <text
          x="27"
          y="20"
          textAnchor="middle"
          fill="#0B3A75"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="13"
          letterSpacing="0.8px"
        >
          ETS
        </text>
      </svg>
      {/* TOEFL Wordmark */}
      <span className="font-extrabold text-[17px] tracking-tight text-[#0B3A75] font-sans leading-none">
        TOEFL<span className="text-[9px] font-bold align-super ml-0.5">®</span>
      </span>
    </div>
  );
}

// 3. Official IELTS Logo (Bold Red Wordmark)
export function IeltsLogo({ className = "h-7" }) {
  return (
    <div className={`flex items-center ${className}`}>
      <svg viewBox="0 0 95 28" className="h-6 w-auto shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text
          x="0"
          y="23"
          fill="#E0001B"
          fontFamily="system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"
          fontWeight="900"
          fontSize="24"
          letterSpacing="-0.5px"
        >
          IELTS
        </text>
        <text
          x="75"
          y="10"
          fill="#E0001B"
          fontFamily="system-ui, sans-serif"
          fontWeight="bold"
          fontSize="8"
        >
          ™
        </text>
      </svg>
    </div>
  );
}

// 4. Pearson PTE Logo (Pearson teal emblem + PTE)
export function PteLogo({ className = "h-7" }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {/* Pearson Cyan / Teal Round Logo */}
      <svg viewBox="0 0 32 32" className="h-6 w-6 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="15" fill="#007FA3" />
        {/* Pearson Interlocking Stylized 'P' Monogram */}
        <path
          d="M11 23V9H17.5C19.8 9 21.5 10.5 21.5 12.8C21.5 15.1 19.8 16.6 17.5 16.6H14V23H11ZM14 14.1H17.2C18.2 14.1 18.9 13.5 18.9 12.8C18.9 12.1 18.2 11.5 17.2 11.5H14V14.1Z"
          fill="#FFFFFF"
        />
      </svg>
      {/* PTE Text */}
      <span className="font-extrabold text-[18px] tracking-tight text-[#007FA3] font-sans leading-none">
        PTE
      </span>
    </div>
  );
}

// 5. Duolingo Logo (Official Green Owl Face + Wordmark)
export function DuolingoLogo({ className = "h-7" }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {/* Duolingo Duo Owl Face */}
      <svg viewBox="0 0 32 32" className="h-6 w-6 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Owl Face Contour */}
        <rect x="1" y="2" width="30" height="28" rx="14" fill="#58CC02" />
        {/* White Eye Rings */}
        <circle cx="11" cy="15" r="5" fill="#FFFFFF" />
        <circle cx="21" cy="15" r="5" fill="#FFFFFF" />
        {/* Pupils */}
        <circle cx="12" cy="15" r="2.6" fill="#4B4B4B" />
        <circle cx="20" cy="15" r="2.6" fill="#4B4B4B" />
        {/* Catchlights */}
        <circle cx="13" cy="14" r="0.9" fill="#FFFFFF" />
        <circle cx="21" cy="14" r="0.9" fill="#FFFFFF" />
        {/* Orange Beak */}
        <polygon points="16,16 13.5,21 18.5,21" fill="#FF9600" />
      </svg>
      {/* Duolingo Green Wordmark */}
      <span className="font-black text-[16px] tracking-tight text-[#58CC02] font-sans leading-none">
        Duolingo
      </span>
    </div>
  );
}

// 6. GMAT Logo (GMAC Official styling)
export function GmatLogo({ className = "h-7" }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <svg viewBox="0 0 30 30" className="h-6 w-6 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="30" height="30" rx="6" fill="#111827" />
        <text
          x="15"
          y="21"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="system-ui, sans-serif"
          fontWeight="900"
          fontSize="16"
        >
          G
        </text>
      </svg>
      <span className="font-black text-[18px] tracking-tight text-slate-900 font-sans leading-none">
        GMAT<span className="text-[10px] font-semibold text-slate-500 align-super ml-0.5">™</span>
      </span>
    </div>
  );
}

// 7. SAT Logo (College Board)
export function SatLogo({ className = "h-7" }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <span className="font-black text-[18px] tracking-tight text-[#002B66] font-sans leading-none">
        SAT<span className="text-[10px] font-semibold text-slate-500 align-super ml-0.5">®</span>
      </span>
    </div>
  );
}

// 8. LSAT Logo
export function LsatLogo({ className = "h-7" }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <span className="font-black text-[18px] tracking-tight text-slate-800 font-sans leading-none">
        LSAT<span className="text-[10px] font-semibold text-slate-500 align-super ml-0.5">®</span>
      </span>
    </div>
  );
}

// Generic logo selector helper
export function ExamLogo({ examId, className = "h-7" }) {
  switch (examId) {
    case 'GRE':
      return <EtsGreLogo className={className} />;
    case 'TOEFL':
      return <EtsToeflLogo className={className} />;
    case 'IELTS':
      return <IeltsLogo className={className} />;
    case 'PTE':
      return <PteLogo className={className} />;
    case 'Duolingo':
    case 'DET':
      return <DuolingoLogo className={className} />;
    case 'GMAT':
      return <GmatLogo className={className} />;
    case 'SAT':
      return <SatLogo className={className} />;
    case 'LSAT':
      return <LsatLogo className={className} />;
    default:
      return <span className="font-black text-slate-900">{examId}</span>;
  }
}
