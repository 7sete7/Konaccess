import { Fragment, useContext, useMemo } from "react";
import { useQuery } from "react-query";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Pencil, PlusCircle } from "lucide-react";

import { fetchView } from "@/api/Konecty";
import Loader from "@/components/Loader";
import AppContext from "@/context";
import FieldRow from "@/layout/AccessSection/FieldRow";

export default function FieldTable() {
  const [{ selectedModule, selectedAccess }] = useContext(AppContext);
  const { isLoading, data } = useQuery(["view", selectedModule?.name], () => fetchView(selectedModule!.name), {
    enabled: selectedModule != null && selectedAccess != null,
  });

  const FieldRows = useMemo(
    () =>
      data &&
      data.map((section) => (
        <Fragment key={section.sectionTitle}>
          <TableRow>
            <TableCell colSpan={4} className="font-bold">
              {section.sectionTitle}
            </TableCell>
          </TableRow>
          {section.fields.map((field, i) => (
            <FieldRow key={i} field={field} />
          ))}
        </Fragment>
      )),
    [data]
  );

  if (selectedAccess != null && (isLoading || !data)) return <Loader />;

  return (
    <Table className="table-fixed">
      <TableHeader className="sticky top-0">
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
      <TableBody>{selectedAccess != null ? FieldRows : null}</TableBody>
    </Table>
  );
}
