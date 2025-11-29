import React, { useRef } from 'react';
import { ArrowUpRight, BedDouble, Bath, Ruler, ChevronLeft, ChevronRight } from 'lucide-react';

const Projects: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const homes = [
    {
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800",
      address: "123 Maple Avenue",
      beds: 3,
      baths: 2,
      sqft: "1,450",
      price: "$475,000",
      status: "Sold After Staging",
      statusColor: "bg-olive-dark",
      url: "https://johngrimes.atlcommunities.com/index.php?property=123-maple-avenue"
    },
    {
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
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
      image: "https://i.pinimg.com/736x/7e/e2/56/7ee2569fb6fe306ecaad1d18c78ea362.jpg",
      address: "78 Sunnybrook Lane",
      beds: 4,
      baths: 3,
      sqft: "2,200",
      price: "$620,000",
      status: "Sold After Staging",
      statusColor: "bg-olive-dark",
      url: "https://johngrimes.atlcommunities.com/index.php?property=78-sunnybrook-lane"
    },
    {
      image: "https://casaeconstrucao.vivadecora.com.br/wp-content/uploads/2021/09/Casa-moderna-com-fachada-de-vidro-e-jardim-Foto-Quitete-Faria.jpg",
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
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800",
      address: "15 Oakwood Drive",
      beds: 3,
      baths: 2,
      sqft: "1,800",
      price: "$590,000",
      status: "Sold After Staging",
      statusColor: "bg-olive-dark",
      url: "https://johngrimes.atlcommunities.com/index.php?property=15-oakwood-drive"
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350; // Approximate card width + gap
      const targetScroll = direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="projects" className="py-24 bg-[#ede9e2] scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="text-olive-gray font-bold tracking-wider uppercase text-sm">Featured Homes</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-800 mt-2">
              Latest Staging Projects
            </h2>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-6 md:mt-0 self-end md:self-auto">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-stone-400/30 text-stone-600 hover:bg-stone-800 hover:text-white hover:border-stone-800 transition-all duration-300"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-stone-400/30 text-stone-600 hover:bg-stone-800 hover:text-white hover:border-stone-800 transition-all duration-300"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-8 pb-8 -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {homes.map((home, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl overflow-hidden border border-stone-100 shadow-sm flex-shrink-0 w-[85vw] md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] snap-center"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={home.image}
                  alt={home.address}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className={`absolute top-4 left-4 ${home.statusColor} text-white px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-md shadow-sm`}>
                  {home.status}
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-stone-800">{home.address}</h3>
                    <p className="text-olive-gray font-medium mt-1">{home.price}</p>
                  </div>
                  <a
                    href={home.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-soft-beige rounded-full text-stone-600 hover:bg-stone-200 transition-colors"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>

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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
