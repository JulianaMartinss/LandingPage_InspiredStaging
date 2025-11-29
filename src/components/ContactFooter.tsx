import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Lock, Unlock, X } from 'lucide-react';

const ContactFooter: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const adminState = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminState);
  }, []);

  const handleSecretClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 7) {
      if (isAdmin) {
        localStorage.setItem('isAdmin', 'false');
        setIsAdmin(false);
        alert("Admin mode deactivated.");
        window.dispatchEvent(new Event('adminChange'));
      } else {
        setShowLoginModal(true);
        setErrorMsg('');
        setPasswordInput('');
      }
      setClickCount(0);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "Msd@96457773") {
      localStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
      setShowLoginModal(false);
      window.dispatchEvent(new Event('adminChange'));
    } else {
      setErrorMsg("Incorrect password");
    }
  };

  return (
    <footer>
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/60 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm relative animate-fade-in-up">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-stone-800 mb-2">Admin Access</h3>
            <p className="text-stone-600 text-sm mb-6">Enter password to edit site content.</p>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <input 
                  type="password" 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Password"
                  autoFocus
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-olive-gray focus:ring-2 focus:ring-olive-gray/20 outline-none transition-all"
                />
                {errorMsg && <p className="text-red-500 text-xs mt-2 font-medium">{errorMsg}</p>}
              </div>

              <button 
                type="submit" 
                className="w-full bg-stone-800 text-white font-bold py-3 rounded-lg hover:bg-olive-dark transition-colors"
              >
                Unlock Editor
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Final CTA Section */}
      <div className="relative py-32 bg-stone-200 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=2000" 
            alt="Background" 
            className="w-full h-full object-cover blur-sm" 
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-stone-800 mb-6">
            Ready to elevate your property?
          </h2>
          <a 
            href="https://wa.me/14046435225"
            target="_blank"
            rel="noopener noreferrer"
          >
          <button className="bg-stone-800 text-white font-bold py-4 px-12 rounded-full hover:bg-olive-dark transition-colors shadow-lg transform hover:-translate-y-1">
            Contact Us
          </button>
          </a>
        </div>
      </div>

      {/* Footer Contact Info */}
      <div id="contact" className="bg-[#a69a8b] pt-16 pb-8 border-t border-white/10 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="font-serif text-2xl font-bold text-white mb-6">Inspired Staging</h3>
              
              <div className="flex space-x-4">
                <a href="#" className="text-stone-200 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="https://www.facebook.com/profile.php?id=100057303105494" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-200 hover:text-white transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>

              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Contact</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-stone-100">
                  <Phone className="w-4 h-4 text-stone-200" />
                  <span>+1 404-643-5225</span>
                </div>
                <div className="flex items-center gap-3 text-stone-100">
                  <Mail className="w-4 h-4 text-stone-200" />
                  <span>nastia_m@hotmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-stone-100">
                  <MapPin className="w-4 h-4 text-stone-200" />
                  <span>Atlanta, GA</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Explore</h4>
              <ul className="space-y-3 text-stone-100">
                <li><a href="#home" className="hover:text-white hover:underline underline-offset-4 decoration-white transition-all">Home</a></li>
                <li><a href="#why-staging-works" className="hover:text-white hover:underline underline-offset-4 decoration-white transition-all">Why Staging Works</a></li>
                <li><a href="#gallery" className="hover:text-white hover:underline underline-offset-4 decoration-white transition-all">Gallery</a></li>
                <li><a href="#projects" className="hover:text-white hover:underline underline-offset-4 decoration-white transition-all">Latest Projects</a></li>
                <li><a href="#about" className="hover:text-white hover:underline underline-offset-4 decoration-white transition-all">About</a></li>
                <li><a href="#faq" className="hover:text-white hover:underline underline-offset-4 decoration-white transition-all">FAQ</a></li>
              </ul>
            </div>
          </div>

          {/* Secret Admin Click */}
          <div 
            onClick={handleSecretClick} 
            className="border-t border-white/20 pt-8 text-center text-stone-200 text-sm flex justify-center items-center gap-2 cursor-pointer select-none py-4 rounded-lg"
          >
            <p className={isAdmin ? 'text-white font-bold' : ''}>
              &copy; {new Date().getFullYear()} Inspired Staging. All rights reserved.
            </p>
            {isAdmin ? <Unlock className="w-3 h-3 text-white" /> : <Lock className="w-3 h-3 opacity-30" />}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
