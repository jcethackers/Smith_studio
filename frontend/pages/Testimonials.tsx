
import React, { useState, useRef } from 'react';
import { generateTestimonialVideo } from '../services/geminiService';
import { Video, Upload, Sparkles, User, Play, Loader2, Quote, AlertCircle, CheckCircle2 } from 'lucide-react';

const TESTIMONIALS_DATA = [
  { 
    name: "Sarah & Mike", 
    text: "The team was incredible. They captured moments we didn't even know happened!", 
    role: "Wedding",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=150&h=150"
  },
  { 
    name: "Jessica T.", 
    text: "Best portrait session I've ever had. Professional, fast, and the results are stunning.", 
    role: "Portrait",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150"
  },
  { 
    name: "David L.", 
    text: "The drone shots for our event were movie quality. Highly recommended.", 
    role: "Event",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150"
  },
  { 
    name: "Emily & James", 
    text: "Our pre-wedding shoot in the forest was magical. The photos look like a fairytale.", 
    role: "Pre-Wedding",
    image: "https://images.unsplash.com/photo-1621623403673-9828dc365751?auto=format&fit=crop&w=150&h=150"
  },
  { 
    name: "The Harrison Family", 
    text: "Patience with our kids was amazing, and the family portraits are now the centerpiece of our living room.", 
    role: "Family",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=150&h=150"
  },
  { 
    name: "TechStart Inc.", 
    text: "Smith Studio handled our corporate headshots efficiently. The team looks professional and approachable.", 
    role: "Corporate",
    image: "https://ui-avatars.com/api/?name=TechStart+Inc&background=0f172a&color=fbbf24"
  },
  { 
    name: "Amanda B.", 
    text: "The creative direction for my portfolio shoot was outstanding. Truly artistic vision.", 
    role: "Fashion",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150"
  },
  { 
    name: "Mark & Lisa", 
    text: "We were so nervous but the team made us feel comfortable instantly. Beautiful photos!", 
    role: "Engagement",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&h=150"
  },
  { 
    name: "City Gourmet", 
    text: "The food photography really elevated our new menu launch. The lighting was impeccable.", 
    role: "Commercial",
    image: "https://ui-avatars.com/api/?name=City+Gourmet&background=f59e0b&color=fff"
  }
];

