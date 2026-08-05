import * as React from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"
import GradientText from "@/components/ui/gradient-text"
import Stack from "@/components/ui/stack"
import { HeartFavorite } from "@/components/ui/heart-favorite"

// Versões .webp redimensionadas: as originais .JPEG continuam em public/fotos,
// mas ocupavam ~8 MB de memória cada quando decodificadas no celular.
export const defaultPhotos = [
  "/fotos/233793f9-6033-43a6-adf0-7bc77e07f59a.webp",
  "/fotos/8c24059c-4ee1-4b80-a190-7d56040ef066.webp",
  "/fotos/99c2bbae-bad4-4cc5-a937-6cea975c675d.webp",
  "/fotos/e05b7e8e-5ee6-4a78-a165-29348b195a80.webp",
  "/fotos/ff9a21e9-5720-4995-bb0c-ff19b8cd650c.webp",
  "/fotos/2ee18636-4065-4add-959d-09ee8a45101e.webp",
]

export function PhotosGallery() {
  const [photos, setPhotos] = React.useState<string[]>(defaultPhotos)

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

  // Memoizado: recriar esse array a cada render faz o Stack remontar as cartas.
  const cards = React.useMemo(
    () =>
      photos.map((photo, index) => (
        <img
          key={photo + index}
          src={photo}
          alt={`Nosso momento ${index + 1}`}
          className="card-image"
          decoding="async"
        />
      )),
    [photos],
  )

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
          <GradientText as="span">Nossos Momentos</GradientText>
        </h2>
        <p className="text-muted-foreground text-lg">
          Memórias que guardo com todo carinho 📸
        </p>
      </motion.div>

      <div className="flex flex-col items-center gap-2">
        <div className="w-52 h-72 sm:w-64 sm:h-[22rem] md:w-80 md:h-[26rem]">
          <Stack
            cards={cards}
            randomRotation
            sensitivity={180}
            sendToBackOnClick
            autoplay
            autoplayDelay={4000}
            pauseOnHover
          />
        </div>

        <p className="text-sm text-muted-foreground/70 italic">
          Arraste as fotos ou toque para ver a próxima
        </p>

        <HeartFavorite />
      </div>
    </div>
  )
}
