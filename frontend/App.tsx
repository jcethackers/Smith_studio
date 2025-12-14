
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Gallery } from './pages/Gallery';
import { Book } from './pages/Book';
import { Services } from './pages/Services';
import { Help } from './pages/Help';
import { Testimonials } from './pages/Testimonials';
import { LatestWorks } from './pages/LatestWorks';
import { About } from './pages/About';
import { AiAssistant } from './components/AiAssistant';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const MainContent: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-900 bg-slate-50">
      <ScrollToTop />
      <Navbar />
      {/* 
         On Home page, we want the Hero to go to the top (0px), so no top padding.
         On other pages, we need padding so the fixed navbar doesn't cover content. 
      */}
      <main className={`flex-grow ${isHome ? '' : 'pt-20'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/services" element={<Services />} />
          <Route path="/book" element={<Book />} />
          <Route path="/help" element={<Help />} />
          <Route path="/stories" element={<Testimonials />} />
          <Route path="/latest-works" element={<LatestWorks />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <AiAssistant mode="floating" />
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <MainContent />
    </Router>
  );
};

export default App;
