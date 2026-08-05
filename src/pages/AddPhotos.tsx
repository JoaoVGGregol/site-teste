import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import GradientText from "@/components/ui/gradient-text";
import AuroraBackground from "@/components/ui/aurora-background";

const MAX_DIMENSION = 1600;

/**
 * Reduz a foto antes de enviar. Uma imagem direto da câmera do celular chega a
 * 4000x3000, o que vira dezenas de MB de memória na hora de exibir a galeria e
 * derruba a aba no iPhone. Se algo falhar, envia o arquivo original.
 */
async function compressImage(file: File): Promise<File | Blob> {
  if (!file.type.startsWith("image/")) return file;

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);

    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", 0.82),
    );

    // Só vale a pena se realmente ficou menor.
    return blob && blob.size < file.size ? blob : file;
  } catch {
    return file;
  }
}

const AddPhotos = () => {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "Ops!",
        description: "Selecione uma foto primeiro.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // 1. Upload da imagem para o Storage
      const compressed = await compressImage(file);
      const fileExt = compressed === file ? file.name.split('.').pop() : 'webp';
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(filePath, compressed);

      if (uploadError) throw uploadError;

      // 2. Pegar a URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(filePath);

      // 3. Salvar no Banco de Dados
      const { error: dbError } = await supabase
        .from('photos')
        .insert([
          { url: publicUrl, description: description }
        ]);

      if (dbError) throw dbError;

      toast({
        title: "Sucesso! 🎉",
        description: "Sua foto foi adicionada ao álbum.",
      });

      setFile(null);
      setDescription("");

    } catch (error: any) {
      console.error(error);
      toast({
        title: "Erro ao salvar",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground pb-20 overflow-hidden">
      <AuroraBackground className="opacity-60" />
      <Navbar />

      <div className="relative container mx-auto px-4 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="font-display text-4xl md:text-5xl text-center mb-8 flex items-center justify-center gap-3">
            <GradientText as="span">Adicionar Novas Memórias</GradientText> <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Camera/3D/camera_3d.png" alt="Camera" className="w-12 h-12 inline-block" />
          </h1>

          <Card className="bg-card/50 backdrop-blur-lg border-white/10 shadow-soft hover:shadow-glow hover:border-primary/30 transition-all duration-500">
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="photo-upload">Escolher Foto</Label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-12 text-center hover:bg-white/5 transition-colors cursor-pointer group relative">
                  <input 
                    id="photo-upload" 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {file ? (
                    <div className="text-primary font-medium">
                      <p>Foto selecionada:</p>
                      <p className="text-sm text-muted-foreground mt-1">{file.name}</p>
                    </div>
                  ) : (
                    <>
                      <img 
                        src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Framed%20picture/3D/framed_picture_3d.png" 
                        alt="Upload" 
                        className="w-20 h-20 mx-auto mb-4 opacity-80 group-hover:scale-110 transition-transform" 
                      />
                      <p className="text-muted-foreground">
                        Clique para fazer upload ou arraste a foto aqui
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Legenda (Opcional)</Label>
                <Input 
                  id="description" 
                  placeholder="Descreva esse momento especial..." 
                  className="bg-background/50 border-white/10" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <Button
                variant="glow"
                className="w-full"
                onClick={handleUpload}
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Salvar Foto"
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AddPhotos;
