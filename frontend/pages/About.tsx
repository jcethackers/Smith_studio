
import React, { useState, useEffect, useRef } from 'react';
import { Camera, MapPin, Phone, Mail, Award, Users, Heart } from 'lucide-react';
import { COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_PHONE, COMPANY_INSTAGRAM } from '../constants';

const Counter: React.FC<{ end: number; suffix?: string; duration?: number }> = ({ end, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number | null = null;
          
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // Ease out quart
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            
            setCount(Math.floor(easeProgress * end));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Header */}
      <div className="bg-slate-900 text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-950 opacity-50" />
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Our Story</h1>
          <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Capturing the essence of life's most beautiful moments in Davanagere and beyond.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-12 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Image Section - Using a representative image for the user's request */}
            <div className="relative h-[500px] lg:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1621623403673-9828dc365751?auto=format&fit=crop&q=80&w=1000" 
                alt="Happy Couple at Smith Studio" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <p className="font-serif italic text-lg opacity-90">"Every picture tells a story..."</p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <Camera className="w-8 h-8 text-gold-500" />
                <h2 className="text-3xl font-serif font-bold text-slate-900">Smith Studio</h2>
              </div>
              
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  Welcome to <strong className="text-slate-900">Smith Studio</strong>, a premium photography house based in the heart of Davanagere, Karnataka. Founded with a passion for storytelling through the lens, we specialize in turning fleeting moments into timeless memories.
                </p>
                <p>
                  Whether it's the grandeur of a wedding, the intimacy of a portrait session, or the joy of a family gathering, our team approaches every shoot with creativity, professionalism, and an eye for detail. We believe that photography is not just about taking pictures; it's about preserving emotions.
                </p>
                <p>
                  Our studio is equipped with state-of-the-art technology, including high-resolution cameras and drones, ensuring that every shot is cinematic and perfect.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-10 pt-10 border-t border-slate-100">
                <div className="text-center group">
                  <div className="w-12 h-12 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Award size={24} />
                  </div>
                  <div className="text-3xl font-serif font-bold text-slate-900 mb-1">
                    <Counter end={100} suffix="%" duration={1500} />
                  </div>
                  <p className="font-bold text-slate-700 text-sm uppercase tracking-wide">Premium</p>
                </div>
                <div className="text-center group">
                  <div className="w-12 h-12 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Users size={24} />
                  </div>
                  <div className="text-3xl font-serif font-bold text-slate-900 mb-1">
                    <Counter end={15} suffix="+" duration={2000} />
                  </div>
                  <p className="font-bold text-slate-700 text-sm uppercase tracking-wide">Experts</p>
                </div>
                <div className="text-center group">
                  <div className="w-12 h-12 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Heart size={24} />
                  </div>
                  <div className="text-3xl font-serif font-bold text-slate-900 mb-1">
                    <Counter end={500} suffix="+" duration={2500} />
                  </div>
                  <p className="font-bold text-slate-700 text-sm uppercase tracking-wide">Projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Philosophy Section */}
      <div className="container mx-auto px-6 mt-16">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] group">
          <img 
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=2000" 
            alt="Cinematic Landscape Photography" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500" />
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white max-w-2xl z-10">
             <div className="w-16 h-1 bg-gold-500 mb-6 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
             <h3 className="text-3xl md:text-5xl font-serif font-bold leading-tight drop-shadow-lg">
               "We don't just take photographs, we capture feelings."
             </h3>
          </div>
        </div>
      </div>

      {/* Behind the Scenes Grid */}
      <div className="container mx-auto px-6 mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Behind the Lens</h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full"></div>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
             A glimpse into our world, where creativity meets technical excellence.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-auto md:h-[400px]">
          <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden group shadow-lg">
             <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800" alt="Studio Setup" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"/>
          </div>
          <div className="relative rounded-2xl overflow-hidden group shadow-lg h-48 md:h-auto">
             <img src="https://images.unsplash.com/photo-1554048612-387768052bf7?auto=format&fit=crop&q=80&w=400" alt="Editing" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
          </div>
          <div className="relative rounded-2xl overflow-hidden group shadow-lg h-48 md:h-auto">
             <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400" alt="Camera Lens" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
          </div>
          <div className="col-span-2 relative rounded-2xl overflow-hidden group shadow-lg h-48 md:h-auto">
             <img src="https://images.unsplash.com/photo-1590605103403-9b9649d282e3?auto=format&fit=crop&q=80&w=800" alt="Team at work" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="container mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 bg-slate-900 text-gold-500 rounded-xl shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Visit Us</h3>
              <p className="text-slate-600 text-sm">{COMPANY_ADDRESS}</p>
            </div>
          </div>

          <a href={`tel:${COMPANY_PHONE.replace(/\s+/g, '')}`} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-all group cursor-pointer">
            <div className="p-3 bg-slate-900 text-gold-500 rounded-xl shrink-0 group-hover:scale-110 transition-transform">
              <Phone size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Call Us</h3>
              <p className="text-slate-600 text-sm group-hover:text-gold-600 transition-colors">{COMPANY_PHONE}</p>
            </div>
          </a>

          <a href={COMPANY_INSTAGRAM} target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-all group cursor-pointer">
            <div className="p-3 bg-slate-900 text-gold-500 rounded-xl shrink-0 group-hover:scale-110 transition-transform">
              <Camera size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Follow Us</h3>
              <p className="text-slate-600 text-sm group-hover:text-gold-600 transition-colors">@smith__photography_</p>
            </div>
          </a>

        </div>
      </div>
    </div>
  );
};
