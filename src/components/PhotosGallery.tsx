import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"

const defaultPhotos = [
  "/fotos/233793f9-6033-43a6-adf0-7bc77e07f59a.JPEG",
  "/fotos/8c24059c-4ee1-4b80-a190-7d56040ef066.JPEG",
  "/fotos/99c2bbae-bad4-4cc5-a937-6cea975c675d.JPEG",
  "/fotos/e05b7e8e-5ee6-4a78-a165-29348b195a80.JPEG",
  "/fotos/ff9a21e9-5720-4995-bb0c-ff19b8cd650c.JPEG",
  "/fotos/2ee18636-4065-4add-959d-09ee8a45101e.JPEG",
]

export function PhotosGallery() {
  const [photos, setPhotos] = React.useState<string[]>(defaultPhotos)
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  React.useEffect(() => {
    const fetchPhotos = async () => {
      const { data, error } = await supabase
        .from('photos')
        .select('url')
        .order('created_at', { ascending: false })

      if (data && data.length > 0) {
        const urls = data.map(photo => photo.url)
        setPhotos([...urls, ...defaultPhotos])
      }
    }

    fetchPhotos()
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
       <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
          Nossos Momentos
        </h2>
        <p className="text-muted-foreground text-lg">
          Memórias que guardo com todo carinho 📸
        </p>
      </motion.div>

      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {photos.map((photo, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="border-none shadow-none bg-transparent">
                  <CardContent className="flex aspect-[4/5] md:aspect-video items-center justify-center p-0 overflow-hidden rounded-3xl bg-black/20">
                    <img 
                      src={photo} 
                      alt={`Nosso momento ${index + 1}`} 
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  )
}
