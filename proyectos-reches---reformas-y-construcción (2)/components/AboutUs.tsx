import React from 'react';
import { Users, Ruler, FileText, ShieldCheck, FileSignature, CheckCircle2, HardHat } from 'lucide-react';
import { Reveal } from './Reveal';
import Button from './Button';

interface AboutUsProps {
  onOpenModal: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ onOpenModal }) => {
  return (
    <section id="nosotros" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Parte Superior: Texto e Imagen */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
          
          {/* Texto Principal */}
          <div className="w-full lg:w-1/2">
            <Reveal width="100%">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-semibold mb-6">
                <span className="mr-2">★</span> Sobre Nosotros
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Reformas hechas por <br/>
                <span className="text-brand-primary">personas reales</span> para <br/>
                mejorar tu vida.
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  En <strong>Proyectos Reches</strong>, no solo movemos tabiques; creamos espacios donde la vida sucede. Nacimos como una pequeña empresa familiar en Barcelona y hemos crecido gracias a una premisa simple: <strong>cumplir lo que prometemos.</strong>
                </p>
                <p>
                  Entendemos que una obra puede ser estresante. Por eso, nuestro trabajo no es solo construir, sino darte tranquilidad. Nos encargamos de todo, desde los permisos hasta la limpieza final.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                 <div className="flex items-center text-slate-700 font-medium bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                    <CheckCircle2 className="text-green-500 mr-2 h-5 w-5" />
                    Plazos Garantizados
                 </div>
                 <div className="flex items-center text-slate-700 font-medium bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                    <CheckCircle2 className="text-green-500 mr-2 h-5 w-5" />
                    Seguro R.C. Incluido
                 </div>
              </div>
            </Reveal>
          </div>

          {/* Imagen Lateral */}
          <div className="w-full lg:w-1/2 relative">
             <Reveal width="100%" delay={0.2}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                    <img 
                        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1470&auto=format&fit=crop" 
                        alt="Equipo trabajando en obra" 
                        className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent p-8">
                        <p className="text-white text-xl font-serif italic border-l-4 border-brand-primary pl-4">
                            "La excelencia no es un acto, es un hábito en cada detalle."
                        </p>
                    </div>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute -z-10 top-10 -right-10 w-full h-full bg-slate-100 rounded-3xl"></div>
             </Reveal>
          </div>
        </div>

        {/* Grid de Valores */}
        <Reveal width="100%" delay={0.3}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                {/* Card 1 */}
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-all duration-300 group">
                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                        <Users size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Cercanía y Familia</h3>
                    <p className="text-slate-600">Tratamos cada hogar como si fuera el nuestro. Sin intermediarios fríos, con trato directo.</p>
                </div>

                 {/* Card 2 */}
                 <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-all duration-300 group">
                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                        <Ruler size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Precisión Técnica</h3>
                    <p className="text-slate-600">Atención obsesiva al detalle. Desde el primer plano hasta el último remate.</p>
                </div>

                 {/* Card 3 */}
                 <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-all duration-300 group">
                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                        <FileText size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Transparencia Total</h3>
                    <p className="text-slate-600">Presupuestos desglosados partida por partida. Sin sorpresas ni letra pequeña.</p>
                </div>
            </div>
        </Reveal>

        {/* Caja de Garantía (Estilo Video) */}
        <Reveal width="100%" delay={0.4}>
            <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                {/* Fondo decorativo */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="flex-1">
                        <div className="flex items-center mb-4 text-brand-primary font-bold tracking-wider text-sm uppercase">
                            <ShieldCheck className="mr-2" /> Garantía de Calidad
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">
                            ¿Hablamos de tu futuro proyecto?
                        </h3>
                        <p className="text-slate-300 text-lg mb-6 max-w-2xl">
                            Ofrecemos garantía por escrito de 2 años en todas nuestras reformas y cumplimiento estricto de normativas CTE.
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                             <span className="flex items-center"><FileSignature size={16} className="mr-1" /> Contrato Legal</span>
                             <span className="flex items-center"><FileText size={16} className="mr-1" /> Factura Detallada</span>
                             <span className="flex items-center"><HardHat size={16} className="mr-1" /> Gestión de Licencias</span>
                        </div>
                    </div>
                    <div className="shrink-0">
                        <Button variant="primary" onClick={onOpenModal} className="px-8 py-4 text-lg">
                            Contactar con el Equipo
                        </Button>
                    </div>
                </div>
            </div>
        </Reveal>

      </div>
    </section>
  );
};

export default AboutUs;
