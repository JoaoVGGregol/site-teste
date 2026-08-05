import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ICONS = {
  home: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/House/3D/house_3d.png",
  calendar: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Calendar/3D/calendar_3d.png",
  camera: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Camera/3D/camera_3d.png",
  note: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Spiral%20notepad/3D/spiral_notepad_3d.png",
  memo: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Memo/3D/memo_3d.png",
};

const NAV_ITEMS = [
  { to: "/", label: "Início", icon: ICONS.home },
  { to: "/dates", label: "Marcar Dates", icon: ICONS.calendar },
  { to: "/fotos/adicionar", label: "Adicionar Fotos", icon: ICONS.camera },
  { to: "/diario", label: "Diário", icon: ICONS.memo },
  { to: "/lembretes", label: "Lembretes", icon: ICONS.note },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background/90 via-background/40 to-transparent" />

      <div className="relative flex items-center gap-1 bg-card/60 border border-white/10 p-1.5 rounded-full shadow-[0_8px_30px_-8px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.to;

          return (
            <Link key={item.to} to={item.to}>
              <Button
                variant="ghost"
                className={cn(
                  "relative rounded-full gap-2 transition-colors duration-300",
                  isActive
                    ? "text-primary-foreground hover:text-primary-foreground"
                    : "hover:bg-white/10 hover:text-primary",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-romantic shadow-glow"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <img src={item.icon} alt="" className="w-6 h-6 relative z-10" />
                <span className="sr-only md:not-sr-only md:inline relative z-10">{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
