
import React, { useMemo, useState, useEffect } from 'react';
import { ArrowRight, Star, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES, LATEST_WORKS } from '../constants';
import { ServiceCard } from '../components/ServiceCard';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920", // Wedding Party
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1920", // Camera Lens
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1920", // Studio Light
  "https://images.unsplash.com/photo-1606103836293-0a063ee20566?auto=format&fit=crop&q=80&w=1920", // Artistic Portrait
  "https://images.unsplash.com/photo-1511285560982-1351c4f809b9?auto=format&fit=crop&q=80&w=1920", // Black & White Wedding
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1920", // Landscape Photographer
  "https://images.unsplash.com/photo-1520854221250-8c9f96e927bf?auto=format&fit=crop&q=80&w=1920", // Fashion/Editorial
  "https://images.unsplash.com/photo-1471341971474-273d381145b9?auto=format&fit=crop&q=80&w=1920", // Couple Sunset
  "https://images.unsplash.com/photo-1554048612-387768052bf7?auto=format&fit=crop&q=80&w=1920", // Editing/Post-prod
  "https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?auto=format&fit=crop&q=80&w=1920"  // Drone/Aerial
];

export const Home: React.FC = () => {
  const featuredServices = SERVICES.slice(0, 3);
  // Use LATEST_WORKS for the Latest Works section
  const featuredGallery = LATEST_WORKS.slice(0, 4);

  // Select a random image on mount
  const heroImage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * HERO_IMAGES.length);
    return HERO_IMAGES[randomIndex];
  }, []);

  // Parallax Scroll Effect
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 z-0 will-change-transform"
          style={{ transform: `translateY(${offset * 0.5}px)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-slate-900 z-10" />
          <img 
            src={heroImage}
            alt="Cinematic Photography Background" 
            className="w-full h-full object-cover animate-in fade-in zoom-in duration-[2s]"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 container mx-auto px-6 text-center text-white">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl">
            Capture Your Story <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
              With Smith Studio
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-10 max-w-2xl mx-auto font-light">
            Award-winning photography for those who want to remember every beautiful moment.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link 
              to="/book" 
              className="px-8 py-4 bg-gold-500 text-slate-900 rounded-full font-bold text-lg hover:bg-gold-400 hover:scale-105 transition-all shadow-[0_0_20px_rgba(245,158,11,0.5)]"
            >
              Book Your Shoot
            </Link>
            <Link 
              to="/gallery" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              View Portfolio
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <span className="text-sm tracking-widest uppercase">Scroll</span>
        </div>
      </section>

      {/* Features Strip */}
      <section className="bg-white py-12 border-b border-slate-100 relative z-10">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-gold-100 rounded-full text-gold-600"><Star size={24} /></div>
            <h3 className="font-bold text-slate-900">Premium Quality</h3>
            <p className="text-slate-500 text-sm">State of the art cameras and drone technology.</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-gold-100 rounded-full text-gold-600"><Award size={24} /></div>
            <h3 className="font-bold text-slate-900">Award Winning</h3>
            <p className="text-slate-500 text-sm">Recognized as top studio in the region.</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-gold-100 rounded-full text-gold-600"><Clock size={24} /></div>
            <h3 className="font-bold text-slate-900">Fast Turnaround</h3>
            <p className="text-slate-500 text-sm">Get your edited photos within 2 weeks.</p>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">Our Services</h2>
              <p className="text-slate-600 max-w-xl">From intimate portraits to grand weddings, we provide bespoke photography packages.</p>
            </div>
            <Link to="/services" className="hidden md:flex items-center gap-2 text-gold-600 font-semibold hover:gap-3 transition-all">
              View All Services <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
             <Link to="/services" className="text-gold-600 font-bold">View All Services &rarr;</Link>
          </div>
        </div>
      </section>

      {/* Mini Gallery (Latest Works) */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-serif font-bold mb-4">Latest Works</h2>
             <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredGallery.map((item, idx) => (
              <div key={item.id} className={`relative group overflow-hidden rounded-lg aspect-[3/4] ${idx % 2 === 0 ? 'mt-8' : ''}`}>
                <img 
                  src={item.url} 
                  alt={item.title} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <p className="text-gold-400 text-sm font-bold uppercase tracking-wider">{item.category}</p>
                    <p className="text-white font-serif text-lg">{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link to="/latest-works" className="inline-block px-10 py-3 border border-slate-700 rounded-full hover:bg-gold-500 hover:border-gold-500 hover:text-slate-900 transition-all font-medium">
              View All Works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
