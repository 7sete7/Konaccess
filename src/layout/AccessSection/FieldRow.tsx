import { useCallback, useContext, useState } from "react";

import OptionSelect from "@/components/OptionSelect";
import { TableCell, TableRow } from "@/components/ui/table";

import AppContext from "@/context";
import { AccessFieldOptions } from "@/lib/Access";
import { ParsedView } from "@/lib/parseView";
import { FieldAccess } from "node_modules/@konecty/sdk/dist/sdk/types/access";

export type OnFieldOptionChange = (fieldName: string, operation: keyof FieldAccess) => (value: string) => void;
type FieldRowProps = { field: ParsedView[number]["fields"][number] };

export default function FieldRow({ field }: FieldRowProps) {
  const [{ selectedAccess }] = useContext(AppContext);
  const [, setChanged] = useState(1);

  const onFieldOptionChange = useCallback<OnFieldOptionChange>(
    (fieldName, operation) => (value) => {
      selectedAccess?.setFieldValue(fieldName, operation, value as AccessFieldOptions);
      setChanged((prev) => prev + 1);
    },
    [selectedAccess, setChanged]
  );

  const values = {
    read: selectedAccess?.getFieldValue(field.name, "READ"),
    update: selectedAccess?.getFieldValue(field.name, "UPDATE"),
    create: selectedAccess?.getFieldValue(field.name, "CREATE"),
  };

  return (
    <TableRow>
      <TableCell className="p-1">
        <span>{field.label}</span>
      </TableCell>
      <TableCell className="p-1">
        <OptionSelect type="read" variant="table" onChange={onFieldOptionChange(field.name, "READ")} value={values.read} />
      </TableCell>
      <TableCell className="p-1">
        <OptionSelect type="edit" variant="table" onChange={onFieldOptionChange(field.name, "UPDATE")} value={values.update} />
      </TableCell>
      <TableCell className="p-1">
        <OptionSelect type="create" variant="table" onChange={onFieldOptionChange(field.name, "CREATE")} value={values.create} />
      </TableCell>
    </TableRow>
  );
}
