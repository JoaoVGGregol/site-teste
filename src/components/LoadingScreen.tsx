import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { useState, useEffect } from "react";
import { HeartFavorite } from "@/components/ui/heart-favorite-shadcnui";

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [autoLike, setAutoLike] = useState(false);

  useEffect(() => {
    const clickTimer = setTimeout(() => setAutoLike(true), 1400);
    const hideTimer = setTimeout(() => setIsVisible(false), 3200);
    return () => {
      clearTimeout(clickTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            <HeartFavorite autoLike={autoLike} />

            <motion.div
              className="absolute text-white"
              initial={{ opacity: 0, x: 70, y: 70 }}
              animate={{ opacity: [0, 1, 1, 0], x: [70, 0], y: [70, 0] }}
              transition={{ duration: 1.4, times: [0, 0.3, 0.85, 1], ease: "easeOut" }}
            >
              <MousePointer2 className="h-6 w-6 fill-white" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
