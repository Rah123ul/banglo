import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Events = () => {
  const upcomingEvents = [
    {
      month: 'JUL',
      day: '18',
      time: 'Friday-Saturday',
      title: 'International Conference on Bhartiya Traditional Knowledge System',
      location: 'NIT Calicut Campus',
      description: 'The second international conference focusing on the integration of traditional Indian knowledge with modern scholarly research. Featuring global experts and academic discussions.',
      color: 'bg-[#4a1d1d]'
    },
    {
      month: 'SEP',
      day: '20',
      time: 'Saturday, 10:00 AM',
      title: 'Sanskrit Orientation Programme',
      location: 'MED Seminar Hall, Main Building',
      description: 'An introductory session on the importance of Sanskrit in Indian Knowledge Systems and its relevance in modern scientific terminology.',
      color: 'bg-[#be3a34]'
    },
    {
      month: 'JAN',
      day: '12',
      time: 'Sunday, 9:00 AM',
      title: 'National Youth Day Celebrations',
      location: 'Bhaskara Hall, NIT Calicut',
      description: 'Commemorating the birth anniversary of Swami Vivekananda with lectures on his contributions to Indian science and philosophy.',
      color: 'bg-[#f2cc8f] text-[#3d405b]'
    }
  ];

  const pastEvents = [
    { title: 'Workshop: Innovation and Adaptability in Mahabharata', date: 'March 16, 2024' },
    { title: 'Lecture: Science and Spirituality by Sri. Chanchalapathi Dasa', date: 'September 1, 2024' },
    { title: 'STTP on Indian Knowledge Systems in Environmental Conservation', date: 'Jan-Feb 2024' },
    { title: '30th Swadeshi Science Congress', date: 'May 2023' }
  ];

  return (
    <div className="events-page scroll-smooth">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="hero-bg-events py-32">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-[#3d405b] mb-4">
              Gatherings of Wisdom.
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              Our community comes alive through workshops, lectures, and celebrations that honor our heritage and explore the future.
            </p>
          </div>
        </section>

        {/* Featured Note */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4 text-[#4a1d1d]">Spirit of Inquiry</h2>
            <p className="text-lg text-gray-800 leading-relaxed italic">
              "The Science and Spirituality Club is more than just a regular student body—it is a platform where the timeless wisdom of the Mahabharata meets modern business ethics, and where the philosophy of Vivekananda inspires tomorrow's innovators. We welcome you to join our vibrant gatherings."
            </p>
            <p className="text-gray-500 mt-4">— Dr. Sanjeev Kumar Manjhi, Faculty Coordinator</p>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">Upcoming Events</h2>
            <div className="space-y-12">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="event-card md:flex items-center bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                  <div className={`md:w-1/4 ${event.color} text-white p-8 text-center flex flex-col justify-center`}>
                    <p className="text-xl font-bold opacity-80">{event.month}</p>
                    <p className="text-6xl font-black">{event.day}</p>
                    <p className="text-sm mt-2">{event.time}</p>
                  </div>
                  <div className="p-8 md:w-3/4">
                    <h3 className="text-2xl font-bold mb-3 text-[#4a1d1d]">{event.title}</h3>
                    <p className="text-[#be3a34] font-semibold mb-3 flex items-center gap-2">
                      <span className="text-sm">📍</span> {event.location}
                    </p>
                    <p className="text-gray-600 leading-relaxed">{event.description}</p>
                    <div className="mt-6">
                      <a href="#" className="inline-flex items-center font-bold text-[#be3a34] hover:text-[#4a1d1d] transition-colors">
                        Register for Event <span className="ml-2">→</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Archives */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">From Our Archives</h2>
            <div className="max-w-3xl mx-auto bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-200">
                {pastEvents.map((event, index) => (
                  <div key={index} className="p-6 flex justify-between items-center hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="text-lg font-bold text-[#4a1d1d]">{event.title}</p>
                      <p className="text-sm text-gray-500">{event.date}</p>
                    </div>
                    <Link to="/gallery" className="text-[#be3a34] text-sm font-semibold hover:underline">View Recap</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Suggestion Section */}
        
      </main>

      <Footer />
    </div>
  );
};

export default Events;
