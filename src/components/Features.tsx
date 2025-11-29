import React from 'react';
import { TrendingUp, Heart, Wallet } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <TrendingUp className="w-8 h-8 text-olive-gray" />,
      title: "Faster Sales",
      description: "Well-prepared spaces attract more attention and increase perceived value, helping you sell in record time."
    },
    {
      icon: <Heart className="w-8 h-8 text-olive-gray" />,
      title: "Emotional Connection",
      description: "Buyers imagine the lifestyle, not just an empty property. We create warmth that resonates instantly."
    },
    {
      icon: <Wallet className="w-8 h-8 text-olive-gray" />,
      title: "Accessible Pricing",
      description: "Professional staging that is realistic and attainable, tailored to everyday homes rather than just luxury estates."
    }
  ];

  return (
    <section id="why-staging-works" className="py-24 bg-[#ede9e2] scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-800 mb-6">
            Why Home Staging Works
          </h2>
          <div className="w-20 h-1 bg-olive-gray mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-sm border border-stone-100"
            >
              <div className="mb-6 p-5 rounded-full bg-[#ede9e2] text-olive-gray">
                {feature.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-800 mb-4">
                {feature.title}
              </h3>
              <p className="text-stone-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;