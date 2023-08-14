import Papa from "papaparse";
import { useEffect, useRef, useState } from "react";
import { TableData, useTableDataContext } from "../context/TableDataContext";
import {
  setTableDataToStorage,
  setFutureTableDataToStorage,
} from "../helpers/localstorage";
import LoadingComponent from "../components/utility/loading";
import NotificationContainer from "../components/containers/NotificationContainer";
const Actions = ({ isSale, isAutoUpload }) => {
  const { tableData, setTableData, bookSaleTableData, setBookSaleTableData } =
    useTableDataContext();
  const [uploadLoading, setUploadLoading] = useState(false);

  const [UploadNotifications, setUploadNotifications] = useState([]);

  const anchorRef = useRef(null);

  const routeHandler = () => {
    return isSale ? "/api/upload/futureListings" : "/api/upload/listings";
  };

  const bodyHandler = () => {
    return isSale
      ? JSON.stringify(bookSaleTableData.rows)
      : JSON.stringify(tableData.rows);
  };

  const handleUpload = async () => {
    if (tableData.rows.length < 1) return;

    const notificationTitle = tableData.rows[0].title;
    const notificationOtherUploadCount = tableData.rows.length - 1;

    setUploadLoading(true);
    const response = await fetch(routeHandler(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyHandler(),
    });

    const data = await response.json();
    setUploadNotifications([
      ...UploadNotifications,
      {
        title: notificationTitle,
        numberOfOtherBooks: notificationOtherUploadCount,
      },
    ]);
    setUploadLoading(false);
    handleReset();
  };

  const handleReset = () => {
    const resetObject = {
      rows: [],
    };

    if (isSale) {
      setBookSaleTableData(resetObject);
      setFutureTableDataToStorage(resetObject);
    } else {
      setTableData(resetObject);
      setTableDataToStorage(resetObject);
    }
  };

  useEffect(() => {
    if (tableData.rows.length < 1) return;
    if (isAutoUpload) {
      handleUpload();
    }
  }, [tableData.rows.length]);

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
      <NotificationContainer
        notifications={UploadNotifications}
        setNotifications={setUploadNotifications}
      />
    </div>
  );
};

export default Actions;
