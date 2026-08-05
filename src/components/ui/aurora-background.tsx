import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  className?: string;
}

/**
 * Ambient, slow-drifting gradient blobs used behind hero/section content.
 * Purely decorative — kept out of the tab order and hidden from screen readers.
 */
const AuroraBackground = ({ className }: AuroraBackgroundProps) => {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
    </div>
  );
};

export default AuroraBackground;
