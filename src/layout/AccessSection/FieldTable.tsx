import merge from "lodash/merge";
import { Fragment, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Pencil, PlusCircle } from "lucide-react";

import { fetchView } from "@/api/Konecty";
import Loader from "@/components/Loader";
import AppContext from "@/context";
import FieldRow from "@/layout/AccessSection/FieldRow";
import { AccessFieldOptions, AccessOperations } from "@/lib/Access";

export type FieldsState = Record<string, Partial<Record<AccessOperations, AccessFieldOptions>>>;
export type OnFieldOptionChange = (fieldName: string, operation: AccessOperations) => (value: string) => void;

export default function FieldTable() {
  const [{ selectedModule, selectedAccess }] = useContext(AppContext);
  const [fieldsData, setFieldsData] = useState<FieldsState>({});

  const { isLoading, data } = useQuery(["view", selectedModule?.name], () => fetchView(selectedModule!.name), {
    enabled: selectedModule != null && selectedAccess != null,
  });

  useEffect(() => {
    if (selectedAccess == null) return;

    const fieldsData = selectedAccess.parseRawFields();
    setFieldsData(fieldsData);
  }, [selectedAccess?._id]);

  const onFieldOptionChange = useCallback<OnFieldOptionChange>(
    (fieldName, operation) => (value) => {
      setFieldsData((fd) => merge(fd, { [fieldName]: { [operation]: value } }));
    },
    [setFieldsData]
  );

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
            <FieldRow key={i} field={field} onFieldOptionChange={onFieldOptionChange} values={fieldsData[field.name]} />
          ))}
        </Fragment>
      )),
    [data, fieldsData]
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
