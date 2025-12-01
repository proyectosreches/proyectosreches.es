import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Clock, Ruler, Award, ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';
import Button from './Button';

const values = [
  {
    icon: Heart,
    title: "Cercanía y Familia",
    desc: "Tratamos cada hogar como si fuera el nuestro. Sin intermediarios fríos, con trato directo."
  },
  {
    icon: Ruler,
    title: "Precisión Técnica",
    desc: "Atención obsesiva al detalle. Desde el primer plano hasta el último remate."
  },
  {
    icon: ShieldCheck,
    title: "Transparencia Total",
    desc: "Presupuestos desglosados partida por partida. Sin sorpresas ni letra pequeña."
  }
];

interface AboutUsProps {
    onOpenModal: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ onOpenModal }) => {
  return (
    <section id="nosotros" className="py-24 bg-white overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HERO SECTION --- */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          {/* Text Side */}
          <div className="w-full lg:w-1/2">
            <Reveal>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-brand-primary text-xs font-bold tracking-widest uppercase mb-6">
                Sobre Nosotros
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Reformas hechas por <br/>
                <span className="text-brand-primary">personas reales</span> para mejorar tu vida.
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                En <strong>Proyectos Reches</strong>, no solo movemos tabiques; creamos espacios donde la vida sucede. Nacimos como una pequeña empresa familiar en Barcelona y hemos crecido gracias a una premisa simple: <strong>cumplir lo que prometemos</strong>.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Entendemos que una obra puede ser estresante. Por eso, nuestro trabajo no es solo construir, sino darte tranquilidad. Nos encargamos de todo, desde los permisos hasta la limpieza final.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-3 text-slate-700 font-medium">
                    <div className="p-2 bg-slate-100 rounded-lg text-brand-primary"><Clock size={20}/></div>
                    <span>Plazos Garantizados</span>
                </div>
                 <div className="flex items-center gap-3 text-slate-700 font-medium">
                    <div className="p-2 bg-slate-100 rounded-lg text-brand-primary"><ShieldCheck size={20}/></div>
                    <span>Seguro R.C. Incluido</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <Reveal delay={0.2} direction="left">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                    <img 
                        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop" 
                        alt="Obra de reforma integral en proceso" 
                        className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                    
                    {/* Floating Badge */}
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-lg border-l-4 border-brand-primary max-w-xs"
                    >
                        <p className="font-serif italic text-slate-800 text-lg mb-2">"La excelencia no es un acto, es un hábito en cada detalle."</p>
                    </motion.div>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute -z-10 -top-6 -right-6 w-32 h-32 bg-amber-50 rounded-full blur-2xl"></div>
                <div className="absolute -z-10 -bottom-6 -left-6 w-40 h-40 bg-slate-100 rounded-full blur-2xl"></div>
            </Reveal>
          </div>
        </div>

        {/* --- VALUES SECTION --- */}
        <Reveal width="100%" className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {values.map((val, i) => (
                    <motion.div 
                        key={i}
                        whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                        className="p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl hover:border-brand-primary/20 transition-colors duration-300"
                    >
                        <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-primary mb-6 ring-1 ring-slate-100">
                            <val.icon size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{val.title}</h3>
                        <p className="text-slate-600 leading-relaxed">
                            {val.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </Reveal>

        {/* --- GUARANTEES & CTA --- */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-white max-w-2xl">
                    <div className="flex items-center gap-2 mb-4 text-amber-400">
                        <Award size={24} />
                        <span className="font-bold tracking-wide uppercase">Garantía de Calidad</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4">¿Hablamos de tu futuro proyecto?</h3>
                    <p className="text-slate-300 mb-6">
                        Ofrecemos garantía por escrito de 2 años en todas nuestras reformas y cumplimiento estricto de normativas CTE.
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-400">
                        <span className="flex items-center gap-1"><ShieldCheck size={16} className="text-green-400"/> Contrato Legal</span>
                        <span className="flex items-center gap-1"><ShieldCheck size={16} className="text-green-400"/> Factura Detallada</span>
                        <span className="flex items-center gap-1"><ShieldCheck size={16} className="text-green-400"/> Gestión de Licencias</span>
                    </div>
                </div>
                
                <div className="shrink-0">
                    <Button variant="primary" className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 text-lg shadow-lg shadow-amber-900/20" onClick={onOpenModal}>
                        Contactar con el Equipo
                        <ArrowRight className="ml-2" />
                    </Button>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;