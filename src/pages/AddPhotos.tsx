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
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(filePath, file);

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
    <div className="min-h-screen bg-background text-foreground pb-20">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="font-display text-4xl md:text-5xl text-center mb-8 flex items-center justify-center gap-3">
            Adicionar Novas Memórias <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Camera/3D/camera_3d.png" alt="Camera" className="w-12 h-12 inline-block" />
          </h1>
          
          <Card className="bg-card/50 border-white/10">
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
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
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
