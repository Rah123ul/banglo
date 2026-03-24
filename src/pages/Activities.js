import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Gallery = () => {
  const galleryImages = [
    
    {
  src: process.env.PUBLIC_URL + "/btks.jpg",
  alt: "Participants at the International Conference on BTKS.",
  caption: "International Conference on Bhartiya Traditional Knowledge System."
},
    {
      src: process.env.PUBLIC_URL + "/sanskrit.jpg",
      alt: 'Students attending a Sanskrit orientation session.',
      caption: 'Ten Day Sanskrit Orientation Programme (Samskrita Sambhashana Shibhiram).'
    },

    
  
    {
      src: process.env.PUBLIC_URL + "/somnath.jpg",
      alt: 'Experts discussing interdisciplinary synthesis.',
      caption: 'Promoting interdisciplinary dialogue between science and spirituality.'
    }
  ];

  return (
    <div className="gallery-page scroll-smooth">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="hero-bg-gallery py-20 relative ">
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
