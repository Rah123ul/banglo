import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Gallery = () => {
  const galleryImages = [
    {
      src: 'https://placehold.co/600x400/4a1d1d/ffffff?text=Traditional+Knowledge+Conference',
      alt: 'Participants at the International Conference on BTKS.',
      caption: 'International Conference on Bhartiya Traditional Knowledge System.'
    },
    {
      src: 'https://placehold.co/600x400/be3a34/ffffff?text=Sanskrit+Orientation',
      alt: 'Students attending a Sanskrit orientation session.',
      caption: 'Ten Day Sanskrit Orientation Programme (Samskrita Sambhashana Shibhiram).'
    },
    {
      src: 'https://placehold.co/600x400/4a1d1d/ffffff?text=National+Youth+Day',
      alt: 'Youth Day celebrations at NIT Calicut.',
      caption: 'Celebrating the ideals of Swami Vivekananda on National Youth Day.'
    },
    {
      src: 'https://placehold.co/600x400/be3a34/ffffff?text=NMC+Header+Design',
      alt: 'Visual representation of the new website header design.',
      caption: 'Adopting the "National Mission for Manuscripts" aesthetic for CIKS.'
    },
    {
      src: 'https://placehold.co/600x400/4a1d1d/ffffff?text=Meditation+Circle',
      alt: 'Weekly meditation gathering.',
      caption: 'Finding inner stillness during our weekly meditation sessions.'
    },
    {
      src: 'https://placehold.co/600x400/be3a34/ffffff?text=IKS+Dialogue',
      alt: 'Experts discussing interdisciplinary synthesis.',
      caption: 'Promoting interdisciplinary dialogue between science and spirituality.'
    }
  ];

  return (
    <div className="gallery-page scroll-smooth">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="hero-bg-gallery py-32">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-[#4a1d1d] mb-4">
              Legacy in Focus.
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              Visual snapshots of our journey in preserving and promoting Indian Knowledge Systems.
            </p>
          </div>
        </section>

        {/* Leadership View on Gallery */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4 text-[#4a1d1d]">The Visual Archive</h2>
            <p className="text-lg text-gray-800 leading-relaxed">
              "Every event we host—from Sanskrit workshops to international conferences—is a step toward fulfilling our mission of interdisciplinary synthesis. This gallery serves as a living record of our commitment to values, ethics, and the pursuit of knowledge. We invite you to witness the vibrant community spirit that defines CIKS and the SNS Club."
            </p>
            <p className="text-gray-500 mt-4">— Dr. R. Sridharan, Chairperson CIKS</p>
          </div>
        </section>

        {/* The Gallery Grid */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryImages.map((image, index) => (
                <div key={index} className="gallery-item bg-white rounded-lg overflow-hidden shadow-md">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-center text-gray-600 italic">{image.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Share Your Moments CTA */}
        
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
