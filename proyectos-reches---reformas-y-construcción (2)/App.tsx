import React, { useState, Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import SchedulePopup from './components/SchedulePopup';
import Legal, { LegalType } from './components/Legal';
import Projects from './components/Projects';
import ProjectPDFModal from './components/ProjectPDFModal';

// Lazy Loading de componentes pesados
const MapSection = lazy(() => import('./components/MapSection'));
const Chatbot = lazy(() => import('./components/Chatbot'));

export type ViewState = 'home' | 'legal';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [currentLegalPage, setCurrentLegalPage] = useState<LegalType>('notice');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSchedulePopupOpen, setIsSchedulePopupOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Estado para diferir la carga del chat
  const [loadChat, setLoadChat] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  
  const handleOpenChat = () => {
    setLoadChat(true);
    setIsChatOpen(true);
  };
  
  const handleToggleChat = () => {
    setLoadChat(true);
    setIsChatOpen(!isChatOpen);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => setLoadChat(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleFormSuccess = () => {
    setTimeout(() => {
        setIsSchedulePopupOpen(true);
    }, 500);
  };

  const handleNavigate = (view: ViewState, targetSectionId?: string, legalPage?: LegalType) => {
    setCurrentView(view);
    
    if (view === 'legal' && legalPage) {
        setCurrentLegalPage(legalPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    if (!targetSectionId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setTimeout(() => {
        const element = document.getElementById(targetSectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const renderMainContent = () => {
    switch (currentView) {
        case 'legal':
            return (
                <Legal 
                    type={currentLegalPage} 
                    onBack={() => handleNavigate('home')} 
                />
            );
        case 'home':
        default:
            return (
                <>
                    <Hero 
                        onOpenModal={handleOpenModal} 
                        onFormSuccess={handleFormSuccess}
                        onNavigateAbout={() => handleNavigate('home', 'nosotros')}
                    />
                    
                    <Services 
                        onOpenModal={handleOpenModal} 
                    />

                    <Projects 
                        onOpenModal={() => setIsProjectModalOpen(true)}
                    />

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
                    
                    <Suspense fallback={<div className="h-[400px] bg-slate-50 animate-pulse flex items-center justify-center text-slate-400">Cargando mapa...</div>}>
                      <MapSection />
                    </Suspense>
                </>
            );
    }
  };

  return (
    <div className="font-sans text-slate-800 bg-white selection:bg-brand-primary/30 selection:text-brand-dark">
      <Header 
        onOpenModal={handleOpenModal} 
        onNavigate={handleNavigate}
        currentView={currentView}
      />
      
      <main>
        {renderMainContent()}
      </main>

      <Footer onNavigate={handleNavigate} />

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onFormSuccess={handleFormSuccess}
      />

      <SchedulePopup 
        isOpen={isSchedulePopupOpen} 
        onClose={() => setIsSchedulePopupOpen(false)} 
      />

      <ProjectPDFModal 
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />

      {loadChat && (
        <Suspense fallback={null}>
            <Chatbot 
                isOpen={isChatOpen}
                onToggle={handleToggleChat}
            />
        </Suspense>
      )}
    </div>
  );
};

export default App;
