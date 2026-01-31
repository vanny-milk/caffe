
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'Location', href: '#location' },
    { name: 'About', href: '#about' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for fixed header
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const isDarkBg = isScrolled || isMenuOpen;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isDarkBg ? 'bg-[#8B4F46] shadow-xl py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 relative z-50">
          <div 
            className={`font-serif text-2xl font-bold flex flex-col leading-tight cursor-pointer transition-colors duration-500 ${isDarkBg ? 'text-white' : 'text-cafe-dark'}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span>Henrietta's</span>
            <span className={`font-accent text-3xl -mt-2 ml-4 ${isDarkBg ? 'text-cafe-offwhite/80' : 'text-cafe-teal'}`}>Cafe</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className={`hidden md:flex items-center space-x-10 font-medium uppercase tracking-widest text-xs transition-colors duration-500 ${isDarkBg ? 'text-white' : 'text-cafe-dark'}`}>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className="hover:opacity-70 transition-all relative group"
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${isDarkBg ? 'bg-white' : 'bg-cafe-teal'}`}></span>
            </a>
          ))}
        </nav>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <button className={`hidden sm:block px-6 py-2.5 rounded-full font-semibold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-lg ${
            isDarkBg ? 'bg-white text-[#8B4F46]' : 'bg-cafe-teal text-white shadow-cafe-teal/20'
          }`}>
            Order Now
          </button>
          
          <button 
            className={`md:hidden p-2 relative z-50 transition-colors duration-500 ${isDarkBg ? 'text-white' : 'text-cafe-dark'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-current transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-current transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-current transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#8B4F46] z-40 transition-transform duration-500 ease-in-out md:hidden ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8 px-6 text-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-serif text-4xl text-white hover:text-cafe-offwhite/70 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button className="bg-white text-[#8B4F46] px-10 py-4 rounded-full font-bold text-xl w-full shadow-2xl">
            Order Now
          </button>
          <div className="pt-8">
            <span className="font-accent text-white/80 text-3xl">Henrietta's Sanctuary</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
