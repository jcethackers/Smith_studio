import React, { useState, useEffect } from 'react';
import { GALLERY_ITEMS } from '../constants';
import { X, ChevronLeft, ChevronRight, Loader2, Layers, ArrowLeft } from 'lucide-react';
import { InstagramEmbed } from 'react-social-media-embed';

// Types for better type safety (Optional but recommended)
interface GalleryItem {
  id: string | number;
  type: 'image' | 'instagram' | 'set';
  category: string;
  title: string;
  url?: string; // For single items
  coverUrl?: string; // For sets
  images?: { id: string | number; url: string; title: string }[]; // For sets
}

export const Gallery: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [openedSet, setOpenedSet] = useState<GalleryItem | null>(null); // State for the active Photo Set
  const [filter, setFilter] = useState('All');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // 1. Logic for Categories
  const categories = ['All', ...Array.from(new Set(GALLERY_ITEMS.map((i: any) => i.category)))];

  // 2. Logic for filtering the MAIN grid
  const filteredMainItems = filter === 'All' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter((item: any) => item.category === filter);

  // 3. Logic: Determine what images are currently viewable for the Lightbox
  // If a set is open, we use the set's images. If not, we use the main grid images (excluding sets/instagram for lightbox navigation)
  const currentViewItems = openedSet 
    ? openedSet.images || []
    : filteredMainItems.filter((item: any) => item.type === 'image'); 

  const handleFilterChange = (category: string) => {
    if (filter === category) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setFilter(category);
      setIsTransitioning(false);
    }, 300);
  };

  // Handle opening a Set
  const handleSetClick = (item: GalleryItem) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setOpenedSet(item);
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  // Handle going back from Set to Main Grid
  const handleBackToGallery = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setOpenedSet(null);
      setIsTransitioning(false);
    }, 300);
  };

  // --- Lightbox Logic ---
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % currentViewItems.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + currentViewItems.length) % currentViewItems.length);
    }
  };

  useEffect(() => {
    if (selectedImageIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setSelectedImageIndex(prev => prev !== null ? (prev + 1) % currentViewItems.length : null);
      if (e.key === 'ArrowLeft') setSelectedImageIndex(prev => prev !== null ? (prev - 1 + currentViewItems.length) % currentViewItems.length : null);
      if (e.key === 'Escape') setSelectedImageIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, currentViewItems]);

  useEffect(() => {
    if (selectedImageIndex !== null) setImageLoading(true);
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
          opacity: 0;
        }
      `}</style>

      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-20 px-6 mb-12">
        <div className="container mx-auto text-center">
          
          {/* Dynamic Header: Shows Category Filter OR Set Title */}
          {!openedSet ? (
            <>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">Portfolio</h1>
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleFilterChange(cat as string)}
                    className={`px-6 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                      filter === cat 
                        ? 'bg-gold-500 text-slate-900 shadow-lg scale-105 ring-2 ring-gold-500' 
                        : 'bg-white border border-slate-200 text-slate-500 hover:border-gold-500 hover:text-gold-600'
                    }`}
                  >
                    {cat as string}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="animate-in fade-in zoom-in duration-300">
               <button 
                onClick={handleBackToGallery}
                className="flex items-center mx-auto mb-4 text-slate-500 hover:text-gold-600 transition-colors"
              >
                <ArrowLeft className="mr-2" size={20} /> Back to Gallery
              </button>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">{openedSet.title}</h1>
              <p className="text-gold-500 font-bold uppercase tracking-widest text-sm mt-2">{openedSet.category} Session</p>
            </div>
          )}

        </div>
      </div>

      {/* Content Grid */}
      <div className="container mx-auto px-6">
        <div className={`transition-all duration-300 ease-in-out ${isTransitioning ? 'opacity-0 translate-y-8 scale-95' : 'opacity-100 translate-y-0 scale-100'}`}>
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            
            {/* CONDITIONAL RENDER: If no set is open, show Main Grid. If set is open, show Set Images */}
            
            {!openedSet ? (
              // --- MAIN GRID ---
              filteredMainItems.map((item: any, index: number) => {
                const isInstagram = item.type === 'instagram';
                const isSet = item.type === 'set';

                return (
                  <div 
                    key={item.id} 
                    className={`break-inside-avoid relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all gallery-item-animate bg-white group cursor-pointer`}
                    style={{ animationDelay: `${index * 75}ms` }}
                    onClick={() => {
                      if (isSet) {
                        handleSetClick(item); // Open the Set View
                      } else if (!isInstagram) {
                        // Open Lightbox for single image
                        const lightboxIndex = currentViewItems.findIndex((i: any) => i.id === item.id);
                        if (lightboxIndex !== -1) setSelectedImageIndex(lightboxIndex);
                      }
                    }}
                  >
                    {isInstagram ? (
                      <div className="w-full flex justify-center p-1"><InstagramEmbed url={item.url} width="100%" captioned /></div>
                    ) : (
                      <>
                        {/* Render Image (Cover URL if set, normal URL if image) */}
                        <img 
                          src={isSet ? item.coverUrl : item.url} 
                          alt={item.title} 
                          className="w-full h-auto object-cover transform group-hover:scale-110 duration-500 ease-in-out" 
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                          <span className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                            {item.category}
                            {isSet && <span className="bg-gold-500 text-black px-2 py-0.5 rounded text-[10px] flex items-center gap-1"><Layers size={10} /> {item.images?.length} Photos</span>}
                          </span>
                          <h3 className="text-white font-serif text-xl flex items-center gap-2">
                            {item.title}
                            {isSet && <Layers size={18} className="text-white/80" />}
                          </h3>
                        </div>

                        {/* Visual indicator that this is a stack/set */}
                        {isSet && (
                          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full text-white">
                            <Layers size={20} />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })
            ) : (
              // --- SET VIEW (SUB GALLERY) ---
              openedSet.images?.map((img: any, index: number) => (
                <div 
                  key={img.id}
                  className="break-inside-avoid relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all gallery-item-animate group cursor-pointer"
                  style={{ animationDelay: `${index * 75}ms` }}
                  onClick={() => setSelectedImageIndex(index)} // Open lightbox at this index
                >
                  <img 
                    src={img.url} 
                    alt={img.title} 
                    className="w-full h-auto object-cover transform group-hover:scale-110 duration-500 ease-in-out" 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-white font-serif text-lg">{img.title}</h3>
                  </div>
                </div>
              ))
            )}

          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImageIndex !== null && currentViewItems[selectedImageIndex] && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setSelectedImageIndex(null)}
        >
          {/* Close Button */}
          <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50">
            <X size={40} />
          </button>

          {/* Nav Buttons */}
          <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md hidden md:block z-50">
            <ChevronLeft size={32} />
          </button>
          <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md hidden md:block z-50">
            <ChevronRight size={32} />
          </button>

          {/* Main Lightbox Image */}
          <div className="max-w-5xl max-h-[85vh] relative z-40" onClick={e => e.stopPropagation()}>
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-gold-500 animate-spin" />
              </div>
            )}
            <img 
              src={currentViewItems[selectedImageIndex].url} 
              alt="Enlarged view"
              onLoad={() => setImageLoading(false)}
              className={`max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};