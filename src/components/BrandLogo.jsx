import React from 'react';

/**
 * BrandLogo - Built according to Testly Brand Guidelines (media_1789575020567.jpg)
 * Variants:
 *  - 'horizontal' (Primary: Symbol + Wordmark + optional Tagline)
 *  - 'stacked' (Symbol on top, Wordmark below)
 *  - 'wordmark' (testly™ only)
 *  - 'symbol' (Interlocking T mark only)
 * Themes:
 *  - 'dark' (Default: Navy/Ink #0F172A + Blue #3B82F6 on light bg)
 *  - 'light' (White + Blue #3B82F6 on dark navy bg)
 */
export default function BrandLogo({
  variant = 'horizontal',
  theme = 'dark',
  showTagline = false,
  size = 'md', // 'sm' | 'md' | 'lg'
  className = ''
}) {
  const isLight = theme === 'light';
  const topColor = isLight ? '#FFFFFF' : '#0F172A';
  const stemColor = '#3B82F6';
  const textColor = isLight ? '#FFFFFF' : '#0F172A';
  const taglineColor = isLight ? '#94A3B8' : '#64748B';

  // Dimension scaling
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const Symbol = () => (
    <div className={`relative ${iconSizes[size]} shrink-0 select-none`}>
      <svg
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xs"
      >
        {/* Top Horizontal Bar */}
        <rect
          x="3"
          y="5"
          width="30"
          height="9"
          rx="4.5"
          fill={topColor}
        />
        {/* Vertical Interlocking Stem */}
        <rect
          x="13.5"
          y="10.5"
          width="9"
          height="20.5"
          rx="4.5"
          fill={stemColor}
        />
      </svg>
    </div>
  );

  const Wordmark = () => (
    <div className="flex items-baseline">
      <span
        className={`font-serif ${textSizes[size]} font-bold tracking-tight leading-none`}
        style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          color: textColor,
          letterSpacing: '-0.03em'
        }}
      >
        testly
      </span>
      <span
        className="text-[9px] font-bold ml-0.5 relative -top-1.5"
        style={{ color: stemColor }}
      >
        ™
      </span>
    </div>
  );

  if (variant === 'symbol') {
    return <Symbol />;
  }

  if (variant === 'wordmark') {
    return <Wordmark />;
  }

  if (variant === 'stacked') {
    return (
      <div className={`inline-flex flex-col items-center gap-1.5 ${className}`}>
        <Symbol />
        <Wordmark />
        {showTagline && (
          <span
            className="text-[9px] font-bold uppercase tracking-[0.22em] text-center"
            style={{ color: taglineColor }}
          >
            The Smarter Way to Book Your Exam.
          </span>
        )}
      </div>
    );
  }

  // Primary: Horizontal
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <Symbol />
      <div className="flex flex-col justify-center">
        <Wordmark />
        {showTagline && (
          <span
            className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] leading-tight mt-0.5"
            style={{ color: taglineColor }}
          >
            The Smarter Way to Book Your Exam.
          </span>
        )}
      </div>
    </div>
  );
}
