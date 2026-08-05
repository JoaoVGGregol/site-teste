import { motion } from "framer-motion";
import { Calendar, Heart, Star, Sparkles, Gem } from "lucide-react";
import SpotlightCard from "@/components/ui/spotlight-card";
import GradientText from "@/components/ui/gradient-text";

const timelineEvents = [
  {
    date: "25 de Setembro, 2025",
    title: "Nosso primeiro contato",
    description: "O dia em que tudo começou, nesse momento eramos apenas dois desconhecidos que não estavam procurando nada, mas ainda bem que eu respondi aquela mensagem",
    icon: Heart,
  },
  {
    date: "12 de Outubro, 2025",
    title: "Primeiro Encontro",
    description: "O dia em que tudo começou, estavamos nervosos, mas entre chutes, garçons que nos odiavam e muito julgamento para casais felizes (amargurados), ali eu já tinha certeza que seria você",
    icon: Star,
  },
  {
    date: "Novembro, 2025",
    title: "Momentos Inesquecíveis",
    description: "Eu sinceramente pensei muito em no que escrever aqui, mas a verdade é que todos os momentos com você são inesquecíveis, desde os mais simples até os mais especiais. Nesse dia eu precisava te dizer como me sentia e como você me mostrou que eu conseguia sentir algo por alguém novamente",
    icon: Sparkles,
  },
  {
    date: "Hoje",
    title: "Nossa História Continua...",
    description: "Quando eu estou fazendo isso aqui, não fazem 3 meses que nos conhecemos, e eu já sinto que você é uma parte essencial da minha vida. Nunca imaginei que alguém pudesse chegar e mudar tudo dentro de mim, até você chegar.",
    icon: Calendar,
  },
  {
    date: "6 meses",
    title: "Especial de 6 Meses",
    description: "6 meses de carinho, parceria e memórias lindas. Obrigado por transformar meus dias e por ser meu cantinho especial. 💖",
    icon: Sparkles,
    badge: "6 meses",
  },
  {
    date: "29 de Julho, 2026",
    title: "A Aliança",
    description: "O dia em que coloquei a aliança na sua mão e selei uma promessa: que essa história é para durar. Um marco que carrego com todo orgulho e que representa tudo o que sinto por você.",
    icon: Gem,
    badge: "Nosso marco",
  },
];

const Timeline = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-display text-4xl md:text-5xl text-center mb-16 text-foreground"
      >
        Nossa <GradientText as="span">Linha do Tempo</GradientText>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <SpotlightCard className="border-primary/40 shadow-glow p-6 text-center" spotlightColor="hsl(340 80% 65% / 0.22)">
          <span className="inline-flex text-xs font-semibold px-3 py-1 rounded-full bg-primary/15 text-primary border border-primary/30 uppercase tracking-wide mb-3">
            Nosso marco mais recente
          </span>
          <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2">A Aliança 💍</h3>
          <p className="text-muted-foreground leading-relaxed">
            Em 29 de julho de 2026, coloquei a aliança na sua mão. Um gesto pequeno pra guardar uma promessa gigante: essa história é para durar.
          </p>
        </SpotlightCard>
      </motion.div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary transform md:-translate-x-1/2 shadow-[0_0_12px_hsl(var(--primary)/0.5)]" />

        <div className="space-y-12">
          {timelineEvents.map((event, index) => {
            const Icon = event.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Desktop spacing */}
                <div className="hidden md:block md:w-1/2" />

                {/* Icon in center */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                  <div className="absolute inset-0 rounded-full bg-primary/40 blur-md animate-pulse-slow" />
                  <div className="relative w-16 h-16 rounded-full bg-gradient-romantic flex items-center justify-center shadow-glow border-4 border-background">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>

                {/* Content card */}
                <div className={`ml-20 md:ml-0 md:w-1/2 ${isEven ? "md:pr-12" : "md:pl-12"}`}>
                  <SpotlightCard className="p-6 shadow-soft hover:shadow-glow transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-sm text-primary font-semibold">{event.date}</div>
                      {event.badge && (
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/15 text-primary border border-primary/30 uppercase tracking-wide">
                          {event.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-2xl mb-2 text-foreground">{event.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                  </SpotlightCard>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
