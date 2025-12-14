
import React from 'react';
import { SERVICES } from '../constants';
import { ServiceCard } from '../components/ServiceCard';

export const Services: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header with Background Image */}
      <div className="relative py-24 px-6 mb-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=1920" 
            alt="Photography Services Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-[2px]"></div>
        </div>

        <div className="container mx-auto text-center relative z-10 text-white">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Our Services</h1>
          <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            We offer a wide range of photography and videography services tailored to meet your unique needs.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} featured={index === 0} />
          ))}
        </div>
      </div>
    </div>
  );
};
