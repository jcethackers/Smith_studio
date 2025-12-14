
import React, { useState } from 'react';
import { Instagram, Mail, Camera, Phone, X, ShieldCheck, FileText, MapPin, Info, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_EMAIL, COMPANY_PHONE, COMPANY_INSTAGRAM, COMPANY_ADDRESS } from '../constants';

export const Footer: React.FC = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
      <footer className="relative bg-slate-950/90 backdrop-blur-xl border-t border-white/10 text-slate-400 z-10 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)] py-5">
        {/* Top Gold Accent Line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"></div>

        <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Left: Brand & Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
            <Link to="/" className="flex items-center gap-2 group">
              <Camera className="w-5 h-5 text-gold-500 group-hover:rotate-12 transition-transform" />
              <span className="text-lg font-serif font-bold text-white tracking-wide group-hover:text-gold-100 transition-colors">SMITH STUDIO</span>
            </Link>
            <div className="hidden md:block w-px h-4 bg-white/10"></div>
            <span className="text-xs text-slate-500 font-medium">© {new Date().getFullYear()} All rights reserved.</span>
          </div>

          {/* Right: Actions & Socials */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            
            {/* Legal Links */}
            <div className="flex items-center gap-4 text-xs font-medium tracking-wide">
              <button onClick={() => setShowAbout(true)} className="hover:text-gold-500 transition-colors">About</button>
              <button onClick={() => setShowPrivacy(true)} className="hover:text-gold-500 transition-colors">Privacy</button>
              <button onClick={() => setShowTerms(true)} className="hover:text-gold-500 transition-colors">Terms</button>
              <Link to="/help" className="hover:text-gold-500 transition-colors">Help</Link>
            </div>

            {/* Vertical Divider (Desktop) */}
            <div className="hidden md:block w-px h-4 bg-white/10"></div>

            {/* Icons */}
            <div className="flex items-center gap-3">
              {[
                { 
                  icon: MapPin, 
                  href: "https://maps.google.com", 
                  title: COMPANY_ADDRESS, 
                  isExternal: true
                },
                { 
                  icon: Phone, 
                  href: `tel:${COMPANY_PHONE.replace(/\s+/g, '')}`,
                  title: COMPANY_PHONE,
                  isExternal: false
                },
                { 
                  icon: Mail, 
                  href: `mailto:${COMPANY_EMAIL}`,
                  title: COMPANY_EMAIL,
                  isExternal: false
                },
                { 
                  icon: Instagram, 
                  href: COMPANY_INSTAGRAM,
                  title: "@smith__photography_",
                  isExternal: true
                }
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href}
                  target={social.isExternal ? "_blank" : undefined}
                  rel={social.isExternal ? "noopener noreferrer" : undefined}
                  className="text-slate-400 hover:text-gold-500 transition-transform hover:scale-110 p-1.5 hover:bg-white/5 rounded-full"
                  title={social.title}
                  aria-label={social.title}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* About & Legal Modal */}
      {showAbout && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-gold-500/20 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative p-8 max-h-[80vh] overflow-y-auto">
            <button 
              onClick={() => setShowAbout(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <Info className="w-8 h-8 text-gold-500" />
              <h3 className="text-2xl font-serif font-bold text-white">About & Legal</h3>
            </div>

            <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
              
              <div>
                <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                  <Scale size={16} className="text-gold-500"/> Studio Information
                </h4>
                <p>
                  <strong className="text-white">Smith Studio</strong> is a premier photography service provider registered in Karnataka, India. We are dedicated to providing high-quality visual storytelling services.
                </p>
                <p className="mt-2 text-slate-400 text-xs">
                  Registered Office: {COMPANY_ADDRESS}
                </p>
              </div>

              <div>
                <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-gold-500"/> Legal Notice
                </h4>
                <p>
                  This website and its content, including all photographs, portfolios, and text, are the exclusive intellectual property of Smith Studio. Unauthorized use, reproduction, or distribution of any material without express written consent is strictly prohibited.
                </p>
              </div>

              <div>
                <h4 className="text-white font-bold mb-2">Jurisdiction</h4>
                <p>
                  Any legal disputes or claims arising in connection with our services shall be subject to the exclusive jurisdiction of the courts in Davanagere, Karnataka.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link 
                  to="/about" 
                  onClick={() => setShowAbout(false)}
                  className="block w-full text-center py-3 bg-white/5 hover:bg-gold-500 hover:text-slate-900 border border-white/10 rounded-xl transition-all duration-300 font-bold"
                >
                  Read Our Full Story
                </Link>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-gold-500/20 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative p-8 max-h-[80vh] overflow-y-auto">
            <button 
              onClick={() => setShowPrivacy(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="w-8 h-8 text-gold-500" />
              <h3 className="text-2xl font-serif font-bold text-white">Privacy Policy</h3>
            </div>

            <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
              <p>
                At <strong className="text-white">Smith Studio</strong>, we are committed to maintaining the trust and confidence of our visitors and clients.
              </p>
              <div>
                <h4 className="text-white font-bold mb-1">Data Collection</h4>
                <p>We collect personal information such as your name, email address, phone number, and event details solely for communicating with you and facilitating your bookings.</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Image Usage</h4>
                <p>We retain copyright to images. We may display your images in our portfolio unless an NDA is requested.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {showTerms && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-gold-500/20 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative p-8 max-h-[80vh] overflow-y-auto">
            <button 
              onClick={() => setShowTerms(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-gold-500" />
              <h3 className="text-2xl font-serif font-bold text-white">Terms of Service</h3>
            </div>

            <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
              <p>
                By booking a session with <strong className="text-white">Smith Studio</strong>, you agree to the following terms.
              </p>
              <div>
                <h4 className="text-white font-bold mb-1">Booking & Deposits</h4>
                <p>A non-refundable deposit is required to secure your date.</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Cancellations</h4>
                <p>Cancellations less than 48 hours before the session may forfeit the deposit.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
