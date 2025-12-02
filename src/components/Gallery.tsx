import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeftRight, ChevronLeft, ChevronRight, Upload, Image as ImageIcon, X } from 'lucide-react';

// Variável de ambiente para o caminho base
const base = import.meta.env.BASE_URL || '/';

// ==============================================================================
// CONFIGURAÇÃO DA GALERIA - caminhos relativos à pasta /public/images/
// ==============================================================================
const INITIAL_PROJECTS_DATA = [
  {
    id: 1,
    title: "Master Room",
    beforeImg: `${base}images/before-room.jpeg`,
    afterImg: `${base}images/after-room.jpeg`,
    category: "Bedroom",
  },
  {
    id: 2,
    title: "Dining Room",
    beforeImg: `${base}images/before-dinng-room.jpeg`,
    afterImg: `${base}images/after-dinng-room.jpeg`,
    category: "Dining",
  },
  {
    id: 3,
    title: "Living Room",
    beforeImg: `${base}images/before-sala.jpeg`,
    afterImg: `${base}images/after-sala.jpeg`,
    category: "Living",
  },
];

// Definição de tipo
type Project = typeof INITIAL_PROJECTS_DATA[0];

// ============================================================================
// COMPONENTE MODAL DE SLIDE (LIGHTBOX)
// ============================================================================
interface ImageModalProps {
    project: Project;
    onClose: () => void;
    customImages: Record<number, { before: string | null; after: string | null }>;
}

