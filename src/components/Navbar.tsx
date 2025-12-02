import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isContactPage = location.pathname === "/contact";

  // Detecta scroll para mudar background
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navegação e scroll para seções
  const handleNavigate = (section: string) => {
    setIsMobileMenuOpen(false);

    if (location.pathname !== "/") {
      // Navega para Home com hash
      window.location.href = `/#${section}`;
      return;
    }

    // Atualiza a URL com hash
    window.history.pushState(null, "", `/#${section}`);

    const el = document.getElementById(section);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Why Staging Works', id: 'why-staging-works' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Projects', id: 'projects' },
    { name: 'Client Reviews', id: 'reviews' },
    { name: 'About', id: 'about' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled || isMobileMenuOpen || isContactPage
          ? "bg-white/95 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">

        {/* LOGO */}
        <span className="text-3xl md:text-4xl font-cursive text-stone-800">
          Inspired Staging
        </span>

        {/* DESKTOP */}
        <div className="hidden lg:flex items-center space-x-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavigate(link.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-stone-600
              transition-all duration-300 ${
                isContactPage
                  ? "hover:text-white hover:bg-[#6B705C]"
                  : "hover:text-[#6B705C] hover:bg-[#E6E4D9]"
              }`}
            >
              {link.name}
            </button>
          ))}

          <button
            onClick={() => navigate("/contact")}
            className="ml-4 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest 
            border border-[#6B705C] text-[#6B705C] transition-all duration-300
            hover:bg-[#6B705C] hover:text-white"
          >
            Contact
          </button>
        </div>

        {/* MOBILE ICON */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 rounded-md transition ${
              isContactPage
                ? 'text-[#6B705C] hover:text-white hover:bg-[#6B705C]'
                : 'text-stone-800 hover:text-[#6B705C] hover:bg-[#E6E4D9]'
            }`}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t mt-2 shadow-lg">
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigate(link.id)}
                className={`text-xl text-stone-700 border-b pb-3 transition ${
                  isContactPage
                    ? "hover:text-white hover:bg-[#6B705C]"
                    : "hover:text-[#6B705C] hover:bg-[#E6E4D9]"
                }`}
              >
                {link.name}
              </button>
            ))}

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/contact");
              }}
              className="mt-4 py-3 bg-[#6B705C] text-white font-bold rounded-lg uppercase tracking-widest transition"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;



