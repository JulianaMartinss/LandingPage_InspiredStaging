import React, { useState, useEffect } from 'react';
import { Play, Upload } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [video1, setVideo1] = useState<string | null>(null);
  const [video2, setVideo2] = useState<string | null>(null);

  useEffect(() => {
    // 1. Load persisted videos
    const savedVid1 = localStorage.getItem('reviewVideo1');
    const savedVid2 = localStorage.getItem('reviewVideo2');
    if (savedVid1) setVideo1(savedVid1);
    if (savedVid2) setVideo2(savedVid2);

    // 2. Check admin status
    const checkAdmin = () => {
      setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    };
    checkAdmin();
    window.addEventListener('adminChange', checkAdmin);
    return () => window.removeEventListener('adminChange', checkAdmin);
  }, []);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>, setVideo: (url: string) => void, storageKey: string) => {
    const file = e.target.files?.[0];
    if (file) {
      // 1. Use ObjectURL for immediate, smooth playback in this session
      const objectUrl = URL.createObjectURL(file);
      setVideo(objectUrl);

      // 2. Try to persist only if file is reasonably small (< 5MB) to avoid blocking main thread or filling storage
      // This prevents the "Storage full" error from crashing the experience
      if (file.size < 5 * 1024 * 1024) {
        const reader = new FileReader();
        reader.onloadend = () => {
          try {
            localStorage.setItem(storageKey, reader.result as string);
          } catch (error) {
            console.warn("Storage full or file too large to persist. Video will play for this session only.");
            // No alert needed, silent fallback
          }
        };
        reader.readAsDataURL(file);
      } else {
        console.warn("File too large for local storage persistence. Playing from memory.");
      }
    }
  };

  return (
    <section id="reviews" className="py-24 bg-white scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-800 mb-4">
            Client Reviews
          </h2>
          <div className="w-20 h-1 bg-olive-gray mx-auto rounded-full mb-6"></div>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Hear directly from homeowners and real estate agents about their experience working with Inspired Staging.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-8 items-center md:items-start">
          {/* Video Review 1 */}
          <div className="flex flex-col gap-4 group items-center w-full max-w-[240px]">
            <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all bg-stone-100">
              {video1 ? (
                <video src={video1} controls className="w-full h-full object-cover object-center" />
              ) : (
                <div className="relative w-full h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
                    alt="Seller Testimonial" 
                    className="w-full h-full object-cover object-center opacity-90" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center pl-1 shadow-lg">
                      <Play className="w-6 h-6 text-olive-dark fill-current" />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Admin Upload Button - Top Right Corner */}
              {isAdmin && (
                <label className="absolute top-2 right-2 z-20 cursor-pointer">
                  <div className="bg-stone-800/80 hover:bg-olive-dark text-white p-2 rounded-full backdrop-blur-md shadow-lg transition-all" title="Change Video">
                    <Upload className="w-5 h-5" />
                  </div>
                  <input type="file" accept="video/*" className="hidden" onChange={(e) => handleVideoUpload(e, setVideo1, 'reviewVideo1')} />
                </label>
              )}
            </div>
            <div className="text-center">
              <h3 className="font-serif text-xl font-bold text-stone-800">Janice's Story</h3>
            </div>
          </div>

          {/* Video Review 2 */}
          <div className="flex flex-col gap-4 group items-center w-full max-w-[240px]">
            <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all bg-stone-100">
               {video2 ? (
                <video src={video2} controls className="w-full h-full object-cover object-center" />
              ) : (
                <div className="relative w-full h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" 
                    alt="Realtor Testimonial" 
                    className="w-full h-full object-cover object-center opacity-90" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center pl-1 shadow-lg">
                      <Play className="w-6 h-6 text-olive-dark fill-current" />
                    </div>
                  </div>
                </div>
              )}

               {/* Admin Upload Button - Top Right Corner */}
               {isAdmin && (
                <label className="absolute top-2 right-2 z-20 cursor-pointer">
                  <div className="bg-stone-800/80 hover:bg-olive-dark text-white p-2 rounded-full backdrop-blur-md shadow-lg transition-all" title="Change Video">
                    <Upload className="w-5 h-5" />
                  </div>
                  <input type="file" accept="video/*" className="hidden" onChange={(e) => handleVideoUpload(e, setVideo2, 'reviewVideo2')} />
                </label>
              )}
            </div>
            <div className="text-center">
              <h3 className="font-serif text-xl font-bold text-stone-800">Doug's Story</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;