const ImageModal: React.FC<ImageModalProps> = ({ project, onClose, customImages }) => {
  const [isAfter, setIsAfter] = useState(false);

  const customForThis = customImages[project.id];
  const finalBeforeImg = customForThis?.before || project.beforeImg;
  const finalAfterImg = customForThis?.after || project.afterImg;

  if (!finalBeforeImg || !finalAfterImg) return null; 

  const navigate = useCallback((direction: 'next' | 'prev') => {
    if (direction === 'next') setIsAfter(true);
    else setIsAfter(false);
  }, []);

  // Handlers de Teclado
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      else if (event.key === 'ArrowRight') navigate('next');
      else if (event.key === 'ArrowLeft') navigate('prev');
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [onClose, navigate]);
  
  // Swipe touch
  const startX = useRef(0);
  const isDragging = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const diffX = startX.current - e.touches[0].clientX;
    if (Math.abs(diffX) > 50) {
      if (diffX > 0 && !isAfter) navigate('next');
      else if (diffX < 0 && isAfter) navigate('prev');
      isDragging.current = false;
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="relative w-full h-full max-w-7xl max-h-[90vh] overflow-hidden rounded-xl shadow-2xl" 
        onClick={e => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex w-[200%] h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(${isAfter ? '-50%' : '0%'})` }}
        >
          <div className="w-1/2 h-full flex-shrink-0 relative bg-stone-900">
            <img src={finalBeforeImg} alt={`${project.title} Before`} className="w-full h-full object-contain" />
            <span className="absolute bottom-4 left-4 bg-stone-900/70 text-white px-4 py-2 rounded-lg font-bold">BEFORE</span>
          </div>
          <div className="w-1/2 h-full flex-shrink-0 relative bg-stone-900">
            <img src={finalAfterImg} alt={`${project.title} After`} className="w-full h-full object-contain" />
            <span className="absolute bottom-4 left-4 bg-stone-900/70 text-white px-4 py-2 rounded-lg font-bold">AFTER</span>
          </div>
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); navigate('prev'); }} 
          disabled={!isAfter} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/80 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button 
          onClick={(e) => { e.stopPropagation(); navigate('next'); }} 
          disabled={isAfter} 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/80 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed z-10"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute top-0 w-full flex justify-between items-center px-6 py-4 text-white bg-black/50 z-10">
          <div className="w-8"></div>
          <h3 className="text-xl font-serif font-semibold">{project.title}</h3>
          <button onClick={onClose} className="p-2 rounded-full text-white hover:bg-white/20 transition-colors" aria-label="Close modal">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENTE PRINCIPAL GALLERY
// ============================================================================
const Gallery: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [projects] = useState(INITIAL_PROJECTS_DATA);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [customImages, setCustomImages] = useState<Record<number, { before: string | null; after: string | null }>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('galleryCustomImages');
    if (saved) {
      try {
        setCustomImages(JSON.parse(saved));
      } catch { console.error("Failed to parse saved gallery images"); }
    }
    const checkAdmin = () => setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    checkAdmin();
    window.addEventListener('adminChange', checkAdmin);
    return () => window.removeEventListener('adminChange', checkAdmin);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = scrollContainerRef.current.clientWidth < 768 ? 320 : 400;
    const targetScroll = direction === 'left'
      ? scrollContainerRef.current.scrollLeft - scrollAmount
      : scrollContainerRef.current.scrollLeft + scrollAmount;
    scrollContainerRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, projectId: number, type: 'before' | 'after') => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setCustomImages(prev => {
        const newState = {
          ...prev,
          [projectId]: {
            ...(prev[projectId] || { before: null, after: null }),
            [type]: base64String,
          },
        };
        localStorage.setItem('galleryCustomImages', JSON.stringify(newState));
        return newState;
      });
    };
    reader.readAsDataURL(file);
  };

  const openModal = (project: Project) => {
    const customForThis = customImages[project.id];
    if ((customForThis?.before || project.beforeImg) && (customForThis?.after || project.afterImg)) {
      setSelectedProject(project);
    }
  };

  const closeModal = () => setSelectedProject(null);

  return (
    <section id="gallery" className="py-24 bg-white scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <span className="text-olive-gray font-bold tracking-wider uppercase text-sm">Transformations</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-800 mt-2">Before & After Gallery</h2>
            <p className="text-stone-600 mt-4 text-lg">Small improvements. Big visual impact. Hover or tap to see the difference.</p>
          </div>
          <div className="flex gap-3 mt-6 md:mt-0">
            <button onClick={() => scroll('left')} className="p-3 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-800 hover:text-white hover:border-stone-800 transition-all duration-300" aria-label="Previous slide">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scroll('right')} className="p-3 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-800 hover:text-white hover:border-stone-800 transition-all duration-300" aria-label="Next slide">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div ref={scrollContainerRef} className="flex overflow-x-auto gap-8 pb-8 -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth snap-x snap-mandatory scrollbar-hide">
          {projects.map(project => {
            const customForThis = customImages[project.id];
            const finalBeforeImg = customForThis?.before || project.beforeImg;
            const finalAfterImg = customForThis?.after || project.afterImg;
            const hasImages = finalBeforeImg && finalAfterImg;

            return (
              <div key={project.id} className="relative group rounded-xl overflow-hidden shadow-sm hover:shadow-md cursor-default min-w-[300px] md:min-w-[400px] h-80 bg-stone-100 flex-shrink-0 snap-center border border-stone-200"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* IMAGES & CLICK */}
                <div className={`relative w-full h-full ${!isAdmin && hasImages ? 'cursor-pointer' : ''}`}
                     onClick={!isAdmin && hasImages ? () => openModal(project) : undefined}>
                  {finalAfterImg && <img src={finalAfterImg} alt={`${project.title} After`} className="absolute inset-0 w-full h-full object-cover" />}
                  {finalBeforeImg && (
                    <div className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${hoveredId === project.id ? 'opacity-0' : 'opacity-100'}`}>
                      <img src={finalBeforeImg} alt={`${project.title} Before`} className="w-full h-full object-cover" />
                      <div className="absolute top-4 left-4 bg-stone-900/70 text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide backdrop-blur-sm z-10 pointer-events-none">Before</div>
                    </div>
                  )}
                  <div className={`absolute top-4 left-4 bg-olive-dark/90 text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide transition-opacity duration-500 backdrop-blur-sm z-10 pointer-events-none ${hoveredId === project.id ? 'opacity-100' : 'opacity-0'}`}>After</div>
                  {hasImages && (
                    <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md p-3 rounded-full text-white transition-opacity duration-300 z-10 pointer-events-none ${hoveredId === project.id ? 'opacity-0' : 'opacity-100'}`}>
                      <ArrowLeftRight className="w-6 h-6" />
                    </div>
                  )}
                </div>

                {/* INFO CARD */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-stone-900/80 to-transparent p-6 pt-12 z-10 pointer-events-none">
                  <span className="text-stone-200 text-xs font-medium uppercase tracking-wider">{project.category}</span>
                  <h3 className="text-white font-serif text-xl font-semibold mt-1">{project.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedProject && <ImageModal project={selectedProject} onClose={closeModal} customImages={customImages} />}
    </section>
  );
};

export default Gallery;
