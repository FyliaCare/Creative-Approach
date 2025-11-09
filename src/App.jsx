import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Industries from './pages/Industries';
import { PrivacyPolicy } from './pages/PrivacyPolicyLegal';
import { TermsOfService } from './pages/TermsOfServiceLegal';
import AerialPhotography from './pages/services/AerialPhotography';
import DroneInspection from './pages/services/DroneInspection';
import MappingSurveying from './pages/services/MappingSurveying';
import DocumentaryFilms from './pages/services/DocumentaryFilms';
import CustomTraining from './pages/services/CustomTraining';
import EmergencyResponse from './pages/services/EmergencyResponse';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ScrollToTop />
      <main className="flex-grow">
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
      </main>
      <Footer />
    </div>
  );
}

export default App;
