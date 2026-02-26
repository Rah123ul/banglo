import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Science = () => {
  return (
    <div className="science-page scroll-smooth relative">
      {/* Old Aged Paper Background - Fixed Layer */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 mix-blend-multiply z-0" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' /%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)' fill='%23d4a574'/%3E%3C/svg%3E")`,
          backgroundSize: 'cover'
        }}
      />
      {/* Aging Stains Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-10 z-0" 
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 70%, rgba(101, 67, 33, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 40% 80%, rgba(160, 82, 45, 0.08) 0%, transparent 40%)`,
        }}
      />
      
      <Header />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="hero-bg-science py-32 relative">
          <div className="absolute inset-0 bg-[#f4e4c1] opacity-30"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold text-[#4a1d1d] mb-4">
              Vigyan: Where Ancient Wisdom Meets Modern Inquiry
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              From the revolutionary concept of <span className="italic font-semibold">Śūnya</span> (zero) to the celestial precision of <span className="italic font-semibold">Jyotiṣa</span>, discover how Indian scholars mapped both the cosmos and consciousness itself.
            </p>
          </div>
        </section>

        {/* Introduction to IKS */}
        <section className="py-20 bg-[#faf6ed] relative">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`
          }}></div>
          <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <h2 className="text-3xl font-bold mb-6 text-[#4a1d1d] text-center">The Living Laboratory of <span className="italic">Jñāna</span></h2>
            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              Imagine a time when mathematicians weren't just calculating—they were philosophers. When astronomers weren't just stargazers—they were poets who saw the universe as a divine dance. This is the world of Indian Knowledge Systems, where science was never separate from the search for deeper meaning.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              Our ancestors didn't just discover zero; they understood <span className="italic font-semibold">Śūnya</span>—the profound nothingness that is paradoxically everything. They didn't just track planets; they practiced <span className="italic font-semibold">Jyotiṣa</span>—the science of light, where mathematics and meaning converged.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed">
              At SNS, we're not preserving dusty manuscripts. We're asking: What happens when we apply ancient frameworks to modern problems? Can <span className="italic font-semibold">Āyurveda's</span> holistic view inform personalized medicine? Can traditional water management systems solve today's climate crisis? These aren't rhetorical questions—they're our research agenda.
            </p>
          </div>
        </section>

        {/* Fields of Inquiry - Redesigned with varied layouts */}
        <section className="py-24 bg-[#f5ebe0] relative">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`
          }}></div>
          <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-4xl font-bold mb-4 text-[#4a1d1d] text-center">Our Domains of Discovery</h2>
            <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
              Each field represents centuries of observation, experimentation, and philosophical inquiry—all waiting to be explored through both traditional and contemporary lenses.
            </p>
            
            {/* Field 1: Mathematics - Full Width Banner Style */}
            <div className="mb-12 relative h-[400px] rounded-2xl overflow-hidden shadow-2xl group">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url("https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80")`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-transparent"></div>
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper-texture'%3E%3CfeTurbulence baseFrequency='0.04' numOctaves='5' seed='1'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23paper-texture)' fill='%23c19a6b'/%3E%3C/svg%3E")`
              }}></div>
              <div className="relative h-full flex items-center px-12">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-[#f2cc8f] p-5 rounded-full text-[#4a1d1d] shadow-xl">
                      <span className="text-5xl font-bold">०</span>
                    </div>
                    <div>
                      <h3 className="text-4xl font-bold text-white mb-1">Gaṇita</h3>
                      <p className="text-xl text-[#f2cc8f] italic">The Mathematics of Infinity</p>
                    </div>
                  </div>
                  <p className="text-white/90 leading-relaxed text-lg mb-4">
                    When Brahmagupta wrote his <span className="italic font-semibold">Brāhmasphuṭasiddhānta</span> in 628 CE, he wasn't just doing math—he was revolutionizing how humanity thinks about numbers. His rules for zero and negative numbers would eventually transform global commerce and scientific calculation.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    We explore: How did algebraic thinking emerge from Sanskrit grammatical traditions? Why did Indian mathematicians see infinity as a number? What can <span className="italic">Vedic Mathematics</span> teach us about computational thinking?
                  </p>
                </div>
              </div>
            </div>

            {/* Fields 2 & 3: Side by Side Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Field 2: Astronomy - Vertical Card */}
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80")`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"></div>
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper-texture'%3E%3CfeTurbulence baseFrequency='0.04' numOctaves='5' seed='2'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23paper-texture)' fill='%23c19a6b'/%3E%3C/svg%3E")`
                }}></div>
                <div className="relative h-full flex flex-col justify-end p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-[#f2cc8f] p-4 rounded-full text-[#4a1d1d] shadow-xl">
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                        <circle cx="10" cy="10" r="3" />
                        <path d="M10 2v2M10 16v2M18 10h-2M4 10H2M15.66 4.34l-1.41 1.41M5.75 14.25l-1.41 1.41M15.66 15.66l-1.41-1.41M5.75 5.75L4.34 4.34" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">Jyotiṣa</h3>
                      <p className="text-lg text-[#f2cc8f] italic">The Science of Celestial Light</p>
                    </div>
                  </div>
                  <p className="text-white/90 leading-relaxed mb-3">
                    Āryabhaṭa proposed Earth's rotation in 499 CE—a thousand years before Copernicus. His <span className="italic">Āryabhaṭīya</span> calculated the solar year to 365.25858 days, accurate to just 3.5 minutes. How did they achieve such precision without telescopes?
                  </p>
                  <p className="text-white/80 leading-relaxed text-sm">
                    We investigate: Ancient eclipse prediction methods, the mathematics behind planetary motion in <span className="italic">siddhānta</span> texts, and how naked-eye observation led to revolutionary cosmological models.
                  </p>
                </div>
              </div>

              {/* Field 3: Health Sciences - Vertical Card */}
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80")`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a4d2e]/95 via-[#1a4d2e]/70 to-[#1a4d2e]/30"></div>
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper-texture'%3E%3CfeTurbulence baseFrequency='0.04' numOctaves='5' seed='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23paper-texture)' fill='%23c19a6b'/%3E%3C/svg%3E")`
                }}></div>
                <div className="relative h-full flex flex-col justify-end p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-[#f2cc8f] p-4 rounded-full text-[#1a4d2e] shadow-xl">
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">Āyurveda & Yoga</h3>
                      <p className="text-lg text-[#f2cc8f] italic">The Science of Life</p>
                    </div>
                  </div>
                  <p className="text-white/90 leading-relaxed mb-3">
                    Suśruta was performing cataract surgery and plastic reconstruction in 600 BCE. Caraka documented over 2,000 disease classifications. But <span className="italic">Āyurveda</span> was never just about treatment—it was about understanding the fundamental relationship between body, mind, and environment.
                  </p>
                  <p className="text-white/80 leading-relaxed text-sm">
                    We study: The <span className="italic">tridoṣa</span> theory and its parallels with modern systems biology, how <span className="italic">prāṇāyāma</span> affects nervous system regulation, and the pharmacology hidden in traditional formulations.
                  </p>
                </div>
              </div>
            </div>

            {/* Field 4: Sustainability - Diagonal Split Layout */}
            <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl group">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80")`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#2d5016]/90 via-[#2d5016]/75 to-transparent"></div>
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper-texture'%3E%3CfeTurbulence baseFrequency='0.04' numOctaves='5' seed='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23paper-texture)' fill='%23c19a6b'/%3E%3C/svg%3E")`
              }}></div>
              <div className="relative h-full flex items-center">
                <div className="w-full md:w-2/3 px-12">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-[#f2cc8f] p-5 rounded-full text-[#2d5016] shadow-xl">
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-4xl font-bold text-white mb-1">Prakṛti-Vijñāna</h3>
                      <p className="text-xl text-[#f2cc8f] italic">Understanding Nature's Intelligence</p>
                    </div>
                  </div>
                  <p className="text-white/90 leading-relaxed text-lg mb-4">
                    Ancient Indian texts didn't just describe nature—they prescribed a relationship with it. The concept of <span className="italic font-semibold">ṛta</span> (cosmic order) meant that ecological balance wasn't optional; it was fundamental. Traditional stepwells, <span className="italic">vāstu</span> architecture, and community forest management weren't just practical—they were expressions of a worldview.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    We examine: How traditional water harvesting systems can address modern scarcity, the biodiversity wisdom in <span className="italic">vana</span> (forest) management, and climate-responsive architecture principles from <span className="italic">Vāstu Śāstra</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deep Dive Section */}
        <section className="py-20 bg-[#faf6ed] relative">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`
          }}></div>
          <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <h2 className="text-3xl font-bold mb-8 text-[#4a1d1d] text-center">Beyond the Textbook: <span className="italic">Pramāṇa</span> in Action</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#be3a34] mb-2">7</div>
                <p className="text-gray-700">Classical systems of logic and reasoning (<span className="italic">darśanas</span>)</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#be3a34] mb-2">1000+</div>
                <p className="text-gray-700">Years of documented scientific inquiry</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#be3a34] mb-2">∞</div>
                <p className="text-gray-700">Possibilities when tradition meets innovation</p>
              </div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              Our approach isn't about blind reverence or rigid rejection. It's about <span className="italic font-semibold">pramāṇa</span>—valid means of knowledge. We test hypotheses, compare methodologies, and ask uncomfortable questions. Sometimes ancient wisdom holds up brilliantly. Sometimes it doesn't. Both outcomes teach us something valuable.
            </p>
          </div>
        </section>

        {/* Wisdom Banner */}
        <section className="bg-[#4a1d1d] py-24 text-white relative">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.5' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.6'/%3E%3C/svg%3E")`
          }}></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <blockquote className="text-3xl md:text-4xl font-serif italic max-w-4xl mx-auto mb-6">
              "यथा दीपो निवातस्थो नेङ्गते सोपमा स्मृता।<br/>योगिनो यतचित्तस्य युञ्जतो योगमात्मनः॥"
            </blockquote>
            <p className="text-xl mt-4 opacity-90">
              As a lamp in a windless place does not flicker, so does the disciplined mind of a seeker remain steady in the pursuit of knowledge.
            </p>
            <p className="text-sm mt-2 opacity-75">— Bhagavad Gītā 6.19 (adapted)</p>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="py-20 bg-[#f5ebe0] relative">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`
          }}></div>
          <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <h2 className="text-3xl font-bold mb-8 text-[#4a1d1d] text-center">Why SNS?</h2>
            <div className="space-y-6">
              <div className="flex gap-4 bg-[#fdfbf7] p-6 rounded-lg shadow-sm border border-[#d4a574]/20">
                <div className="text-3xl">🔬</div>
                <div>
                  <h4 className="font-bold text-lg text-[#4a1d1d] mb-2">Evidence Over Ideology</h4>
                  <p className="text-gray-700">We follow the data, whether it confirms or challenges traditional claims. Science demands skepticism—even of cherished beliefs.</p>
                </div>
              </div>
              <div className="flex gap-4 bg-[#fdfbf7] p-6 rounded-lg shadow-sm border border-[#d4a574]/20">
                <div className="text-3xl">🌉</div>
                <div>
                  <h4 className="font-bold text-lg text-[#4a1d1d] mb-2">Building Bridges</h4>
                  <p className="text-gray-700">We translate between worlds—making Sanskrit texts accessible and showing how ancient insights connect with modern research.</p>
                </div>
              </div>
              <div className="flex gap-4 bg-[#fdfbf7] p-6 rounded-lg shadow-sm border border-[#d4a574]/20">
                <div className="text-3xl">🎓</div>
                <div>
                  <h4 className="font-bold text-lg text-[#4a1d1d] mb-2">Learning by Doing</h4>
                  <p className="text-gray-700">Workshops on <span className="italic">Vedic Mathematics</span>, astronomy observation sessions, <span className="italic">prāṇāyāma</span> labs—we don't just read about it, we experience it.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join CTA */}
        
      </main>

      <Footer />
    </div>
  );
};

export default Science;