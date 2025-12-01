import React, { useState } from 'react';
import { Home, Zap, BrickWall, Droplets, Fan, Building2, Plus, Minus, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceItem } from '../types';
import Button from './Button';
import { Reveal } from './Reveal';

const services: ServiceItem[] = [
  {
    id: 1,
    title: 'Reformas Integrales',
    description: 'Gestión completa de tu reforma. Cocinas, baños y remodelación total.',
    icon: Home,
    features: ['Diseño 3D y planificación', 'Gestión de licencias de obra', 'Demolición y retirada de escombros', 'Acabados "Llave en mano"']
  },
  {
    id: 2,
    title: 'Climatización',
    description: 'Confort térmico todo el año con sistemas eficientes y modernos.',
    icon: Fan,
    features: ['Aire acondicionado (Split/Conductos)', 'Sistemas de Aerotermia', 'Calefacción por radiadores', 'Cargas de gas y mantenimiento']
  },
  {
    id: 3,
    title: 'Electricidad',
    description: 'Instalaciones seguras, iluminación LED y normativas vigentes.',
    icon: Zap,
    features: ['Boletines (BRIE/CIE)', 'Cuadros eléctricos nuevos', 'Iluminación LED decorativa', 'Domótica y automatización']
  },
  {
    id: 4,
    title: 'Albañilería General',
    description: 'Ejecución perfecta en tabiquería, suelos y falsos techos.',
    icon: BrickWall,
    features: ['Tabiquería de ladrillo y Pladur', 'Insonorización acústica', 'Alicatados y solados', 'Alisado de paredes']
  },
  {
    id: 5,
    title: 'Fontanería',
    description: 'Soluciones rápidas para agua, desagües y sanitarios.',
    icon: Droplets,
    features: ['Instalaciones de agua (Cobre/Wirsbo)', 'Baterías de contadores', 'Reparación de fugas urgentes', 'Montaje de sanitarios y grifería']
  },
  {
    id: 6,
    title: 'Mantenimiento',
    description: 'Servicio integral para empresas, oficinas y comunidades.',
    icon: Building2,
    features: ['Mantenimiento preventivo', 'Reparaciones correctivas', 'Gestión de urgencias', 'Reformas de locales comerciales']
  },
];

interface ServiceCardProps {
  item: ServiceItem;
  onOpenModal: () => void;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ item, onOpenModal, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay: index * 0.1 } }
      }}
      whileHover={{ 
        y: isOpen ? 0 : -8, 
        boxShadow: isOpen ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)" : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        borderColor: isOpen ? "" : "rgba(217, 119, 6, 0.3)"
      }}
      className={`group relative overflow-hidden p-6 md:p-8 rounded-3xl border transition-colors duration-300 ease-out cursor-pointer ${
        isOpen 
          ? 'bg-white border-brand-primary shadow-2xl ring-1 ring-brand-primary/20 scale-[1.02]' 
          : 'bg-white border-slate-100'
      }`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* Background Gradient on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'group-hover:opacity-100'}`} />

      <motion.div layout="position" className="relative flex items-start justify-between mb-4 z-10">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-brand-primary text-white rotate-6' : 'bg-slate-50 text-brand-primary group-hover:bg-brand-primary group-hover:text-white group-hover:rotate-6'
        }`}>
          <item.icon size={28} />
        </div>
        
        <button 
          className={`p-2 rounded-full transition-all duration-300 ${
            isOpen ? 'bg-slate-100 text-slate-600 rotate-0' : 'bg-white text-slate-300 group-hover:text-brand-primary rotate-0'
          }`}
          aria-label={isOpen ? "Cerrar detalles" : "Ver detalles"}
        >
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </button>
      </motion.div>

      <motion.h3 
        layout="position" 
        className="relative z-10 text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-primary transition-colors duration-300"
      >
        {item.title}
      </motion.h3>

      <motion.p 
        layout="position" 
        className="relative z-10 text-slate-500 leading-relaxed text-sm md:text-base group-hover:text-slate-600 transition-colors"
      >
        {item.description}
      </motion.p>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden relative z-10"
          >
            <div className="pt-6 mt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Incluye:
              </h4>
              <ul className="space-y-3 mb-6">
                {item.features.map((feature, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start text-sm text-slate-700"
                  >
                    <Check size={16} className="text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
              
              <Button 
                variant="outline" 
                className="w-full text-sm py-2 hover:bg-brand-primary hover:text-white group bg-white"
                onClick={(e) => {
                  e.stopPropagation(); 
                  onOpenModal(); 
                }}
              >
                Solicitar Presupuesto
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface ServicesProps {
  onOpenModal: () => void;
}

const Services: React.FC<ServicesProps> = ({ onOpenModal }) => {
  return (
    <section id="servicios" className="py-24 bg-slate-50 scroll-mt-28 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal width="100%" className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.2em] mb-3">
              Nuestros Servicios
            </h2>
            <p className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Soluciones técnicas <br/> y reformas integrales
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Coordinación integral de gremios y dirección de obra. Haz clic en las tarjetas para ver el detalle.
            </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              item={service} 
              onOpenModal={onOpenModal}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;