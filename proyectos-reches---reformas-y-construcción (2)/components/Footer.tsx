import React from 'react';
import { Hammer, MapPin, Mail, Phone, Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  onNavigate?: (view: any, targetId?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  // Maneja la navegación a vistas legales
  const handleLegalClick = (e: React.MouseEvent, type: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(type);
    }
  };

  // Maneja la navegación a secciones de la Home (asegura el cambio de vista si es necesario)
  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('home', targetId);
    } else {
        // Fallback básico
        const element = document.getElementById(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contacto" className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <div 
                className="flex items-center text-white cursor-pointer group"
                onClick={(e) => handleNavClick(e, 'hero')}
            >
               <div className="p-1.5 bg-brand-primary rounded mr-2 text-white group-hover:bg-amber-500 transition-colors">
                <Hammer size={20} />
               </div>
               <span className="text-xl font-bold">Proyectos<span className="text-brand-primary">Reches</span></span>
            </div>
            <p className="text-sm leading-relaxed">
              Expertos en reformas integrales, climatización y mantenimiento. Más de 16 años transformando espacios en Barcelona.
            </p>
            <div className="flex space-x-4 pt-2">
                <a 
                  href="https://www.instagram.com/proyectos_reches/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-400 hover:text-brand-primary transition-colors hover:scale-110 transform duration-200"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href="https://www.facebook.com/proyectosreches/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-400 hover:text-brand-primary transition-colors hover:scale-110 transform duration-200"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
            </div>
          </div>

          {/* Contact - Ahora con enlaces funcionales */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-brand-primary mr-3 mt-0.5 shrink-0" />
                <a 
                    href="https://www.google.com/maps/search/?api=1&query=Carrer+de+Dante+Alighieri+133+08032+Barcelona" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                >
                    Carrer de Dante Alighieri 133<br/>08032 Barcelona, España
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-brand-primary mr-3 shrink-0" />
                <a href="tel:+34667085443" className="hover:text-white transition-colors">
                    +34 667 08 54 43
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-brand-primary mr-3 shrink-0" />
                <a href="mailto:proyectosreches@gmail.com" className="hover:text-white transition-colors">
                    proyectosreches@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Links - Navegación interna corregida */}
          <div>
            <h3 className="text-white font-semibold mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                  <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className="hover:text-brand-primary transition-colors block py-1">
                    Inicio
                  </a>
              </li>
              <li>
                  <a href="#servicios" onClick={(e) => handleNavClick(e, 'servicios')} className="hover:text-brand-primary transition-colors block py-1">
                    Servicios
                  </a>
              </li>
              <li>
                  <a href="#stats" onClick={(e) => handleNavClick(e, 'stats')} className="hover:text-brand-primary transition-colors block py-1">
                    Experiencia
                  </a>
              </li>
              <li>
                  <a href="#opiniones" onClick={(e) => handleNavClick(e, 'opiniones')} className="hover:text-brand-primary transition-colors block py-1">
                    Testimonios
                  </a>
              </li>
            </ul>
          </div>

           {/* Legal */}
           <div>
            <h3 className="text-white font-semibold mb-6">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" onClick={(e) => handleLegalClick(e, 'legal-notice')} className="hover:text-brand-primary transition-colors block py-1">
                  Aviso Legal
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => handleLegalClick(e, 'privacy-policy')} className="hover:text-brand-primary transition-colors block py-1">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => handleLegalClick(e, 'cookies-policy')} className="hover:text-brand-primary transition-colors block py-1">
                  Política de Cookies
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {currentYear} Proyectos Reches. Todos los derechos reservados.</p>
          <p className="mt-2 md:mt-0">Diseño profesional y garantía de calidad.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;