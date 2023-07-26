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

            <div className=" flex justify-center">
              <label className="relative mx-3 inline-flex items-center mt-4 mb-7 cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer"/>
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">List Now</span>
              </label>
              <label className="relative mx-3 inline-flex items-center mt-4 mb-7 cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer"/>
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Book Sale List</span>
              </label>
            </div>

            <Actions />
          </div>
        </div>

        <ContentTable deleteBookRow={deleteBookRow} />
      </div>
    </div>
  );
};

export default Index;
