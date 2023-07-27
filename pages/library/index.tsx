import React, { useEffect, useState } from "react";
import { TableData, useTableDataContext } from "@/context/TableDataContext";
import { setTableDataToStorage } from "@/helpers/localstorage";

import ListingComponent from "@/components/scoped/ListingComponent";

export type ErrorT = string;
export type SetError = React.Dispatch<React.SetStateAction<ErrorT>>;

type NewBookInfo = {
  title: string;
  author: string;
  format?: string;
  isbn: string;
  image_url?: string;
};

export type DeleteBookRow = (ISBN: string) => void;

export type InputsFlowRef = { current: React.RefObject<HTMLInputElement[]> };

const Index = () => {
  const { tableData, setTableData } = useTableDataContext();
  const [error, setError] = useState<ErrorT>("");

  const createNewRow = (newBookInfo: NewBookInfo) => {
    let { rows } = tableData;

    const isISBNexist = rows.find((row) => row.isbn === newBookInfo.isbn);
    if (isISBNexist) return setError("This ISBN already exists");

    if (newBookInfo.title)
      rows.unshift({
        title: newBookInfo.title,
        author: newBookInfo.author || "",
        isbn: newBookInfo.isbn,
        format: newBookInfo.format || "",
        image_url: newBookInfo.image_url || "",
      });

    const newTableData: TableData = {
      ...tableData,
      rows: [...rows],
    };

    setTableData(newTableData);

    setTableDataToStorage(newTableData);
  };

  const deleteBookRow = (ISBN: string): void => {
    const newTableData = {
      ...tableData,
      rows: tableData.rows.filter((row) => row.isbn !== ISBN),
    };

    setTableData(newTableData);

    setTableDataToStorage(newTableData);
  };

  useEffect(() => {
    setError("");
  }, [tableData]);

  return (
    <ListingComponent
      error={error}
      setError={setError}
      createNewRow={createNewRow}
      deleteBookRow={deleteBookRow}
    />
  );
};

export default Index;
