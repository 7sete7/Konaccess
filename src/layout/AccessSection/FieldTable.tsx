import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import OptionSelect from "@/components/OptionSelect";
import { Eye, Pencil, PlusCircle } from "lucide-react";

export default function FieldTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>&nbsp;</TableHead>
          <TableHead className="text-center">
            <Eye size={16} className="mb-1 mx-auto" />
            Pode visualizar
          </TableHead>
          <TableHead className="text-center">
            <Pencil size={16} className="mb-1 mx-auto" />
            Pode editar
          </TableHead>
          <TableHead className="text-center">
            <PlusCircle size={16} className="mb-1 mx-auto" />
            Pode criar
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 40 }).map((_, i) => (
          <TableRow key={i}>
            <TableCell className="p-1">
              <span>Código</span>
            </TableCell>
            <TableCell className="p-1">
              <OptionSelect type="read" variant="table" />
            </TableCell>
            <TableCell className="p-1">
              <OptionSelect type="edit" variant="table" />
            </TableCell>
            <TableCell className="p-1">
              <OptionSelect type="create" variant="table" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
