
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Sparkles, Loader2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { askSmithAI } from '../services/geminiService';

interface AiAssistantProps {
  mode?: 'floating' | 'embedded';
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ mode = 'floating' }) => {
  const isEmbedded = mode === 'embedded';
  // Initialize isOpen to true if embedded, so it's logically "open" by default
  const [isOpen, setIsOpen] = useState(isEmbedded);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: "Hello! I'm SmithAI, your personal studio assistant. Would you like to know about specific package inclusions or popular add-ons for services like Wedding Photography? I'm here to help you with all the details!" }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Hide floating chat on help page to avoid duplication
  if (!isEmbedded && location.pathname === '/help') {
    return null;
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen || isEmbedded) {
      scrollToBottom();
    }
  }, [messages, isOpen, isEmbedded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    const userText = query.trim();
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    const response = await askSmithAI(userText);
    
    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setLoading(false);
  };

  // Styles for animations
  const animationStyles = `
    @keyframes messageSlideIn {
      from { opacity: 0; transform: translateY(10px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .message-animate {
      animation: messageSlideIn 0.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
    }
  `;

  // Classes for the main container
  const containerClasses = isEmbedded
    ? "w-full h-full min-h-[500px] flex flex-col bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
    : `bg-white rounded-2xl shadow-2xl w-[350px] sm:w-[400px] h-[500px] mb-4 flex flex-col overflow-hidden border border-slate-100 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] origin-bottom-right ${
        isOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-12 scale-95 pointer-events-none'
      }`;

  const wrapperClasses = isEmbedded
    ? "w-full h-full"
    : "fixed bottom-24 right-6 z-40 flex flex-col items-end pointer-events-none";

  return (
    <>
      <style>{animationStyles}</style>
      
      <div className={wrapperClasses}>
        {/* Chat Window */}
        <div className={containerClasses} aria-hidden={!isOpen && !isEmbedded}>
          {/* Header */}
          <div className="bg-slate-900 p-4 flex justify-between items-center text-white shrink-0">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gold-500 rounded-full text-slate-900 shadow-lg shadow-gold-500/20">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide">Smith Assistant</h3>
                <p className="text-xs text-slate-400 font-medium">Powered by Gemini AI</p>
              </div>
            </div>
            {!isEmbedded && (
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50 scrollbar-hide">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} message-animate`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div 
                  className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-slate-900 text-white rounded-br-none' 
                      : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start message-animate">
                <div className="bg-white border border-slate-200 p-3.5 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2.5">
                  <Loader2 className="w-4 h-4 animate-spin text-gold-500" />
                  <span className="text-xs text-slate-500 font-medium">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-slate-100 shrink-0">
            <div className="relative group">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about prices, dates..."
                className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 text-sm transition-all placeholder:text-slate-400"
              />
              <button 
                type="submit"
                disabled={!query.trim() || loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gold-500 text-slate-900 rounded-lg hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 shadow-md shadow-gold-500/20"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>

        {/* Toggle Button (Only for floating mode) */}
        {!isEmbedded && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`
              pointer-events-auto
              w-14 h-14 rounded-full shadow-2xl shadow-gold-500/30 transition-all duration-500 cubic-bezier(0.19, 1, 0.22, 1) hover:scale-110 active:scale-95 flex items-center justify-center
              ${isOpen ? 'bg-slate-900 text-white rotate-90' : 'bg-gold-500 text-slate-900 rotate-0'}
            `}
            aria-label={isOpen ? "Close chat" : "Open chat"}
          >
            {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
          </button>
        )}
      </div>
    </>
  );
};
    