import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, Variant } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  width = "fit-content", 
  delay = 0,
  direction = "up",
  className = ""
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" }); // once: true para mejor rendimiento en móvil
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const getVariants = (): { hidden: Variant; visible: Variant } => {
    const distance = 75;
    const variants = {
        hidden: { opacity: 0, y: 0, x: 0 },
        visible: { opacity: 1, y: 0, x: 0 }
    };

    switch(direction) {
        case "up": variants.hidden.y = distance; break;
        case "down": variants.hidden.y = -distance; break;
        case "left": variants.hidden.x = distance; break;
        case "right": variants.hidden.x = -distance; break;
        case "none": break;
    }

    return variants;
  };

  return (
    <div ref={ref} style={{ position: "relative", width }} className={className}>
      <motion.div
        variants={getVariants()}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.8, delay: delay, ease: [0.25, 0.25, 0.25, 0.75] }} // Curva Bezier suave
      >
        {children}
      </motion.div>
    </div>
  );
};
