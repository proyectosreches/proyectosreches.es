import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Calendar, ChevronRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI, Content, Part } from "@google/genai";

// URL de tu backend en Google Sheets
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyc9Z7_Is7KxxO8JMVeBJP2p2wK-tUZNe9MAIXSWha-e7vGS3i2EdcwfHsRHFp45vLACA/exec';

// System instruction for the AI
const SYSTEM_INSTRUCTION = `
Eres el asistente virtual inteligente de "Proyectos Reches". Tu tono es profesional, cercano y experto en construcción y reformas.
Tu objetivo es ayudar a clientes potenciales respondiendo dudas sobre los servicios de la empresa y guiarlos para pedir un presupuesto.

INFORMACIÓN DE LA EMPRESA:
- Nombre: Proyectos Reches
- Experiencia: +16 años en el sector, +1500 proyectos realizados, +785 para empresas.
- Ubicación: Carrer de Dante Alighieri 133, Horta-Guinardó, 08032 Barcelona.
- Contacto: Teléfono +34 667 08 54 43, Email proyectosreches@gmail.com.
- Horario de atención: Lunes a Viernes de 9:00 a 18:00.

SERVICIOS: Reformas Integrales, Climatización, Electricidad, Albañilería, Fontanería, Mantenimiento.

REGLAS:
- Sé conciso en respuestas generales (máximo 3-4 frases).
- Si usas "thinking mode" para preguntas complejas, resume la conclusión final para el usuario.
- Si preguntan precios: "Cada proyecto es único, pide presupuesto gratuito".
- Si el usuario muestra interés claro en contratar o agendar, anímalo a usar la palabra "cita" o "reunión" para gestionar su reserva.
`;

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  time?: string;
  type?: 'text' | 'button';
  actionUrl?: string;
  actionLabel?: string;
}

type BookingStep = 'idle' | 'asking_name' | 'asking_email';

