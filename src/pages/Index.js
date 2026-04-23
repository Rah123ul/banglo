import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Index.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Index = () => {
  const [currentVideo, setCurrentVideo] = useState(0);

  const videos = [
    { src: process.env.PUBLIC_URL + '/khu-opt.mp4', title: 'Legacy of Learning', description: 'Exploring the 5000-year-old heritage of Indian Knowledge Systems at NIT Calicut.' },
    { src: process.env.PUBLIC_URL + '/sky-opt.mp4', title: 'Science & Spirituality', description: 'Finding the harmony between empirical evidence and inner wisdom.' },
    { src: 'https://media.istockphoto.com/id/1462128810/video/technical-college-student-conversing-with-teacher.mp4?s=mp4-640x640-is&k=20&c=7PL15D6UkFeNR2tvaJQ_5FloxvQ8S9w6TYBybA8x5t0=', title: 'Empowering Future Leaders', description: 'Nurturing holistic development through ethics, values, and technical excellence.' }
  ];

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [videos.length]);

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  return (
    <div className="index-page bg-[#faf9f6] min-h-screen text-gray-800 font-sans flex flex-col">
      {/* Header */}
      <Header />

      {/* Hero Section / Video Slider */}
      <section className="relative h-[500px] md:h-[600px] w-full overflow-hidden bg-gray-100 group">
        <div id="video-slider" className="relative w-full h-full">
          {videos.map((video, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentVideo ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <video
                src={video.src}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-4 pb-12 md:pb-8 backdrop-blur-[1px] bg-gradient-to-t from-black/50 via-black/20 to-transparent rounded-b-xl">

                <h3 className="text-3xl md:text-5xl mb-2 md:mb-4 drop-shadow-lg tracking-wide text-white font-bold">{video.title}</h3>
                <p className="text-sm md:text-xl text-white leading-relaxed drop-shadow-md opacity-90 max-w-2xl">{video.description}</p>

              </div>
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <button
          onClick={prevVideo}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 backdrop-blur-sm w-12 h-12 flex items-center justify-center rounded-full text-white transition-all hover:scale-110 opacity-0 group-hover:opacity-100"
        >
          &#10094;
        </button>
        <button
          onClick={nextVideo}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 backdrop-blur-sm w-12 h-12 flex items-center justify-center rounded-full text-white transition-all hover:scale-110 opacity-0 group-hover:opacity-100"
        >
          &#10095;
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {videos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentVideo(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentVideo ? 'bg-orange-500 w-8' : 'bg-white/50 w-4 hover:bg-white'}`}
            />
          ))}
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 px-4 bg-[#fcf5e3] relative overflow-hidden shadow-inner">

        {/* Abstract Background Aesthetic - Left (Sri Yantra) */}
        <div className="absolute -left-32 md:-left-80 -top-20 opacity-[0.04] pointer-events-none mix-blend-multiply" style={{ animation: 'spin 180s linear infinite' }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Sri_Yantra_2.svg" alt="" className="w-[600px] md:w-[1000px] h-auto" />
        </div>

        {/* Abstract Background Aesthetic - Right (Dharma Chakra) */}
        <div className="absolute -right-32 md:-right-80 -bottom-40 opacity-[0.03] pointer-events-none mix-blend-multiply" style={{ animation: 'spin 240s linear infinite reverse' }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/43/Dharmacakra.svg" alt="" className="w-[600px] md:w-[1000px] h-auto" />
        </div>

        <div className="container mx-auto text-center max-w-6xl relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#4a1d1d]">Welcome to CIKS & SNS Club</h2>
          <div className="w-24 h-1 bg-[#be3a34] mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-700 leading-relaxed mb-16 max-w-3xl mx-auto backdrop-blur-[4px]">
            The Centre for Indian Knowledge Systems (CIKS) at NIT Calicut is a hub for interdisciplinary research and education.
            Through our Science and Spirituality (SNS) Club, we engage the student community in exploring the profound intersections
            of traditional wisdom and modern science.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {[
              { title: 'IKS Research', desc: 'Investigating ancient Indian sciences with modern validation.', sanskrit: 'ज्ञान' },
              { title: 'Ethos & Values', desc: 'Promoting Indian ethics in management and lifestyle.', sanskrit: 'धर्म' },
              { title: 'Seva (Service)', desc: 'Cultivating a spirit of service and community welfare.', sanskrit: 'सेवा' }
            ].map((book, i) => (
              <div
                key={i}
                className="group relative flex flex-col items-center justify-between p-10 min-h-[380px] w-full max-w-[360px] mx-auto transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-4 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(145deg, #fdf8e9 0%, #e6d3a8 100%)',
                  boxShadow: '10px 15px 35px rgba(74, 29, 29, 0.15), inset 0 0 60px rgba(139, 69, 19, 0.08)',
                  borderRadius: '2px 30px 2px 30px',
                  border: '1px solid rgba(139, 69, 19, 0.3)',
                }}
              >

                {/* Background Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 pointer-events-none overflow-hidden rounded-[2px_30px_2px_30px]">
                  <span className="text-9xl font-bold text-[#4a1d1d] select-none" style={{ fontFamily: '"Noto Serif Devanagari", serif', transform: 'scale(2.5)' }}>
                    {book.sanskrit}
                  </span>
                </div>

                {/* Top Ornament */}
                <div className="relative mb-6 w-full flex justify-center">
                  <div className="w-24 h-[1px] bg-[#8B4513] opacity-30"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#8B4513] opacity-60 text-xl font-serif">
                    ❖
                  </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center">
                  <h3
                    className="text-2xl md:text-3xl font-bold mb-4 text-[#4a1d1d] uppercase transition-colors duration-500 group-hover:text-[#be3a34]"
                    style={{ fontFamily: "'Cinzel', 'Playfair Display', serif", letterSpacing: '3px', textShadow: '1px 1px 0px rgba(255,255,255,0.7)' }}
                  >
                    {book.title}
                  </h3>
                  <div className="w-12 h-[2px] bg-[#be3a34] mx-auto mb-6 opacity-40 transition-all duration-500 group-hover:w-20 group-hover:opacity-80"></div>
                  <p
                    className="text-gray-800 text-lg leading-relaxed font-semibold px-2"
                    style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                  >
                    {book.desc}
                  </p>
                </div>

                {/* Bottom Button */}
                <div className="mt-8 relative z-10 w-full flex justify-center">
                  <Link
                    to="/overview"
                    className="group-hover:text-[#fdf8e9] group-hover:bg-[#4a1d1d] group-hover:border-[#4a1d1d] transition-all duration-500 text-[#4a1d1d] font-bold text-xs tracking-[0.3em] uppercase py-3 px-8 border border-[#4a1d1d]/40 rounded-sm shadow-sm"
                  >
                    Uncover
                  </Link>
                </div>

                {/* Magical Gold Hover Glow */}
                <div className="absolute inset-0 rounded-[2px_30px_2px_30px] opacity-0 group-hover:opacity-100 shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-700 pointer-events-none border border-transparent group-hover:border-[#d4af37]/50"></div>

              </div>
            ))}

          </div>
        </div>
      </section>
      <Footer />





    </div>
  );
};

export default Index;
