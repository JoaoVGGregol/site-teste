import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleStart = () => {
    setIsLoading(true);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
        >
          {/* Spiral heart loading effect */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 400 400"
                  className="w-80 h-80 md:w-96 md:h-96"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, ease: "linear" }}
                >
                  <defs>
                    <linearGradient id="heartSpiralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff6b9d" />
                      <stop offset="50%" stopColor="#ff7ba8" />
                      <stop offset="100%" stopColor="#ff4d7d" />
                    </linearGradient>
                  </defs>

                  {/* Heart-shaped spiral */}
                  <motion.path
                    d="M 200,320 
                       C 130,260 80,210 80,140 
                       C 80,100 110,70 145,70 
                       C 170,70 192,85 200,105 
                       C 208,85 230,70 255,70 
                       C 290,70 320,100 320,140 
                       C 320,210 270,260 200,320 Z"
                    fill="none"
                    stroke="url(#heartSpiralGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ strokeDasharray: 800, strokeDashoffset: 800, opacity: 0 }}
                    animate={{ 
                      strokeDashoffset: 0,
                      opacity: 1
                    }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />

                  {/* Secondary spiral layer */}
                  <motion.path
                    d="M 200,310 
                       C 140,260 95,215 95,150 
                       C 95,115 118,85 150,85 
                       C 172,85 190,97 200,115 
                       C 210,97 228,85 250,85 
                       C 282,85 305,115 305,150 
                       C 305,215 260,260 200,310 Z"
                    fill="none"
                    stroke="url(#heartSpiralGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.6"
                    initial={{ strokeDasharray: 750, strokeDashoffset: 750, opacity: 0 }}
                    animate={{ 
                      strokeDashoffset: 0,
                      opacity: 0.6
                    }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 0.1 }}
                  />

                  {/* Center dot */}
                  <motion.circle
                    cx="200"
                    cy="200"
                    r="6"
                    fill="#ff6b9d"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1, 0.8] }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  />
                </motion.svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Initial content */}
          <AnimatePresence>
            {!isLoading && (
              <motion.div
                className="flex flex-col items-center justify-center gap-12"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                {/* Heart icon */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    className="w-24 h-24 md:w-32 md:h-32"
                  >
                    <defs>
                      <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff6b9d" />
                        <stop offset="100%" stopColor="#ff4d7d" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M50,90 C25,70 10,58 10,40 C10,25 20,15 32,15 C40,15 48,22 50,32 C52,22 60,15 68,15 C80,15 90,25 90,40 C90,58 75,70 50,90 Z"
                      fill="url(#heartGrad)"
                    />
                  </svg>
                </motion.div>

                {/* Button */}
                <motion.button
                  onClick={handleStart}
                  className="px-8 py-3 border border-primary/50 rounded-full text-primary font-display text-lg hover:border-primary/100 transition-all hover:bg-primary/5"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  Pronta pra começar? 💕
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
