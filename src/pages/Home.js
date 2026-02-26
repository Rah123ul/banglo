import React from 'react';
import { Link } from 'react-router-dom';
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
            <a
              href="#founder-note"
              className="mt-8 inline-block bg-[#e07a5f] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#d46a50] transition-colors"
            >
              A Welcome from Our Founder
            </a>
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
        src="https://nitc.ac.in/imgserver/uploads/compressed/pcm__7885e065-abe8-43bf-9323-8e22e8733d9d_0.png"
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
        <section id="mission" className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-12 text-[#4a1d1d]">Our Three Foundations</h2>
            <div className="grid md:grid-cols-3 gap-12">
              {/* Pillar 1: Research */}
              <div
  className="flex flex-col items-center p-8 rounded-xl shadow-lg 
             bg-cover bg-center relative overflow-hidden text-center"
  style={{
    backgroundImage:
      'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfvmRHR2tqztfqQ1mrY89Z0dPlUpR4iw9h9Q&s")',
  }}
>
  {/* Very Soft Blur Overlay */}
  <div className="absolute inset-0 backdrop-blur-[1px] bg-white/60 rounded-xl"></div>

  {/* Content Layer */}
  <div className="relative z-10 flex flex-col items-center">
    
    <div className="bg-[#f2cc8f] p-6 rounded-full mb-4 text-[#be3a34] shadow-md">
      🔬
    </div>

    <h3 className="text-2xl font-bold mb-2 text-[#4a1d1d] drop-shadow-sm">
      Rigorous Research
    </h3>

    <p className="text-gray-800 font-medium">
      Investigating traditional disciplines like Mathematics and Ayurveda 
      through the lens of modern scientific validation.
    </p>

  </div>
</div>


              {/* Pillar 2: Culture */}
             
              <div
  className="flex flex-col items-center p-8 rounded-xl shadow-lg 
             bg-cover bg-center relative overflow-hidden text-center"
  style={{
    backgroundImage:
      'url("https://media-prod.ii.co.uk/s3fs-public/2020-01/sustainabiity%20ethis.jpg")',
  }}
>
  {/* Very Soft Blur Overlay */}
  <div className="absolute inset-0 backdrop-blur-[1px] bg-white/60 rounded-xl"></div>

  {/* Content Layer */}
  <div className="relative z-10 flex flex-col items-center">
    
    <div className="bg-[#f2cc8f] p-6 rounded-full mb-4 text-[#be3a34] shadow-md">
      🔬
    </div>

    <h3 className="text-2xl font-bold mb-2 text-[#4a1d1d] drop-shadow-sm">
     Ethical Growth
    </h3>

    <p className="text-gray-800 font-medium ">
     Nurturing holistic development by integrating Indian values and ethics into technical and management education.
    </p>

  </div>
</div>




{/* Pillar 3: Character */}
             
              <div
  className="flex flex-col items-center p-8 rounded-xl shadow-lg 
             bg-cover bg-center relative overflow-hidden text-center"
  style={{
    backgroundImage:
      'url("https://www.rnbglobal.edu.in/assets/images/iks/banner.png")',
  }}
>
  {/* Very Soft Blur Overlay */}
  <div className="absolute inset-0 backdrop-blur-[1px] bg-white/60 rounded-xl"></div>

  {/* Content Layer */}
  <div className="relative z-10 flex flex-col items-center">
    
    <div className="bg-[#f2cc8f] p-6 rounded-full mb-4 text-[#be3a34] shadow-md">
      🔬
    </div>

    <h3 className="text-2xl font-bold mb-2 text-[#4a1d1d] drop-shadow-sm">
      Rigorous Research
    </h3>

    <p className="text-gray-800 font-medium">
     Preserving and promoting the rich heritage of Indian Knowledge Systems (IKS) as per NEP 2020 guidelines.
    </p>

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
