import React from 'react';
import Button from './Button';
import { PhoneCall } from 'lucide-react';

interface CTAProps {
    variant?: 'light' | 'dark';
    onOpenModal: () => void;
    onOpenChat: () => void;
}

const CTASection: React.FC<CTAProps> = ({ variant = 'light', onOpenModal, onOpenChat }) => {
    const isDark = variant === 'dark';

  return (
    <section className={`py-16 ${isDark ? 'bg-slate-900' : 'bg-brand-primary'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-white'}`}>
            ¿Tienes un proyecto en mente?
          </h2>
          <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-amber-100'}`}>
            Cuéntanos tu idea y te ofreceremos un presupuesto detallado sin compromiso.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Button 
              variant={isDark ? 'primary' : 'white'} 
              className={isDark ? '' : 'text-brand-primary font-bold'}
              onClick={onOpenModal}
            >
                Solicitar Presupuesto
            </Button>
            <Button 
                variant={isDark ? 'outline' : 'secondary'} 
                className={isDark ? 'border-slate-600 text-slate-300 hover:border-white hover:text-white' : 'bg-amber-800 text-white'}
                onClick={onOpenChat}
            >
                <PhoneCall className="mr-2 h-4 w-4" />
                667 08 54 43
            </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;