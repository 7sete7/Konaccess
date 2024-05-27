import OptionSelect from "@/components/OptionSelect";
import { Separator } from "@/components/ui/separator";
import AppContext from "@/context";
import { useContext } from "react";

export default function ModuleControl() {
  const [{ selectedModule, selectedAccess }] = useContext(AppContext);

  return (
    <div id="general-control" className="py-2 px-3">
      <h1 className="text-3xl font-bold font-sans">{selectedModule?.label?.pt_BR ?? selectedModule?.name}</h1>
      <h2 className="text-xl font-semibold font-sans text-gray-600">{selectedAccess}</h2>
      <div className="flex gap-5 mt-8">
        <div className="flex-grow">
          <OptionSelect type="read" variant="standalone" />
        </div>

        <div className="flex-grow">
          <OptionSelect type="edit" variant="standalone" />
        </div>
      </div>

      <Separator className="mt-4" />
    </div>
  );
}
