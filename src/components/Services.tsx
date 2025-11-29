import React from 'react';
import { Home, Camera, Brush, Handshake, Armchair, ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Home className="w-6 h-6" />,
      title: "Full Home Staging",
      description: "Complete furnishing and styling for vacant homes to define spaces and layout."
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Photo-Ready Styling",
      description: "One-day styling session focusing specifically on camera angles for your listing photos."
    },
    {
      icon: <Brush className="w-6 h-6" />,
      title: "Room-by-Room Refresh",
      description: "Strategic updates to key rooms (living, kitchen, master) using your existing items plus our accents."
    },
    {
      icon: <Handshake className="w-6 h-6" />,
      title: "Realtor Partnership",
      description: "Ongoing consultation and staging packages for real estate agents."
    },
    {
      icon: <Armchair className="w-6 h-6" />,
      title: "Furniture Rental",
      description: "Short-term furniture and decor rental to fill empty spaces warmly."
    }
  ];

  return (
    <section id="services" className="py-24 bg-soft-beige/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-olive-gray font-bold tracking-wider uppercase text-sm">Our Services</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-800 mt-2">
            Tailored Solutions for Every Home
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-xl border border-stone-100 hover:border-warm-gray hover:shadow-md transition-all">
              <div className="bg-soft-beige p-3 rounded-lg inline-block text-stone-700 mb-4">
                {service.icon}
              </div>
              <h3 className="font-serif text-xl font-semibold text-stone-800 mb-3">{service.title}</h3>
              <p className="text-stone-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
          
          {/* CTA Card */}
          <div className="bg-stone-800 p-8 rounded-xl flex flex-col justify-center items-start text-white">
            <h3 className="font-serif text-xl font-semibold mb-3">Not sure what you need?</h3>
            <p className="text-stone-300 mb-6">We can help identify the most impactful changes for your budget.</p>
            <a href="#contact" className="inline-flex items-center text-white font-medium hover:text-soft-beige transition-colors">
              See which service fits <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;