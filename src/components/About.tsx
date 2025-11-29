import React from "react";

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#a69a8b] scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          {/* FOTO LOCAL */}
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative group w-fit">

              {/* Moldura atrás */}
              <div className="absolute top-3 left-3 w-full h-full border-2 border-white/30 rounded-2xl z-0"></div>

              {/* Container da imagem */}
              <div className="relative z-10 rounded-2xl shadow-xl overflow-hidden aspect-[4/5] w-64">
                <img
                  src="assets/about-pic.png"
                  alt="Nastia Grimes - Inspired Staging"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>

          {/* TEXTO */}
          <div className="w-full md:w-2/3">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-2 mb-6 underline underline-offset-8 decoration-white/30">
              About Inspired Staging
            </h2>

            <p className="text-stone-100 text-lg leading-relaxed mb-6">
              My name is Nastia Grimes, founder of Inspired Staging. Since 2013, I’ve been helping transform homes into inviting, memorable spaces that stand out to buyers.
            </p>

            <p className="text-stone-100 leading-relaxed mb-8">
              I believe great presentation doesn’t require a luxury budget — just thoughtful design and attention to detail. My goal is to help homeowners and realtors showcase each property’s true potential through clean, warm, and intentional styling.
            </p>

            <div className="space-y-4">
              <p className="font-serif italic text-xl text-white">
                “I focus on creating spaces filled with light, comfort, and flow — the kind that buyers instantly connect with.”
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
