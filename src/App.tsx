import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Gallery from './components/Gallery';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import About from './components/About';
import FAQ from './components/FAQ';
import ContactFooter from './components/ContactFooter';

const App: React.FC = () => {
  return (
    <div className="antialiased text-stone-800 bg-soft-white font-sans selection:bg-stone-200 selection:text-stone-900">
      <Navbar />
      <main>
        {/* 1. Hero Section */}
        <Hero />
        {/* 2. Why Home Staging Works */}
        <Features />
        {/* 3. Before & After Gallery */}
        <Gallery />
        {/* 4. Latest Staging Projects */}
        <Projects />
        {/* 5. Client Reviews (Formerly Video Section) */}
        <Testimonials />
        {/* 6. About Inspired Staging */}
        <About />
        {/* 7. Frequently Asked Questions */}
        <FAQ />
      </main>
      {/* 8. Final CTA & Footer */}
      <ContactFooter />
    </div>
  );
};

export default App;