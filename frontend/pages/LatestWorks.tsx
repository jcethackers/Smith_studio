import React, { useState, useEffect } from 'react';
import { LATEST_WORKS } from '../constants';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export const LatestWorks: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % LATEST_WORKS.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + LATEST_WORKS.length) % LATEST_WORKS.length);
    }
  };

  useEffect(() => {
    if (selectedImageIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % LATEST_WORKS.length : null));
      else if (e.key === 'ArrowLeft') setSelectedImageIndex((prev) => (prev !== null ? (prev - 1 + LATEST_WORKS.length) % LATEST_WORKS.length : null));
      else if (e.key === 'Escape') setSelectedImageIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-24">
      {/* Header */}
      <div className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 to-slate-900 z-0"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 tracking-tight">Latest Works</h1>
          <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            A curated selection of our most recent and experimental photography projects.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {LATEST_WORKS.map((item, index) => (
            <div 
              key={item.id}
              className="group relative aspect-[3/4] overflow-hidden rounded-lg cursor-pointer bg-slate-800"
              onClick={() => setSelectedImageIndex(index)}
            >
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                <span className="text-gold-500 text-xs font-bold uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.category}</span>
                <h3 className="text-white font-serif text-lg font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.title}</h3>
                <div className="absolute top-4 right-4 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  <ZoomIn size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedImageIndex(null)}
        >
          <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors" aria-label="Close">
            <X size={40} />
          </button>
          
          <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all hidden md:block">
            <ChevronLeft size={32} />
          </button>

          <div className="max-w-6xl max-h-[90vh] relative" onClick={e => e.stopPropagation()}>
            <img 
              src={LATEST_WORKS[selectedImageIndex].url} 
              alt={LATEST_WORKS[selectedImageIndex].title} 
              className="max-h-[90vh] max-w-full object-contain rounded shadow-2xl"
            />
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-serif text-white">{LATEST_WORKS[selectedImageIndex].title}</h3>
              <p className="text-gold-500 text-sm uppercase tracking-widest mt-1">{LATEST_WORKS[selectedImageIndex].category}</p>
            </div>
          </div>

          <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all hidden md:block">
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </div>
  );
};