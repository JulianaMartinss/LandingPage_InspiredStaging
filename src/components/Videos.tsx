import React from 'react';
import { Play } from 'lucide-react';

const Videos: React.FC = () => {
  return (
    <section id="videos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-800">
            See Inspired Staging in Action
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Video 1 */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-video bg-stone-200 rounded-xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg transition-all">
              <img 
                src="https://images.unsplash.com/photo-1595856754896-1c251430045c?auto=format&fit=crop&q=80&w=800" 
                alt="How Home Staging Works" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center pl-1 shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-olive-dark fill-current" />
                </div>
              </div>
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-800">How Home Staging Works</h3>
            <p className="text-stone-600">A quick walkthrough of our process from consultation to final reveal.</p>
          </div>

          {/* Video 2 */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-video bg-stone-200 rounded-xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg transition-all">
              <img 
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?auto=format&fit=crop&q=80&w=800" 
                alt="Behind the Scenes" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
              />
               <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center pl-1 shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-olive-dark fill-current" />
                </div>
              </div>
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-800">Behind the Scenes</h3>
            <p className="text-stone-600">Watch our team transform a vacant property into a warm, inviting home.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Videos;