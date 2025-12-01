import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from './Button';

interface SchedulePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const SchedulePopup: React.FC<SchedulePopupProps> = ({ isOpen, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleScheduleClick = () => {
    window.open('https://cal.com/proyectosreches/15min', '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[80]"
            aria-hidden="true"
          />

          {/* Popup Card */}
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
              className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden pointer-events-auto relative border border-white/20"
            >
              {/* Decorative Top Line */}
              <div className="h-2 w-full bg-gradient-to-r from-brand-primary to-amber-400"></div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-brand-primary transition-colors p-1 rounded-full hover:bg-slate-50"
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>

              <div className="p-8 text-center">
                {/* Icon Wrapper */}
                <div className="mx-auto w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-6 ring-4 ring-white shadow-sm relative">
                    <Calendar className="text-brand-primary h-8 w-8" />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-white">
                        <CheckCircle2 className="text-white h-3 w-3" />
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3 font-sans">
                  Agenda tu cita ahora
                </h3>
                
                <p className="text-slate-500 mb-8 leading-relaxed text-sm md:text-base">
                  Gracias por completar el formulario. Para acelerar el proceso, puedes reservar directamente una llamada de 15 minutos con nosotros.
                </p>

                <div className="space-y-3">
                  <Button 
                    variant="primary" 
                    fullWidth 
                    onClick={handleScheduleClick}
                    className="group"
                  >
                    Agendar ahora
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <button 
                    onClick={onClose}
                    className="text-sm text-slate-400 hover:text-slate-600 font-medium py-2 transition-colors"
                  >
                    No, gracias. Esperaré a que me contacten.
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SchedulePopup;