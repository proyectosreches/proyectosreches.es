import React, { useState } from 'react';
import Button from './Button';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// URL de tu backend en Google Sheets
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyc9Z7_Is7KxxO8JMVeBJP2p2wK-tUZNe9MAIXSWha-e7vGS3i2EdcwfHsRHFp45vLACA/exec';

interface ContactFormProps {
  className?: string;
  onSuccess?: () => void;
  id?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className = '', onSuccess, id = 'form' }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Log para depuración
    console.log("Iniciando envío a Google Sheets...", formState);
    
    try {
      // Envío real a Google Sheets
      // Usamos mode: 'no-cors' y Content-Type: 'text/plain' para máxima compatibilidad
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: {
          'Content-Type': 'text/plain', 
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          message: formState.message,
          source: 'Formulario Web'
        }),
      });
      
      console.log("Petición enviada correctamente (modo opaco).");
      setStatus('success');
      if (onSuccess) setTimeout(onSuccess, 2000); 

    } catch (error) {
      console.error("Error enviando formulario:", error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center h-full min-h-[400px] ${className}`}
      >
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
          <CheckCircle size={32} />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">¡Mensaje Enviado!</h3>
        <p className="text-slate-500">
          Hemos recibido tus datos. Uno de nuestros expertos te contactará en menos de 24 horas.
        </p>
      </motion.div>
    );
  }

  return (
    <div className={`bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl border border-white/20 ${className}`}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900">Solicita tu Presupuesto</h3>
        <p className="text-slate-500 text-sm mt-1">Rellena el formulario y te asesoramos gratis.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre */}
        <div>
          <label htmlFor={`${id}-name`} className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo</label>
          <input
            type="text"
            id={`${id}-name`}
            name="name"
            required
            value={formState.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all outline-none bg-slate-50 hover:bg-white"
            placeholder="Ej. Juan Pérez"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor={`${id}-email`} className="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico</label>
          <input
            type="email"
            id={`${id}-email`}
            name="email"
            required
            value={formState.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all outline-none bg-slate-50 hover:bg-white"
            placeholder="tu@email.com"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label htmlFor={`${id}-phone`} className="block text-sm font-medium text-slate-700 mb-1">Teléfono</label>
          <input
            type="tel"
            id={`${id}-phone`}
            name="phone"
            required
            value={formState.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all outline-none bg-slate-50 hover:bg-white"
            placeholder="+34 600 000 000"
          />
        </div>

        {/* Mensaje */}
        <div>
          <label htmlFor={`${id}-message`} className="block text-sm font-medium text-slate-700 mb-1">
            Mensaje <span className="text-slate-400 font-normal">(Opcional)</span>
          </label>
          <textarea
            id={`${id}-message`}
            name="message"
            rows={3}
            value={formState.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all outline-none bg-slate-50 hover:bg-white resize-none"
            placeholder="Cuéntanos brevemente tu proyecto..."
          ></textarea>
        </div>

        {/* Error Message */}
        {status === 'error' && (
          <div className="flex items-center text-red-600 text-sm bg-red-50 p-3 rounded-lg">
            <AlertCircle size={16} className="mr-2" />
            <span>Por favor, revisa los campos obligatorios.</span>
          </div>
        )}

        {/* Submit Button */}
        <Button 
          variant="primary" 
          fullWidth 
          type="submit" 
          disabled={status === 'submitting'}
          className="mt-2"
        >
          {status === 'submitting' ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              Enviar Solicitud <Send size={18} className="ml-2" />
            </span>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;