import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import OptionSelect from "@/components/OptionSelect";
import { Eye, Pencil, PlusCircle } from "lucide-react";

import { fetchView } from "@/api/Konecty";
import Loader from "@/components/Loader";
import { useMemo } from "react";
import { useQuery } from "react-query";

type FieldTableProps = {
  moduleName: string;
  role: string;
};

export default function FieldTable({ moduleName, role }: FieldTableProps) {
  const { isLoading, data, error } = useQuery(["view", moduleName], () => fetchView(moduleName));

  const FieldRows = useMemo(
    () =>
      data &&
      data.map((section) => (
        <>
          <TableRow key={section.sectionTitle}>
            <TableCell colSpan={4} className="font-bold">
              {section.sectionTitle}
            </TableCell>
          </TableRow>
          {section.fields.map((field, i) => (
            <TableRow key={field.name + i}>
              <TableCell className="p-1">
                <span>{field.label}</span>
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
        </>
      )),
    [data]
  );

  if (isLoading || !data) return <Loader />;

  return (
    <Table className="table-fixed">
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
      <TableBody>{FieldRows}</TableBody>
    </Table>
  );
}
