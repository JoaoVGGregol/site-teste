import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  animate?: boolean;
}

/**
 * Animated gradient headline text, in the spirit of ReactBits' "Gradient Text".
 */
const GradientText = ({ children, className, as: Tag = "span", animate = true }: GradientTextProps) => {
  return (
    <Tag
      className={cn(
        "bg-gradient-to-r from-rose-300 via-primary to-rose-400 bg-clip-text text-transparent",
        animate && "bg-[length:200%_auto] animate-shimmer",
        className,
      )}
    >
      {children}
    </Tag>
  );
};

export default GradientText;
