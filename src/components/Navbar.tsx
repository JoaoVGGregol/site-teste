import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ICONS = {
  home: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/House/3D/house_3d.png",
  calendar: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Calendar/3D/calendar_3d.png",
  camera: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Camera/3D/camera_3d.png",
  note: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Spiral%20notepad/3D/spiral_notepad_3d.png",
  memo: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Memo/3D/memo_3d.png"
};

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm">
      <div className="flex items-center gap-4 bg-card/50 border border-white/10 p-2 rounded-full shadow-lg backdrop-blur-md">
        <Link to="/">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 hover:text-primary transition-colors">
            <img src={ICONS.home} alt="Home" className="w-6 h-6" />
            <span className="sr-only">Início</span>
          </Button>
        </Link>
        
        <Link to="/dates">
          <Button variant="ghost" className="rounded-full hover:bg-white/10 hover:text-primary transition-colors gap-2">
            <img src={ICONS.calendar} alt="Dates" className="w-6 h-6" />
            <span className="hidden md:inline">Marcar Dates</span>
          </Button>
        </Link>

        <Link to="/fotos/adicionar">
          <Button variant="ghost" className="rounded-full hover:bg-white/10 hover:text-primary transition-colors gap-2">
            <img src={ICONS.camera} alt="Photos" className="w-6 h-6" />
            <span className="hidden md:inline">Adicionar Fotos</span>
          </Button>
        </Link>

        <Link to="/diario">
          <Button variant="ghost" className="rounded-full hover:bg-white/10 hover:text-primary transition-colors gap-2">
            <img src={ICONS.memo} alt="Diary" className="w-6 h-6" />
            <span className="hidden md:inline">Diário</span>
          </Button>
        </Link>

        <Link to="/lembretes">
          <Button variant="ghost" className="rounded-full hover:bg-white/10 hover:text-primary transition-colors gap-2">
            <img src={ICONS.note} alt="Notes" className="w-6 h-6" />
            <span className="hidden md:inline">Lembretes</span>
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
