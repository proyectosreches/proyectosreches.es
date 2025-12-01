import React, { useRef } from 'react';
import { Quote, Star, ArrowRight, ArrowLeft } from 'lucide-react';
import { TestimonialItem } from '../types';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

const testimonials: TestimonialItem[] = [
  {
    id: 1,
    name: "Carlos Mendoza",
    role: "Propietario de Vivienda",
    text: "La reforma de nuestra cocina fue impecable. Cumplieron con los plazos exactos y el equipo fue muy limpio y profesional. Superaron nuestras expectativas.",
    image: "https://picsum.photos/id/1005/100/100"
  },
  {
    id: 2,
    name: "Laura Gutiérrez",
    role: "Gerente de Local Comercial",
    text: "Necesitábamos adaptar nuestro local en tiempo récord para la apertura. Proyectos Reches entendió la urgencia y entregó un trabajo de altísima calidad.",
    image: "https://picsum.photos/id/338/100/100"
  },
  {
    id: 3,
    name: "Comunidad Edificio Norte",
    role: "Administración de Fincas",
    text: "La rehabilitación de la fachada ha revalorizado todo el edificio. Gestión excelente de los permisos y molestias mínimas para los vecinos.",
    image: "https://picsum.photos/id/1011/100/100"
  },
   {
    id: 4,
    name: "Javier Estévez",
    role: "Arquitecto Técnico",
    text: "Como profesional del sector, valoro la capacidad técnica de Proyectos Reches. Hablan mi idioma y resuelven imprevistos con gran solvencia.",
    image: "https://picsum.photos/id/1025/100/100"
  }
];

const Testimonials: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
        const { current } = scrollRef;
        const scrollAmount = direction === 'left' ? -300 : 300; // Un poco menos de scroll en móvil para asegurar fluidez
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  return (
    <section id="opiniones" className="py-24 bg-white relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-20 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute bottom-20 left-20 w-80 h-80 bg-slate-100 rounded-full blur-3xl opacity-60"></div>
        </div>

      {/* Header Content (Centrado) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12 flex flex-col md:flex-row items-end justify-between">
        <Reveal width="100%" className="max-w-2xl">
          <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.2em] mb-3">Testimonios</h2>
          <h3 className="text-4xl font-bold text-slate-900 mb-4">La confianza se construye</h3>
          <p className="text-slate-500 text-lg">
            Más del 80% de nuestros nuevos proyectos vienen por recomendación directa.
          </p>
        </Reveal>

        {/* Desktop Navigation Buttons (OCULTO EN MÓVIL) */}
        <div className="hidden md:flex gap-2 mt-6 md:mt-0">
            <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => scroll('left')}
                className="p-3 rounded-full border border-slate-200 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-colors duration-300 text-slate-400"
                aria-label="Anterior testimonio"
            >
                <ArrowLeft size={20} />
            </motion.button>
            <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => scroll('right')}
                className="p-3 rounded-full border border-slate-200 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-colors duration-300 text-slate-400"
                aria-label="Siguiente testimonio"
            >
                <ArrowRight size={20} />
            </motion.button>
        </div>
      </div>

      {/* Full Width Scroll Container - Breaking out of the grid */}
      <div className="relative w-full">
        <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 snap-x snap-mandatory scrollbar-hide pb-8 pt-4 px-4 md:px-0"
            style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                // En desktop añadimos padding izquierdo equivalente al margen del contenedor central (aprox) para alinear
                paddingLeft: 'max(1rem, calc((100vw - 80rem) / 2 + 1rem))',
                paddingRight: 'max(1rem, calc((100vw - 80rem) / 2 + 1rem))'
            }}
        >
          {testimonials.map((item, index) => (
            <motion.div 
                key={item.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.01 }}
                className="min-w-[85vw] md:min-w-[450px] snap-center bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col justify-between cursor-default"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                    <div className="flex text-amber-400">
                        {[1,2,3,4,5].map(star => <Star key={star} size={18} fill="currentColor" className="mr-1"/>)}
                    </div>
                    <Quote size={24} className="text-brand-primary/20" fill="currentColor" />
                </div>
                <p className="text-slate-600 mb-8 leading-relaxed text-lg font-light italic">
                  "{item.text}"
                </p>
              </div>
              
              <div className="flex items-center">
                <div className="relative shrink-0">
                    <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-14 h-14 rounded-full object-cover ring-4 ring-slate-50"
                    />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-slate-900 text-lg">{item.name}</h4>
                  <p className="text-xs text-brand-primary uppercase tracking-wider font-semibold">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Spacer para asegurar que el último elemento se pueda ver completo con padding */}
          <div className="min-w-[1px] h-full"></div>
        </div>

        {/* Mobile Swipe Indicator Overlay (Fade effect on right) */}
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden"></div>
      </div>

      {/* Mobile Navigation Buttons (SOLO MÓVIL - Debajo de las tarjetas) */}
      <div className="flex md:hidden justify-center gap-4 mt-6 px-4">
          <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll('left')}
              className="p-4 rounded-full bg-white border border-slate-100 shadow-lg text-slate-600"
              aria-label="Anterior testimonio"
          >
              <ArrowLeft size={24} />
          </motion.button>
          <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll('right')}
              className="p-4 rounded-full bg-white border border-slate-100 shadow-lg text-slate-600"
              aria-label="Siguiente testimonio"
          >
              <ArrowRight size={24} />
          </motion.button>
      </div>

    </section>
  );
};

export default Testimonials;