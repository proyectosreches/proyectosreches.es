import React, { useEffect, useState, useRef } from 'react';
import { Reveal } from './Reveal';

// --- CONFIGURACIÓN Y TIPOS ---
interface StatData {
  id: number;
  label: string;
  endValue: number;
  prefix?: string;
  suffix?: string;
}

const statsData: StatData[] = [
  { id: 1, label: 'Años de Experiencia', endValue: 16, prefix: '+' },
  { id: 2, label: 'Proyectos Realizados', endValue: 1500 },
  { id: 3, label: 'Proyectos para Empresas', endValue: 785 },
  { id: 4, label: 'Compromiso y Calidad', endValue: 100, suffix: '%' },
];

// Easing function: easeOutExpo
const easeOutExpo = (x: number): number => {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
};

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('es-ES').format(num);
};

// --- COMPONENTE INDIVIDUAL ---
const StatItem: React.FC<{ data: StatData; startAnimation: boolean }> = ({ data, startAnimation }) => {
  const [count, setCount] = useState(0);
  const duration = 2500;

  useEffect(() => {
    if (!startAnimation) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const rawPercentage = Math.min(progress / duration, 1);
      const easedPercentage = easeOutExpo(rawPercentage);
      const currentVal = Math.floor(easedPercentage * data.endValue);

      setCount(currentVal);

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(data.endValue);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [startAnimation, data.endValue]);

  return (
    <div className="px-4 py-6 flex flex-col items-center">
      <div 
        className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tighter"
      >
        <span className="text-amber-400 mr-1 opacity-80">{data.prefix}</span>
        {formatNumber(count)}
        <span className="text-amber-400 ml-1 opacity-80">{data.suffix}</span>
      </div>
      <div className="h-1 w-12 bg-amber-500/50 rounded-full mb-3"></div>
      <div 
        className="text-slate-300 font-medium text-sm md:text-base uppercase tracking-widest text-center"
      >
        {data.label}
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
const Stats: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section 
      id="stats" 
      ref={sectionRef} 
      className="bg-slate-900 py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-20">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal width="100%">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 divide-none md:divide-x divide-white/10">
            {statsData.map((stat) => (
                <StatItem key={stat.id} data={stat} startAnimation={isVisible} />
            ))}
            </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Stats;