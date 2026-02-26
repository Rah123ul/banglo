import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Overview = () => {
  const principles = [
    {
      icon: (
        <svg className="w-12 h-12 text-[#e07a5f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
      title: 'Indian Knowledge Systems',
      description: 'We focus on the preservation and promotion of traditional Indian disciplines like Mathematics, Astronomy, and Ayurveda, as per the National Education Policy (NEP) 2020.'
    },
    {
      icon: (
        <svg className="w-12 h-12 text-[#e07a5f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      ),
      title: 'Interdisciplinary Synthesis',
      description: 'Bridging ancient wisdom with modern scientific inquiry to nurture a holistic understanding of our world and human experience.'
    },
    {
      icon: (
        <svg className="w-12 h-12 text-[#e07a5f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
      title: 'Values & Ethics',
      description: 'Promoting Indian ethos and values in management and lifestyle, ensuring technical excellence is balanced with moral character.'
    },
    {
      icon: (
        <svg className="w-12 h-12 text-[#e07a5f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      title: 'Community Building',
      description: 'Collaborating with groups like the Vivekananda Study Circle to foster a supportive community of seekers and service-oriented students.'
    }
  ];

  return (
    <div className="overview-page scroll-smooth">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="hero-bg-overview py-32">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-[#3d405b] mb-4">
              Centre for Indian Knowledge Systems
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              Home of the Science & Spirituality Club (SNS) at NIT Calicut.
            </p>
          </div>
        </section>

        {/* The Genesis of the Club */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-10">Our Roots & Mission</h2>
            <div className="text-lg text-gray-800 leading-relaxed space-y-6 text-left">
              <p>
                The <strong>Science and Spirituality Club (SNS Club)</strong> at NIT Calicut operates under the <strong>Centre for Indian Knowledge Systems (CIKS)</strong>. Established in line with the National Education Policy 2020, CIKS serves as a bridge between the profound wisdom of traditional Indian disciplines and the rigorous inquiry of modern science.
              </p>
              <p>
                Our mission is to foster a holistic educational environment. We provide students with opportunities to explore areas such as Basic Sanskrit, Indian Ethics in Management, and the scientific underpinnings of traditional lifestyles. By integrating these systems, we aim to produce technically proficient individuals with a deep sense of cultural grounding and ethical responsibility.
              </p>
              <p>
                From Gita Jayanti celebrations to workshops on the Mahabharata’s relevance in business, the SNS Club is a vibrant space for dialogue, discovery, and the synthesis of different ways of knowing.
              </p>
            </div>
          </div>
        </section>

        {/* Our Core Philosophy */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-12">Our Core Principles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
              {principles.map((principle, index) => (
                <div key={index} className="flex flex-col items-center bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#f2cc8f]/30 p-5 rounded-full mb-4 text-[#be3a34]">
                    {principle.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#4a1d1d]">{principle.title}</h3>
                  <p className="text-gray-600 text-sm">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-4xl font-bold text-center mb-16">Leadership & Guidance</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="text-center">
                <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden">
                  <img src="https://placehold.co/400x400/3d405b/ffffff?text=Dr.+Sanjeev" alt="Dr. Sanjeev Kumar Manjhi" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-[#4a1d1d]">Dr. Sanjeev Kumar Manjhi</h3>
                <p className="text-[#be3a34] font-medium">Faculty Coordinator, SNS Club</p>
                <p className="text-gray-600 text-sm mt-4">
                  Dr. Manjhi has been instrumental in establishing the club and guiding its activities toward a meaningful synthesis of science and spirituality.
                </p>
              </div>
              <div className="text-center">
                <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden">
                  <img src="https://placehold.co/400x400/4a1d1d/ffffff?text=Dr.+Sridharan" alt="Dr. R. Sridharan" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-[#4a1d1d]">Dr. R. Sridharan</h3>
                <p className="text-[#be3a34] font-medium">Chairperson, CIKS</p>
                <p className="text-gray-600 text-sm mt-4">
                  A Professor in Mechanical Engineering, Dr. Sridharan also chairs the Vivekananda Study Circle, fostering a culture of holistic growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Join Us CTA */}
        <section id="join" className="py-24 bg-[#3d405b]">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Start Your Journey of Inquiry</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Join a community that values both the experimental and the experiential. Broaden your outlook and discover the richness of our shared heritage.
            </p>
            <Link
              to="/events"
              className="inline-block bg-[#81b29a] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#6a9e87] transition-colors"
            >
              Explore Our Events
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Overview;
