import LazyIcon from "@/components/LazyIcon";
import { Button } from "@/components/ui/button";

const ROLES: { name: string }[] = Array(10).fill({ name: "Corretor" });

export default function ModuleList() {
  return (
    <nav className="grid gap-1 p-2">
      {ROLES.map(({ name }, i) => (
        <Button key={i} variant="link" className="justify-start flex gap-1 align-baseline">
          <LazyIcon name="circle-user-round" size={20} />
          {name}
        </Button>
      ))}
    </nav>
  );
}
