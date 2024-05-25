import OptionSelect from "@/components/OptionSelect";
import { Separator } from "@/components/ui/separator";

export default function ModuleControl() {
  return (
    <div id="general-control" className="py-2 px-3">
      <h1 className="text-3xl font-bold font-sans">Imóvel</h1>
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
