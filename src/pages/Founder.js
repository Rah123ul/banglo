import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';


// yaah const home lagane ka matalb hai ki yaah par header end ho chuka hai 
const Home = () => {
  return (
    <div className="home-page scroll-smooth">
      <Header />

      {/* yaah main content hai  */}
      <main>
        {/* Hero Section */}
        <section className="hero-bg py-10" >
          <div className="container mx-auto px-6 py-12 text-center bg-[#f4e1d2]/50 rounded-lg shadow-lg">
            <h1 className="text-5xl md:text-7xl font-bold text-[#4a1d1d] mb-4">
              Timeless Wisdom.
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              Synthesizing ancient Indian knowledge with modern scientific inquiry at NIT Calicut.
            </p>
            <button
              onClick={() => document.getElementById('founder-note').scrollIntoView({ behavior: 'smooth' })}
              className="mt-8 inline-block bg-[#e07a5f] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#d46a50] transition-colors"
            >
              A Welcome from Our Founder
            </button>
          </div>
        </section>

        {/* Founder's Note Section */}
        <section
          id="founder-note"
          className="py-24 bg-cover bg-center relative"
          style={{
            backgroundImage:
              'url("https://img.pikbest.com/wp/202344/parchment-paper-vintage-horizontal-banner-texture-aged-wallpaper_9903141.jpg!sw800")',
          }}
        >
          {/* Optional overlay for better readability */}
          <div className="absolute inset-0 bg-white/70"></div>

          <div className="relative container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">

            {/* Left Side - Image & Title */}
            <div className="w-full md:w-1/3 text-center">
              <img
                src={process.env.PUBLIC_URL + "/founder.png"}
                alt="Founder of SNS Club"
                className="rounded-full w-48 h-48 mx-auto shadow-xl border-4 border-amber-900"
              />
              <h3 className="text-2xl mt-4 font-serif text-amber-900">
                A Message From My Heart to Yours
              </h3>
              <p className="text-gray-700 mt-1 italic">
                - Dr. R. Sridharan, Founder
              </p>
            </div>

            {/* Right Side - Message */}
            <div className="w-full md:w-2/3">
              <div className="pl-6 border-l-4 border-amber-800">
                <p className="text-lg text-gray-900 leading-relaxed font-serif">
                  "I started the SNS Club not as an institution, but as a family. For
                  years, I felt a deep connection to both the elegant truths of science
                  and the profound wisdom of spiritual traditions. I saw friends and
                  colleagues believe they had to choose one path over the other, and it
                  felt like a false choice. Why must the quantifiable exclude the
                  ineffable? Why must faith be blind to fact?
                  <br /><br />
                  This club is my answer. It's a haven for the curious, a safe space for
                  dialogue between the rational mind and the searching soul. My vision
                  is simple: to build a community that explores the cosmos with the
                  rigor of a scientist and the wonder of a mystic. I'm so glad you've
                  found your way here. Welcome home."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section id="mission" className="py-20  bg-[#F5F6E1]">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-12 text-[#4a1d1d]">Our Three Foundations</h2>
            <div className="grid md:grid-cols-3 gap-12">


              {/* Pillar 1: Research */}
              <div style={{
                background: '#fff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(74,29,29,.1), 0 2px 8px rgba(74,29,29,.06)',
                border: '1px solid rgba(201,168,76,.15)',
                position: 'relative',
              }}>

                {/* Top accent line */}
                <div style={{ height: '3px', background: 'linear-gradient(90deg, #4e1010, #c9a84c, #e8d49a)' }} />

                {/* Background image strip */}
                <div style={{ height: '140px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfvmRHR2tqztfqQ1mrY89Z0dPlUpR4iw9h9Q&s"
                    alt="Rigorous Research"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.45) saturate(.6)' }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, transparent 20%, rgba(20,5,5,.75) 100%)',
                  }} />
                  {/* Number label on image */}
                  <span style={{
                    position: 'absolute', top: '12px', right: '16px',
                    fontFamily: "'Cinzel', serif",
                    fontSize: '.6rem', letterSpacing: '.3em',
                    color: 'rgba(232,212,154,.55)', textTransform: 'uppercase',
                  }}>01</span>
                </div>

                {/* Card body — icon left, text right */}
                <div style={{ padding: '1.6rem 1.6rem 1.8rem', display: 'flex', gap: '1.4rem', alignItems: 'flex-start' }}>

                  {/* Badge — left aligned, shifted up to overlap image */}
                  <div style={{ flexShrink: 0, marginTop: '-3.2rem', position: 'relative', zIndex: 4 }}>
                    <div style={{
                      position: 'relative',
                      width: '72px', height: '72px', borderRadius: '50%',
                      background: 'conic-gradient(from 0deg, #4e1010, #7c1d1d 30%, #c9a84c 55%, #e8d49a 70%, #c9a84c 80%, #4e1010 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 4px 20px rgba(201,168,76,.35), 0 0 0 3px #fff',
                    }}>
                      {/* Outer orbit ring */}
                      <div style={{
                        position: 'absolute', inset: '-10px', borderRadius: '50%',
                        border: '1px dashed rgba(201,168,76,.35)',
                      }}>
                        <div style={{
                          position: 'absolute', top: '2px', left: '50%', transform: 'translateX(-50%)',
                          width: '5px', height: '5px', borderRadius: '50%',
                          background: '#c9a84c', boxShadow: '0 0 5px 2px rgba(201,168,76,.5)',
                        }} />
                      </div>
                      {/* Inner orbit ring */}
                      <div style={{
                        position: 'absolute', inset: '-3px', borderRadius: '50%',
                        border: '1px solid rgba(190,58,52,.3)',
                      }}>
                        <div style={{
                          position: 'absolute', bottom: '1px', left: '50%', transform: 'translateX(-50%)',
                          width: '4px', height: '4px', borderRadius: '50%',
                          background: '#be3a34', boxShadow: '0 0 4px 1px rgba(190,58,52,.5)',
                        }} />
                      </div>
                      {/* Core */}
                      <div style={{
                        width: '56px', height: '56px', borderRadius: '50%',
                        background: 'radial-gradient(circle at 35% 35%, #2a0808, #0e0202)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        position: 'relative', zIndex: 2,
                      }}>
                        <span style={{ fontSize: '1.45rem', lineHeight: 1, filter: 'drop-shadow(0 2px 5px rgba(201,168,76,.65))' }}>
                          🔬
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Text — right of badge */}
                  <div style={{ flex: 1, paddingTop: '.2rem' }}>
                    <h3 style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.35rem', fontWeight: 600,
                      color: '#4a1d1d', lineHeight: 1.2,
                      margin: '0 0 .5rem',
                    }}>
                      Rigorous Research
                    </h3>
                    {/* Accent line */}
                    <div style={{ width: '28px', height: '2px', background: '#c9a84c', opacity: .6, marginBottom: '.65rem', borderRadius: '2px' }} />

                    <p className="text-gray-800 font-medium">
                      Investigating traditional disciplines like Mathematics and Ayurveda through the lens of modern scientific validation.
                    </p>

                  </div>

                </div>
              </div>


              {/* second pillar hai */}

              <div style={{
                background: '#fff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(10,46,26,.1), 0 2px 8px rgba(10,46,26,.06)',
                border: '1px solid rgba(76,175,122,.15)',
                position: 'relative',
              }}>

                {/* Top accent line */}
                <div style={{ height: '3px', background: 'linear-gradient(90deg, #0a2e1a, #4caf7a, #a8e6c1)' }} />

                {/* Background image strip */}
                <div style={{ height: '140px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src="https://media-prod.ii.co.uk/s3fs-public/2020-01/sustainabiity%20ethis.jpg"
                    alt="Ethical Growth"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.45) saturate(.6)' }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, transparent 20%, rgba(4,14,8,.75) 100%)',
                  }} />
                  {/* Number label on image */}
                  <span style={{
                    position: 'absolute', top: '12px', right: '16px',
                    fontFamily: "'Cinzel', serif",
                    fontSize: '.6rem', letterSpacing: '.3em',
                    color: 'rgba(168,230,193,.55)', textTransform: 'uppercase',
                  }}>02</span>
                </div>

                {/* Card body — icon left, text right */}
                <div style={{ padding: '1.6rem 1.6rem 1.8rem', display: 'flex', gap: '1.4rem', alignItems: 'flex-start' }}>

                  {/* Badge — left aligned, shifted up to overlap image */}
                  <div style={{ flexShrink: 0, marginTop: '-3.2rem', position: 'relative', zIndex: 4 }}>
                    <div style={{
                      position: 'relative',
                      width: '72px', height: '72px', borderRadius: '50%',
                      background: 'conic-gradient(from 0deg, #0a2e1a, #1a5c32 30%, #4caf7a 55%, #a8e6c1 70%, #4caf7a 80%, #0a2e1a 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 4px 20px rgba(76,175,122,.35), 0 0 0 3px #fff',
                    }}>
                      {/* Outer orbit ring */}
                      <div style={{
                        position: 'absolute', inset: '-10px', borderRadius: '50%',
                        border: '1px dashed rgba(76,175,122,.35)',
                      }}>
                        <div style={{
                          position: 'absolute', top: '2px', left: '50%', transform: 'translateX(-50%)',
                          width: '5px', height: '5px', borderRadius: '50%',
                          background: '#4caf7a', boxShadow: '0 0 5px 2px rgba(76,175,122,.5)',
                        }} />
                      </div>
                      {/* Inner orbit ring */}
                      <div style={{
                        position: 'absolute', inset: '-3px', borderRadius: '50%',
                        border: '1px solid rgba(26,92,50,.4)',
                      }}>
                        <div style={{
                          position: 'absolute', bottom: '1px', left: '50%', transform: 'translateX(-50%)',
                          width: '4px', height: '4px', borderRadius: '50%',
                          background: '#1a5c32', boxShadow: '0 0 4px 1px rgba(26,92,50,.5)',
                        }} />
                      </div>
                      {/* Core */}
                      <div style={{
                        width: '56px', height: '56px', borderRadius: '50%',
                        background: 'radial-gradient(circle at 35% 35%, #0d3320, #040e08)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        position: 'relative', zIndex: 2,
                      }}>
                        <span style={{ fontSize: '1.45rem', lineHeight: 1, filter: 'drop-shadow(0 2px 5px rgba(76,175,122,.65))' }}>
                          🌿
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Text — right of badge */}
                  <div style={{ flex: 1, paddingTop: '.2rem' }}>
                    <h3 style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.35rem', fontWeight: 600,
                      color: '#1a3d25', lineHeight: 1.2,
                      margin: '0 0 .5rem',
                    }}>
                      Ethical Growth
                    </h3>
                    {/* Accent line */}
                    <div style={{ width: '28px', height: '2px', background: '#4caf7a', opacity: .6, marginBottom: '.65rem', borderRadius: '2px' }} />
                    <p className="text-gray-800 font-medium">
                      Nurturing holistic development by integrating Indian values and ethics into technical and management education.
                    </p>
                  </div>

                </div>
              </div>




              {/* Pillar 3: Character */}

              <div style={{
                background: '#fff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(10,14,46,.1), 0 2px 8px rgba(10,14,46,.06)',
                border: '1px solid rgba(76,108,207,.15)',
                position: 'relative',
              }}>

                {/* Top accent line */}
                <div style={{ height: '3px', background: 'linear-gradient(90deg, #0a0e2e, #4c6ccf, #a8b8f5)' }} />

                {/* Background image strip */}
                <div style={{ height: '140px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src="https://www.rnbglobal.edu.in/assets/images/iks/banner.png"
                    alt="Harmonious Innovation"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.45) saturate(.6)' }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, transparent 20%, rgba(4,4,20,.75) 100%)',
                  }} />
                  {/* Number label on image */}
                  <span style={{
                    position: 'absolute', top: '12px', right: '16px',
                    fontFamily: "'Cinzel', serif",
                    fontSize: '.6rem', letterSpacing: '.3em',
                    color: 'rgba(168,184,245,.55)', textTransform: 'uppercase',
                  }}>03</span>
                </div>

                {/* Card body — icon left, text right */}
                <div style={{ padding: '1.6rem 1.6rem 1.8rem', display: 'flex', gap: '1.4rem', alignItems: 'flex-start' }}>

                  {/* Badge — left aligned, shifted up to overlap image */}
                  <div style={{ flexShrink: 0, marginTop: '-3.2rem', position: 'relative', zIndex: 4 }}>
                    <div style={{
                      position: 'relative',
                      width: '72px', height: '72px', borderRadius: '50%',
                      background: 'conic-gradient(from 0deg, #0a0e2e, #1a2060 30%, #4c6ccf 55%, #a8b8f5 70%, #4c6ccf 80%, #0a0e2e 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 4px 20px rgba(76,108,207,.35), 0 0 0 3px #fff',
                    }}>
                      {/* Outer orbit ring */}
                      <div style={{
                        position: 'absolute', inset: '-10px', borderRadius: '50%',
                        border: '1px dashed rgba(76,108,207,.35)',
                      }}>
                        <div style={{
                          position: 'absolute', top: '2px', left: '50%', transform: 'translateX(-50%)',
                          width: '5px', height: '5px', borderRadius: '50%',
                          background: '#4c6ccf', boxShadow: '0 0 5px 2px rgba(76,108,207,.5)',
                        }} />
                      </div>
                      {/* Inner orbit ring */}
                      <div style={{
                        position: 'absolute', inset: '-3px', borderRadius: '50%',
                        border: '1px solid rgba(26,32,96,.4)',
                      }}>
                        <div style={{
                          position: 'absolute', bottom: '1px', left: '50%', transform: 'translateX(-50%)',
                          width: '4px', height: '4px', borderRadius: '50%',
                          background: '#1a2060', boxShadow: '0 0 4px 1px rgba(26,32,96,.5)',
                        }} />
                      </div>
                      {/* Core */}
                      <div style={{
                        width: '56px', height: '56px', borderRadius: '50%',
                        background: 'radial-gradient(circle at 35% 35%, #0d1233, #04040e)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        position: 'relative', zIndex: 2,
                      }}>
                        <span style={{ fontSize: '1.45rem', lineHeight: 1, filter: 'drop-shadow(0 2px 5px rgba(76,108,207,.65))' }}>
                          🔮
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Text — right of badge */}
                  <div style={{ flex: 1, paddingTop: '.2rem' }}>
                    <h3 style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.35rem', fontWeight: 600,
                      color: '#0d1a4a', lineHeight: 1.2,
                      margin: '0 0 .5rem',
                    }}>
                      Harmonious Innovation
                    </h3>
                    {/* Accent line */}
                    <div style={{ width: '28px', height: '2px', background: '#4c6ccf', opacity: .6, marginBottom: '.65rem', borderRadius: '2px' }} />
                    <p className="text-gray-800 font-medium">
                      Fostering creative solutions by merging scientific inquiry with spiritual insights, empowering students to develop technologies that promote human well-being and sustainability.
                    </p>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </section>



        {/* Join Us CTA */}

      </main>

      <Footer />
    </div >
  );
};

export default Home;
