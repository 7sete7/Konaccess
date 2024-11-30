import { fetchAccesses } from "@/api/Konecty";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import AppContext from "@/context";
import Access from "@/lib/Access";
import { cn } from "@/lib/utils";
import { CircleUserRound } from "lucide-react";
import { useCallback, useContext } from "react";
import { useQuery } from "react-query";

export default function RolesList() {
  const [{ selectedModule, selectedAccess }, { selectAccess }] = useContext(AppContext);
  const { data: accesses, isLoading } = useQuery(["roles", selectedModule?._id], () => fetchAccesses(selectedModule!.name), {
    enabled: !!selectedModule,
  });

  const isSelected = useCallback((access: Access) => selectedAccess?._id === access._id, [selectedAccess]);
  const onSelect = useCallback((access: Access) => () => selectAccess(access), [selectAccess]);

  if (isLoading || !accesses) return <Loader />;

  return (
    <nav className="grid gap-1 p-2">
      {accesses.map((access, i) => (
        <Button
          key={i}
          variant="link"
          className={cn("justify-start flex gap-1 align-baseline", isSelected(access) && "bg-primary text-primary-foreground")}
          onClick={onSelect(access)}
        >
          <CircleUserRound size={20} />
          {access.label}
        </Button>
      ))}
    </nav>
  );
}
