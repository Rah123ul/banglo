import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const shlokas = [
    '✦  विद्या ददाति विनयम्  ✦',
    'सा विद्या या विमुक्तये',
    '✦  तमसो मा ज्योतिर्गमय  ✦',
    'आ नो भद्राः क्रतवो यन्तु विश्वतः',
    '✦  ज्ञानं परमं ध्येयम्  ✦',
    'सर्वे भवन्तु सुखिनः',
    '✦  योगः कर्मसु कौशलम्  ✦',
    'एकं सद् विप्रा बहुधा वदन्ति',
  ];

  return (
    <div className="flex flex-col w-full font-sans">

      {/* ── Top Bar ── */}
      
      {/* ── Main Banner ── */}
      <div
        className="relative shadow-md overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://i.pinimg.com/736x/c5/d6/ff/c5d6ff1c56757b472c898d7de3698e8f.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black/48 pointer-events-none" />

        {/* 3-Column Grid */}
        <div className="relative z-10 grid grid-cols-[auto_1fr_auto] items-center w-full px-5 md:px-10 py-3 md:py-3.5 gap-2">

          {/* LEFT — SNS Club */}
          
<Link to="/" className="flex items-center gap-3">
  <img
    src={process.env.PUBLIC_URL + "/snslogo.png"}
    alt="SNS Club Logo"
    className="w-10 h-10 md:w-[54px] md:h-[54px] object-contain drop-shadow-xl flex-shrink-0"
  />
  <div className="flex flex-col leading-tight">
    <span className="text-white text-xs md:text-sm font-extrabold tracking-widest uppercase drop-shadow">
      SNS Club
    </span>
  </div>
</Link>

          {/* CENTER — empty / spacer */}
          <div />

          {/* RIGHT — NIT Calicut */}
          <div className="flex items-center gap-3 justify-end">
            <div className="flex-col items-end leading-snug hidden sm:flex">
              <h2 className="text-white sm:text-[10px] md:text-xs font-medium tracking-widest uppercase drop-shadow">
                National Institute of Technology Calicut
              </h2>
            </div>
            <img
              src={process.env.PUBLIC_URL + "/nit_logo.png"}
              alt="NIT Calicut Logo"
              className="w-10 h-10 md:w-[54px] md:h-[54px] object-contain drop-shadow-2xl flex-shrink-0"
            />
          </div>

        </div>

        {/* Gold bottom accent */}
        <div className="relative z-10 h-[3px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
      </div>

      {/* ── Navigation Bar ── */}
<nav className="bg-[#2d1b1b] text-white border-t-4 border-[#d4af37] shadow-lg sticky top-0 z-50">
  <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
    
    {/* Mobile Menu Button */}
    <button
      className="md:hidden p-2 text-white z-50"
      aria-label="Toggle navigation"
      onClick={() => setMenuOpen(prev => !prev)}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
        />
      </svg>
    </button>

    {/* Overlay (Mobile Only) */}
    {menuOpen && (
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={() => setMenuOpen(false)}
      ></div>
    )}

    {/* Navigation Links */}
   <ul
  className={`
    fixed top-0 left-0 h-full w-64 bg-[#2d1b1b] flex flex-col
    transform transition-transform duration-300 z-50
    ${menuOpen ? "translate-x-0" : "-translate-x-full"}
    md:static md:translate-x-0 md:flex md:flex-row md:h-auto md:w-auto
    md:items-center md:justify-center md:gap-px
  `}
>
  {/* ❌ Close Button (Mobile Only) */}
  <div className="flex justify-end p-4 md:hidden">
    <button
      onClick={() => setMenuOpen(false)}
      className="text-white text-2xl hover:text-[#d4af37] transition-colors"
    >
      ✕
    </button>
  </div>

  {[
    
    { name: 'FOUNDER', path: '/founder' },
    { name: 'SCIENCE', path: '/science' },
    { name: 'SPIRITUALITY', path: '/spirituality' },
    { name: 'GALLERY', path: '/gallery' },
   
    { name: 'ABOUT US', path: '/overview' },
    { name: 'EVENTS', path: '/events' },
    
  ].map((item, i) => (
    <li key={i}>
      <Link
        to={item.path}
        onClick={() => setMenuOpen(false)}
        className="
          block py-4 px-6 text-sm font-bold tracking-wider uppercase
          border-b border-[#3e2a2a]/40
          hover:bg-[#3e2a2a] transition-colors
          md:border-b-0 md:border-r md:py-3
        "
      >
        {item.name}
      </Link>
    </li>
  ))}
</ul>
  </div>
</nav>

      {/* ── Creative Sanskrit Ticker Strip ── */}
      <div
        className="relative overflow-hidden border-b-2 border-[#d4af37]/50"
        style={{
          background: 'linear-gradient(90deg, #1a0808 0%, #3b1010 30%, #4a1d1d 50%, #3b1010 70%, #1a0808 100%)',
          minHeight: '46px',
        }}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-mathematics.png")' }}
        />
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-70" />

        <div className="absolute left-0 top-0 h-full w-12 z-10 flex items-center justify-center"
             style={{ background: 'linear-gradient(to right, #1a0808 60%, transparent)' }}>
          <span className="text-[#d4af37] text-base select-none">❖</span>
        </div>
        <div className="absolute right-0 top-0 h-full w-12 z-10 flex items-center justify-center"
             style={{ background: 'linear-gradient(to left, #1a0808 60%, transparent)' }}>
          <span className="text-[#d4af37] text-base select-none">❖</span>
        </div>

        <div className="flex items-center h-full py-2 px-12 overflow-hidden">
          <style>{`
            @keyframes snsTickerAnim {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .sns-ticker {
              display: flex;
              white-space: nowrap;
              animation: snsTickerAnim 28s linear infinite;
            }
            .sns-ticker:hover { animation-play-state: paused; }
          `}</style>
          <div className="sns-ticker">
            {[...shlokas, ...shlokas].map((s, i) => (
              <span key={i} className="inline-flex items-center gap-3 px-5">
                <span
                  className="text-[#f5d87a] text-sm md:text-base font-semibold tracking-widest"
                  style={{ fontFamily: '"Noto Serif Devanagari", "Mangal", serif', textShadow: '0 0 8px rgba(212,175,55,0.4)' }}
                >
                  {s}
                </span>
                <span className="text-[#d4af37]/30 text-xs">◆</span>
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-70" />
      </div>

    </div>
  );
};

export default Header;