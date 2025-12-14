
import React, { useState, useEffect } from 'react';
import { GALLERY_ITEMS } from '../constants';
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState('All');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const categories = ['All', ...Array.from(new Set(GALLERY_ITEMS.map(i => i.category)))];
  
  const filteredItems = filter === 'All' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === filter);

  const handleFilterChange = (category: string) => {
    if (filter === category) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setFilter(category);
      setIsTransitioning(false);
    }, 300);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  // Keyboard Navigation
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setSelectedImageIndex(prev => 
          prev !== null ? (prev + 1) % filteredItems.length : null
        );
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex(prev => 
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
        );
      } else if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, filteredItems]);

  // Reset loading state when image changes
  useEffect(() => {
    if (selectedImageIndex !== null) {
      setImageLoading(true);
    }
  }, [selectedImageIndex]);

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <style>{`
        @keyframes galleryFadeIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .gallery-item-animate {
          animation: galleryFadeIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0; /* start hidden */
        }
      `}</style>

      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-20 px-6 mb-12">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">Portfolio</h1>
          
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-3" role="group" aria-label="Filter gallery by category">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                aria-pressed={filter === cat}
                className={`px-6 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                  filter === cat 
                    ? 'bg-gold-500 text-slate-900 shadow-lg shadow-gold-500/25 scale-105 ring-2 ring-gold-500 ring-offset-2' 
                    : 'bg-white border border-slate-200 text-slate-500 hover:border-gold-500 hover:text-gold-600 hover:scale-105'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-6">
        <div 
          className={`transition-all duration-300 ease-in-out ${
            isTransitioning 
              ? 'opacity-0 translate-y-8 scale-95' 
              : 'opacity-100 translate-y-0 scale-100'
          }`}
        >
          <div key={filter} className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item, index) => (
              <div 
                key={item.id} 
                role="button"
                tabIndex={0}
                aria-label={`View ${item.title} in full screen lightbox`}
                className="break-inside-avoid relative group cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all gallery-item-animate focus:outline-none focus:ring-4 focus:ring-gold-500/50"
                style={{ animationDelay: `${index * 75}ms` }}
                onClick={() => setSelectedImageIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedImageIndex(index);
                  }
                }}
              >
                <img 
                  src={item.url} 
                  alt={`${item.title} - ${item.category} photography session`} 
                  loading="lazy"
                  className="w-full h-auto object-cover transform group-hover:scale-110 duration-500 ease-in-out" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-1">{item.category}</span>
                  <h3 className="text-white font-serif text-xl">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
          onClick={() => setSelectedImageIndex(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors focus:outline-none focus:text-white z-50"
            onClick={() => setSelectedImageIndex(null)}
            aria-label="Close lightbox"
          >
            <X size={40} />
          </button>

          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-md hidden md:block focus:outline-none focus:bg-white/30 z-50"
            onClick={handlePrev}
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Loading Indicator */}
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Loader2 className="w-12 h-12 text-gold-500 animate-spin" />
            </div>
          )}

          <div className="max-w-5xl max-h-[85vh] relative z-40" onClick={e => e.stopPropagation()}>
            <img 
              src={filteredItems[selectedImageIndex].url} 
              alt={`Enlarged view: ${filteredItems[selectedImageIndex].title}`} 
              onLoad={() => setImageLoading(false)}
              className={`max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
            />
            {!imageLoading && (
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg animate-in fade-in duration-500">
                 <h3 className="text-white text-xl font-serif">{filteredItems[selectedImageIndex].title}</h3>
              </div>
            )}
          </div>

          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-md hidden md:block focus:outline-none focus:bg-white/30 z-50"
            onClick={handleNext}
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </div>
  );
};
