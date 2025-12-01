import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import Chatbot from './components/Chatbot';
import SchedulePopup from './components/SchedulePopup';
import MapSection from './components/MapSection';
import LegalView, { LegalDocType } from './components/LegalView';
import ContactView from './components/ContactView';

type ViewState = 'home' | 'contact' | LegalDocType;

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSchedulePopupOpen, setIsSchedulePopupOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleOpenChat = () => setIsChatOpen(true);
  const handleToggleChat = () => setIsChatOpen(!isChatOpen);

  const handleFormSuccess = () => {
    setTimeout(() => {
        setIsSchedulePopupOpen(true);
    }, 500);
  };

  // Función centralizada de navegación
  const handleNavigate = (view: ViewState, targetSectionId?: string) => {
    setCurrentView(view);
    
    // Resetear scroll al cambiar de vista
    if (!targetSectionId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Si hay un objetivo (ej: navegar a Home -> Servicios), esperamos al render
      setTimeout(() => {
        const element = document.getElementById(targetSectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'legal-notice':
      case 'privacy-policy':
      case 'cookies-policy':
        return (
          <LegalView 
            type={currentView} 
            onBack={() => handleNavigate('home')} 
            onOpenChat={handleOpenChat}
          />
        );
      case 'contact':
        return (
            <ContactView 
                onBack={() => handleNavigate('home')}
                onFormSuccess={handleFormSuccess}
            />
        );
      case 'home':
      default:
        return (
          <>
            <Hero 
                onOpenModal={handleOpenModal} 
                onFormSuccess={handleFormSuccess}
                onNavigateTestimonials={() => handleNavigate('home', 'opiniones')}
            />
            <Services onOpenModal={handleOpenModal} />
            <AboutUs onOpenModal={handleOpenModal} />
            <Stats />
            <CTASection 
              variant="dark" 
              onOpenModal={handleOpenModal} 
              onOpenChat={handleOpenChat}
            />
            <Testimonials />
            <CTASection 
              variant="light" 
              onOpenModal={handleOpenModal}
              onOpenChat={handleOpenChat}
            />
            <MapSection />
          </>
        );
    }
  };

  return (
    <div className="font-sans text-slate-800 bg-white">
      {/* Header recibe la vista actual real para adaptar su estilo */}
      <Header 
        onOpenModal={handleOpenModal} 
        onNavigate={handleNavigate}
        currentView={currentView} 
      />
      
      <main>
        {renderContent()}
      </main>

      {/* Footer recibe onNavigate para los links legales */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Modals & Chat */}
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onFormSuccess={handleFormSuccess}
      />

      <SchedulePopup 
        isOpen={isSchedulePopupOpen} 
        onClose={() => setIsSchedulePopupOpen(false)} 
      />

      <Chatbot 
        isOpen={isChatOpen}
        onToggle={handleToggleChat}
      />
    </div>
  );
};

export default App;