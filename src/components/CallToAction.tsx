import React from "react";
import { useNavigate } from "react-router-dom";

const CallToAction: React.FC = () => {
  const navigate = useNavigate();

  const goToContact = () => {
    // vai para a rota /contact (sem state para evitar scroll indesejado)
    navigate("/contact");
  };

  return (
    <section
      className="relative w-full py-28 px-6 text-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/calltoactionpic.avif')" }}
    >
      {/* overlay blur branco/oliva leve */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-xl"></div>

      <div className="relative max-w-3xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-stone-800 mb-6">
          Ready to elevate your property?
        </h2>

        <button
          onClick={goToContact}
          className={`
            px-8 py-4 rounded-full font-semibold tracking-wide
            bg-black text-white shadow-lg transition-all duration-300
            hover:scale-105
            button-bounce
            `}
          style={{ /* fallback color for older browsers */ }}
        >
          <span
            className="transition-colors duration-300"
            style={{ /* color will flip via Tailwind hover classes below */ }}
          >
            Contact Us
          </span>
        </button>
      </div>

      {/* Tailwind pseudo hover color: we need to override background on hover.
          Since inline class can't mix hover:bg-... with button-bounce, add it here via utility classes */}
      <style jsx>{`
        /* Extra: make the button turn olive on hover */
        button:hover { background-color: #6b705c !important; color: white !important; border-color: rgba(255,255,255,0.06); }
      `}</style>
    </section>
  );
};

export default CallToAction;