interface ChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onToggle }) => {
  const [hasNotification, setHasNotification] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  // State for booking flow
  const [bookingStep, setBookingStep] = useState<BookingStep>('idle');
  const [userData, setUserData] = useState({ name: '', email: '' });

  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'welcome', 
      role: 'model', 
      text: '¡Hola! 👋 Soy el asistente virtual de Proyectos Reches. ¿En qué puedo ayudarte hoy con tu reforma o proyecto?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const notificationTimer = setTimeout(() => {
      if (!isOpen) setHasNotification(true);
    }, 3000);
    return () => clearTimeout(notificationTimer);
  }, []);

  useEffect(() => {
    if (isOpen) setHasNotification(false);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, isLoading]);

  const addBotMessage = (text: string, type: 'text' | 'button' = 'text', actionLabel?: string, actionUrl?: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'model',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type,
      actionLabel,
      actionUrl
    }]);
  };

  const sendLeadToSheets = async (name: string, email: string) => {
    if (!GOOGLE_SCRIPT_URL) return;
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: '',
          message: 'Lead captado desde Chatbot (Intención de cita)',
          source: 'Chatbot WhatsApp'
        }),
      });
    } catch (e) {
      console.error("Chatbot: Error guardando lead", e);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add User Message
    const newMessage: Message = { 
        id: Date.now().toString(), 
        role: 'user', 
        text: userText, 
        time: currentTime
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsLoading(true);

    // --- INTERCEPTION LOGIC (State Machine) ---
    if (bookingStep !== 'idle' || /cita|agendar|reunión|llamada|hablar con alguien|consultoría|reservar/i.test(userText)) {
        if (bookingStep === 'asking_name') {
            setTimeout(() => {
                setUserData(prev => ({ ...prev, name: userText }));
                setBookingStep('asking_email');
                addBotMessage(`¡Genial ${userText}! ¿Cuál es tu correo electrónico de contacto?`);
                setIsLoading(false);
            }, 600);
            return;
        }
        if (bookingStep === 'asking_email') {
            const email = userText;
            const name = userData.name;
            sendLeadToSheets(name, email);
            setTimeout(() => {
                setUserData(prev => ({ ...prev, email: email }));
                setBookingStep('idle');
                addBotMessage("Perfecto, ya puedo agendar tu reunión. Aquí tienes el botón para reservar tu cita:", 'button', 'Agendar mi cita', 'https://cal.com/proyectosreches/15min');
                setIsLoading(false);
            }, 600);
            return;
        }
        if (/cita|agendar|reunión|llamada|hablar con alguien|consultoría|reservar/i.test(userText)) {
            setTimeout(() => {
                if (userData.name && userData.email) {
                    addBotMessage(`Hola de nuevo ${userData.name}. Aquí tienes el botón para reservar tu cita:`, 'button', 'Agendar mi cita', 'https://cal.com/proyectosreches/15min');
                } else {
                    setBookingStep('asking_name');
                    addBotMessage("Perfecto 👌 Antes de agendar tu cita necesito un par de datos rápidos. ¿Cuál es tu nombre?");
                }
                setIsLoading(false);
            }, 600);
            return;
        }
    }

    // --- GOOGLE GENAI LOGIC ---
    try {
      if (!process.env.API_KEY) {
        throw new Error("API Key missing");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Construct contents properly preserving history
      const contents: Content[] = messages.map(m => {
          return {
              role: m.role,
              parts: [{ text: m.text }]
          };
      });
      
      // Add current turn
      contents.push({ role: 'user', parts: [{ text: userText }] });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents,
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
        }
      });

      const responseText = response.text || "Lo siento, no tengo respuesta para eso ahora mismo.";
      addBotMessage(responseText);
      
    } catch (error) {
      console.error("Chat error:", error);
      addBotMessage("Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-4 md:bottom-28 md:right-8 z-50 w-[90vw] md:w-[350px] max-h-[600px] h-[75vh] bg-[#EFEAE2] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-100 font-sans"
          >
            {/* Header */}
            <div className="bg-[#075E54] p-3 px-4 flex justify-between items-center shadow-md shrink-0">
              <div className="flex items-center text-white">
                <div className="bg-white/20 p-2 rounded-full mr-3">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-base">Proyectos Reches AI</h3>
                  <p className="text-xs text-white/90 flex items-center">
                     <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                     En línea
                  </p>
                </div>
              </div>
              <button onClick={onToggle} className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-lg">
                <X size={24} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed shadow-[0_1px_2px_rgba(0,0,0,0.1)] relative ${
                      msg.role === 'user' 
                        ? 'bg-[#d9fdd3] text-slate-900 rounded-tr-none' 
                        : 'bg-white text-slate-800 rounded-tl-none'
                    }`}
                  >
                    {msg.text}

                    {msg.type === 'button' && msg.actionUrl && (
                      <div className="mt-3 mb-1">
                        <a 
                          href={msg.actionUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-full bg-[#075E54] hover:bg-[#054c44] text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow-sm group"
                        >
                          <Calendar size={16} className="mr-2" />
                          {msg.actionLabel}
                          <ChevronRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </a>
                      </div>
                    )}

                    <div className="text-[10px] text-right mt-1 opacity-60 leading-none select-none">
                      {msg.time}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm flex items-center space-x-2 text-slate-500 text-xs">
                    <Loader2 size={14} className="animate-spin text-brand-primary" />
                    <span>Escribiendo...</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-2 bg-[#F0F2F5] shrink-0">
                <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        className="flex-1 bg-white text-slate-800 rounded-2xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#075E54] border-none text-sm shadow-sm placeholder:text-slate-400 min-h-[44px]"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !inputValue.trim()}
                        className="bg-[#075E54] text-white p-3 rounded-full hover:bg-[#054c44] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center justify-center transform active:scale-95"
                    >
                        <Send size={18} className={inputValue.trim() ? "ml-0.5" : ""} />
                    </button>
                </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-6 right-6 z-[60] p-4 rounded-full shadow-lg shadow-[#25D366]/40 transition-all duration-300 flex items-center justify-center ${
          isOpen ? 'bg-slate-700 text-white' : 'bg-[#25D366] text-white'
        }`}
      >
        <AnimatePresence mode='wait'>
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="relative">
              <MessageCircle size={28} />
              {hasNotification && (
                <span className="absolute -top-1 -right-2 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600 border-2 border-white"></span>
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default Chatbot;