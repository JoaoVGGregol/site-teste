import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";

const NOTES = [
  {
    emoji: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Red%20heart/3D/red_heart_3d.png",
    text: "Eu te amo muito e te desejo todos os dias da minha vida."
  },
  {
    emoji: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Star/3D/star_3d.png",
    text: "Você é a minha pessoa favorita no mundo todo."
  },
  {
    emoji: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Sun/3D/sun_3d.png",
    text: "Você ilumina até os meus dias mais difíceis."
  },
  {
    emoji: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Gem%20stone/3D/gem_stone_3d.png",
    text: "Eu quero muito viver uma grande história contigo."
  }
];

const FlipCard = ({ note, index }: { note: typeof NOTES[0], index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="h-[350px] w-full [perspective:1000px] cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          rotateY: isFlipped ? 180 : 0 
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ 
          duration: 0.6, 
          type: "spring", 
          stiffness: 260, 
          damping: 20 
        }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Face (Blurred/Cover) */}
        <div className="absolute inset-0 w-full h-full" style={{ backfaceVisibility: "hidden" }}>
          <Card className="h-full bg-white/10 border-white/20 backdrop-blur-md overflow-hidden relative shadow-xl">
            <CardContent className="h-full flex flex-col items-center justify-center gap-4 relative z-10">
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-xl border border-white/30 shadow-inner group-hover:scale-110 transition-transform duration-500">
                 <img src={note.emoji} alt="Icon" className="w-16 h-16 opacity-80 group-hover:opacity-100 group-hover:blur-0 transition-all duration-500" />
              </div>
              <p className="text-foreground font-display text-xl tracking-widest uppercase group-hover:text-primary transition-colors">
                Toque para ver
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Back Face (Content) */}
        <div 
          className="absolute inset-0 w-full h-full" 
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <Card className="h-full bg-black border-primary/40 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)]">
            <CardContent className="h-full flex flex-col items-center justify-center gap-6 p-8 text-center">
              <img src={note.emoji} alt="Icon" className="w-28 h-28 drop-shadow-2xl animate-float" />
              <p className="font-display text-3xl md:text-4xl text-white leading-relaxed" style={{
                textShadow: '0 4px 12px rgba(0, 0, 0, 0.8), 0 0 20px rgba(340, 60%, 65%, 0.3)'
              }}>
                "{note.text}"
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

const NeverForget = () => {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="font-display text-4xl md:text-5xl text-center mb-12 flex items-center justify-center gap-3">
            Pra Você Nunca Esquecer 
            <img 
              src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Spiral%20notepad/3D/spiral_notepad_3d.png" 
              alt="Note" 
              className="w-12 h-12 inline-block animate-bounce-slow" 
            />
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            {NOTES.map((note, index) => (
              <FlipCard key={index} note={note} index={index} />
            ))}
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default NeverForget;
