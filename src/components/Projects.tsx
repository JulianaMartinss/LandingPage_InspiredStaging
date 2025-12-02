import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpRight, BedDouble, Bath, Ruler, ChevronLeft, ChevronRight } from 'lucide-react';

const Projects: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const scrollAmount = 350; // Largura aproximada do cartão + gap

  // 1. ESTRUTURA DE DADOS COMPLETA E CORRIGIDA
  // Todos os imóveis usam 'images' (array) e a extensão .jpeg foi corrigida.
  const homes = [
    {
      images: [
        "/images/house-sold-marietta0.jpeg",
        "/images/house-sold-marietta1.jpeg", 
        "/images/house-sold-marietta2.jpeg", 
        "/images/house-sold-marietta3.jpeg", 
        "/images/house-sold-marietta4.jpeg",
        "/images/house-sold-marietta5.jpeg",
      ],
      address: "4346 Greys Rise SW, Marietta, GA",
      beds: 3,
      baths: 2.5,
      sqft: "1,888",
      price: "$400,000",
      status: "Sold After Staging",
      statusColor: "bg-[#716f5c]",
    },
    {
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1570129477492-452f1e68be40?auto=format&fit=crop&q=80&w=800"
      ],
      address: "450 Riverside Drive",
      beds: 2,
      baths: 2,
      sqft: "1,100",
      price: "$385,000",
      status: "Currently for Sale",
      statusColor: "bg-stone-600",
      url: "https://johngrimes.atlcommunities.com/index.php?property=450-riverside-drive"
    },
    {
      images: ["https://i.pinimg.com/736x/7e/e2/56/7ee2569fb6fe306ecaad1d18c78ea362.jpg"],
      address: "78 Sunnybrook Lane",
      beds: 4,
      baths: 3,
      sqft: "2,200",
      price: "$620,000",
      status: "Sold After Staging",
      statusColor: "bg-[#716f5c]",
      url: "https://johngrimes.atlcommunities.com/index.php?property=78-sunnybrook-lane"
    },
    {
      images: ["https://casaeconstrucao.vivadecora.com.br/wp-content/uploads/2021/09/Casa-moderna-com-fachada-de-vidro-e-jardim-Foto-Quitete-Faria.jpg"],
      address: "920 Highland Park",
      beds: 5,
      baths: 4,
      sqft: "3,100",
      price: "$1,250,000",
      status: "Currently for Sale",
      statusColor: "bg-stone-600",
      url: "https://johngrimes.atlcommunities.com/index.php?property=920-highland-park"
    },
    {
      images: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1549419142-9a0098f9a263?auto=format&fit=crop&q=80&w=800"
      ],
      address: "15 Oakwood Drive",
      beds: 3,
      baths: 2,
      sqft: "1,800",
      price: "$590,000",
      status: "Sold After Staging",
      statusColor: "bg-[#716f5c]",
      url: "https://johngrimes.atlcommunities.com/index.php?property=15-oakwood-drive"
    }
  ];

  // --- Lógica do Carrossel Principal (Horizontal de Cartões) ---
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const tolerance = 5;
      setIsAtStart(scrollLeft <= tolerance);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - tolerance);
    }
  };

  useEffect(() => {
    const scrollElement = scrollContainerRef.current;
    if (scrollElement) {
      checkScrollPosition(); 
      scrollElement.addEventListener('scroll', checkScrollPosition);
    }
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, []); 

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const targetScroll = direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };
  // --- FIM: Lógica do Carrossel Principal ---


  // 2. FUNÇÃO ANINHADA DO CARTÃO (Com Carrossel Interno e Condições)
  const HomeCardWithGallery: React.FC<{ home: typeof homes[0] }> = ({ home }) => {
    // Estado do carrossel interno:
    const [currentImageIndex, setCurrentImageIndex] = useState(0); 
    const totalImages = home.images.length;
    const hasMultipleImages = totalImages > 1;
    // Verifica se a seta deve ser removida
    const isSold = home.status === "Sold After Staging";

    const goToNext = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
    };

    const goToPrev = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
    };

    return (
      <div className="group bg-white rounded-xl overflow-hidden border border-stone-100 shadow-sm flex-shrink-0 w-[85vw] md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] snap-center">
        {/* GALERIA DE FOTOS INTERNA */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={home.images[currentImageIndex]} 
            alt={`${home.address} Photo ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Badge de Status */}
          <div className={`absolute top-4 left-4 ${home.statusColor} text-white px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-md shadow-sm`}>
            {home.status}
          </div>

          {hasMultipleImages && (
            <>
              {/* Botões de Navegação (Overlay) */}
              <button 
                onClick={goToPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white rounded-full hover:bg-black/70 transition z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white rounded-full hover:bg-black/70 transition z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Indicadores de Slide (Pontos) */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
                {home.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(i);
                    }}
                    className={`h-2 w-2 rounded-full transition-all ${
                      i === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
                    }`}
                    aria-label={`View image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        {/* FIM: GALERIA DE FOTOS INTERNA */}

        {/* Detalhes Fixos */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-800">{home.address}</h3>
              <p className="text-stone-500 font-medium mt-1">{home.price}</p>
            </div>
            {/* 🎯 Condição para remover a seta quando o status é "Sold After Staging" */}
            {!isSold && (
              <a
                href={home.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#f0eee9] rounded-full text-stone-600 hover:bg-stone-200 transition-colors"
              >
                <ArrowUpRight className="w-5 h-5" />
              </a>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 border-t border-stone-100 pt-4">
            <div className="flex flex-col items-center">
              <BedDouble className="w-5 h-5 text-stone-400 mb-1" />
              <span className="text-sm font-medium text-stone-600">{home.beds} Beds</span>
            </div>
            <div className="flex flex-col items-center border-l border-stone-100">
              <Bath className="w-5 h-5 text-stone-400 mb-1" />
              <span className="text-sm font-medium text-stone-600">{home.baths} Baths</span>
            </div>
            <div className="flex flex-col items-center border-l border-stone-100">
              <Ruler className="w-5 h-5 text-stone-400 mb-1" />
              <span className="text-sm font-medium text-stone-600">{home.sqft} sq ft</span>
            </div>
          </div>
        </div>
      </div>
    );
  };


  return (
    <section id="projects" className="py-24 bg-[#ede9e2] scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header e Botões de Navegação Principal */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="text-[#716f5c] font-bold tracking-wider uppercase text-sm">Featured Homes</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-800 mt-2">
              Latest Staging Projects
            </h2>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-6 md:mt-0 self-end md:self-auto">
            <button
              onClick={() => scroll('left')}
              disabled={isAtStart}
              className={`p-3 rounded-full border border-stone-400/30 text-stone-600 transition-all duration-300 ${
                isAtStart ? 'opacity-40 cursor-not-allowed' : 'hover:bg-stone-800 hover:text-white hover:border-stone-800'
              }`}
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={isAtEnd}
              className={`p-3 rounded-full border border-stone-400/30 text-stone-600 transition-all duration-300 ${
                isAtEnd ? 'opacity-40 cursor-not-allowed' : 'hover:bg-stone-800 hover:text-white hover:border-stone-800'
              }`}
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carrossel de Cartões */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-8 pb-8 -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {homes.map((home, index) => (
            <HomeCardWithGallery key={index} home={home} /> 
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;