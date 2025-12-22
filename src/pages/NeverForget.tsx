import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";

const NOTES = [
  {
    emoji: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Red%20heart/3D/red_heart_3d.png",
    text: "Eu te amo mais do que as palavras podem explicar."
  },
  {
    emoji: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Star/3D/star_3d.png",
    text: "Você é a minha pessoa favorita no mundo todo."
  },
  {
    emoji: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Sun/3D/sun_3d.png",
    text: "Seu sorriso ilumina até os meus dias mais difíceis."
  },
  {
    emoji: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Gem%20stone/3D/gem_stone_3d.png",
    text: "Nossa história é o meu tesouro mais precioso."
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
          <Card className="h-full bg-white/5 border-white/10 backdrop-blur-md overflow-hidden relative shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
            <CardContent className="h-full flex flex-col items-center justify-center gap-4 relative z-10">
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center backdrop-blur-xl border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                 <img src={note.emoji} alt="Icon" className="w-16 h-16 opacity-50 blur-[2px] group-hover:blur-0 transition-all duration-500" />
              </div>
              <p className="text-muted-foreground/80 font-display text-xl tracking-widest uppercase group-hover:text-primary transition-colors">
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
          <Card className="h-full bg-card border-primary/20 overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <CardContent className="h-full flex flex-col items-center justify-center gap-6 p-8 text-center bg-gradient-to-b from-primary/10 via-background to-background">
              <img src={note.emoji} alt="Icon" className="w-24 h-24 drop-shadow-2xl animate-float" />
              <p className="font-display text-2xl md:text-3xl text-primary-foreground leading-relaxed">
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
