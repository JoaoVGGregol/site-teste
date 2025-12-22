import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Loader2, Send, Trash2 } from "lucide-react";

interface Message {
  id: string;
  content: string;
  created_at: string;
}

const Diary = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
                className="group relative bg-card border border-white/5 rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:border-primary/20"
              >
                <p className="text-lg whitespace-pre-wrap font-body leading-relaxed text-foreground/90">
                  {msg.content}
                </p>
                <div className="mt-4 flex justify-between items-center text-xs text-muted-foreground">
                  <span>
                    {new Date(msg.created_at).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                    onClick={() => handleDelete(msg.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Diary;
