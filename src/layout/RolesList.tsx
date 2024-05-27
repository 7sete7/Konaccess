import { fetchAccesses } from "@/api/Konecty";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { CircleUserRound } from "lucide-react";
import { useQuery } from "react-query";

const moduleName = "Product";

export default function RolesList() {
  const { data: accesses, isLoading, error } = useQuery(["roles", moduleName], () => fetchAccesses(moduleName));

  if (isLoading || !accesses) return <Loader />;

  return (
    <nav className="grid gap-1 p-2">
      {accesses.map(({ name }, i) => (
        <Button key={i} variant="link" className="justify-start flex gap-1 align-baseline">
          <CircleUserRound size={20} />
          {name}
        </Button>
      ))}
    </nav>
  );
}
