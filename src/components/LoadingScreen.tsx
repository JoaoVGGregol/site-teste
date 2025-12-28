import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
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
          transition={isLoading ? { duration: 2, ease: "easeInOut" } : { duration: 0 }}
        >
          {/* Spiral overlay that fills the screen */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                exit={{ opacity: 0 }}
              >
                {/* Background spiral glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 2 }}
                />

                {/* Large rotating spiral */}
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 400 400"
                  className="absolute w-[200%] h-[200%] md:w-[250%] md:h-[250%]"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: 1, 
                    scale: [0.5, 1, 1.3],
                    rotate: [0, -360]
                  }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                >
                  <defs>
                    <linearGradient id="spiralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff6b9d" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#ff4d7d" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#ff6b9d" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Multiple spiral curves for depth */}
                  <motion.path
                    d="M 200 50 Q 350 100 350 200 Q 350 300 200 350 Q 50 300 50 200 Q 50 100 200 50 Q 320 50 340 180 Q 340 280 200 340"
                    fill="none"
                    stroke="url(#spiralGrad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />

                  <motion.path
                    d="M 200 80 Q 320 120 330 200 Q 320 280 200 320 Q 80 280 80 200 Q 80 120 200 80 Q 300 85 315 180"
                    fill="none"
                    stroke="url(#spiralGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.6"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 0.1 }}
                  />

                  <motion.path
                    d="M 200 120 Q 280 150 290 200 Q 280 250 200 280 Q 120 250 120 200 Q 120 150 200 120"
                    fill="none"
                    stroke="url(#spiralGrad)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
                  />

                  {/* Center rotating heart */}
                  <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, ease: "linear" }}
                    style={{ transformOrigin: "200px 200px" }}
                  >
                    <circle cx="200" cy="200" r="20" fill="#ff6b9d" />
                    <path
                      d="M200,190 C210,180 220,185 220,195 C220,205 210,215 200,220 C190,215 180,205 180,195 C180,185 190,180 200,190"
                      fill="white"
                      opacity="0.9"
                    />
                  </motion.g>
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
