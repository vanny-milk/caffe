
import React, { useState, useEffect, useRef } from 'react';

interface MenuItem {
  name: string;
  price: string;
  description?: string;
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
}

interface Testimonial {
  phrase: string;
  author: string;
  avatar: string;
}

const fullMenu: MenuCategory[] = [
  {
    category: "Artisanal Coffee",
    items: [
      { name: "Honey Lavender Latte", price: "$6.25", description: "Espresso, steamed milk, local honey, dried lavender" },
      { name: "Velvet Flat White", price: "$5.50", description: "Ristretto shots with micro-foam" },
      { name: "Cold Brew Tonic", price: "$6.00", description: "12-hour steep, fever tree tonic, orange twist" },
      { name: "Ceremonial Matcha Latte", price: "$6.50", description: "Stone-ground Uji matcha, maple, oat milk" }
    ]
  },
  {
    category: "Boulangerie",
    items: [
      { name: "Pistachio Croissant", price: "$5.75", description: "Twice-baked with house-made pistachio cream" },
      { name: "Pain au Chocolat", price: "$5.25", description: "Valrhona dark chocolate, flaky butter layers" },
      { name: "Almond Morning Bun", price: "$5.50", description: "Cinnamon sugar, toasted almond frangipane" }
    ]
  },
  {
    category: "Signature Brunch",
    items: [
      { name: "Classic Avocado Tartine", price: "$14.50", description: "Chili flakes, lime, organic sourdough" },
      { name: "Truffle Mushroom Toast", price: "$16.00", description: "Wild mushrooms, truffle oil, poached egg" },
      { name: "Shakshuka", price: "$15.50", description: "Spiced tomato sauce, feta, poached eggs, pita" },
      { name: "Brioche French Toast", price: "$17.00", description: "Mascarpone, seasonal berries, honeycomb" },
      { name: "Smoked Salmon Plate", price: "$18.50", description: "Capers, red onion, cream cheese, everything bagel" }
    ]
  }
];

