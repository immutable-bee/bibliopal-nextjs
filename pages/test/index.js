import Header from "@/components/Header";
import { useState } from "react";
import BarcodeScanner from "../../components/business/BarcodeScanner";

const TestPage = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  return (
    <div className="bg-[#FEFBE8] min-h-screen">
      <Header />
      <div className="flex justify-center mt-20 border border-black">
        {isCameraOpen ? (
          <BarcodeScanner />
        ) : (
          <button
            className="px-5 py-3 bg-biblioSeafoam text-white"
            onClick={openCamera}
          >
            Open Camera
          </button>
        )}
      </div>
    </div>
  );
};

export default TestPage;
