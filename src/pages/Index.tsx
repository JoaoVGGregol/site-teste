import { motion } from "framer-motion";
import CountdownTimer from "@/components/CountdownTimer";
import Timeline from "@/components/Timeline";
import PlacesGallery from "@/components/PlacesGallery";
import PlaylistSection from "@/components/PlaylistSection";
import { PhotosGallery } from "@/components/PhotosGallery";
import LoadingScreen from "@/components/LoadingScreen";
import FuturePlaces from "@/components/FuturePlaces";
import Navbar from "@/components/Navbar";

const Index = () => {
  // Imagem de fundo fofa e detalhista (Flores suaves com fundo escuro)
  const cuteBackground = "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=2400&auto=format&fit=crop";

  return (
    <div className="min-h-screen bg-gradient-soft">
      <LoadingScreen />
      <Navbar />
      
      {/* Hero Section with Timer */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/90 z-10" />
          <img
            src={cuteBackground}
            alt="Hero Background"
            className="w-full h-full object-cover opacity-40 animate-pulse-slow"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 py-20">
          <CountdownTimer />
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 bg-background">
        <Timeline />
      </section>

      {/* Photos Gallery Section */}
      <section className="py-20 px-4 bg-secondary/10">
        <PhotosGallery />
      </section>

      {/* Places Gallery Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/30">
        <PlacesGallery />
      </section>

      {/* Future Places Section */}
      <section className="py-20 px-4 bg-background">
        <FuturePlaces />
      </section>

      {/* Playlist Section */}
      <section className="py-20 px-4 bg-secondary/10">
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
            Com amor, para sempre <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Sparkling%20heart/3D/sparkling_heart_3d.png" alt="Heart" className="w-8 h-8 inline-block" />
          </p>
          <p className="text-primary-foreground/80 text-sm">
            Desde 25 de Agosto de 2025
          </p>
        </motion.div>
      </footer>
    </div>
  );
};

export default Index;
