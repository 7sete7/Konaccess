import { fetchAccesses } from "@/api/Konecty";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import AppContext from "@/context";
import { cn } from "@/lib/utils";
import { CircleUserRound } from "lucide-react";
import { useCallback, useContext } from "react";
import { useQuery } from "react-query";

export default function RolesList() {
  const [{ selectedModule, selectedRole }, { selectRole }] = useContext(AppContext);
  const { data: accesses, isLoading } = useQuery(["roles", selectedModule], () => fetchAccesses(selectedModule!.name), {
    enabled: !!selectedModule,
  });

  const isSelected = useCallback((name: string) => selectedRole === name, [selectedRole]);
  const onSelect = useCallback((name: string) => () => selectRole(name), [selectRole]);

  if (isLoading || !accesses) return <Loader />;

  return (
    <nav className="grid gap-1 p-2">
      {accesses.map(({ name }, i) => (
        <Button
          key={i}
          variant="link"
          className={cn("justify-start flex gap-1 align-baseline", isSelected(name) && "bg-primary text-primary-foreground")}
          onClick={onSelect(name)}
        >
          <CircleUserRound size={20} />
          {name}
        </Button>
      ))}
    </nav>
  );
}
