import { Button, Flex } from "@mantine/core";
import Papa from "papaparse";
import { useRef } from "react";
import { TableData, useTableDataContext } from "../context/TableDataContext";
import { setTableDataToStorage } from "../helpers/localstorage";

const Actions = () => {
  const { tableData, setTableData } = useTableDataContext();

  const anchorRef = useRef<HTMLAnchorElement>(null);

  const handleDownload = () => {
    if (tableData.rows.length < 1) return;

    const headers = {
      title: "Title",
      author: "Author",
      ISBN: "ISBN",
    };

    const dataToParse = {
      fields: ["title", "author", "ISBN"],
      data: [headers, ...tableData.rows],
    };

    const csvData = Papa.unparse(dataToParse, { header: false });
    const blob = new Blob([csvData], { type: "text/csv" });
    const csvUrl = window.URL.createObjectURL(blob);

    anchorRef.current && (anchorRef.current.href = csvUrl);
    anchorRef.current && (anchorRef.current.download = "first file.csv");
    anchorRef.current && anchorRef.current.click();
  };

  const handleReset = () => {
    const resetObject: TableData = {
      rows: [],
    };

    setTableData(resetObject);

    setTableDataToStorage(resetObject);
  };

  return (
    <div className="flex w-full">
      <button
        onClick={handleReset}
        className=" mx-1 w-1/2 hover:opacity-90 bg-[#fa5252] px-3 py-2.5 rounded-3xl border-2 text-white border-black"
      >
        Clear List
      </button>
      <button
        onClick={handleDownload}
        className=" mx-1 w-1/2 hover:opacity-90 bg-[#9BCC2C] px-3 py-2.5 rounded-3xl border-2 text-white border-black"
      >
        Upload
      </button>
    </div>
  );
};

export default Actions;
