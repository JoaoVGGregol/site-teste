import Navbar from "@/components/Navbar";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const EMOJIS = {
  heart: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Red%20heart/3D/red_heart_3d.png",
  wink: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Winking%20face/3D/winking_face_3d.png",
  calendar: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Calendar/3D/calendar_3d.png",
  pin: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Round%20pushpin/3D/round_pushpin_3d.png",
  plus: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Plus/3D/plus_3d.png",
  party: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Party%20popper/3D/party_popper_3d.png"
};

interface DateEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  location: string;
}

const Dates = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [datesList, setDatesList] = useState<DateEvent[]>([]);
  const { toast } = useToast();

  const fetchDates = async () => {
    const { data, error } = await supabase
      .from('dates')
      .select('*')
      .order('date', { ascending: true });
    
    if (data) setDatesList(data);
  };

  useEffect(() => {
    fetchDates();
  }, []);

  const handleSaveDate = async () => {
    if (!date || !location) {
      toast({
        title: "Ops!",
        description: "Preencha pelo menos a data e o local.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('dates')
        .insert([
          {
            date: date.toISOString(),
            title: "Date Especial",
            location: location,
            description: description
          }
        ]);

      if (error) throw error;

      toast({
        title: "Sucesso! ❤️",
        description: "Date marcado com sucesso!",
      });

      setIsDialogOpen(false);
      setLocation("");
      setDescription("");
      fetchDates();
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o date.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="font-display text-4xl md:text-5xl text-center mb-8 flex items-center justify-center gap-4">
            Nossos Dates <img src={EMOJIS.heart} alt="Heart" className="w-12 h-12 inline-block animate-pulse" />
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card/50 border-white/10 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <img src={EMOJIS.calendar} alt="" className="w-32 h-32" />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <img src={EMOJIS.calendar} alt="" className="w-6 h-6" />
                  Planejar Data
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4 relative z-10">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border border-white/10 bg-background/50 backdrop-blur-sm"
                />
                <Button 
                  className="w-full gap-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/20" 
                  onClick={() => date && setIsDialogOpen(true)}
                  disabled={!date}
                >
                  <img src={EMOJIS.plus} alt="" className="w-5 h-5" />
                  Agendar Date
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-white/10 overflow-hidden relative min-h-[400px]">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <img src={EMOJIS.party} alt="" className="w-32 h-32" />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <img src={EMOJIS.party} alt="" className="w-6 h-6" />
                  Próximos Eventos
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                {datesList.length > 0 ? (
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {datesList.map((event) => (
                      <div key={event.id} className="bg-background/40 p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-primary/20 p-2 rounded-lg">
                            <img src={EMOJIS.calendar} alt="" className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-primary capitalize">
                              {format(new Date(event.date), "d 'de' MMMM", { locale: ptBR })}
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <img src={EMOJIS.pin} alt="" className="w-3 h-3" />
                              {event.location}
                            </p>
                          </div>
                        </div>
                        {event.description && (
                          <p className="text-sm text-foreground/80 pl-12 italic">
                            "{event.description}"
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-center gap-4 h-full">
                    <img src={EMOJIS.wink} alt="Wink" className="w-16 h-16 opacity-80" />
                    <p className="text-muted-foreground">
                      Nenhum date marcado para este dia... ainda!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px] bg-card/95 backdrop-blur-xl border-white/10 text-foreground shadow-2xl">
              <DialogHeader>
                <DialogTitle className="font-display text-3xl text-center text-primary flex items-center justify-center gap-2">
                  Novo Date <img src={EMOJIS.heart} alt="" className="w-8 h-8" />
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="flex items-center gap-3 text-muted-foreground justify-center bg-secondary/30 p-3 rounded-xl border border-white/5">
                    <img src={EMOJIS.calendar} alt="" className="w-6 h-6" />
                    <span className="text-lg font-medium capitalize">
                        {date ? format(date, "EEEE, d 'de' MMMM", { locale: ptBR }) : "Selecione uma data"}
                    </span>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="place" className="text-lg">Onde vamos?</Label>
                  <div className="relative group">
                    <div className="absolute left-3 top-3 transition-transform group-hover:scale-110">
                      <img src={EMOJIS.pin} alt="" className="w-6 h-6" />
                    </div>
                    <Input 
                      id="place" 
                      placeholder="Ex: Restaurante Italiano..." 
                      className="pl-12 bg-background/50 border-white/10 h-12 text-lg focus:ring-primary/50 transition-all" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description" className="text-lg">Detalhes</Label>
                  <Textarea 
                    id="description" 
                    placeholder="O que vamos fazer? Que horas?..." 
                    className="bg-background/50 border-white/10 min-h-[100px] text-base focus:ring-primary/50 transition-all" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  onClick={handleSaveDate} 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground h-12 text-lg font-medium shadow-lg shadow-primary/20"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    "Salvar Date"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </motion.div>
      </div>
    </div>
  );
};

export default Dates;
