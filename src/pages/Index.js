import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Index.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Index = () => {
  const [currentVideo, setCurrentVideo] = useState(0);

  const videos = [
    { src: 'https://media.istockphoto.com/id/2190386610/video/young-group-of-students-walking-on-road-engrossed-in-a-conversation.mp4?s=mp4-640x640-is&k=20&c=SDEJDV34rH9AEV96dijcZzlz0Uh3K0hQZXVmqKSPDm4=', title: 'Legacy of Learning', description: 'Exploring the 5000-year-old heritage of Indian Knowledge Systems at NIT Calicut.' },
    { src: 'https://media.istockphoto.com/id/2177048984/video/time-is-flying-by-spiral-clock-and-cloudscape-loopable-animation.mp4?s=mp4-640x640-is&k=20&c=cg432rj1jpqvGrSX8kjyu0Xh3lRuNRL_1aeZAPWAArU=', title: 'Science & Spirituality', description: 'Finding the harmony between empirical evidence and inner wisdom.' },
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
      <section className="relative h-[500px] md:h-[540px] w-full overflow-hidden bg-gray-100 group">
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
              <div className="absolute bottom-0 left-0 w-full p-4 backdrop-blur-[1px] bg-gradient-to-t from-black/50 via-black/20 to-transparent
rounded-b-xl">
                    
                <h3 className="text-3xl md:text-5xl  mb-4 drop-shadow-lg tracking-wide text-white font-bold">{video.title}</h3>
                <p className="text-lg md:text-xl text-white leading-relaxed drop-shadow-md opacity-70 max-w-2xl">{video.description}</p>
                
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
      <section className="py-20 px-4 bg-[#faf9f6] relative backdrop-blur-[4px]"
      style={{
    backgroundImage:
      'url("https://img.pikbest.com/wp/202344/parchment-paper-vintage-horizontal-banner-texture-aged-wallpaper_9903141.jpg!sw800")',
  }}
      >
        <div className="container mx-auto text-center max-w-5xl  ">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#4a1d1d]">Welcome to CIKS & SNS Club</h2>
          <div className="w-24 h-1 bg-[#be3a34] mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-700 leading-relaxed mb-16 max-w-3xl mx-auto backdrop-blur-[4px]">
            The Centre for Indian Knowledge Systems (CIKS) at NIT Calicut is a hub for interdisciplinary research and education.
            Through our Science and Spirituality (SNS) Club, we engage the student community in exploring the profound intersections
            of traditional wisdom and modern science.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { title: 'IKS Research', desc: 'Investigating ancient Indian sciences with modern validation.', icon: '🔬', color: 'bg-red-50 text-[#be3a34]' },
              { title: 'Ethos & Values', desc: 'Promoting Indian ethics in management and lifestyle.', icon: '📜', color: 'bg-yellow-50 text-[#4a1d1d]' },
              { title: 'Seva (Service)', desc: 'Cultivating a spirit of service and community welfare.', icon: '🤝', color: 'bg-green-50 text-green-700' }
            ].map((card, i) => (
              <div key={i} className="card p-8 bg-white border border-gray-100 hover:border-[#be3a34]/30 group transition-all shadow-sm hover:shadow-md">
                <div className={`w-16 h-16 ${card.color} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
                  {card.icon}
                </div>
                <h4 className="text-xl font-bold text-[#4a1d1d] mb-3">{card.title}</h4>
                <p className="text-gray-500 leading-relaxed mb-4">{card.desc}</p>
                <Link to="/overview" className="text-[#be3a34] font-semibold hover:text-[#4a1d1d] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <span>&rarr;</span>
                </Link>
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
