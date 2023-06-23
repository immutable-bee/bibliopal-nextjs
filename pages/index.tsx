import React, { useEffect, useState } from "react";
import { Flex, Stack } from "@mantine/core";
import Actions from "../components/Actions";
import ISBNSearchBox from "../components/ISBNSearchBox";
import ContentTable from "../components/ContentTable";
import { TableData, useTableDataContext } from "../context/TableDataContext";
import { setTableDataToStorage } from "../helpers/localstorage";
import Header from "@/components/Header";

export type ErrorT = string;
export type SetError = React.Dispatch<React.SetStateAction<ErrorT>>;

type NewBookInfo = {
  title: string;
  author: string;
  format?: string;
  ISBN: string;
};

export type DeleteBookRow = (ISBN: string) => void;

export type InputsFlowRef = { current: React.RefObject<HTMLInputElement[]> };

const Index = () => {
  const { tableData, setTableData } = useTableDataContext();
  const [error, setError] = useState<ErrorT>("");

  const createNewRow = (newBookInfo: NewBookInfo) => {
    let { rows } = tableData;

    const isISBNexist = rows.find((row) => row.ISBN === newBookInfo.ISBN);
    if (isISBNexist) return setError("This ISBN already exists");

    if (newBookInfo.title)
      rows.unshift({
        title: newBookInfo.title,
        author: newBookInfo.author || "",
        ISBN: newBookInfo.ISBN,
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
      rows: tableData.rows.filter((row) => row.ISBN !== ISBN),
    };

    setTableData(newTableData);

    setTableDataToStorage(newTableData);
  };

  useEffect(() => {
    setError("");
  }, [tableData]);

  return (
    <div className="min-h-screen bg-[#FEFBE8]">
      <Header />
      <div className=" px-3 sm:px-8 py-3 sm:py-4 mx-auto">
        <div className="px-3 sm:px-0 border border-black rounded-2xl">
          <div className="w-full sm:w-96 py-8 mx-auto">
            <ISBNSearchBox
              error={error}
              setError={setError}
              createNewRow={createNewRow}
            />
            <Actions />
          </div>
        </div>

        <ContentTable deleteBookRow={deleteBookRow} />
      </div>
    </div>
  );
};

export default Index;
