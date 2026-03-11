import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Update document title on route change
  useEffect(() => {
    const navItems = [
      { name: 'Founder', path: '/founder' },
      { name: 'Science', path: '/science' },
      { name: 'Spirituality', path: '/spirituality' },
      { name: 'Gallery', path: '/gallery' },
      { name: 'About Us', path: '/overview' },
      { name: 'Events', path: '/events' },
    ];
    const currentItem = navItems.find(item => item.path === location.pathname);
    document.title = currentItem ? `${currentItem.name} | SNS Club` : 'SNS Club';
  }, [location]);

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
        className="relative shadow-sm overflow-hidden bg-[#F3F3E0]"
      >
        {/* Removed the dark overlay to prevent "faded" look */}

        {/* 3-Column Grid */}
        <div className="container mx-auto relative z-10 grid grid-cols-[auto_1fr_auto] items-center w-full px-5 md:px-10 py-2 md:py-3 gap-2">

          {/* LEFT — SNS Club */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={process.env.PUBLIC_URL + "/snslogo.png"}
              alt="SNS Club Logo"
              className="w-8 h-8 md:w-[50px] md:h-[50px] object-contain flex-shrink-0 drop-shadow-[0_0_8px_rgba(255,255,255,1)] brightness-110 contrast-110"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-[#4a1d1d] text-sm md:text-lg font-black tracking-tighter uppercase">
                SNS Club
              </span>
              <span className="text-[#be3a34] text-[8px] md:text-[10px] font-bold tracking-[0.2em] uppercase">
                Science & Spirituality
              </span>
            </div>
          </Link>

          {/* CENTER — empty / spacer */}
          <div />

          {/* RIGHT — NIT Calicut */}
          <div className="flex items-center gap-3 justify-end">
            <div className="flex-col items-end leading-snug hidden sm:flex">
              <h2 className="text-[#4a1d1d] sm:text-[10px] md:text-xs font-bold tracking-widest uppercase">
                National Institute of Technology Calicut
              </h2>
            </div>
            <img
              src={process.env.PUBLIC_URL + "/nit_logo.png"}
              alt="NIT Calicut Logo"
              className="w-8 h-8 md:w-[50px] md:h-[50px] object-contain flex-shrink-0"
            />
          </div>

        </div>

        {/* Gold bottom accent line */}
        <div className="relative z-10 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-30" />
      </div>

      {/* ── Navigation Bar ── */}
      <nav className="bg-[#723939] text-white border-t border-[#d4af37]/30 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-3 text-white z-50"
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMenuOpen(false)}
            ></div>
          )}

          {/* Navigation Links */}
          <ul
            className={`
    fixed top-0 left-0 h-full w-72 bg-[#723939] flex flex-col pt-20
    transform transition-transform duration-300 ease-in-out z-50 shadow-2xl
    ${menuOpen ? "translate-x-0" : "-translate-x-full"}
    
    md:static md:translate-x-0 md:flex md:flex-row md:h-auto md:w-full
    md:pt-0 md:items-center md:justify-center md:gap-8 md:shadow-none
  `}

          >
            {/* ❌ Close Button (Mobile Only) */}
            <div className="absolute top-6 right-6 md:hidden">
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-white transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {[
              { name: 'Founder', path: '/founder' },
              { name: 'Science', path: '/science' },
              { name: 'Spirituality', path: '/spirituality' },
              { name: 'Gallery', path: '/gallery' },
              { name: 'About Us', path: '/overview' },
              { name: 'Events', path: '/events' },
            ].map((item, i) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={i} className="w-full md:w-auto">
                  <Link
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`
                      block uppercase tracking-[0.15em] text-sm transition-all duration-200 ease-in-out
                      
                      /* Mobile Drawer Styles */
                      py-3 px-6 border-l-[3px] 
                      ${isActive
                        ? 'border-[#f2cc8f] bg-[#f2cc8f]/10 text-[#f2cc8f] font-bold'
                        : 'border-transparent text-white font-normal'}
                      
                      /* Desktop Styles */
                      md:border-l-0 md:py-4 md:px-5 md:border-b-[3px]
                      ${isActive
                        ? 'md:border-[#f2cc8f] md:bg-[#f2cc8f]/10 md:text-[#f2cc8f] font-bold'
                        : 'md:border-transparent md:bg-transparent text-white font-normal'}
                      
                      md:hover:text-[#f2cc8f]
                    `}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* ── Creative Sanskrit Ticker Strip ── */}
      <div
        className="relative overflow-hidden border-b border-[#d4af37]/20"
        style={{
          background: '#F4EBD3', // Light cream background to match Index page intro
          minHeight: '40px',
        }}
      >
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-mathematics.png")' }}
        />

        <div className="absolute left-0 top-0 h-full w-16 z-10 flex items-center justify-center"
          style={{ background: 'linear-gradient(to right, #faf9f6 60%, transparent)' }}>
          <span className="text-[#be3a34] text-sm select-none opacity-50">❖</span>
        </div>
        <div className="absolute right-0 top-0 h-full w-16 z-10 flex items-center justify-center"
          style={{ background: 'linear-gradient(to left, #faf9f6 60%, transparent)' }}>
          <span className="text-[#be3a34] text-sm select-none opacity-50">❖</span>
        </div>

        <div className="container mx-auto flex items-center h-full py-2 px-12 overflow-hidden relative">
          <style>{`
            @keyframes snsTickerAnim {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .sns-ticker {
              display: flex;
              white-space: nowrap;
              animation: snsTickerAnim 35s linear infinite;
            }
            .sns-ticker:hover { animation-play-state: paused; }
          `}</style>
          <div className="sns-ticker">
            {[...shlokas, ...shlokas].map((s, i) => (
              <span key={i} className="inline-flex items-center gap-4 px-6">
                <span
                  className="text-[#4a1d1d] text-sm md:text-sm font-bold tracking-widest italic"
                  style={{ fontFamily: '"Noto Serif Devanagari", "Mangal", serif' }}
                >
                  {s}
                </span>
                <span className="text-[#be3a34] text-[10px] opacity-30">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Header;