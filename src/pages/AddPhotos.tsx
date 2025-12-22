import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";

const AddPhotos = () => {
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
                <div className="border-2 border-dashed border-white/20 rounded-lg p-12 text-center hover:bg-white/5 transition-colors cursor-pointer group">
                  <img 
                    src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Framed%20picture/3D/framed_picture_3d.png" 
                    alt="Upload" 
                    className="w-20 h-20 mx-auto mb-4 opacity-80 group-hover:scale-110 transition-transform" 
                  />
                  <p className="text-muted-foreground">
                    Clique para fazer upload ou arraste a foto aqui
                  </p>
                  <Input id="photo-upload" type="file" className="hidden" accept="image/*" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Legenda (Opcional)</Label>
                <Input id="description" placeholder="Descreva esse momento especial..." className="bg-background/50 border-white/10" />
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Salvar Foto
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AddPhotos;
