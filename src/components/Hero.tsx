import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-soft-white">
      {/* Background Image Split */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=2158" 
          alt="Clean and accessible home staging living room" 
          className="w-full h-full object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-soft-white via-soft-white/85 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl animate-fade-in-up">
          
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-stone-900 leading-tight mb-8">
            Transform real homes into inviting spaces that <span className="text-olive-gray">sell faster.</span>
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="https://wa.me/14046435225"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-olive-dark text-white rounded-full font-medium text-lg hover:bg-stone-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Contact
            </a>
            <a 
              href="#gallery" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-stone-800 rounded-full font-medium text-lg hover:bg-[#F3E5DD] hover:text-[#A65A3A] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View Before & After
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;