import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";

interface HeartFavoriteProps {
  defaultLiked?: boolean;
  onChange?: (liked: boolean) => void;
}

export function HeartFavorite({ defaultLiked = false, onChange }: HeartFavoriteProps) {
  const [isLiked, setIsLiked] = useState(defaultLiked);

  const toggle = () => {
    const next = !isLiked;
    setIsLiked(next);
    onChange?.(next);
  };

  return (
    <motion.button
      type="button"
      onClick={toggle}
      whileTap={{ scale: 0.9 }}
      aria-pressed={isLiked}
      aria-label={isLiked ? "Remover dos favoritos" : "Favoritar"}
      className="rounded-full p-3 transition-colors hover:bg-white/10"
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
          className={`h-7 w-7 transition-colors ${
            isLiked ? "fill-primary text-primary" : "text-muted-foreground"
          }`}
        />
      </motion.div>
    </motion.button>
  );
}
