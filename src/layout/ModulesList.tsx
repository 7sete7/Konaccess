import LazyIcon from "@/components/LazyIcon";
import { Button } from "@/components/ui/button";

const MODULES: { name: string; icon: string }[] = Array(10).fill({ name: "Imovel", icon: "home" });
export default function ModuleList() {
  return (
    <nav className="grid gap-1 p-2">
      {MODULES.map(({ name, icon }, i) => (
        <Button key={i} variant="link" className="justify-start flex gap-1 align-baseline">
          <LazyIcon name={icon} size={20} />
          {name}
        </Button>
      ))}
    </nav>
  );
}
