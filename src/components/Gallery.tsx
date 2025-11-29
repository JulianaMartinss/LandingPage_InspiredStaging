import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeftRight, ChevronLeft, ChevronRight, Upload, Image as ImageIcon } from 'lucide-react';

import masterBefore from "../media/before-room.jpeg";
import masterAfter from "../media/after-room.jpeg";

import diningroomBefore from "../media/before-dinng room.jpeg";
import diningroomAfter from "../media/after-dinng room.jpeg";

import livingroomBefore from "../media/before-sala.jpeg";
import livingroomAfter from "../media/after-sala.jpeg";



// ==============================================================================
// CONFIGURAÇÃO DA GALERIA
// ==============================================================================
const INITIAL_PROJECTS_DATA = [
  {
    id: 1,
    title: "Master Room",
    category: "Residential",
    beforeImg: masterBefore,
    afterImg: masterAfter
  },
  {
    id: 2,
    title: "Dining Room",
    category: "Residential",
    beforeImg: diningroomBefore,
    afterImg: diningroomAfter
  },
  {
    id: 3,
    title: "Living Room",
    category: "Residential",
    beforeImg: livingroomBefore,
    afterImg: livingroomAfter
  },

];

const Gallery: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [projects, setProjects] = useState(INITIAL_PROJECTS_DATA);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // State to hold uploaded images URLs for each project ID
  const [customImages, setCustomImages] = useState<Record<number, {before: string | null, after: string | null}>>({});

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Load persisted images from localStorage
    const saved = localStorage.getItem('galleryCustomImages');
    if (saved) {
      try {
        setCustomImages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved gallery images");
      }
    }

    // 2. Check admin status
    const checkAdmin = () => {
      setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    };
    checkAdmin();
    window.addEventListener('adminChange', checkAdmin);
    return () => window.removeEventListener('adminChange', checkAdmin);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth < 768 ? 320 : 400;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, projectId: number, type: 'before' | 'after') => {
    const file = event.target.files?.[0];
    if (file) {
      // Use FileReader to create base64 string for persistence
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        
        setCustomImages(prev => {
          const newState = {
            ...prev,
            [projectId]: {
              ...(prev[projectId] || { before: null, after: null }),
              [type]: base64String
            }
          };
          // Save to localStorage immediately
          try {
            localStorage.setItem('galleryCustomImages', JSON.stringify(newState));
          } catch (e) {
            console.error("Storage full, could not save image");
            // Fail silently - image updates in state but won't persist
          }
          return newState;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-white scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <span className="text-olive-gray font-bold tracking-wider uppercase text-sm">Transformations</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-800 mt-2">
              Before & After Gallery
            </h2>
            <p className="text-stone-600 mt-4 text-lg">
              Small improvements. Big visual impact. Hover or tap to see the difference.
            </p>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-6 md:mt-0">
            <button 
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-800 hover:text-white hover:border-stone-800 transition-all duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-800 hover:text-white hover:border-stone-800 transition-all duration-300"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-8 pb-8 -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {projects.map((project) => {
            // Check if we have custom images for this ID
            const customForThis = customImages[project.id];
            const finalBeforeImg = customForThis?.before || project.beforeImg;
            const finalAfterImg = customForThis?.after || project.afterImg;
            
            const hasImages = finalBeforeImg && finalAfterImg;

            return (
              <div 
                key={project.id} 
                className="relative group rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer min-w-[300px] md:min-w-[400px] h-80 bg-stone-100 flex-shrink-0 snap-center border border-stone-200"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* UPLOAD UI OVERLAY - Only visible to ADMIN */}
                {isAdmin && (
                  <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center bg-stone-50/95 p-6 text-center space-y-4 transition-opacity duration-300 ${hasImages ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                      <h3 className="font-serif text-xl font-bold text-stone-800">{hasImages ? "Change Photos" : "Add Photos"}</h3>
                      
                      <div className="flex gap-2 w-full">
                        {/* Before Upload */}
                        <label 
                          htmlFor={`before-upload-${project.id}`}
                          className="flex-1 border-2 border-dashed border-stone-300 rounded-lg p-2 flex flex-col items-center justify-center hover:bg-stone-100 transition-colors cursor-pointer h-32"
                        >
                          {customForThis?.before ? (
                            <img src={customForThis.before} className="w-full h-full object-cover rounded" />
                          ) : (
                            <>
                              <ImageIcon className="w-6 h-6 text-stone-400 mb-2" />
                              <span className="text-[10px] font-bold text-stone-600 uppercase">Before</span>
                            </>
                          )}
                          <input 
                            id={`before-upload-${project.id}`}
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, project.id, 'before')}
                          />
                        </label>

                        {/* After Upload */}
                        <label 
                          htmlFor={`after-upload-${project.id}`}
                          className="flex-1 border-2 border-dashed border-stone-300 rounded-lg p-2 flex flex-col items-center justify-center hover:bg-stone-100 transition-colors cursor-pointer h-32"
                        >
                          {customForThis?.after ? (
                            <img src={customForThis.after} className="w-full h-full object-cover rounded" />
                          ) : (
                            <>
                              <Upload className="w-6 h-6 text-olive-dark mb-2" />
                              <span className="text-[10px] font-bold text-olive-dark uppercase">After</span>
                            </>
                          )}
                          <input 
                            id={`after-upload-${project.id}`}
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, project.id, 'after')}
                          />
                        </label>
                      </div>
                    </div>
                  )}

                {/* Image Container */}
                <div className="relative w-full h-full">
                  {/* Render Images if available */}
                  {finalAfterImg && (
                    <img 
                      src={finalAfterImg} 
                      alt={`${project.title} After`} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  
                  {/* Before Image (Overlay that fades out) */}
                  {finalBeforeImg && (
                    <div 
                      className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${hoveredId === project.id ? 'opacity-0' : 'opacity-100'}`}
                    >
                      <img 
                        src={finalBeforeImg} 
                        alt={`${project.title} Before`} 
                        className="w-full h-full object-cover"
                      />
                      {/* Label Badge */}
                      <div className="absolute top-4 left-4 bg-stone-900/70 text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide backdrop-blur-sm z-10 pointer-events-none">
                        Before
                      </div>
                    </div>
                  )}

                  {/* "After" Label Badge - Only shows when hovered */}
                   <div className={`absolute top-4 left-4 bg-olive-dark/90 text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide transition-opacity duration-500 backdrop-blur-sm z-10 pointer-events-none ${hoveredId === project.id ? 'opacity-100' : 'opacity-0'}`}>
                      After
                    </div>
                  
                  {/* Hover Action Icon - Visual cue if images exist */}
                  {hasImages && (
                    <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md p-3 rounded-full text-white transition-opacity duration-300 z-10 pointer-events-none ${hoveredId === project.id ? 'opacity-0' : 'opacity-100'}`}>
                      <ArrowLeftRight className="w-6 h-6" />
                    </div>
                  )}
                </div>

                {/* Info Card */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-stone-900/80 to-transparent p-6 pt-12 z-10 pointer-events-none">
                  <span className="text-stone-200 text-xs font-medium uppercase tracking-wider">{project.category}</span>
                  <h3 className="text-white font-serif text-xl font-semibold mt-1">{project.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Gallery;