import React from 'react';
import { Check } from 'lucide-react';
import { Service } from '../types';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  service: Service;
  featured?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, featured = false }) => {
  return (
    <div className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full ${featured ? 'border-2 border-gold-500' : ''}`}>
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
        <img 
          src={service.image} 
          alt={service.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur text-slate-900 px-4 py-1 rounded-full font-bold shadow-sm">
          ₹{service.price.toLocaleString('en-IN')}
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-gold-600 transition-colors">{service.name}</h3>
        <p className="text-slate-600 mb-6 flex-grow">{service.description}</p>
        
        <div className="space-y-3 mb-8">
          {service.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3 text-sm text-slate-500">
              <Check className="w-4 h-4 text-gold-500 shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <Link 
          to={`/book?service=${encodeURIComponent(service.name)}`}
          className="w-full block text-center py-3 rounded-xl border border-slate-200 font-semibold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300"
        >
          Book This Package
        </Link>
      </div>
    </div>
  );
};