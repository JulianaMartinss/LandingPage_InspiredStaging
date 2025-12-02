import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

const ContactFooter: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = (section: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${section}`);
      return;
    }
    window.history.pushState({}, "", `/#${section}`);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#a69a8b] pt-16 pb-8 border-t border-white/10 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* LOGO + SOCIAL */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-white mb-6">Inspired Staging</h3>
            <div className="flex space-x-4">
              <a href="#" style={{ color: '#f4f1ed' }}>
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100057303105494"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#f4f1ed' }}
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Contact</h4>
            <div className="space-y-4" style={{ color: '#f4f1ed' }}>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4" />
                <span>+1 404-643-5225</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span>nastia_m@hotmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4" />
                <span>Atlanta, GA</span>
              </div>
            </div>
          </div>

          {/* EXPLORE */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Explore</h4>
            <ul className="space-y-3" style={{ color: '#f4f1ed' }}>
              {[
                { id: "home", label: "Home" },
                { id: "why-staging-works", label: "Why Staging Works" },
                { id: "gallery", label: "Gallery" },
                { id: "projects", label: "Latest Projects" },
                { id: "about", label: "About" },
                { id: "faq", label: "FAQ" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => goToSection(item.id)}
                    style={{ 
                      color: '#f4f1ed',
                      backgroundColor: 'transparent',
                      border: 'none',
                      padding: 0,
                      font: 'inherit',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#f4f1ed'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#f4f1ed'}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-stone-200 text-sm">
          &copy; {new Date().getFullYear()} Inspired Staging. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;

