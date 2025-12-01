import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, FileText, Lock } from 'lucide-react';
import Button from './Button';

export type LegalDocType = 'legal-notice' | 'privacy-policy' | 'cookies-policy';

interface LegalViewProps {
  type: LegalDocType;
  onBack: () => void;
  onOpenChat: () => void;
}

const LegalView: React.FC<LegalViewProps> = ({ type, onBack, onOpenChat }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const getContent = () => {
    switch (type) {
      case 'legal-notice':
        return {
          title: 'Aviso Legal',
          icon: FileText,
          date: 'Última actualización: Octubre 2023',
          content: (
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-3">1. Datos Identificativos</h3>
                <p>
                  En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, a continuación se reflejan los siguientes datos:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Titular:</strong> Proyectos Reches (En adelante, "La Empresa")</li>
                  <li><strong>Domicilio social:</strong> Carrer de Dante Alighieri 133, 08032 Barcelona, España</li>
                  <li><strong>Correo electrónico:</strong> proyectosreches@gmail.com</li>
                  <li><strong>Teléfono:</strong> +34 667 08 54 43</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-3">2. Usuarios</h3>
                <p>
                  El acceso y/o uso de este portal de La Empresa atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas. Las citadas Condiciones serán de aplicación independientemente de las Condiciones Generales de Contratación que en su caso resulten de obligado cumplimiento.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-3">3. Uso del Portal</h3>
                <p>
                  proyectosreches.es proporciona el acceso a multitud de informaciones, servicios, programas o datos (en adelante, "los contenidos") en Internet pertenecientes a La Empresa o a sus licenciantes a los que el USUARIO pueda tener acceso. El USUARIO asume la responsabilidad del uso del portal. Dicha responsabilidad se extiende al registro que fuese necesario para acceder a determinados servicios o contenidos.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-3">4. Propiedad Intelectual e Industrial</h3>
                <p>
                  La Empresa por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo, imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, programas de ordenador necesarios para su funcionamiento, acceso y uso, etc.), titularidad de La Empresa o bien de sus licenciantes.
                </p>
                <p className="mt-2">
                  Todos los derechos reservados. Quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos de esta página web, con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización de La Empresa.
                </p>
              </section>
            </div>
          )
        };

      case 'privacy-policy':
        return {
          title: 'Política de Privacidad',
          icon: Shield,
          date: 'Última actualización: Octubre 2023',
          content: (
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-3">1. Responsable del Tratamiento</h3>
                <p>
                  Proyectos Reches es el responsable del tratamiento de los datos personales del Usuario y le informa que estos datos serán tratados de conformidad con lo dispuesto en el Reglamento (UE) 2016/679 de 27 de abril de 2016 (GDPR) relativo a la protección de las personas físicas.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-3">2. Finalidad del Tratamiento</h3>
                <p>¿Con qué finalidad tratamos sus datos personales?</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Para dar respuesta a las consultas planteadas a través del formulario de contacto.</li>
                  <li>Para la elaboración de presupuestos solicitados por el usuario.</li>
                  <li>Para gestionar la relación contractual de servicios de reforma en caso de contratación.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-3">3. Legitimación</h3>
                <p>
                  La base legal para el tratamiento de sus datos es el consentimiento del interesado al rellenar y enviar el formulario de contacto o al solicitar un presupuesto.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-3">4. Destinatarios de los datos</h3>
                <p>
                  No se comunicarán los datos a terceros, salvo obligación legal o salvo que sea estrictamente necesario para la ejecución del servicio (ej. gestión de licencias con ayuntamientos).
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-3">5. Derechos del Usuario</h3>
                <p>El Usuario tiene derecho a:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Derecho a retirar el consentimiento en cualquier momento.</li>
                  <li>Derecho de acceso, rectificación, portabilidad y supresión de sus datos y a la limitación u oposición a su tratamiento.</li>
                  <li>Derecho a presentar una reclamación ante la Autoridad de control (agpd.es) si considera que el tratamiento no se ajusta a la normativa vigente.</li>
                </ul>
                <p className="mt-2 text-sm italic">
                  Para ejercer sus derechos puede contactar en: proyectosreches@gmail.com
                </p>
              </section>
            </div>
          )
        };

      case 'cookies-policy':
        return {
          title: 'Política de Cookies',
          icon: Lock,
          date: 'Última actualización: Octubre 2023',
          content: (
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-3">1. ¿Qué son las Cookies?</h3>
                <p>
                  Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información que contengan y de la forma en que utilice su equipo, pueden utilizarse para reconocer al usuario.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-3">2. Tipos de Cookies utilizadas</h3>
                <p>Esta web utiliza las siguientes cookies:</p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>
                    <strong>Cookies Técnicas:</strong> Son aquellas que permiten al usuario la navegación a través de la página web y la utilización de las diferentes opciones o servicios que en ella existan.
                  </li>
                  <li>
                    <strong>Cookies de Análisis (Google Analytics):</strong> Son aquellas que bien tratadas por nosotros o por terceros, nos permiten cuantificar el número de usuarios y así realizar la medición y análisis estadístico de la utilización que hacen los usuarios del servicio ofertado.
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-3">3. Desactivación o eliminación de Cookies</h3>
                <p>
                  Puede usted permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador instalado en su ordenador.
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Para más información sobre Chrome pulse <a href="#" className="text-brand-primary underline">aquí</a>.</li>
                  <li>Para más información sobre Firefox pulse <a href="#" className="text-brand-primary underline">aquí</a>.</li>
                  <li>Para más información sobre Safari pulse <a href="#" className="text-brand-primary underline">aquí</a>.</li>
                </ul>
              </section>
            </div>
          )
        };
    }
  };

  const data = getContent();
  const Icon = data.icon;

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Button variant="white" onClick={onBack} className="mb-8 group">
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Volver al inicio
        </Button>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100"
        >
            <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-8">
                <div className="p-3 bg-brand-primary/10 rounded-xl text-brand-primary">
                    <Icon size={32} />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">{data.title}</h1>
                    <p className="text-sm text-slate-400 mt-1">{data.date}</p>
                </div>
            </div>

            <div className="prose prose-slate max-w-none">
                {data.content}
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100 text-center">
                <p className="text-slate-500 mb-4">¿Tienes dudas sobre nuestros términos?</p>
                <button 
                    onClick={onOpenChat} 
                    className="text-brand-primary font-bold hover:underline cursor-pointer bg-transparent border-none"
                >
                    Contactar con soporte legal
                </button>
            </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LegalView;