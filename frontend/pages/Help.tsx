

import React from 'react';
import { AiAssistant } from '../components/AiAssistant';
import { HelpCircle, Phone, Mail, MapPin } from 'lucide-react';
import { COMPANY_EMAIL, COMPANY_PHONE, COMPANY_ADDRESS } from '../constants';

export const Help: React.FC = () => {
  const faqs = [
    {
      q: "How do I book a session?",
      a: "You can book a session directly through our 'Book Now' page. Simply select your desired service, date, and provide your details."
    },
    {
      q: "What is your cancellation policy?",
      a: "We understand plans change. Cancellations made 48 hours in advance are fully refundable. Late cancellations may be subject to a 20% fee."
    },
    {
      q: "Do you travel for weddings?",
      a: "Yes! We are available for destination weddings worldwide. Travel fees apply depending on the location."
    },
    {
      q: "How long does it take to get my photos?",
      a: "For standard portraits, turnaround is 1-2 weeks. For weddings and large events, please allow 4-6 weeks for full editing."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-slate-900 text-white py-20 px-6 mb-12">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Help Center</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Have questions? Find answers below or chat with our AI assistant for instant support.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: FAQ & Contact */}
          <div className="space-y-12">
            
            {/* FAQ Section */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-2">
                <HelpCircle className="text-gold-500" /> Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-slate-800 mb-2">{faq.q}</h3>
                    <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Contact */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Still need help?</h2>
              <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-gold-500">
                <p className="text-slate-600 mb-6">Our human support team is available Mon-Fri, 9am - 5pm EST.</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-700">
                    <Phone className="text-gold-500" />
                    <span className="font-medium">{COMPANY_PHONE}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <Mail className="text-gold-500" />
                    <span className="font-medium">{COMPANY_EMAIL}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <MapPin className="text-gold-500" />
                    <span>{COMPANY_ADDRESS}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded AI */}
          <div className="sticky top-24 w-full">
            <AiAssistant mode="embedded" />
          </div>

        </div>
      </div>
    </div>
  );
};