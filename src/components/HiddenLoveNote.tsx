import { motion } from "framer-motion";

const notes = [
  { text: "eu te amo 🤍", position: "top-20 left-3 md:top-24 md:left-8", delay: 0.4 },
  { text: "você é meu lugar", position: "top-[38%] right-3 md:top-1/3 md:right-12", delay: 1.1 },
  { text: "meu coração é seu", position: "bottom-28 left-3 md:bottom-28 md:left-16", delay: 1.8 },
  { text: "pra sempre nós", position: "bottom-20 right-3 md:bottom-6 md:right-14", delay: 2.4 },
];

const HiddenLoveNote = () => {
  return (
    <div className="fixed inset-0 z-40 pointer-events-none select-none">
      {notes.map((note) => (
        <motion.p
          key={note.text}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: [0.28, 0.55, 0.28], y: [0, -4, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: note.delay,
          }}
          className={`fixed ${note.position} px-2 py-1 rounded-full bg-background/30 backdrop-blur-[2px] text-xs md:text-sm text-foreground/70 tracking-wide`}
        >
          {note.text}
        </motion.p>
      ))}
    </div>
  );
};

export default HiddenLoveNote;