import React, { useRef } from 'react';
import Button from './Button';
import ContactForm from './ContactForm';
import { ArrowRight, CheckCircle2, MessageSquareQuote } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroProps {
  onOpenModal: () => void;
  onFormSuccess?: () => void;
  onNavigateTestimonials: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenModal, onFormSuccess, onNavigateTestimonials }) => {
  const containerRef = useRef<HTMLElement>(null);
  
  // Parallax Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityBg = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative min-h-[110vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 lg:py-0 bg-slate-900"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y: yBg, opacity: opacityBg }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://picsum.photos/id/193/1920/1080" 
          alt="Interior moderno de reforma" 
          className="w-full h-full object-cover scale-110" // Escala leve para evitar bordes blancos al mover
        />
        {/* Gradient Overlay refined for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between gap-12 lg:gap-20">
          
          {/* Left Column: Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left pt-8 lg:pt-0 perspective-1000">
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center px-4 py-2 rounded-full border border-slate-700 bg-slate-800/50 backdrop-blur-md mb-6 shadow-lg"
            >
              <span className="relative flex h-3 w-3 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-slate-200 tracking-wide">Disponibles para nuevos proyectos</span>
            </motion.div>

            <div className="overflow-hidden">
                <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
                className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight"
                >
                Transformamos <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                    Tu Espacio
                </span>
                </motion.h1>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed"
            >
              Expertos en reformas integrales, rehabilitación de fachadas y obra nueva. 
              Calidad premium, plazos garantizados y presupuesto sin sorpresas.
            </motion.p>

            {/* Buttons visible on ALL devices */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button variant="primary" className="group shadow-amber-500/20 shadow-lg hover:shadow-amber-500/40" onClick={onOpenModal}>
                Solicitar Presupuesto
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                className="text-white border-white/30 hover:bg-white/10 hover:border-white backdrop-blur-sm"
                onClick={onNavigateTestimonials}
              >
                <MessageSquareQuote className="mr-2 h-5 w-5" />
                Ver Opiniones
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-12 flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4 text-sm text-slate-400 font-medium"
            >
              {['Presupuesto en 48h', 'Garantía por escrito', 'Acabados Premium'].map((item, i) => (
                  <div key={i} className="flex items-center group">
                    <div className="bg-slate-800 p-1 rounded-full mr-2 group-hover:bg-brand-primary transition-colors duration-300">
                        <CheckCircle2 className="h-4 w-4 text-brand-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span>{item}</span>
                  </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Embedded Form (Desktop Only) */}
          <motion.div 
            initial={{ opacity: 0, x: 50, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.6, type: "spring" }}
            className="hidden lg:block w-full lg:w-[480px] shrink-0 perspective-1000"
          >
             <div className="transform transition-transform hover:scale-[1.01] duration-500">
                <ContactForm 
                    id="hero-form" 
                    onSuccess={onFormSuccess} 
                />
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;