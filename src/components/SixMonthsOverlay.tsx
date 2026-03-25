import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const SixMonthsOverlay = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={() => setIsOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 15 }}
          className="bg-white/10 p-6 md:p-12 rounded-3xl shadow-2xl border border-white/20 text-center max-w-lg relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 z-0" />
          
          <div className="relative z-10 flex flex-col items-center gap-6">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0] 
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <span className="text-4xl md:text-6xl text-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]">✨ 6 Meses ✨</span>
            </motion.div>

            <h2 className="text-2xl md:text-5xl font-display text-white mt-2 md:mt-4 drop-shadow-md">
              Feliz 6 Meses, Meu Amor!
            </h2>
            
            <p className="text-base md:text-xl text-white/90 leading-relaxed font-medium">
              Amanhã completamos meio ano de muitos sorrisos, viagens e momentos inesquecíveis. 
              Que venham muito mais aventuras juntos! ❤️
            </p>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 md:mt-6 w-full md:w-auto px-8 py-3 bg-white text-rose-500 rounded-full font-bold text-base md:text-lg hover:bg-rose-50 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Começar Celebração 🎉
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SixMonthsOverlay;