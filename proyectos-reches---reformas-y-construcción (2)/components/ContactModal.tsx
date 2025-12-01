import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ContactForm from './ContactForm';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFormSuccess?: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, onFormSuccess }) => {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleSuccess = () => {
    // Wait a brief moment for the user to see the "Sent" state in the form, 
    // then close modal and trigger the schedule popup
    setTimeout(() => {
      onClose();
      if (onFormSuccess) onFormSuccess();
    }, 1500); 
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="w-full max-w-md pointer-events-auto relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute -top-12 right-0 md:-right-12 text-white hover:text-brand-primary transition-colors p-2"
                aria-label="Cerrar modal"
              >
                <X size={32} />
              </button>

              {/* Form Component inside Modal */}
              <ContactForm 
                id="modal-form"
                onSuccess={handleSuccess}
                className="shadow-2xl ring-1 ring-white/10"
              />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;