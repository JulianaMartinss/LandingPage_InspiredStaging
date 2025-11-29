import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Projects', href: '#projects' },
    { name: 'Client Reviews', href: '#reviews' },
    { name: 'About', href: '#about' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled || isMobileMenuOpen
          ? 'bg-soft-white/95 backdrop-blur-md shadow-sm py-2 border-b border-stone-200/50'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div>
            <span className="text-3xl md:text-4xl font-cursive text-stone-800 transition-all duration-300">
              Inspired Staging
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-stone-600 hover:text-[#5C4033] hover:bg-[#EAD9C8] transition-all duration-300"
              >
                {link.name}
              </a>
            ))}

            <a
              href="#contact"
              className={`ml-4 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${
                isScrolled
                  ? 'border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white'
                  : 'border-stone-800 bg-stone-800 text-white hover:bg-transparent hover:text-stone-800'
              }`}
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-stone-800 p-2 hover:bg-stone-200 rounded-md transition-colors focus:outline-none"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-soft-white transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '64px', height: 'calc(100vh - 64px)' }}
      >
        <div className="flex flex-col p-8 space-y-6 h-full overflow-y-auto border-t border-stone-200">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-serif font-medium text-stone-800 border-b border-stone-100 pb-4 transition-all hover:bg-stone-200"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="bg-stone-800 text-white text-center py-4 rounded-lg font-bold uppercase tracking-widest text-sm mt-4 hover:bg-olive-dark transition-colors shadow-lg"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
