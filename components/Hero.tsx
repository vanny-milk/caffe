
import React from 'react';

const Hero: React.FC = () => {
  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      window.scrollTo({
        top: menuSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-cafe-dark">
      {/* LAYER 4: [video em loop] */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-80"
        >
          <source 
            src="https://player.vimeo.com/external/494163967.sd.mp4?s=6a57c5a01946059e74d156c703d2974d6a69366e&profile_id=165" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* LAYER 3: [cor] */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-cafe-dark/90 via-cafe-dark/50 to-transparent md:bg-cafe-dark/40" />

      {/* LAYER 2: [textura] */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none opacity-[0.15] mix-blend-overlay"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }}
      />

      {/* LAYER 1: [texto + cta] */}
      <div className="max-w-7xl mx-auto px-6 w-full relative z-30">
        <div className="max-w-2xl animate-fade-up">
          <div className="overflow-hidden mb-4">
            <span className="font-accent text-cafe-teal text-3xl md:text-5xl block drop-shadow-lg">
              Welcome to your daily ritual
            </span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-[1.05] mb-8 drop-shadow-2xl">
            Where Every Sip <br />
            <span className="text-cafe-teal italic">Feels Like Home.</span>
          </h1>
          <p className="text-cafe-offwhite/80 text-lg md:text-xl mb-12 max-w-lg leading-relaxed font-light drop-shadow-md">
            Experience artisanal coffee brewed with passion and pastries baked fresh every morning. Henrietta's is your premium neighborhood escape.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="group bg-cafe-teal text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-cafe-dark transition-all transform hover:-translate-y-1 shadow-2xl shadow-cafe-teal/30 flex items-center justify-center">
              <span>Order Now</span>
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button 
              onClick={scrollToMenu}
              className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-cafe-dark transition-all flex items-center justify-center active:scale-95"
            >
              See Menu
            </button>
          </div>
        </div>
      </div>

      {/* Decorative vertical line */}
      <div className="absolute bottom-10 left-10 hidden xl:flex flex-col items-center opacity-50 z-30">
        <span className="text-[10px] text-white uppercase tracking-[0.3em] font-bold mb-4 rotate-180 [writing-mode:vertical-lr]">Scroll to discover</span>
        <div className="w-px h-24 bg-white" />
      </div>

      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fade-up 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Hero;
