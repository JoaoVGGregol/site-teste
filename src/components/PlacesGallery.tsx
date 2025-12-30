import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import placeCafe from "@/assets/place-cafe.jpg";
import placePark from "@/assets/place-park.jpg";
import placeRestaurant from "@/assets/place-restaurant.jpg";

const places = [
  {
    name: "Pomerode",
    description: "Nossa viagem especial para a cidade mais alemã do Brasil.",
    image: placeCafe,
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114033.10172703957!2d-49.25972637866433!3d-26.727316648094394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dee51350fdda43%3A0x8d04d4dc4fa02626!2sPomerode%20-%20Testo%20Salto%2C%20Pomerode%20-%20SC%2C%2089107-000!5e0!3m2!1spt-BR!2sbr!4v1766437765165!5m2!1spt-BR!2sbr"
  },
  {
    name: "Balneario Camboriú SC",
    description: "Happy memories :).",
    image: placePark,
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113752.63402037357!2d-48.6993853184751!3d-27.005830427716283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94d8b65cc2e52aad%3A0x2dc004f5e6adebc4!2zQmFsbmXDoXJpbyBDYW1ib3Jpw7osIFND!5e0!3m2!1spt-BR!2sbr!4v1767060670393!5m2!1spt-BR!2sbr"
  },
  {
    name: "Ristorante Funiculì Funiculà",
    description: "Jantares inesquecíveis sob a luz das velas.",
    image: placeRestaurant,
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.3131207522338!2d-49.070731599999995!3d-26.925286200000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94df18e85c3179cd%3A0x775df948e74c8911!2sRistorante%20Funicul%C3%AC%20Funicul%C3%A0!5e0!3m2!1spt-BR!2sbr!4v1766437082509!5m2!1spt-BR!2sbr"
  },
];

const PlacesGallery = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-display text-4xl md:text-5xl text-center mb-16 text-foreground"
      >
        Lugares que fomos :) 
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8">
        {places.map((place, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-soft hover:shadow-glow transition-all duration-500">
              <div className="aspect-[4/3] overflow-hidden">
                {/* @ts-ignore */}
                {place.mapUrl ? (
                  <iframe
                    /* @ts-ignore */
                    src={place.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                ) : (
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                )}
              </div>
              
              <div className={`absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${/* @ts-ignore */ place.mapUrl ? 'pointer-events-none' : ''}`} />
              
              <div className={`absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ${/* @ts-ignore */ place.mapUrl ? 'pointer-events-none' : ''}`}>
                <div className="flex items-center gap-2 text-primary-foreground mb-2">
                  <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Round%20pushpin/3D/round_pushpin_3d.png" alt="Pin" className="w-6 h-6" />
                  <h3 className="font-display text-xl">{place.name}</h3>
                </div>
                <p className="text-primary-foreground/90 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {place.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PlacesGallery;