const featuredItems = [
  {
    id: 1,
    name: "Classic Avocado Tartine",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800",
    price: "$14.50",
    description: "Smashed organic avocado, chili flakes, and lime on toasted sourdough.",
    testimonials: [
      { phrase: "The freshest in town!", author: "Marcus Vane", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100" },
      { phrase: "Simply addictive sourdough.", author: "Linda Kean", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100" }
    ]
  },
  {
    id: 2,
    name: "Honey Lavender Latte",
    image: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&q=80&w=800",
    price: "$6.25",
    description: "Espresso with steamed milk, infused with local honey and dried lavender.",
    testimonials: [
      { phrase: "A floral masterpiece.", author: "Sara Blake", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100" },
      { phrase: "My morning tranquility.", author: "James Dean", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" }
    ]
  },
  {
    id: 3,
    name: "Pistachio Croissant",
    image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&q=80&w=800",
    price: "$5.75",
    description: "Twice-baked butter croissant filled with house-made pistachio cream.",
    testimonials: [
      { phrase: "Incredible flaky layers!", author: "Toby Marsh", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100" },
      { phrase: "The cream is so rich.", author: "Emily Rose", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100" }
    ]
  },
  {
    id: 4,
    name: "Brioche French Toast",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=800",
    price: "$17.00",
    description: "Vanilla bean custard-soaked brioche with honeycomb and fresh berries.",
    testimonials: [
      { phrase: "Decadent and light.", author: "Chloe Park", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100&h=100" },
      { phrase: "Worth the wait.", author: "Dan Silva", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100&h=100" }
    ]
  },
  {
    id: 5,
    name: "Smoked Salmon Plate",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800",
    price: "$18.50",
    description: "Premium lox, capers, red onion, cream cheese, and a hand-rolled bagel.",
    testimonials: [
      { phrase: "The lox is incredible.", author: "Oliver Twist", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100" },
      { phrase: "Perfect Sunday brunch.", author: "Anna Scott", avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=100&h=100" }
    ]
  },
  {
    id: 6,
    name: "Shakshuka",
    image: "https://images.unsplash.com/photo-1590412200988-a436bb7050a8?auto=format&fit=crop&q=80&w=800",
    price: "$15.50",
    description: "Two poached eggs in a spiced tomato & bell pepper sauce with feta and warm pita.",
    testimonials: [
      { phrase: "Best shakshuka ever.", author: "Leo Messi", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100" },
      { phrase: "The pita is so warm.", author: "Sofia Berg", avatar: "https://images.unsplash.com/photo-1491349174775-aaafddd81942?auto=format&fit=crop&q=80&w=100&h=100" }
    ]
  },
  {
    id: 7,
    name: "Hojicha Latte",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800",
    price: "$6.50",
    description: "Roasted green tea with velvety steamed oat milk and a hint of vanilla.",
    testimonials: [
      { phrase: "So nutty and comforting.", author: "Yumi Sato", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100" },
      { phrase: "My favorite alternative.", author: "Kevin Hart", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" }
    ]
  }
];

const Favourites: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTestimonialIndices, setActiveTestimonialIndices] = useState<number[]>(featuredItems.map(() => 0));
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-passing testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonialIndices((prev) => 
        prev.map((idx, i) => (idx + 1) % featuredItems[i].testimonials.length)
      );
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const step = clientWidth * 0.7; // Scroll by roughly 70% of view
      const scrollTo = direction === 'left' ? scrollLeft - step : scrollLeft + step;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-24 md:py-32 bg-white relative overflow-hidden" id="menu">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0F1717 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

      <div className="max-w-[100vw] overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-xl text-center md:text-left">
            <span className="font-accent text-cafe-brown text-3xl md:text-4xl">Artisanally crafted</span>
            <h2 className="font-serif text-4xl md:text-6xl text-cafe-dark font-bold mt-2 leading-tight">Our Favourites</h2>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-2">
              <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full border border-cafe-teal/20 flex items-center justify-center text-cafe-teal hover:bg-cafe-teal hover:text-white transition-all active:scale-95">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full border border-cafe-teal/20 flex items-center justify-center text-cafe-teal hover:bg-cafe-teal hover:text-white transition-all active:scale-95">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="text-cafe-teal font-bold flex items-center space-x-2 border-b-2 border-cafe-teal/20 pb-1 hover:border-cafe-teal transition-all group">
              <span>Full Menu</span>
              <svg className="w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </div>
        </div>

        {/* CAROUSEL: Showing 3.5 items on Desktop */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12"
        >
          {/* Padding Start Spacer */}
          <div className="flex-shrink-0 w-6 md:w-[calc((100vw-80rem)/2+1.5rem)]" />
          
          {featuredItems.map((item, i) => (
            <div 
              key={item.id} 
              className="featured-item-card snap-start flex-shrink-0 mr-6 md:mr-8 group flex flex-col h-full bg-cafe-offwhite rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-black/[0.03]"
            >
              <div className="relative h-[300px] md:h-[420px] overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                
                {/* TESTIMONIAL: Top Positioning */}
                <div className="absolute inset-x-0 top-6 flex justify-center px-6 z-20 pointer-events-none">
                  <div className="relative w-full h-20">
                    {item.testimonials.map((testimonial, tIdx) => (
                      <div key={tIdx} className={`absolute inset-0 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/50 flex items-center space-x-3 transition-all duration-1000 transform ${activeTestimonialIndices[i] === tIdx ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95'}`}>
                        <img src={testimonial.avatar} alt={testimonial.author} className="w-10 h-10 rounded-full object-cover border-2 border-cafe-teal/20 shrink-0" />
                        <div className="overflow-hidden">
                          <p className="text-cafe-dark font-serif italic text-xs line-clamp-2 leading-snug">"{testimonial.phrase}"</p>
                          <p className="text-cafe-teal font-bold text-[9px] uppercase tracking-widest mt-1">{testimonial.author}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                
                {/* NAME & PRICE: Side-by-side Positioning */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-10 transform transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-serif text-xl md:text-2xl text-white font-bold leading-tight truncate">
                      {item.name}
                    </h3>
                    <span className="bg-[#8B4F46] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg shrink-0 border border-white/10">
                      {item.price}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-10 flex flex-col flex-grow">
                <p className="text-cafe-teal-dark/70 text-sm md:text-base mb-8 line-clamp-2 italic font-light leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-auto">
                  <button className="w-full py-4 bg-transparent border-2 border-blue-600 text-blue-600 rounded-2xl font-bold group-hover:bg-blue-600 group-hover:text-white transition-all transform active:scale-95 flex items-center justify-center space-x-2">
                    <span>I Want it</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Padding End Spacer */}
          <div className="flex-shrink-0 w-6 md:w-[calc((100vw-80rem)/2+1.5rem)]" />
        </div>

        {/* Mobile View Full Menu link */}
        <div className="mt-4 px-6 text-center md:hidden">
          <button onClick={() => setIsModalOpen(true)} className="bg-cafe-dark text-white w-full py-4 rounded-2xl font-bold text-lg">
            Explore Full Menu
          </button>
        </div>
      </div>

      {/* Full Menu Modal (Logic remains same) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <div className="absolute inset-0 bg-cafe-dark/60 backdrop-blur-md transition-opacity duration-500" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-cafe-offwhite w-full max-w-4xl max-h-full overflow-hidden rounded-[3rem] shadow-2xl flex flex-col animate-in fade-in zoom-in duration-300">
            <div className="p-8 md:p-12 flex justify-between items-center border-b border-black/5 bg-white/50">
              <div>
                <span className="font-accent text-cafe-brown text-2xl">The Full Selection</span>
                <h2 className="font-serif text-3xl md:text-5xl text-cafe-dark font-bold mt-1">Henrietta's Menu</h2>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-full bg-cafe-dark text-white flex items-center justify-center hover:bg-cafe-teal transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="overflow-y-auto p-8 md:p-12 space-y-16">
              {fullMenu.map((cat, idx) => (
                <div key={idx} className="space-y-8">
                  <div className="flex items-center space-x-4">
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-cafe-teal whitespace-nowrap">{cat.category}</h3>
                    <div className="h-px bg-cafe-teal/20 w-full" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {cat.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="group cursor-default">
                        <div className="flex justify-between items-baseline mb-1">
                          <span className="font-bold text-cafe-dark group-hover:text-cafe-teal transition-colors">{item.name}</span>
                          <span className="text-cafe-brown font-bold text-sm bg-cafe-brown/5 px-2 py-0.5 rounded">{item.price}</span>
                        </div>
                        {item.description && <p className="text-sm text-cafe-teal-dark/60 italic font-light">{item.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-8 bg-white border-t border-black/5 flex justify-center">
              <p className="text-cafe-teal-dark/40 text-xs text-center uppercase tracking-widest font-bold">Prices and availability may vary seasonally.</p>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes zoom-in { from { transform: scale(0.95); } to { transform: scale(1); } }
        .animate-in { animation: fade-in 0.3s ease-out, zoom-in 0.3s ease-out; }

        .featured-item-card {
          width: 82vw; /* Mobile: 1.2 items visible roughly */
        }
        @media (min-width: 768px) {
          .featured-item-card {
            /* Tablet: 2.5 items visible */
            width: calc((100% - (2 * 2rem)) / 2.5); 
          }
        }
        @media (min-width: 1024px) {
          .featured-item-card {
            /* Desktop: Exactly 3.5 items visible */
            /* Visible width = (Container - Gaps) / ItemsVisible */
            /* We show 3 full gaps if 3.5 items are visible */
            width: calc((100% - (3 * 2rem)) / 3.5);
          }
        }
      `}</style>
    </div>
  );
};

export default Favourites;
