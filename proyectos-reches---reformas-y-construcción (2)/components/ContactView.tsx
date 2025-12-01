import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, ArrowLeft } from 'lucide-react';
import ContactForm from './ContactForm';
import MapSection from './MapSection';
import Button from './Button';
import { Reveal } from './Reveal';

interface ContactViewProps {
  onBack: () => void;
  onFormSuccess: () => void;
}

const ContactView: React.FC<ContactViewProps> = ({ onBack, onFormSuccess }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactInfo = [
    {
      icon: Phone,
      title: "Llámanos",
      value: "+34 667 08 54 43",
      sub: "Atención inmediata",
      action: "tel:+34667085443"
    },
    {
      icon: Mail,
      title: "Escríbenos",
      value: "proyectosreches@gmail.com",
      sub: "Respuesta en < 24h",
      action: "mailto:proyectosreches@gmail.com"
    },
    {
      icon: MapPin,
      title: "Visítanos",
      value: "Carrer de Dante Alighieri 133",
      sub: "08032 Barcelona",
      action: null
    },
    {
      icon: Clock,
      title: "Horario",
      value: "Lunes a Viernes",
      sub: "09:00 - 18:00",
      action: null
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-28">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <Button variant="white" onClick={onBack} className="mb-8 group">
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Volver al inicio
        </Button>
        
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Hablemos de tu <span className="text-brand-primary">Proyecto</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Estamos aquí para resolver tus dudas y dar forma a tus ideas. Sin compromiso y con la cercanía de siempre.
          </p>
        </Reveal>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Info Cards */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center text-brand-primary mb-4">
                    <item.icon size={20} />
                  </div>
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  {item.action ? (
                    <a href={item.action} className="text-brand-primary font-medium hover:underline block mt-1">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-slate-700 font-medium mt-1">{item.value}</p>
                  )}
                  <p className="text-sm text-slate-400 mt-1">{item.sub}</p>
                </motion.div>
              ))}
            </div>

            {/* Additional Text */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.5 }}
              className="bg-slate-900 text-slate-300 p-8 rounded-3xl relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
               <h3 className="text-white font-bold text-xl mb-2 relative z-10">¿Prefieres una videollamada?</h3>
               <p className="mb-4 relative z-10">Agenda una reunión de 15 minutos con nuestros expertos para una primera valoración.</p>
               <a 
                 href="https://cal.com/proyectosreches/15min" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-block bg-white text-slate-900 px-4 py-2 rounded-lg font-bold hover:bg-brand-primary hover:text-white transition-colors relative z-10"
               >
                 Reservar Cita Online
               </a>
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ContactForm onSuccess={onFormSuccess} className="h-full" />
          </motion.div>

        </div>
      </div>

      {/* Map Section at the bottom */}
      <MapSection />
    </div>
  );
};

export default ContactView;