export const Testimonials: React.FC = () => {
  const [feedback, setFeedback] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback) return;

    setLoading(true);
    setError(null);
    setStatusText('Initializing...');
    setProgress(5);
    setGeneratedVideoUrl(null);

    try {
      let imageBase64: string | undefined;
      let mimeType: string | undefined;

      if (selectedImage) {
        setStatusText('Processing your photo...');
        setProgress(10);
        // Convert file to base64
        const buffer = await selectedImage.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        imageBase64 = btoa(binary);
        mimeType = selectedImage.type;
      }

      const result = await generateTestimonialVideo(
        feedback, 
        imageBase64, 
        mimeType, 
        (status) => {
          setStatusText(status);
          
          // Heuristic progress updates based on status messages
          if (status.includes("Verifying")) setProgress(15);
          else if (status.includes("Analyzing")) setProgress(25);
          else if (status.includes("Scene")) setProgress(40);
          else if (status.includes("Rendering")) {
             // Slowly increment progress during polling
             setProgress(prev => Math.min(prev + 5, 90));
          }
          else if (status.includes("Finalizing")) setProgress(95);
        }
      );
      
      if (result.success && result.url) {
        setGeneratedVideoUrl(result.url);
        setStatusText('Done!');
        setProgress(100);
      } else {
        setError(result.error || 'Failed to generate video.');
        setStatusText('');
        setProgress(0);
      }
    } catch (error) {
      console.error(error);
      setError('An unexpected error occurred. Please try again.');
      setStatusText('');
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .testimonial-animate {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>

      {/* Hero */}
      <div className="bg-slate-900 text-white py-24 px-6 mb-12 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1920" 
            alt="Client Stories Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px]"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Client Stories</h1>
          <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            See what our clients are saying, or bring your own experience to life with our AI Video Generator.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Generator Form */}
          <div>
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 sticky top-24">
              <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Video className="text-gold-500" size={24} /> 
                    AI Video Creator
                  </h3>
                  <p className="text-sm text-slate-400">Turn your feedback into a cinematic moment.</p>
                </div>
                <div className="p-2 bg-slate-800 rounded-full">
                  <Sparkles size={20} className="text-gold-500" />
                </div>
              </div>

              <div className="p-8">
                <form onSubmit={handleGenerate} className="space-y-6">
                  
                  {/* Feedback Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Your Experience</label>
                    <textarea 
                      value={feedback}
                      onChange={(e) => {
                        setFeedback(e.target.value);
                        if (error) setError(null);
                      }}
                      placeholder="e.g. The sunset shoot was magical! The lighting was perfect and we felt so comfortable."
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none resize-none h-32 transition-all"
                      required
                      disabled={loading}
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Your Photo (Optional)</label>
                    <div 
                      onClick={() => !loading && fileInputRef.current?.click()}
                      className={`border-2 border-dashed border-slate-300 rounded-xl p-6 text-center transition-all group ${
                        loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-slate-50 hover:border-gold-500'
                      }`}
                    >
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageSelect}
                        disabled={loading}
                      />
                      
                      {previewUrl ? (
                        <div className="relative inline-block">
                          <img src={previewUrl} alt="Preview" className="h-32 rounded-lg object-cover shadow-md" />
                          <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white text-sm font-bold">Change</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-slate-500 group-hover:text-gold-600">
                          <Upload size={32} />
                          <span className="text-sm font-medium">Click to upload a selfie</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Area */}
                  <div className="space-y-4">
                    <button 
                      type="submit"
                      disabled={loading || !feedback}
                      className="w-full py-4 bg-gold-500 text-slate-900 font-bold rounded-xl shadow-lg shadow-gold-500/20 hover:bg-gold-400 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 disabled:shadow-none"
                    >
                      {loading ? (
                        <span>Generating Story...</span>
                      ) : (
                        <>
                          <Play size={20} fill="currentColor" />
                          <span>Generate Video Testimonial</span>
                        </>
                      )}
                    </button>

                    {/* Progress Indicator */}
                    {loading && (
                      <div className="space-y-2 animate-in fade-in zoom-in-95 duration-300">
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gold-500 transition-all duration-500 ease-out rounded-full"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                          <Loader2 size={14} className="animate-spin text-gold-500" />
                          <span className="font-medium animate-pulse">{statusText}</span>
                        </div>
                      </div>
                    )}

                    {/* Error Message */}
                    {error && (
                      <div className="flex items-start gap-2 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 animate-in fade-in slide-in-from-top-2">
                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                        <span>{error}</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-xs text-slate-400 text-center">
                    Note: Uses Gemini Veo. Requires a paid API key. Generation takes ~1-2 mins.
                  </p>
                </form>
              </div>
            </div>
          </div>

          {/* Display / List Area */}
          <div className="space-y-8">
            {/* Generated Video Result */}
            {generatedVideoUrl && (
              <div className="bg-white p-6 rounded-3xl shadow-xl border border-gold-200 animate-in fade-in slide-in-from-bottom-8">
                <h3 className="text-lg font-serif font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-8 bg-gold-500 rounded-full"></span>
                  Your AI Story
                </h3>
                <div className="rounded-xl overflow-hidden bg-black aspect-video relative shadow-inner group">
                  <video 
                    src={generatedVideoUrl} 
                    controls 
                    autoPlay 
                    loop 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                  <CheckCircle2 className="text-gold-500 shrink-0 mt-1" size={20} />
                  <div>
                    <p className="text-slate-900 font-bold text-sm mb-1">Generated Successfully</p>
                    <p className="text-slate-600 italic text-sm">"{feedback}"</p>
                  </div>
                </div>
              </div>
            )}

            {/* Static Testimonials */}
            <div>
              <h3 className="text-2xl font-serif font-bold mb-6 text-slate-900">Recent Love</h3>
              <div className="grid gap-6">
                {TESTIMONIALS_DATA.map((item, i) => (
                  <div 
                    key={i} 
                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all testimonial-animate"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="flex gap-4">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-sm shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-slate-900">{item.name}</h4>
                          <span className="text-xs px-2 py-0.5 bg-gold-100 text-gold-700 rounded-full font-bold uppercase">{item.role}</span>
                        </div>
                        <div className="relative">
                          <Quote size={16} className="absolute -left-2 -top-1 text-slate-200" />
                          <p className="text-slate-600 text-sm leading-relaxed pl-4">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
