
import React from 'react';

const Location: React.FC = () => {
  const mapUrl = "https://www.google.com/maps/place/Starbucks/@40.7670045,-73.9806235,853m/data=!3m2!1e3!5s0x89c258f64be27543:0xaef6281f74ccf27d!4m15!1m8!3m7!1s0x89c258f65529a863:0xc332f0be7d48af02!2s220+Central+Park+South,+220+Central+Park+S,+New+York,+NY+10019,+EUA!3b1!8m2!3d40.7670045!4d-73.9806235!16s%2Fg%2F11b77cg5hn!3m5!1s0x89c2596369e0ca79:0x5f19009b180b1f03!8m2!3d40.76763!4d-73.98134!16s%2Fg%2F11rfd0nbwv?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D";

  return (
    <div className="py-24 bg-cafe-dark text-white relative overflow-hidden border-y border-white/5">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(white 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="w-full lg:w-1/2">
            <span className="font-accent text-cafe-teal text-3xl">Visit our Sanctuary</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-bold mt-2 mb-10">Location & Hours</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-cafe-teal mb-3">Our Address</h4>
                  <p className="text-xl text-cafe-offwhite/80 font-light leading-relaxed">
                    220 Central Park S, <br />
                    New York, NY 10019
                  </p>
                </div>

                <div className="pt-4">
                  <a 
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-3 bg-cafe-teal text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-cafe-dark transition-all shadow-xl shadow-cafe-teal/20 group active:scale-95"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-cafe-teal mb-3">Opening Hours</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-cafe-offwhite/60 font-medium">Mon - Fri</span>
                    <span className="text-white font-bold tracking-tight">7am - 8pm</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-cafe-offwhite/60 font-medium">Saturday</span>
                    <span className="text-white font-bold tracking-tight">8am - 9pm</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-cafe-offwhite/60 font-medium">Sunday</span>
                    <span className="text-white font-bold tracking-tight">8am - 7pm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 h-[500px] rounded-[3.5rem] overflow-hidden relative group shadow-2xl">
            <div className="absolute inset-0 bg-cafe-teal/20 mix-blend-overlay group-hover:bg-transparent transition-all duration-700" />
            {/* Map Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center bg-white/5">
              <div className="text-center opacity-30">
                <svg className="w-16 h-16 mx-auto mb-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="font-serif italic text-lg tracking-wide text-white">Loading Interactive Sanctuary Map...</p>
              </div>
            </div>
            {/* Decorative Image */}
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200" 
              alt="Cafe Interior at night"
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-40 group-hover:scale-105 transition-transform duration-1000 pointer-events-none"
            />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Location;
