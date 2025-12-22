import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Tempo para a "porta" ficar fechada antes de abrir
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
          {/* Porta Esquerda - Fundo Preto, Letra Branca */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: "-100%", transition: { duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] } }}
            className="absolute left-0 top-0 h-full w-1/2 bg-black flex items-center justify-end pr-4 md:pr-12 shadow-2xl z-20"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-fancy text-[8rem] md:text-[12rem] text-white drop-shadow-glow"
            >
              J
            </motion.span>
          </motion.div>

          {/* Porta Direita - Fundo Branco, Letra Preta */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: "100%", transition: { duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] } }}
            className="absolute right-0 top-0 h-full w-1/2 bg-white flex items-center justify-start pl-4 md:pl-12 shadow-2xl z-20"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-fancy text-[8rem] md:text-[12rem] text-black drop-shadow-glow"
            >
              E
            </motion.span>
          </motion.div>
          
          {/* Coração Central Minimalista */}
           <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0, transition: { duration: 0.3 } }}
            transition={{ delay: 1, duration: 0.5 }}
            className="z-30 text-primary text-6xl absolute mix-blend-difference"
           >
             ❤️
           </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
