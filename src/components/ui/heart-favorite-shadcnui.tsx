import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface HeartFavoriteProps {
  autoLike?: boolean;
}

export function HeartFavorite({ autoLike = false }: HeartFavoriteProps = {}) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (autoLike) setIsLiked(true);
  }, [autoLike]);

  return (
    <div className="flex items-center justify-center p-12">
      <motion.button
        onClick={() => setIsLiked(!isLiked)}
        whileTap={{ scale: 0.9 }}
        className="rounded-full p-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <motion.div
          animate={{
            scale: isLiked ? [1, 1.3, 1] : 1,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <Heart
            className={`h-8 w-8 transition-colors ${
              isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </motion.div>
      </motion.button>
    </div>
  );
}
