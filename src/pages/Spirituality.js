import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Spirituality = () => {
  return (
    <div className="spirituality-page scroll-smooth relative">
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
        <section className="hero-bg-spirit py-32 relative">
          <div className="absolute inset-0 bg-[#f4e4c1] opacity-30"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold text-[#4a1d1d] mb-4">
              <span className="italic">Adhyātma</span>: The Inward Journey
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              Exploring consciousness through <span className="italic font-semibold">Yoga</span>, <span className="italic font-semibold">Dhyāna</span>, and the timeless wisdom of the <span className="italic font-semibold">Upaniṣads</span>
            </p>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-20 bg-[#faf6ed] relative">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`
          }}></div>
          <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <h2 className="text-3xl font-bold mb-6 text-[#4a1d1d] text-center">
              The Science of the Self: <span className="italic">Ātma-Vijñāna</span>
            </h2>
            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              Here's the truth that makes some people uncomfortable: spirituality isn't vague mysticism. It's a rigorous technology for understanding consciousness—what Swami Vivekananda called "the science of sciences."
            </p>
            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              Think about it: We have entire departments dedicated to studying matter, energy, and biological systems. But who's systematically studying the observer? The <span className="italic font-semibold">Upaniṣads</span> did this 3,000 years ago. They developed reproducible methods—<span className="italic">Yoga</span>, <span className="italic">Dhyāna</span>, <span className="italic">Prāṇāyāma</span>—for investigating subjective experience with the same rigor physicists bring to particle colliders.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed">
              At SNS, we treat spirituality as <span className="italic font-semibold">Inner Engineering</span>. Not feel-good platitudes, but practical techniques for mental resilience, emotional intelligence, and what the ancients called <span className="italic">viveka</span>—discriminative wisdom. If you can debug code, you can debug your mind. Same principles: observation, hypothesis, testing, refinement.
            </p>
          </div>
        </section>

        {/* Paths of Exploration - Creative Layouts */}
        <section className="py-24 bg-[#f5ebe0] relative">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`
          }}></div>
          <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-4xl font-bold mb-4 text-[#4a1d1d] text-center">
              Four Paths of <span className="italic">Sādhana</span>
            </h2>
            <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
              Different approaches for different temperaments—because one size never fits all when it comes to inner work.
            </p>

            {/* Path 1: Yoga & Meditation - Full Width Banner */}
            <div className="mb-10 relative h-[400px] rounded-2xl overflow-hidden shadow-2xl group">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80")',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a2f23]/95 via-[#1a2f23]/80 to-transparent"></div>
              <div className="absolute inset-0 opacity-15" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper-texture'%3E%3CfeTurbulence baseFrequency='0.04' numOctaves='5' seed='1'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23paper-texture)' fill='%23c19a6b'/%3E%3C/svg%3E")`
              }}></div>
              <div className="relative h-full flex items-center px-12">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="bg-[#f2cc8f] p-6 rounded-full shadow-2xl">
                      <span className="text-5xl">🧘</span>
                    </div>
                    <div>
                      <h3 className="text-4xl font-bold text-white mb-1">
                        <span className="italic">Yoga</span> & <span className="italic">Dhyāna</span>
                      </h3>
                      <p className="text-xl text-[#f2cc8f]">Body and Mind as Laboratory</p>
                    </div>
                  </div>
                  <p className="text-white/90 leading-relaxed text-lg mb-3">
                    Not the Instagram version. We're talking about <span className="italic">Aṣṭāṅga Yoga</span>—the eight-limbed path that includes <span className="italic">āsana</span> (postures), <span className="italic">prāṇāyāma</span> (breath regulation), and <span className="italic">dhāraṇā</span> (concentration). Each technique is a controlled experiment in neuroplasticity.
                  </p>
                  <p className="text-white/75 leading-relaxed italic">
                    We measure heart rate variability during <span className="italic">prāṇāyāma</span>. We track attention metrics in meditation. This isn't faith—it's data.
                  </p>
                </div>
              </div>
            </div>

            {/* Paths 2 & 3: Side by Side */}
            <div className="grid md:grid-cols-2 gap-10 mb-10">
              {/* Path 2: Indian Ethos */}
              <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-2xl group">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1516450137517-162bfbeb8dba?w=800&q=80")',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4a1d1d]/95 via-[#4a1d1d]/75 to-[#4a1d1d]/40"></div>
                <div className="absolute inset-0 opacity-15" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper-texture'%3E%3CfeTurbulence baseFrequency='0.04' numOctaves='5' seed='2'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23paper-texture)' fill='%23c19a6b'/%3E%3C/svg%3E")`
                }}></div>
                <div className="relative h-full flex flex-col justify-end p-8">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="bg-[#f2cc8f] p-5 rounded-full shadow-2xl">
                      <span className="text-4xl">📜</span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">
                        Bhāratīya <span className="italic">Nīti</span>
                      </h3>
                      <p className="text-lg text-[#f2cc8f]">Ethics for the Real World</p>
                    </div>
                  </div>
                  <p className="text-white/90 leading-relaxed mb-3 text-lg">
                    Indian philosophical traditions offer frameworks for ethical decision-making that Western business schools are only now discovering: <span className="italic">dharma</span> (contextual duty), <span className="italic">karma</span> (action with awareness), stakeholder thinking long before "ESG" was invented.
                  </p>
                  <p className="text-white/75 leading-relaxed text-sm">
                    How do you lead with integrity when quarterly targets conflict with long-term sustainability? The <span className="italic">Bhagavad Gītā</span> tackled this 2,500 years ago. We apply it to modern management dilemmas.
                  </p>
                </div>
              </div>

              {/* Path 3: Vedanta */}
              <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-2xl group">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1614630982169-7b0d68a8a45a?w=800&q=80")',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d1b4e]/95 via-[#2d1b4e]/75 to-[#2d1b4e]/40"></div>
                <div className="absolute inset-0 opacity-15" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper-texture'%3E%3CfeTurbulence baseFrequency='0.04' numOctaves='5' seed='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23paper-texture)' fill='%23c19a6b'/%3E%3C/svg%3E")`
                }}></div>
                <div className="relative h-full flex flex-col justify-end p-8">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="bg-[#f2cc8f] p-5 rounded-full shadow-2xl">
                      <span className="text-4xl">🕉️</span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">
                        <span className="italic">Vedānta</span>
                      </h3>
                      <p className="text-lg text-[#f2cc8f]">The Philosophy of Consciousness</p>
                    </div>
                  </div>
                  <p className="text-white/90 leading-relaxed mb-3 text-lg">
                    <span className="italic">Advaita Vedānta</span> (non-dualism) proposes something radical: consciousness isn't produced by the brain—it's fundamental. You're not a body with a soul; you're awareness temporarily identified with a body-mind complex.
                  </p>
                  <p className="text-white/75 leading-relaxed text-sm">
                    Sounds mystical? Quantum physicists are saying similar things about the observer effect. We explore both perspectives—contemplative and scientific—in dialogue.
                  </p>
                </div>
              </div>
            </div>

            {/* Path 4: Service - Diagonal Layout */}
            <div className="relative h-[430px] rounded-2xl overflow-hidden shadow-2xl group">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=80")',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#8b4513]/95 via-[#8b4513]/80 to-transparent"></div>
              <div className="absolute inset-0 opacity-15" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper-texture'%3E%3CfeTurbulence baseFrequency='0.04' numOctaves='5' seed='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23paper-texture)' fill='%23c19a6b'/%3E%3C/svg%3E")`
              }}></div>
              <div className="relative h-full flex items-center">
                <div className="w-full md:w-2/3 px-12">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="bg-[#f2cc8f] p-6 rounded-full shadow-2xl">
                      <span className="text-5xl">🤝</span>
                    </div>
                    <div>
                      <h3 className="text-4xl font-bold text-white mb-1">
                        <span className="italic">Sevā</span> — Service as Practice
                      </h3>
                      <p className="text-xl text-[#f2cc8f]">Compassion in Action</p>
                    </div>
                  </div>
                  <p className="text-white/90 leading-relaxed text-lg mb-4">
                    Vivekananda said it plainly: "Service to humanity is service to God." Not as moral obligation, but as recognition that individual and collective wellbeing are inseparable. When you help someone else level up, you level up.
                  </p>
                  <p className="text-white/75 leading-relaxed italic">
                    We organize community service not as charity, but as <span className="italic">karma yoga</span>—selfless action that transforms both server and served. It's ego dissolution through practical work.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Actually Practice */}
        <section className="py-20 bg-white relative">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-4xl font-bold mb-12 text-[#4a1d1d] text-center">
              From Theory to <span className="italic">Anubhava</span> (Experience)
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#fdfbf7] p-8 rounded-xl shadow-lg border border-[#d4a574]/30">
                <h4 className="text-2xl font-bold text-[#4a1d1d] mb-3">🧘 Weekly Meditation Circles</h4>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Guided <span className="italic">dhyāna</span> sessions using techniques from <span className="italic">Vipassanā</span>, <span className="italic">Yoga Nidrā</span>, and breath awareness. We start beginners with 5 minutes and work up. No incense required.
                </p>
                <p className="text-sm text-gray-600 italic">
                  Attendance is tracked. Consistency beats intensity.
                </p>
              </div>

              <div className="bg-[#fdfbf7] p-8 rounded-xl shadow-lg border border-[#d4a574]/30">
                <h4 className="text-2xl font-bold text-[#4a1d1d] mb-3">📖 <span className="italic">Upaniṣad</span> Study Groups</h4>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Close reading of texts like <span className="italic">Kaṭha Upaniṣad</span> and <span className="italic">Māṇḍūkya Upaniṣad</span>. We translate from Sanskrit, debate interpretations, and connect ancient concepts to neuroscience and philosophy of mind.
                </p>
                <p className="text-sm text-gray-600 italic">
                  Scholarly and accessible. Bring questions, not reverence.
                </p>
              </div>

              <div className="bg-[#fdfbf7] p-8 rounded-xl shadow-lg border border-[#d4a574]/30">
                <h4 className="text-2xl font-bold text-[#4a1d1d] mb-3">🎤 Vivekananda Study Circle</h4>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Monthly discussions on Swami Vivekananda's lectures—particularly his Chicago addresses and commentaries on <span className="italic">Rāja Yoga</span>. His synthesis of Eastern wisdom and Western pragmatism remains strikingly relevant.
                </p>
                <p className="text-sm text-gray-600 italic">
                  "Practical Vedanta" for the 21st century.
                </p>
              </div>

              <div className="bg-[#fdfbf7] p-8 rounded-xl shadow-lg border border-[#d4a574]/30">
                <h4 className="text-2xl font-bold text-[#4a1d1d] mb-3">🌄 <span className="italic">Sevā</span> Initiatives</h4>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Community teaching programs, environmental cleanup drives, elderly care visits. Not to feel good about ourselves, but to practice <span className="italic">niṣkāma karma</span>—action without attachment to results.
                </p>
                <p className="text-sm text-gray-600 italic">
                  Your spiritual practice should make you more useful, not more aloof.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Motivational Banner */}
        <section className="bg-[#be3a34] py-24 text-white relative">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.5' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.6'/%3E%3C/svg%3E")`
          }}></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <blockquote className="text-3xl md:text-5xl font-bold max-w-4xl mx-auto mb-6 leading-tight">
              "उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत।"<br/>
              <span className="text-2xl md:text-3xl mt-4 block opacity-90">
                Arise! Awake! And stop not till the goal is reached.
              </span>
            </blockquote>
            <cite className="text-xl opacity-80 block mt-4">
              — <span className="italic">Kaṭha Upaniṣad</span> 1.3.14 (popularized by Swami Vivekananda)
            </cite>
          </div>
        </section>

        {/* Join CTA */}
        
      </main>

      <Footer />
    </div>
  );
};

export default Spirituality;