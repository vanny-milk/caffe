
import React, { useState, useEffect } from 'react';
import OrderModal from './OrderModal';

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
      className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isDarkBg ? 'bg-cafe-brown shadow-xl py-2 md:py-3' : 'bg-transparent py-3 md:py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between w-full">
        {/* Logo */}
        <div className="flex items-center space-x-2 relative z-50">
          <div
            className={`navbar-brand font-serif cursor-pointer transition-colors duration-500`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img src="/logo_white.png" alt="Henrietta's Cafe" className="h-20 w-auto object-contain" />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className={`nav hidden md:flex items-center space-x-10 font-medium uppercase tracking-widest text-xs transition-colors duration-500 text-white`}>
          {navLinks.map((link) => (
            <li key={link.name} className="list-none">
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:opacity-70 transition-all relative group"
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full bg-white`}></span>
              </a>
            </li>
          ))}
        </nav>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <OrderModal trigger={
            <button className={`pm-button hidden sm:block px-4 md:px-6 py-2 md:py-2.5 rounded-full font-semibold text-xs md:text-sm transition-all transform hover:scale-105 active:scale-95 shadow-lg ${isDarkBg ? 'bg-white text-cafe-brown' : 'bg-cafe-gold text-white shadow-cafe-gold/20'
              }`}>
              Order Now
            </button>
          } />

          <button
            className={`md:hidden p-2 relative z-50 transition-colors duration-500 flex items-center justify-center w-10 h-10 text-white`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-cafe-brown z-40 transition-transform duration-500 ease-in-out md:hidden ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`} style={{ top: '0' }}>
        <div className="flex flex-col items-center justify-center h-full space-y-6 px-6 text-center pb-24 pt-20">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-serif text-3xl text-white hover:text-cafe-offwhite/70 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <OrderModal trigger={
            <button className="pm-button bg-white text-cafe-brown px-8 py-3 rounded-full font-bold text-lg w-full shadow-2xl max-w-xs">
              Order Now
            </button>
          } />
        </div>
      </div>
    </header>
  );
};

export default Header;
