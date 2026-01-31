
import React from 'react';

const testimonials = [
  {
    name: "Elena Richardson",
    role: "Local Artist",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    quote: "The lavender latte is genuinely life-changing. I come here every morning just for the peaceful atmosphere and the natural morning light.",
    rating: 5
  },
  {
    name: "James Thorne",
    role: "Food Critic",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    quote: "A true West Village gem. The pastries are flaky perfection and the coffee program is clearly curated by world-class baristas.",
    rating: 5
  },
  {
    name: "Sofia Mendez",
    role: "Pastry Enthusiast",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    quote: "Best artisanal bread in the city. You can taste the quality and passion in every single bite. The pistachio croissant is a must-try.",
    rating: 5
  }
];

const instaPhotos = [
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400",
];

const SocialProof: React.FC = () => {
  return (
    <div className="py-32 bg-cafe-offwhite relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute -right-20 top-20 w-96 h-96 bg-cafe-teal/5 rounded-full blur-[100px]" />
      <div className="absolute -left-20 bottom-20 w-96 h-96 bg-cafe-brown/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <span className="font-accent text-cafe-brown text-3xl md:text-4xl">Community & Connection</span>
          <h2 className="font-serif text-5xl md:text-6xl text-cafe-dark font-bold mt-2 leading-tight">Kind Words</h2>
          <p className="mt-6 text-cafe-teal-dark/60 font-light text-lg">Join the thousands of neighbors who make Henrietta's their home away from home.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
          {testimonials.map((t, idx) => (
            <div key={idx} className="group p-10 md:p-12 bg-white rounded-[3.5rem] border border-black/[0.03] flex flex-col shadow-sm hover:shadow-2xl transition-all duration-500 relative">
              {/* Stars Header */}
              <div className="flex text-cafe-brown space-x-1 mb-8">
                {[...Array(t.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote Text */}
              <p className="italic text-cafe-dark text-xl leading-relaxed mb-10 font-serif flex-grow relative z-10">
                "{t.quote}"
              </p>

              {/* Redesigned Footer with Avatar next to Name */}
              <div className="flex items-center space-x-4 pt-6 border-t border-black/[0.05]">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-transparent group-hover:border-cafe-teal transition-all duration-500 shrink-0">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div className="overflow-hidden">
                  <span className="block font-bold text-cafe-dark uppercase tracking-[0.15em] text-xs truncate">{t.name}</span>
                  <span className="text-cafe-teal text-[10px] font-bold uppercase tracking-widest mt-1 block truncate opacity-70">{t.role}</span>
                </div>
              </div>
              
              {/* Subtle Quote decoration */}
              <div className="absolute top-10 right-10 text-cafe-teal/[0.03]">
                 <svg className="w-24 h-24 fill-current" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.899 14.913 16.002 16.012 16.002C17.112 16.002 18.009 16.899 18.009 18L18.009 21H14.017ZM14.017 21C12.917 21 12.021 20.103 12.021 19.003V16.002C12.021 13.793 13.812 12.002 16.021 12.002C18.23 12.002 20.021 13.793 20.021 16.002V19.003C20.021 20.103 19.124 21 18.025 21H14.017ZM5.997 21L5.997 18C5.997 16.899 6.894 16.002 7.992 16.002C9.092 16.002 9.989 16.899 9.989 18L9.989 21H5.997ZM5.997 21C4.897 21 4 20.103 4 19.003V16.002C4 13.793 5.791 12.002 8 12.002C10.209 12.002 12 13.793 12 16.002V19.003C12 20.103 11.103 21 10.003 21H5.997Z"/></svg>
              </div>
            </div>
          ))}
        </div>

        <div className="relative">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h3 className="font-serif text-4xl font-bold text-cafe-dark">Captured at Henrietta's</h3>
              <p className="text-cafe-teal-dark/60 mt-2 text-lg">Follow our journey and share your moments @HenriettasCafe</p>
            </div>
            <button className="mt-8 md:mt-0 px-10 py-4 bg-cafe-dark text-white rounded-full font-bold hover:bg-cafe-teal transition-all flex items-center space-x-2 active:scale-95 shadow-lg shadow-cafe-dark/10">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              <span>Follow Us</span>
            </button>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {instaPhotos.map((img, idx) => (
              <div key={idx} className="group relative aspect-square overflow-hidden rounded-[2.5rem] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500">
                <img src={img} alt="Insta Moment" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-cafe-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-center">
                  <svg className="w-10 h-10 text-white mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white text-xs font-bold uppercase tracking-widest">Double tap to like</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProof;
