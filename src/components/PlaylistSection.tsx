import { motion } from "framer-motion";
import { Music } from "lucide-react";

const PlaylistSection = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <Music className="w-16 h-16 text-primary mx-auto mb-6 animate-float" />
        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
          Nossa Playlist
        </h2>
        <p className="text-muted-foreground text-lg">
          As músicas que lembram a nós 🫶
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-card rounded-3xl p-6 shadow-soft border border-border"
      >
        {/* 
          PARA TROCAR A PLAYLIST:
          1. Vá no Spotify, clique nos 3 pontinhos da playlist -> Compartilhar -> Incorporar playlist
          2. Copie o link que está dentro do src="..." (ex: https://open.spotify.com/embed/playlist/...)
          3. Cole no src abaixo
        */}
        <iframe
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/playlist/3qo8yHc1qhOTQhJUmaV6Hk?utm_source=generator"
          width="100%"
          height="352"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="w-full"
        ></iframe>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground italic">
            "Cada música me lembra um pedacinho de você" ❤️
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PlaylistSection;
