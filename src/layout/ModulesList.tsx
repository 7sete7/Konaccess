import { fetchModules } from "@/api/Konecty";
import LazyIcon from "@/components/LazyIcon";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import AppContext from "@/context";
import { cn } from "@/lib/utils";
import { MenuDocument } from "@/types/menu";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useCallback, useContext } from "react";
import { useQuery } from "react-query";

export default function ModuleList() {
  const [{ selectedModule }, { selectModule }] = useContext(AppContext);
  const { data: modules, isLoading } = useQuery("modules", fetchModules);

  const isSelected = useCallback((module: MenuDocument) => selectedModule?.name === module.name, [selectedModule]);
  const onSelect = useCallback((module: MenuDocument) => () => selectModule(module), [selectModule]);

  if (isLoading || !modules) return <Loader />;

  return (
    <nav className="grid gap-1 p-2">
      <ScrollArea type="scroll" dir="ltr">
        {modules.map((document, i) => (
          <Button
            key={i}
            variant="link"
            className={cn(
              "justify-start flex gap-1 align-baseline",
              document.isChild && "text-xs",
              isSelected(document) && "bg-primary text-primary-foreground"
            )}
            onClick={onSelect(document)}
          >
            {document.isChild && <span className="w-4" />}
            <LazyIcon name={document.icon} size={20} color={document.isChild ? "gray" : undefined} />
            {document.label?.pt_BR ?? document.name}
          </Button>
        ))}
      </ScrollArea>
    </nav>
  );
}
