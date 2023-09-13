import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { useUser } from "@/context/UserContext";
import Actions from "@/components/Actions";
import ISBNSearchBox from "@/components/ISBNSearchBox";
import ContentTable from "@/components/ContentTable";
import BarcodeScanner from "../business/BarcodeScanner";
import Image from "next/image";

const ListingComponent = ({ error, setError, createNewRow, deleteBookRow }) => {
  const { user, fetchUserData } = useUser();

  const [isAutoUpload, setIsAutoUpload] = useState(false);
  const [daysToExpiry, setDaysToExpiry] = useState(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const isMobile = () => {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  };

  const handleOnDetected = (code) => {
    console.log("Detected barcode:", code);
    setIsScannerOpen(false);
    if (!isAutoUpload) {
    }
  };

  const handleAutoUploadChange = (e) => {
    const newValue = e.target.checked;
    setIsAutoUpload(newValue);
  };

  useEffect(() => {
    const savedValue = sessionStorage.getItem("daysToExpiry");
    setDaysToExpiry(savedValue ? parseInt(savedValue, 10) : 3);
  }, []);

  const daysToExpiryHandler = (e) => {
    let value = parseInt(e.target.value);
    if (value < 3) value = 3;
    if (value > maxExpiry) value = maxExpiry;

    setDaysToExpiry(value);

    sessionStorage.setItem("daysToExpiry", value.toString());
  };

  const membership = user?.business.membership.toLowerCase();
  const expiryLimit = { free: 3, basic: 7, premium: 30 };
  const maxExpiry = user ? expiryLimit[membership] : 3;

  return !isScannerOpen ? (
    <div className="min-h-screen  bg-[#FEFBE8]">
      <Header />
      <div className=" px-3 sm:px-8 py-3 sm:py-4 mx-auto">
        <div className="px-3 sm:px-0 border border-black rounded-2xl">
          <div className="w-full sm:w-96 py-8 mx-auto">
            <ISBNSearchBox
              error={error}
              setError={setError}
              createNewRow={createNewRow}
              title={"Upload Listings"}
            />

            <div className="flex justify-center mt-3">
              <button
                onClick={() => setIsScannerOpen(true)}
                className="px-2 py-2 mb-4 bg-slate-50 rounded shadow-md"
              >
                <Image
                  src="images/icons//icon-camera.svg"
                  width={32}
                  height={32}
                  alt="camera upload button"
                />
              </button>
            </div>

            <div className=" flex justify-center">
              <div className=" flex justify-center">
                <label className="relative mx-3 inline-flex items-center mt-4 mb-7 cursor-pointer">
                  <input
                    type="checkbox"
                    value={isAutoUpload}
                    onChange={handleAutoUploadChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Auto Upload
                  </span>
                </label>{" "}
              </div>
            </div>
            <Actions
              isSale={false}
              isAutoUpload={isAutoUpload}
              daysToExpiry={daysToExpiry}
              refreshUserData={fetchUserData}
            />
          </div>
          <div className="sm:flex px-3 sm:px-5 justify-between items-center mb-5">
            <div className="flex sm:justify-start sm:py-0 py-1 justify-between items-center">
              <h3 class="text-base sm:text-lg font-medium mr-3">
                Uploads this Cycle
              </h3>
              <input
                type="number"
                value={user?.business?.current_cycle_uploads}
                className="px-3 sm:py-3 py-2.5 w-16 rounded-xl border-2 border-gray-500 bg-white"
                disabled
              />
            </div>
            <div className="flex sm:justify-start sm:py-0 py-1 justify-between items-center">
              <h3 class="text-base sm:text-lg font-medium mr-3">
                Days to Expiry
              </h3>
              <input
                type="number"
                value={daysToExpiry}
                onChange={daysToExpiryHandler}
                min="3"
                max={maxExpiry}
                className="px-3 sm:py-3 py-2.5 w-16 rounded-xl border-2 border-gray-500 bg-white"
              />
            </div>
          </div>
        </div>
        <ContentTable isSale={false} deleteBookRow={deleteBookRow} />
      </div>
    </div>
  ) : (
    <BarcodeScanner onDetected={handleOnDetected} />
  );
};

export default ListingComponent;
