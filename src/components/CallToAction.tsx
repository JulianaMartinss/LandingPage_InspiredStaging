import React from "react";
import { useNavigate } from "react-router-dom";

const CallToAction: React.FC = () => {
  const navigate = useNavigate();

  const goToContact = () => {
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
          className="
            px-8 py-4 rounded-full font-semibold tracking-wide
            bg-black text-white shadow-lg transition-all duration-300
            hover:scale-105 hover:bg-[#6b705c] hover:text-white
            button-bounce
          "
        >
          Contact Us
        </button>
      </div>
    </section>
  );
};

export default CallToAction;


