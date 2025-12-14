import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { SERVICES } from '../constants';
import { Calendar as CalendarIcon, MapPin, User, Mail, Phone, MessageSquare, ChevronLeft, ChevronRight, CheckCircle2, X } from 'lucide-react';
const apiUrl = import.meta.env.VITE_API_URL;

export const Book: React.FC = () => {
  const { search } = useLocation();
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    location: '',
    name: '',
    email: '',
    phone: '',
    details: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Calendar State
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef<HTMLDivElement>(null);

  // Find selected service for display
  const selectedService = SERVICES.find(s => s.name === formData.service);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const serviceParam = params.get('service');
    if (serviceParam) {
      setFormData(prev => ({ ...prev, service: serviceParam }));
    }
  }, [search]);

  // Handle outside clicks to close calendar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

const confirmBooking = async () => {
    setStatus('submitting');
    
    try {
      // 1. Send the data to your backend
     const response = await axios.post(`${apiUrl}/api/bookings`, formData);
      
      console.log('Server says:', response.data);

      // 2. If successful, show the success screen
      setStatus('success');
      setShowConfirmation(false);
      
    } catch (error) {
      console.error('Error booking:', error);
      // Optional: Add an error state here if you want to show a message to the user
      setStatus('idle'); // Reset so they can try again
      alert('Something went wrong. Please check your connection.');
    }
  };
  // Calendar Logic
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1);
    setCurrentMonth(newDate);
  };

  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const d = String(selectedDate.getDate()).padStart(2, '0');
    
    setFormData(prev => ({ ...prev, date: `${year}-${month}-${d}` }));
    setShowCalendar(false);
  };

  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    
    // Empty slots for previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-9 w-9" />);
    }

    const today = new Date();
    today.setHours(0,0,0,0);

    for (let d = 1; d <= daysInMonth; d++) {
      const dateToCheck = new Date(year, month, d);
      const isPast = dateToCheck < today;
      
      const formattedDateToCheck = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isSelected = formData.date === formattedDateToCheck;

      days.push(
        <button
          key={d}
          type="button"
          disabled={isPast}
          onClick={() => handleDateSelect(d)}
          className={`
            h-9 w-9 rounded-full flex items-center justify-center text-sm transition-all
            ${isSelected 
              ? 'bg-gold-500 text-slate-900 font-bold shadow-md transform scale-105' 
              : isPast 
                ? 'text-slate-300 cursor-not-allowed' 
                : 'text-slate-700 hover:bg-gold-100 hover:text-gold-600 font-medium'
            }
          `}
        >
          {d}
        </button>
      );
    }
    return days;
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CalendarIcon size={40} />
          </div>
          <h2 className="text-3xl font-serif font-bold mb-4">Booking Received!</h2>
          <p className="text-slate-600 mb-8">
            Thank you, {formData.name}. We have received your request for {formData.service}. We will contact you at {formData.email} within 24 hours to confirm.
          </p>
          <button 
            onClick={() => {
              setStatus('idle');
              setFormData({...formData, date: ''});
            }}
            className="text-gold-600 font-bold hover:underline"
          >
            Make another booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Book Your Shoot</h1>
          <p className="text-slate-600 text-lg">Tell us about your event and we'll handle the rest.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Info Side */}
          <div className="bg-slate-900 text-white p-10 md:w-1/3 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-6 text-gold-500">Why Choose Us?</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">1</div>
                  <p className="text-sm text-slate-300">Detailed consultation before every shoot.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">2</div>
                  <p className="text-sm text-slate-300">Professional retouching included in all packages.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">3</div>
                  <p className="text-sm text-slate-300">Backup equipment and insurance for peace of mind.</p>
                </li>
              </ul>
            </div>
            <div className="mt-12">
               <p className="text-slate-400 text-sm">Need help deciding?</p>
               <p className="font-bold text-lg">Use our AI Chat Assistant!</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-10 md:w-2/3 relative">
            <form onSubmit={handleReview} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Service Type</label>
                  <div className="relative">
                    <select 
                      name="service" 
                      required 
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none appearance-none"
                    >
                      <option value="" disabled>Select a package</option>
                      {SERVICES.map(s => (
                        <option key={s.id} value={s.name}>{s.name} (₹{s.price.toLocaleString('en-IN')})</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                  </div>
                </div>

                <div className="space-y-2 relative" ref={calendarRef}>
                  <label className="text-sm font-bold text-slate-700">Preferred Date</label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none z-10" />
                    <input 
                      type="text" 
                      name="date"
                      required
                      readOnly
                      placeholder="Select Date"
                      value={formData.date}
                      onClick={() => setShowCalendar(!showCalendar)}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none cursor-pointer"
                    />
                  </div>

                  {/* Calendar Popover */}
                  {showCalendar && (
                    <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 p-4 z-50 w-72 animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex justify-between items-center mb-4">
                        <button type="button" onClick={() => changeMonth(-1)} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
                          <ChevronLeft size={20} className="text-slate-600" />
                        </button>
                        <h4 className="font-bold text-slate-800">
                          {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </h4>
                        <button type="button" onClick={() => changeMonth(1)} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
                          <ChevronRight size={20} className="text-slate-600" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-7 mb-2 text-center">
                        {weekDays.map(d => (
                          <div key={d} className="text-xs font-bold text-slate-400 uppercase">{d}</div>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-7 gap-1">
                        {renderCalendarDays()}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Location / Venue</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    type="text" 
                    name="location"
                    required
                    placeholder="e.g. Central Park, NY"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="text" 
                      name="name"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Additional Details</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
                  <textarea 
                    name="details"
                    rows={4}
                    placeholder="Tell us about your vision, specific shots you want, etc..."
                    value={formData.details}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none resize-none"
                  ></textarea>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-gold-500 text-slate-900 font-bold py-4 rounded-xl hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/30"
              >
                Review Booking Details
              </button>

            </form>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
              <div>
                <h3 className="text-2xl font-serif font-bold">Confirm Booking</h3>
                <p className="text-slate-400 text-sm">Please review your details below</p>
              </div>
              <button 
                onClick={() => setShowConfirmation(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 md:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              
              {/* Visual Service Summary */}
              {selectedService && (
                <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                  <div className="h-32 relative">
                    <img 
                      src={selectedService.image} 
                      alt={selectedService.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                       <span className="text-white font-bold text-lg font-serif">{selectedService.name}</span>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                       ₹{selectedService.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50/50">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">Included Features</p>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                      {selectedService.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2">
                           <CheckCircle2 className="w-3 h-3 text-gold-500 shrink-0" />
                           <span className="text-xs text-slate-700">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Service & Date */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                   <div className="p-2 bg-gold-100 text-gold-600 rounded-lg shrink-0"><CheckCircle2 size={20}/></div>
                   <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Service</p>
                      <p className="text-slate-900 font-bold leading-tight">{formData.service}</p>
                   </div>
                </div>
                <div className="flex items-start gap-3">
                   <div className="p-2 bg-gold-100 text-gold-600 rounded-lg shrink-0"><CalendarIcon size={20}/></div>
                   <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Date</p>
                      <p className="text-slate-900 font-bold leading-tight">{formData.date}</p>
                   </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 pt-4 border-t border-slate-100">
                 <div className="p-2 bg-gold-100 text-gold-600 rounded-lg shrink-0"><MapPin size={20}/></div>
                 <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Location</p>
                    <p className="text-slate-900 font-medium">{formData.location}</p>
                 </div>
              </div>

              {/* Contact */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                 <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Contact Details</p>
                 <div className="flex items-center gap-3">
                    <User size={16} className="text-slate-400"/>
                    <span className="text-slate-700">{formData.name}</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <Mail size={16} className="text-slate-400"/>
                    <span className="text-slate-700">{formData.email}</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <Phone size={16} className="text-slate-400"/>
                    <span className="text-slate-700">{formData.phone}</span>
                 </div>
              </div>

              {/* Details */}
              {formData.details && (
                <div className="pt-4 border-t border-slate-100">
                   <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Additional Notes</p>
                   <p className="text-slate-600 text-sm italic bg-slate-50 p-3 rounded-lg border border-slate-100">
                     "{formData.details}"
                   </p>
                </div>
              )}
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-4">
              <button 
                onClick={() => setShowConfirmation(false)} 
                className="flex-1 py-3 px-4 rounded-xl border border-slate-300 font-semibold text-slate-600 hover:bg-white hover:text-slate-900 hover:border-slate-400 transition-all"
              >
                Edit Details
              </button>
              <button 
                onClick={confirmBooking} 
                disabled={status === 'submitting'}
                className="flex-[2] py-3 px-4 rounded-xl bg-gold-500 font-bold text-slate-900 hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/20 disabled:opacity-70 disabled:cursor-wait"
              >
                {status === 'submitting' ? 'Submitting...' : 'Confirm & Book'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
