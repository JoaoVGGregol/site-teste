import { motion } from "framer-motion";
import GradientText from "@/components/ui/gradient-text";

const FuturePlaces = () => {
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
          loading="lazy"
          decoding="async"
          className="w-24 h-24 mx-auto mb-6 animate-float drop-shadow-lg"
        />
        <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">
          <GradientText as="span">Lugares que eu quero ser feliz contigo</GradientText>
        </h2>
        <p className="text-muted-foreground text-base md:text-lg flex items-center justify-center gap-2 px-4">
          O mundo é muito pequeno para o tanto que eu te amo{" "}
          <img
            src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Sparkling%20heart/3D/sparkling_heart_3d.png"
            alt="Heart"
            loading="lazy"
            decoding="async"
            className="w-6 h-6 inline-block"
          />
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full rounded-3xl overflow-hidden shadow-2xl border border-primary/20 bg-gradient-to-b from-black via-[#12081f] to-black relative flex items-center justify-center px-6 py-14 md:py-20"
      >
        <div className="flex flex-col items-center gap-4">
          <img
            src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Globe%20showing%20Americas/3D/globe_showing_americas_3d.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="w-24 h-24 md:w-32 md:h-32 animate-float drop-shadow-lg"
          />
          <p className="font-display text-xl md:text-3xl text-white/90">
            O mundo inteiro, um dia
          </p>
          <p className="text-sm md:text-base text-white/60 max-w-md">
            Cada lugar que a gente ainda não foi é uma promessa nossa. ✨
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default FuturePlaces;
