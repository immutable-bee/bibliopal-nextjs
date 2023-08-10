import Papa from "papaparse";
import { useEffect, useRef, useState } from "react";
import { TableData, useTableDataContext } from "../context/TableDataContext";
import { setTableDataToStorage } from "../helpers/localstorage";
import LoadingComponent from "../components/utility/loading";

const Actions = ({ isSale }) => {
  const { tableData, setTableData } = useTableDataContext();
  const [uploadLoading, setUploadLoading] = useState(false);

  const anchorRef = useRef(null);

  const routeHandler = () => {
    return isSale ? "/api/upload/futureListings" : "/api/upload/listings";
  };

  const handleUpload = async () => {
    if (tableData.rows.length < 1) return;
    setUploadLoading(true);
    const response = await fetch(routeHandler(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tableData.rows),
    });

    const data = await response.json();
    setUploadLoading(false);
  };

  const handleReset = () => {
    const resetObject = {
      rows: [],
    };

    setTableData(resetObject);

    setTableDataToStorage(resetObject);
  };

  return (
    <div className="flex w-full justify-center items-center">
      {uploadLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <button
            onClick={handleReset}
            className=" mx-1 w-1/2 hover:opacity-90 bg-[#fa5252] px-3 py-2.5 rounded-3xl border-2 text-white border-black"
          >
            Clear List
          </button>
          <button
            onClick={handleUpload}
            className=" mx-1 w-1/2 hover:opacity-90 bg-[#9BCC2C] px-3 py-2.5 rounded-3xl border-2 text-white border-black"
          >
            Upload
          </button>
        </>
      )}
    </div>
  );
};

export default Actions;
