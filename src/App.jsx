import React, { useEffect, lazy, Suspense, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QuoteBot from './components/QuoteBot';
import { MessageCircle } from 'lucide-react';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const Industries = lazy(() => import('./pages/Industries'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicyLegal').then(module => ({ default: module.PrivacyPolicy })));
const TermsOfService = lazy(() => import('./pages/TermsOfServiceLegal').then(module => ({ default: module.TermsOfService })));
const AerialPhotography = lazy(() => import('./pages/services/AerialPhotography'));
const DroneInspection = lazy(() => import('./pages/services/DroneInspection'));
const MappingSurveying = lazy(() => import('./pages/services/MappingSurveying'));
const DocumentaryFilms = lazy(() => import('./pages/services/DocumentaryFilms'));
const CustomTraining = lazy(() => import('./pages/services/CustomTraining'));
const EmergencyResponse = lazy(() => import('./pages/services/EmergencyResponse'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component for suspense fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-gray-600 font-medium">Loading...</p>
    </div>
  </div>
);

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  const location = useLocation();
  const [isQuoteBotOpen, setIsQuoteBotOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ScrollToTop />
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/aerial-photography" element={<AerialPhotography />} />
            <Route path="/services/drone-inspection" element={<DroneInspection />} />
            <Route path="/services/mapping-surveying" element={<MappingSurveying />} />
            <Route path="/services/documentary-films" element={<DocumentaryFilms />} />
            <Route path="/services/custom-training" element={<CustomTraining />} />
            <Route path="/services/emergency-response" element={<EmergencyResponse />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
      
      {/* Floating Get Quote Button */}
      <button
        onClick={() => setIsQuoteBotOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-drone-600 to-sky-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center gap-2 group"
        aria-label="Get Quote"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="font-semibold pr-2 max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300">
          Get Quote
        </span>
      </button>

      {/* Quote Bot Modal */}
      <QuoteBot isOpen={isQuoteBotOpen} onClose={() => setIsQuoteBotOpen(false)} />
    </div>
  );
}

export default App;
