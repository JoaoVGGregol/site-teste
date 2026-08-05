import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CountdownTimer from "@/components/CountdownTimer";
import Timeline from "@/components/Timeline";
import PlacesGallery from "@/components/PlacesGallery";
import PlaylistSection from "@/components/PlaylistSection";
import { PhotosGallery } from "@/components/PhotosGallery";
import LoadingScreen from "@/components/LoadingScreen";
import FuturePlaces from "@/components/FuturePlaces";
import Navbar from "@/components/Navbar";
import AuroraBackground from "@/components/ui/aurora-background";
import GradientText from "@/components/ui/gradient-text";

const Index = () => {
  const [monthsElapsed, setMonthsElapsed] = useState(0);
  const [daysElapsed, setDaysElapsed] = useState(0);

  useEffect(() => {
    const startDate = new Date("2025-09-25T00:00:00");
    const now = new Date();
    const diffTime = now.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);

    setMonthsElapsed(diffMonths);
    setDaysElapsed(diffDays);
  }, []);

  // Fundo com imagem de praia romântica
  const cuteBackground = "/fundodetela.webp";

  return (
    <div className="min-h-screen bg-gradient-soft">
      <LoadingScreen />
      <Navbar />
      
      {/* Hero Section with Timer */}
      <section className="relative min-h-screen min-h-[100svh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/90 z-10" />
          <img
            src={cuteBackground}
            alt="Hero Background"
            decoding="async"
            className="w-full h-full object-cover opacity-40 animate-pulse-slow"
          />
          <AuroraBackground className="z-[5]" />
        </div>

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-10"
          >
            <div className="rounded-3xl border border-primary/30 bg-card/90 md:bg-card/80 md:backdrop-blur-lg shadow-glow px-6 py-6 md:px-10 md:py-8 text-center">
              <p className="text-primary font-semibold tracking-wide text-sm md:text-base">
                NOSSA HISTÓRIA ESPECIAL
              </p>
              <h1 className="font-display text-4xl md:text-6xl text-foreground mt-2 leading-tight">
                Um <GradientText as="span">cantinho só nosso</GradientText> 💖
              </h1>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-4 md:mt-6 bg-gradient-to-r from-pink-500/20 to-rose-500/20 border border-pink-500/30 rounded-2xl py-4 md:py-6"
              >
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-3xl md:text-4xl font-display text-rose-400">{monthsElapsed}+</span>
                  <span className="text-sm md:text-base font-semibold text-muted-foreground">Meses de muito amor</span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {daysElapsed} dias de momentos incrível que vivemos juntos.
                </p>
              </motion.div>
            </div>
          </motion.div>

          <CountdownTimer />
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* Timeline Section */}
      <section className="py-12 md:py-20 px-4 bg-background">
        <Timeline />
      </section>

      {/* Photos Gallery Section */}
      <section className="py-12 md:py-20 px-4 bg-secondary/10">
        <PhotosGallery />
      </section>

      {/* Places Gallery Section */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-background to-secondary/30">
        <PlacesGallery />
      </section>

      {/* Future Places Section */}
      <section className="py-12 md:py-20 px-4 bg-background">
        <FuturePlaces />
      </section>

      {/* Playlist Section */}
      <section className="py-12 md:py-20 px-4 bg-secondary/10">
        <PlaylistSection />
      </section>

      {/* Footer */}
      <footer className="py-12 text-center bg-gradient-romantic">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-display text-2xl md:text-3xl text-primary-foreground mb-2 flex items-center justify-center gap-2">
            Feito com muito amor e carinho.<img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Sparkling%20heart/3D/sparkling_heart_3d.png" alt="Heart" className="w-8 h-8 inline-block" />
          </p>
          <p className="text-primary-foreground/80 text-sm">
            Eu te amo muito, e espero que esse cantinho especial faça você sorrir sempre que lembrar de mim. ❤️
          </p>
        </motion.div>
      </footer>
    </div>
  );
};

export default Index;
