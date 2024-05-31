import OptionSelect from "@/components/OptionSelect";
import { Separator } from "@/components/ui/separator";
import AppContext from "@/context";
import { AccessFieldOptions } from "@/lib/Access";
import { useCallback, useContext, useEffect, useState } from "react";

type ModuleControlState = Record<"readFilter" | "updateFilter", AccessFieldOptions>;

export default function ModuleControl() {
  const [{ selectedModule, selectedAccess }] = useContext(AppContext);
  const [fieldsData, setFieldsData] = useState<ModuleControlState>({ readFilter: "any", updateFilter: "any" });

  useEffect(() => {
    if (selectedAccess == null) return;

    const fieldsData = selectedAccess.parseModuleFilters();
    setFieldsData(fieldsData);
  }, [selectedAccess?._id]);

  const onFieldOptionChange = useCallback(
    (fieldName: keyof ModuleControlState) => (value: string) => {
      setFieldsData((fd) => ({ ...fd, [fieldName]: value as AccessFieldOptions }));
    },
    [setFieldsData]
  );

  return (
    <div id="general-control" className="py-2 px-3">
      <h1 className="text-3xl font-bold font-sans">{selectedModule?.label?.pt_BR ?? selectedModule?.name}</h1>
      <h2 className="text-xl font-semibold font-sans text-gray-600">{selectedAccess?.label}</h2>
      <div className="flex gap-5 mt-8">
        <div className="flex-grow">
          <OptionSelect type="read" variant="standalone" onChange={onFieldOptionChange("readFilter")} value={fieldsData.readFilter} />
        </div>

        <div className="flex-grow">
          <OptionSelect type="edit" variant="standalone" onChange={onFieldOptionChange("updateFilter")} value={fieldsData.updateFilter} />
        </div>
      </div>

      <Separator className="mt-4" />
    </div>
  );
}
