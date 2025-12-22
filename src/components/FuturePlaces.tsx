import { motion } from "framer-motion";
import { Globe as GlobeIcon, Loader2 } from "lucide-react";
import { useEffect, useState, useRef, lazy, Suspense, Component, ReactNode } from "react";

// Lazy load do Globe
const Globe = lazy(() => import("react-globe.gl"));

// Error Boundary Component
class GlobeErrorBoundary extends Component<{ children: ReactNode, fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Globe Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

const FuturePlaces = () => {
  const globeEl = useRef<any>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      try {
        // Auto-rotate
        globeEl.current.controls().autoRotate = true;
        globeEl.current.controls().autoRotateSpeed = 0.5;
        
        // Set initial point of view
        globeEl.current.pointOfView({ lat: -15, lng: -55, altitude: 2.5 });
      } catch (e) {
        console.error("Error configuring globe:", e);
      }
    }
  }, [isMounted]);

  const FallbackMap = () => (
    <iframe 
      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d30898677.77926863!2d-50.72826200656236!3d-14.23500437332767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1spt-BR!2sbr!4v1734900000000!5m2!1spt-BR!2sbr" 
      width="100%" 
      height="100%" 
      style={{ border: 0 }} 
      allowFullScreen 
      loading="lazy" 
      referrerPolicy="no-referrer-when-downgrade"
      className="w-full h-full opacity-90 hover:opacity-100 transition-opacity duration-500"
    ></iframe>
  );

  return (
    <div className="max-w-6xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <img 
          src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Globe%20with%20meridians/3D/globe_with_meridians_3d.png" 
          alt="Globe" 
          className="w-24 h-24 mx-auto mb-6 animate-float drop-shadow-lg" 
        />
        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
          Lugares que eu quero ser feliz contigo
        </h2>
        <p className="text-muted-foreground text-lg flex items-center justify-center gap-2">
          O mundo é muito pequeno para o tanto que eu te amo <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Sparkling%20heart/3D/sparkling_heart_3d.png" alt="Heart" className="w-6 h-6 inline-block" />
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-border/50 bg-black relative flex items-center justify-center"
        ref={containerRef}
      >
        {isMounted && dimensions.width > 0 && (
          <GlobeErrorBoundary fallback={<FallbackMap />}>
            <Suspense fallback={<div className="flex flex-col items-center text-muted-foreground"><Loader2 className="w-10 h-10 animate-spin mb-2" /><p>Carregando o mundo...</p></div>}>
              <Globe
                ref={globeEl}
                width={dimensions.width}
                height={dimensions.height}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                atmosphereColor="#3a228a"
                atmosphereAltitude={0.2}
              />
            </Suspense>
          </GlobeErrorBoundary>
        )}
        <div className="absolute bottom-4 right-4 text-xs text-white/30 pointer-events-none z-10">
          Interaja com o globo para explorar
        </div>
      </motion.div>
    </div>
  );
};

export default FuturePlaces;
