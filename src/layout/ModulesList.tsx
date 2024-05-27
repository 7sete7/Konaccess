import { fetchModules } from "@/api/Konecty";
import LazyIcon from "@/components/LazyIcon";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useQuery } from "react-query";

export default function ModuleList() {
  const { data: modules, isLoading, error } = useQuery("modules", fetchModules);

  if (isLoading || !modules) return <Loader />;

  return (
    <nav className="grid gap-1 p-2">
      <ScrollArea type="scroll" dir="ltr">
        {modules.map(({ name, icon, label, isChild }, i) => (
          <Button key={i} variant="link" className={cn("justify-start flex gap-1 align-baseline", isChild && "text-xs")}>
            {isChild && <span className="w-4" />}
            <LazyIcon name={icon} size={20} color={isChild ? "gray" : undefined} />
            {label?.pt_BR ?? name}
          </Button>
        ))}
      </ScrollArea>
    </nav>
  );
}
