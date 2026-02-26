import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }) + ' IST';
  };

  return (
    <div className="flex flex-col w-full font-sans">
      {/* Top Bar - Dark Maroon */}
      <div className="bg-[#4a1d1d] text-white text-xs py-1 px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span>{formatDate(currentTime)} | {formatTime(currentTime)}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline cursor-pointer hover:underline">Screen Reader Access</span>
          <span className="hidden md:inline">|</span>
          <span className="cursor-pointer hover:underline">Skip to main content</span>
          <span className="hidden md:inline">|</span>
          <div className="flex gap-2">
            <span className="cursor-pointer hover:text-gray-300 font-bold">A-</span>
            <span className="cursor-pointer hover:text-gray-300 font-bold">A</span>
            <span className="cursor-pointer hover:text-gray-300 font-bold">A+</span>
          </div>
          <span className="hidden md:inline">|</span>
          <div className="flex gap-2">
            <i className="fab fa-facebook-f cursor-pointer hover:text-gray-300"></i>
            <i className="fab fa-twitter cursor-pointer hover:text-gray-300"></i>
            <i className="fab fa-youtube cursor-pointer hover:text-gray-300"></i>
          </div>
        </div>
      </div>

     {/* Main Banner - Aged Paper Background */}
<div
  className="relative py-6 px-4 md:px-8 
  flex items-center justify-between 
  shadow-md overflow-hidden bg-cover bg-center"
  style={{
    backgroundImage:
      'url("https://img.pikbest.com/wp/202344/parchment-paper-vintage-horizontal-banner-texture-aged-wallpaper_9903141.jpg!sw800")'
  }}
>

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

  {/* Left - SNS Logo */}
  <div className="relative z-10 flex items-center">
    
    <img
      src="/snslogo.png"  // 👈 Put your uploaded SNS image in public folder and name it sns-logo.png
      alt="SNS Logo"
      className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-xl"
    />
     <h1 className="text-2xl md:text-3xl font-bold tracking-wide uppercase drop-shadow-lg text-white">
      SNS Club
    </h1>
  </div>

  {/* Center Text */}
  <div className="relative z-10 text-center flex flex-col items-center">
    
    <h2 className="text-sm md:text-lg font-medium opacity-95 tracking-wider text-white">
      National Institute of Technology Calicut
    </h2>
    <div className="h-0.5 w-24 bg-white/70 mt-2"></div>
    <p className="text-xs md:text-sm mt-1 italic opacity-90 text-white">
      Bridging Science & Spirituality
    </p>
  </div>

  {/* Right - NITC Logo */}
  <div className="relative z-10 flex items-center">
    <img
      src="https://nitc.ac.in/xc-assets/logo/nitc_logo_icon.svg"
      alt="NITC Logo"
      className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full p-2 shadow-lg"
    />
  </div>

</div>




      {/* Navigation Bar - Dark Brown/Black */}
      <nav className="bg-[#2d1b1b] text-white border-t-4 border-[#d4af37] shadow-lg sticky top-0 z-50 ">
        <div className="container mx-auto px-4 md:px-8">
          <ul className="flex flex-wrap items-center justify-center gap-px">
            {[
              { name: 'HOME', path: '/home' },
              { name: 'ABOUT US', path: '/overview' },
              { name: 'SCIENCE', path: '/science' },
              { name: 'SPIRITUALITY', path: '/spirituality' },
              { name: 'GALLERY', path: '/gallery' },
              { name: 'EVENTS', path: '/events' },
              
              
            ].map((item, index) => (
              <li key={index} className="flex-1 md:flex-none">
                <Link
                  to={item.path}
                  className="block py-3 px-6 text-sm font-bold tracking-wider hover:bg-[#3e2a2a] transition-colors border-r border-[#3e2a2a]/30 uppercase text-center"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Decorative Vedic Manuscript Banner - 4th Row */}
      <div className="bg-[#4a1d1d] border-t-2 border-[#d4af37] shadow-inner">
        <div className="container mx-auto relative h-24 md:h-16 overflow-hidden">
          <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6gfc--q5IzHZRc9mZAuVOwvKfC9i4hnby7A&s")' }}></div>

          <div className="flex h-full w-full items-center justify-around gap-2 px-2">
            {/* Panel 1: Devanagari Manuscript */}
            <div className="h-full flex-1 min-w-[150px] relative transition-transform hover:scale-105 duration-500">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsMGRQkomb_npYiw0_keIHUSIW-x2I6hdWCA&s"
                alt="Devanagari Script"
                className="w-full h-full object-cover opacity-90 border-x border-[#d4af37]/20"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4a1d1d]/60 to-transparent"></div>
            </div>

            {/* Panel 2: Palm Leaf Manuscript Style */}
            <div className="h-full flex-1 min-w-[150px] relative hidden sm:block overflow-hidden transition-transform hover:scale-105 duration-500">
              <div className="absolute inset-0 bg-[#be3a34] opacity-20"></div>
              <img
                src="https://www.kamat.com/database/pictures/5421.jpg"
                alt="Palm Leaf Manuscript"
                className="w-full h-full object-cover opacity-80 mix-blend-screen grayscale brightness-125 saturate-50"
                onError={(e) => { e.target.src = 'https://www.transparenttextures.com/patterns/natural-paper.png'; }}
              />
            </div>

{/* Panel 2: Palm Leaf Manuscript Style */}
            <div className="h-full flex-1 min-w-[150px] relative hidden sm:block overflow-hidden transition-transform hover:scale-105 duration-500">
              <div className="absolute inset-0 bg-[#be3a34] opacity-20"></div>
              <img
                src="https://thediplomat.com/wp-content/uploads/2015/09/sizes/td-story-s-2/thediplomat_2015-09-03_00-42-20.jpg"
                alt="Palm Leaf Manuscript"
                className="w-full h-full object-cover opacity-80 mix-blend-screen grayscale brightness-125 saturate-50"
                onError={(e) => { e.target.src = 'https://www.transparenttextures.com/patterns/natural-paper.png'; }}
              />
            </div>

            {/* Panel 2: Palm Leaf Manuscript Style */}
            <div className="h-full flex-1 min-w-[150px] relative hidden sm:block overflow-hidden transition-transform hover:scale-105 duration-500">
              <div className="absolute inset-0 bg-[#be3a34] opacity-20"></div>
              <img
                src="https://www.kamat.com/database/pictures/5421.jpg"
                alt="Palm Leaf Manuscript"
                className="w-full h-full object-cover opacity-80 mix-blend-screen grayscale brightness-125 saturate-50"
                onError={(e) => { e.target.src = 'https://www.transparenttextures.com/patterns/natural-paper.png'; }}
              />
            </div>

            {/* Panel 2: Palm Leaf Manuscript Style */}
            <div className="h-full flex-1 min-w-[150px] relative hidden sm:block overflow-hidden transition-transform hover:scale-105 duration-500">
              <div className="absolute inset-0 bg-[#be3a34] opacity-20"></div>
              <img
                src="https://cdn.britannica.com/20/256720-050-36A1DDE8/Devanagari-script-Bhagavata-Purana.jpg?w=400&h=300&c=crop"
                alt="Palm Leaf Manuscript"
                className="w-full h-full object-cover opacity-80 mix-blend-screen grayscale brightness-125 saturate-50"
                onError={(e) => { e.target.src = 'https://www.transparenttextures.com/patterns/natural-paper.png'; }}
              />
            </div>
            
            {/* Panel 4: Vedic miniature/Art style */}
            <div className="h-full flex-1 min-w-[150px] relative hidden lg:block transition-transform hover:scale-105 duration-500">
              <img
                src="https://thumbs.dreamstime.com/b/sanskrit-sentence-mantra-avalokitesvara-bodhisattva-buddhism-one-ancient-indian-also-language-49993927.jpg"
                alt="Vedic Script"
                className="w-full h-full object-cover opacity-80"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#4a1d1d] to-transparent"></div>
            </div>
          </div>

          {/* Decorative Gold Flourish on top */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
