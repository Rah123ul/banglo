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
        <section className="hero-bg-science py-20 relative">
          <div className="absolute inset-0 bg-[#f4e4c1] opacity-30"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-semibold text-[#4a1d1d] mb-4">
              Vigyan: Where Ancient Wisdom Meets Modern Inquiry
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              From the revolutionary concept of <span className="italic font-semibold">Śūnya</span> (zero) to the celestial precision of <span className="italic font-semibold">Jyotiṣa</span>, discover how Indian scholars mapped both the cosmos and consciousness itself.
            </p>
          </div>
        </section>

        {/* Introduction to IKS */}
        <section className="py-16 bg-[#ECE7D1] relative">
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

        {/* Fields of Inquiry - Zig-Zag Layout */}
        <section className="py-24 bg-[#f5ebe0] relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`
          }}></div>
          <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-4xl font-bold mb-4 text-[#4a1d1d] text-center">Our Domains of Discovery</h2>
            <p className="text-center text-gray-600 mb-20 max-w-2xl mx-auto">
              Each field represents centuries of observation, experimentation, and philosophical inquiry—all waiting to be explored through both traditional and contemporary lenses.
            </p>

            {/* Zig-Zag Items */}
            {[
              {
                title: 'Gaṇita',
                subtitle: 'The Mathematics of Infinity',
                emoji: '०',
                color: '#be3a34',
                bgAccent: '#fde8e4',
                image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80',
                desc: <>When Brahmagupta wrote his <span className="italic font-semibold">Brāhmasphuṭasiddhānta</span> in 628 CE, he wasn't just doing math—he was revolutionizing how humanity thinks about numbers. His rules for zero and negative numbers would eventually transform global commerce and scientific calculation.</>,
                sub: <>We explore: How did algebraic thinking emerge from Sanskrit grammatical traditions? Why did Indian mathematicians see infinity as a number? What can <span className="italic">Vedic Mathematics</span> teach us about computational thinking?</>,
              },
              {
                title: 'Jyotiṣa',
                subtitle: 'The Science of Celestial Light',
                emoji: '🌟',
                color: '#4a1d1d',
                bgAccent: '#f2e6d9',
                image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&q=80',
                desc: <>Āryabhaṭa proposed Earth's rotation in 499 CE—a thousand years before Copernicus. His <span className="italic">Āryabhaṭīya</span> calculated the solar year to 365.25858 days, accurate to just 3.5 minutes. How did they achieve such precision without telescopes?</>,
                sub: <>We investigate: Ancient eclipse prediction methods, the mathematics behind planetary motion in <span className="italic">siddhānta</span> texts, and how naked-eye observation led to revolutionary cosmological models.</>,
              },
              {
                title: 'Āyurveda & Yoga',
                subtitle: 'The Science of Life',
                emoji: '🌿',
                color: '#1a4d2e',
                bgAccent: '#e2f0e8',
                image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
                desc: <>Suśruta was performing cataract surgery and plastic reconstruction in 600 BCE. Caraka documented over 2,000 disease classifications. But <span className="italic">Āyurveda</span> was never just about treatment—it was about understanding the fundamental relationship between body, mind, and environment.</>,
                sub: <>We study: The <span className="italic">tridoṣa</span> theory and its parallels with modern systems biology, how <span className="italic">prāṇāyāma</span> affects nervous system regulation, and the pharmacology hidden in traditional formulations.</>,
              },
              {
                title: 'Prakṛti-Vijñāna',
                subtitle: "Understanding Nature's Intelligence",
                emoji: '♻️',
                color: '#2d5016',
                bgAccent: '#e8f0dc',
                image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80',
                desc: <>Ancient Indian texts didn't just describe nature—they prescribed a relationship with it. The concept of <span className="italic font-semibold">ṛta</span> (cosmic order) meant that ecological balance wasn't optional; it was fundamental.</>,
                sub: <>We examine: How traditional water harvesting systems can address modern scarcity, the biodiversity wisdom in <span className="italic">vana</span> management, and climate-responsive architecture principles from <span className="italic">Vāstu Śāstra</span>.</>,
              },
            ].map((item, i) => {
              const isEven = i % 2 === 0; // text-left, image-right for even
              return (
                <div
                  key={i}
                  className="mb-20 last:mb-0"
                  style={{ animation: `fadeSlideUp 0.6s ease-out ${i * 0.15}s both` }}
                >
                  <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}>

                    {/* Text Side */}
                    <div className="w-full md:w-1/2">
                      <h3
                        className="text-3xl md:text-4xl font-bold mb-2 leading-tight"
                        style={{ color: item.color }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-lg md:text-xl italic mb-6 font-medium"
                        style={{ color: item.color, opacity: 0.7 }}
                      >
                        {item.subtitle}
                      </p>
                      <p className="text-gray-800 leading-relaxed text-base md:text-lg mb-4">
                        {item.desc}
                      </p>
                      <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                        {item.sub}
                      </p>
                    </div>

                    {/* Image Side with Decorative Background */}
                    <div className="w-full md:w-1/2 flex justify-center">
                      <div className="relative" style={{ width: '320px', height: '320px' }}>

                        {/* Decorative curved blob behind the circle */}
                        <svg
                          viewBox="0 0 400 400"
                          className="absolute"
                          style={{
                            width: '380px',
                            height: '380px',
                            top: '-30px',
                            left: isEven ? '-30px' : '-30px',
                            zIndex: 0,
                            opacity: 0.35,
                          }}
                        >
                          <path
                            d={isEven
                              ? "M320,50 C380,100 400,200 370,300 C340,380 240,400 160,380 C80,360 20,300 10,200 C0,120 40,40 120,20 C200,0 270,10 320,50Z"
                              : "M80,50 C20,100 0,200 30,300 C60,380 160,400 240,380 C320,360 380,300 390,200 C400,120 360,40 280,20 C200,0 130,10 80,50Z"
                            }
                            fill={item.bgAccent}
                          />
                        </svg>

                        {/* Small decorative dots */}
                        <div
                          className="absolute rounded-full"
                          style={{
                            width: '14px',
                            height: '14px',
                            background: item.color,
                            opacity: 0.15,
                            top: '10px',
                            [isEven ? 'right' : 'left']: '-10px',
                          }}
                        />
                        <div
                          className="absolute rounded-full"
                          style={{
                            width: '8px',
                            height: '8px',
                            background: item.color,
                            opacity: 0.25,
                            bottom: '30px',
                            [isEven ? 'left' : 'right']: '0px',
                          }}
                        />

                        {/* Circle Image */}
                        <div
                          className="relative z-10 rounded-full overflow-hidden shadow-2xl group"
                          style={{
                            width: '280px',
                            height: '280px',
                            margin: '20px auto',
                            border: `5px solid ${item.bgAccent}`,
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>

                        {/* Emoji badge */}
                        <div
                          className="absolute z-20 rounded-full flex items-center justify-center shadow-lg"
                          style={{
                            width: '56px',
                            height: '56px',
                            background: 'white',
                            border: `3px solid ${item.bgAccent}`,
                            bottom: '15px',
                            [isEven ? 'right' : 'left']: '10px',
                          }}
                        >
                          <span className="text-2xl">{item.emoji}</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Divider line between items (not after last) */}
                  {i < 3 && (
                    <div className="mt-16 flex justify-center">
                      <div
                        style={{
                          width: '80px',
                          height: '2px',
                          background: `linear-gradient(90deg, transparent, ${item.color}30, transparent)`,
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Fade-in animation keyframes */}
          <style>{`
            @keyframes fadeSlideUp {
              from { opacity: 0; transform: translateY(40px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </section>

        {/* Deep Dive Section */}
        <section className="py-20 bg-[#F9DFDF] relative">
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
        <section className=" py-24 bg-[#FAEDD2]">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.5' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.6'/%3E%3C/svg%3E")`
          }}></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <blockquote className="text-3xl md:text-4xl font-serif italic max-w-4xl mx-auto mb-6 text-[#4a1d1d]">
              "यथा दीपो निवातस्थो नेङ्गते सोपमा स्मृता।<br/>योगिनो यतचित्तस्य युञ्जतो योगमात्मनः॥"
            </blockquote>
            <p className="text-xl mt-4  text-[#5a3e2b] leading-relaxed ">
              As a lamp in a windless place does not flicker, so does the disciplined mind of a seeker remain steady in the pursuit of knowledge.
            </p>
            <p className="text-sm mt-2 opacity-75">— Bhagavad Gītā 6.19 (adapted)</p>
          </div>
        </section>
        
        {/* Join CTA */}
        
      </main>

      <Footer />
    </div>
  );
};

export default Science;