import React, { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Loader2, Send, Trash2, Mail } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription } from "@/components/ui/sheet";

interface Message {
  id: string;
  content: string;
  created_at: string;
}

const Diary = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [animatingMessageId, setAnimatingMessageId] = useState<string | null>(null);
  const animTimeoutRef = useRef<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (animTimeoutRef.current) {
        window.clearTimeout(animTimeoutRef.current);
        animTimeoutRef.current = null;
      }
    };
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao buscar mensagens:", error);
    } else {
      setMessages(data || []);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSave = async () => {
    if (!message.trim()) {
      toast({
        title: "Mensagem vazia",
        description: "Escreva algo antes de salvar!",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("messages")
        .insert([{ content: message }]);

      if (error) throw error;

      toast({
        title: "Salvo com sucesso!",
        description: "Seu pensamento foi guardado no nosso cantinho.",
      });
      setMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast({
        title: "Erro ao salvar",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("messages").delete().eq("id", id);
      if (error) throw error;
      
      setMessages(messages.filter((msg) => msg.id !== id));
      toast({
        title: "Mensagem apagada",
        description: "O pensamento foi removido.",
      });
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  const sheetContentRef = useRef<HTMLDivElement>(null);
  let startY = 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    startY = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endY = e.changedTouches[0].clientY;
    const diff = endY - startY;
    
    // Se arrastou mais de 50px para baixo, fecha o sheet
    if (diff > 50) {
      setSheetOpen(false);
      setSelectedMessage(null);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <img 
            src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Memo/3D/memo_3d.png" 
            alt="Diário" 
            className="w-24 h-24 mx-auto mb-4 animate-bounce-slow"
          />
          <h1 className="font-display text-4xl md:text-5xl text-primary mb-2">
            Nosso Diário
          </h1>
          <p className="text-muted-foreground font-body text-lg">
            Um espaço para guardar sentimentos, cartas e pensamentos.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl mb-12"
        >
          <Textarea
            placeholder="Como você está se sentindo hoje? Escreva aqui..."
            className="min-h-[150px] bg-background/50 border-white/10 resize-none text-lg mb-4 focus:ring-primary"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex justify-end">
            <Button 
              onClick={handleSave} 
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Guardar no Coração
                </>
              )}
            </Button>
          </div>
        </motion.div>

        <div className="space-y-6">
          <h2 className="font-display text-3xl text-center mb-8">Memórias Guardadas</h2>
          {messages.length === 0 ? (
            <p className="text-center text-muted-foreground italic">
              Nenhuma mensagem guardada ainda...
            </p>
          ) : (
            messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <button
                  onClick={() => {
                    if (animTimeoutRef.current) {
                      window.clearTimeout(animTimeoutRef.current);
                      animTimeoutRef.current = null;
                    }
                    setSelectedMessage(msg);
                    setAnimatingMessageId(msg.id);
                    animTimeoutRef.current = window.setTimeout(() => {
                      setSheetOpen(true);
                      setAnimatingMessageId(null);
                      animTimeoutRef.current = null;
                    }, 380);
                  }}
                  className="w-full relative h-40 cursor-pointer transition-all group"
                >
                  {/* Envelope background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-lg shadow-lg overflow-hidden group-hover:shadow-2xl group-hover:border-primary/40 transition-all duration-300">
                    {/* Envelope flap */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-primary/30 to-primary/10 origin-top"
                      animate={animatingMessageId === msg.id ? { rotateX: -180 } : { rotateX: 0 }}
                      transition={{ duration: 0.38 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center border-b border-white/20">
                        <Mail className="h-8 w-8 text-primary/80 group-hover:text-primary transition-colors" />
                      </div>
                    </motion.div>
                    
                    {/* Envelope body */}
                    <div className="absolute top-1/2 left-0 right-0 bottom-0 bg-gradient-to-b from-white/15 to-white/5 border-t border-white/10 px-6 py-4 flex flex-col justify-between">
                      <div className="text-left">
                        <div className="text-xs font-display text-primary/80 mb-1">Carta</div>
                        <div className="text-sm text-foreground/80 font-medium line-clamp-2">
                          {msg.content.substring(0, 60)}...
                        </div>
                      </div>
                      <div className="text-xs text-foreground/50 text-right">
                        {new Date(msg.created_at).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                    </div>

                    {/* Envelope shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </div>
                  </div>
                </button>
                
                <div className="mt-3 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10 h-8 w-8"
                    onClick={() => handleDelete(msg.id)}
                    aria-label="Apagar mensagem"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <Sheet open={sheetOpen} onOpenChange={(open) => { if (!open) { setSheetOpen(false); setSelectedMessage(null); } else { setSheetOpen(true); } }}>
          <SheetContent side="top" className="max-w-3xl mx-auto rounded-b-2xl bg-background flex flex-col h-[80vh]" ref={sheetContentRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <SheetHeader>
              <SheetTitle className="text-2xl text-foreground">Carta</SheetTitle>
              <SheetDescription className="text-sm text-foreground/70">
                {selectedMessage ? new Date(selectedMessage.created_at).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) : ''}
              </SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto pr-4">
              <motion.div initial={{ rotateX: -10, opacity: 0, y: -10 }} animate={{ rotateX: 0, opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mt-4 bg-card/80 p-8 rounded-lg shadow-lg text-lg whitespace-pre-wrap leading-relaxed text-white origin-top border border-white/10">
                {selectedMessage?.content}
              </motion.div>
            </div>
            <SheetFooter>
              <div className="flex gap-2 ml-auto">
                <Button onClick={() => setSheetOpen(false)} variant="ghost">Fechar</Button>
                <Button variant="destructive" onClick={() => { if (selectedMessage) { handleDelete(selectedMessage.id); setSheetOpen(false); } }}>Apagar</Button>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Diary;
