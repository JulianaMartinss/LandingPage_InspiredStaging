import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';

const About: React.FC = () => {
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Load persisted image
    const savedImage = localStorage.getItem('aboutImage');
    if (savedImage) setCustomImage(savedImage);

    // Check admin status
    const checkAdmin = () => {
      setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    };
    checkAdmin();
    window.addEventListener('adminChange', checkAdmin);
    return () => window.removeEventListener('adminChange', checkAdmin);
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setCustomImage(base64String);
        try {
          localStorage.setItem('aboutImage', base64String);
        } catch (e) {
          console.warn("Could not save image to local storage (likely full). Image will be lost on refresh.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="about" className="py-24 bg-[#a69a8b] scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full md:w-1/3">
            <div className="relative group">
              <div className="absolute top-4 left-4 w-full h-full border-2 border-white/30 rounded-2xl z-0"></div>
              <div className="relative z-10 rounded-2xl shadow-xl overflow-hidden aspect-[3/4]">
                 <img 
                  src={customImage || "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=800"} 
                  alt="Nastia Grimes - Inspired Staging" 
                  className="w-full h-full object-cover"
                />
                
                {/* Admin Only Upload */}
                {isAdmin && (
                  <label 
                    htmlFor="about-image-upload" 
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <div className="bg-white/90 text-stone-800 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
                      <Camera className="w-4 h-4" /> Change Photo
                    </div>
                    <input 
                      id="about-image-upload" 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
          
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