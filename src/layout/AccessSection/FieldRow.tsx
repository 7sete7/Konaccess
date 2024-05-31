import OptionSelect from "@/components/OptionSelect";
import { TableCell, TableRow } from "@/components/ui/table";

import { FieldsState, OnFieldOptionChange } from "@/layout/AccessSection/FieldTable";
import { ParsedView } from "@/lib/parseView";

type FieldRowProps = {
  field: ParsedView[number]["fields"][number];

  values: FieldsState[string];
  onFieldOptionChange: OnFieldOptionChange;
};

export default function FieldRow({ field, onFieldOptionChange, values }: FieldRowProps) {
  return (
    <TableRow>
      <TableCell className="p-1">
        <span>{field.label}</span>
      </TableCell>
      <TableCell className="p-1">
        <OptionSelect type="read" variant="table" onChange={onFieldOptionChange(field.name, "READ")} value={values.READ} />
      </TableCell>
      <TableCell className="p-1">
        <OptionSelect type="edit" variant="table" onChange={onFieldOptionChange(field.name, "UPDATE")} value={values.UPDATE} />
      </TableCell>
      <TableCell className="p-1">
        <OptionSelect type="create" variant="table" onChange={onFieldOptionChange(field.name, "CREATE")} value={values.CREATE} />
      </TableCell>
    </TableRow>
  );
}
