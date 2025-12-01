import React, { useState, useEffect } from 'react';
import { Menu, X, Hammer } from 'lucide-react';
import Button from './Button';

interface HeaderProps {
  onOpenModal: () => void;
  onNavigate: (view: 'home' | 'contact', targetSectionId?: string) => void;
  currentView: string;
}

const Header: React.FC<HeaderProps> = ({ onOpenModal, onNavigate, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    const targetId = href.replace('#', '');
    
    // Lógica de navegación mejorada
    if (targetId === 'contacto') {
      onNavigate('contact');
    } else {
      // El destino es una sección de la Home (hero, servicios, etc.)
      
      if (currentView !== 'home') {
        // Si NO estamos en home (estamos en Contacto o Legal), forzamos ir a HOME
        onNavigate('home', targetId === 'hero' ? undefined : targetId);
      } else {
        // Ya estamos en home, solo hacemos scroll
        if (targetId === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
      }
    }

    setIsOpen(false); 
  };

  const navLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Contacto', href: '#contacto' },
    { name: 'Opiniones', href: '#opiniones' },
  ];

  // Regla Visual: El header es sólido (blanco) si hay scroll O si NO estamos en la home
  const isSolidHeader = scrolled || currentView !== 'home';

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isSolidHeader ? 'bg-white/95 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center group cursor-pointer" onClick={(e) => handleNavClick(e as any, '#hero')}>
            <div className={`p-2 rounded-lg mr-2 transition-colors ${isSolidHeader ? 'bg-brand-primary text-white' : 'bg-white text-brand-primary'}`}>
               <Hammer size={24} />
            </div>
            <span className={`text-2xl font-bold tracking-tight ${isSolidHeader ? 'text-slate-900' : 'text-slate-900 lg:text-white'} `}>
              Proyectos<span className="text-brand-primary">Reches</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium transition-colors hover:text-brand-primary ${
                  isSolidHeader ? 'text-slate-700' : 'text-slate-100'
                } ${currentView === 'contact' && link.href === '#contacto' ? 'text-brand-primary font-bold' : ''}`}
              >
                {link.name}
              </a>
            ))}
            <Button 
                variant={isSolidHeader ? 'primary' : 'white'} 
                className={`py-2 px-4 text-sm transform transition-transform hover:scale-105 ${!isSolidHeader ? 'shadow-lg shadow-black/20' : ''}`} 
                onClick={onOpenModal}
            >
              Pedir Presupuesto
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${isSolidHeader ? 'text-slate-900' : 'text-white'} hover:bg-slate-200/20`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-300 ease-in-out transform origin-top ${
          isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 h-0 overflow-hidden'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`block px-3 py-2 text-base font-medium hover:text-brand-primary w-full text-center ${
                  currentView === 'contact' && link.href === '#contacto' ? 'text-brand-primary font-bold' : 'text-slate-700'
              }`}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 w-full">
            <Button fullWidth onClick={() => { setIsOpen(false); onOpenModal(); }}>
              Contacto Rápido
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;