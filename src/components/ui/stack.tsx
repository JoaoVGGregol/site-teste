import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import "./stack.css";

interface CardRotateProps {
  children: ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  disableDrag?: boolean;
}

function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_: unknown, info: { offset: { x: number; y: number } }) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  if (disableDrag) {
    return (
      <motion.div className="card-rotate-disabled" style={{ x: 0, y: 0 }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="card-rotate"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

interface StackCard {
  id: number;
  content: ReactNode;
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  cards?: ReactNode[];
  animationConfig?: { stiffness: number; damping: number };
  sendToBackOnClick?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  mobileClickOnly?: boolean;
  mobileBreakpoint?: number;
  /** Quantas cartas ficam realmente montadas no DOM ao mesmo tempo. */
  visibleCards?: number;
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cards = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileClickOnly = false,
  mobileBreakpoint = 768,
  visibleCards = 5,
}: StackProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [mobileBreakpoint]);

  const shouldDisableDrag = mobileClickOnly && isMobile;
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

  const [stack, setStack] = useState<StackCard[]>(() =>
    cards.map((content, index) => ({ id: index + 1, content })),
  );

  useEffect(() => {
    setStack(cards.map((content, index) => ({ id: index + 1, content })));
  }, [cards]);

  // Só as cartas do topo ficam montadas. Com um álbum grande, manter todas as
  // imagens no DOM estoura a memória do celular — e as de baixo nem aparecem.
  // stack[0] é a carta que acabou de ir para trás, então ela entra no fundo da
  // pilha visível e a transição continua igual à de antes.
  const visible = useMemo(() => {
    if (stack.length <= visibleCards) return stack;
    return [stack[0], ...stack.slice(-(visibleCards - 1))];
  }, [stack, visibleCards]);

  // Um sorteio fixo por posição da pilha. Sortear durante o render mudava o
  // ângulo a cada frame e mantinha o framer-motion reanimando sem parar.
  const randomRotations = useMemo(
    () => Array.from({ length: visible.length }, () => (randomRotation ? Math.random() * 10 - 5 : 0)),
    [visible.length, randomRotation],
  );

  const sendToBack = (id: number) => {
    setStack((prev) => {
      const newStack = [...prev];
      const index = newStack.findIndex((card) => card.id === id);
      const [card] = newStack.splice(index, 1);
      newStack.unshift(card);
      return newStack;
    });
  };

  useEffect(() => {
    if (!autoplay || isPaused) return;

    // Atualização funcional: sem `stack` nas dependências o intervalo não é
    // destruído e recriado a cada troca de carta.
    const interval = setInterval(() => {
      setStack((prev) => {
        if (prev.length < 2) return prev;
        const newStack = [...prev];
        newStack.unshift(newStack.pop()!);
        return newStack;
      });
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, isPaused]);

  return (
    <div
      className="stack-container"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {visible.map((card, index) => {
        const randomRotate = randomRotations[index] ?? 0;
        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
            disableDrag={shouldDisableDrag}
          >
            <motion.div
              className="card"
              onClick={() => shouldEnableClick && sendToBack(card.id)}
              animate={{
                rotateZ: (visible.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - visible.length * 0.06,
                transformOrigin: "90% 90%",
              }}
              initial={false}
              transition={{
                type: "spring",
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
            >
              {card.content}
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
