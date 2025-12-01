import React from 'react';
import { motion } from 'framer-motion';
import { ProjectItem } from '../types';
import { Reveal } from './Reveal';
import { ArrowUpRight } from 'lucide-react';

const projects: ProjectItem[] = [
  {
    id: 1,
    title: "Reforma integral de un piso",
    location: "L'Hospitalet",
    image: "https://images.unsplash.com/photo-1484154218962-a1c002085aac?q=80&w=1470&auto=format&fit=crop",
    category: "Integral"
  },
  {
    id: 2,
    title: "Reforma de cocina y baño",
    location: "Sant Boi",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1470&auto=format&fit=crop",
    category: "Cocina"
  },
  {
    id: 3,
    title: "Reforma integral casa dos plantas",
    location: "Sant Gervasi",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1453&auto=format&fit=crop",
    category: "Integral"
  },
  {
    id: 4,
    title: "Rehabilitación de escalera",
    location: "Badalona",
    image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1470&auto=format&fit=crop",
    category: "Comunidades"
  },
  {
    id: 5,
    title: "Diseño de mobiliario a medida",
    location: "Eixample",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1470&auto=format&fit=crop",
    category: "Carpintería"
  },
  {
    id: 6,
    title: "Cocina moderna concepto abierto",
    location: "Gràcia",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfe1?q=80&w=1374&auto=format&fit=crop",
    category: "Cocina"
  }
];

interface ProjectsProps {
  onOpenModal: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ onOpenModal }) => {
  return (
    <section className="py-24 pt-36 bg-slate-900 min-h-screen relative">
       {/* Dark Texture */}
       <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <Reveal width="100%" className="mb-16 flex flex-col md:flex-row items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.2em] mb-3">
              Portfolio
            </h2>
            <p className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Obras que hablan <br/> <span className="text-slate-500">por sí mismas.</span>
            </p>
          </div>
          <p className="text-slate-400 text-lg max-w-sm pb-2">
            Una selección de nuestros trabajos más recientes en Barcelona y alrededores.
          </p>
        </Reveal>

        <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                visible: { transition: { staggerChildren: 0.1 } }
            }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -10 }}
              className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-xl bg-slate-800"
              onClick={onOpenModal}
            >
              {/* Image with zoom effect */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60" />
              </div>

              {/* Badge */}
              <div className="absolute top-6 left-6">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold text-white uppercase tracking-wider">
                    {project.category}
                </span>
              </div>

              {/* Arrow Icon Reveal */}
              <div className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 shadow-lg">
                <ArrowUpRight className="text-slate-900 w-5 h-5" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-300 group-hover:translate-y-0">
                <p className="text-brand-primary text-sm font-medium mb-2 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
                    {project.location}
                </p>
                <h3 className="text-2xl font-bold text-white leading-tight mb-4 group-hover:mb-2 transition-all duration-300">
                  {project.title}
                </h3>
                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                    <span className="text-sm text-slate-300 inline-flex items-center border-b border-brand-primary pb-0.5">
                        Ver detalles del proyecto
                    </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;