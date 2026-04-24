import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const MilestoneOverlay = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [monthsElapsed, setMonthsElapsed] = useState(0);
  const [daysElapsed, setDaysElapsed] = useState(0);

  useEffect(() => {
    const startDate = new Date("2025-09-25T00:00:00");
    const now = new Date();
    const diffTime = now.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);

    setMonthsElapsed(diffMonths);
    setDaysElapsed(diffDays);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const duration = 6 * 1000;
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
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-rose-500/20 z-0" />
          
          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Main milestone display */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring", damping: 12 }}
              className="flex items-center justify-center gap-4"
            >
              <div className="text-5xl md:text-7xl font-display text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400">
                {monthsElapsed}+
              </div>
              <div className="text-lg md:text-2xl text-white/90 font-semibold">
                Meses de <br /> muito amor
              </div>
            </motion.div>

            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <span className="text-4xl md:text-5xl drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]">✨ 💕 ✨</span>
            </motion.div>

            <h2 className="text-2xl md:text-4xl font-display text-white mt-2 md:mt-4 drop-shadow-md leading-tight">
              Olha só quanto tempo já passou!
            </h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base md:text-lg text-white/90 leading-relaxed font-medium"
            >
              <span className="block mb-3">
                {daysElapsed} dias de momentos incríveis,
              </span>
              <span className="block">
                sorrisos, abraços e memórias que vão ficar pra sempre.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-white/10 border border-white/20 rounded-2xl p-4 md:p-6 backdrop-blur-sm w-full"
            >
              <p className="text-white/80 text-sm md:text-base italic">
                "E cada dia com você é um presente que eu nunca vou parar de agradecer." 💝
              </p>
            </motion.div>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 md:mt-8 w-full md:w-auto px-8 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full font-bold text-base md:text-lg hover:shadow-[0_0_30px_rgba(244,63,94,0.5)] hover:scale-105 transition-all shadow-[0_0_20px_rgba(244,63,94,0.3)]"
            >
              Vamos explorar ❤️
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MilestoneOverlay;
