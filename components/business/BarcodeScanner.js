import React, { useEffect, useState } from "react";
import Quagga from "quagga";
import NotificationContainer from "../containers/NotificationContainer";
import Image from "next/image";
import checkScan from "../../utils/checkScan";

const BarcodeScanner = ({ onDetected, onClose }) => {
  const [hasCamera, setHasCamera] = useState(false);
  const [quaggaInitialized, setQuaggaInitialized] = useState(false);

  const [UploadNotifications, setUploadNotifications] = useState([]);
  const [isAutoUpload, setIsAutoUpload] = useState(false);

  const width = window.innerWidth;
  const height = window.innerHeight;

  const initializeQuagga = () => {
    Quagga.init(
      {
        inputStream: {
          target: "#barcode-scanner",
          type: "LiveStream",
          constraints: {
            //width: width,
            //height: height,
            facingMode: "environment",
            //aspectRatio: { min: 1, max: 100 },
          },
          locator: {
            patchSize: "large",
            halfSample: true,
            area: {
              top: "25%",
              right: "25%",
              left: "25%",
              bottom: "25%",
            },
          },
        },
        decoder: {
          readers: ["ean_reader"],
        },
      },
      (err) => {
        if (err) {
          console.error("Initialization error:", err);
          return;
        }
        Quagga.start();
        setQuaggaInitialized(true);
      }
    );

    Quagga.onDetected((data) => {
      const scannedEAN13 = data.codeResult.code;

      onDetected(scannedEAN13);

      setUploadNotifications([
        ...UploadNotifications,

        "Book Scanned Successfully",
      ]);
    });
  };

  const checkCameraDevices = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      console.log("Enumeration devices is not supported!");
      return;
    }

    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");

    if (cameras.length > 0) {
      setHasCamera(true);
      setTimeout(() => {
        initializeQuagga();
      }, 100);
    } else {
      alert("No cameras found on this device.");
    }
  };

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        checkCameraDevices();
      }
    } catch (error) {
      alert("Camera permissions denied!");
    }
  };

  const handleAutoUploadChange = (e) => {
    const newValue = e.target.checked;
    setIsAutoUpload(newValue);
  };

  useEffect(() => {
    requestCameraPermission();

    return () => {
      if (quaggaInitialized) {
        Quagga.offDetected();
        Quagga.stop();
      }
    };
  }, [onDetected]);

  if (!hasCamera) {
    return <p>No camera available.</p>;
  }

  return (
    <div className="m-0 p-0 flex justify-center w-full h-screen overflow-hidden">
      <div id="barcode-scanner" className="absolute inset-0"></div>
      <button
        onClick={onClose}
        className="px-3 py-3 bg-biblioSeafoam absolute top-5 left-5 rounded-full"
      >
        <Image
          src="/images/icons/icon-chevron.svg"
          width={24}
          height={24}
          alt="Close camera button"
        />
      </button>
      <div className="absolute top-1/2 left-0 w-full h-1 bg-red-500 opacity-50 transform -translate-y-1/2"></div>
      <div className="absolute top-3/4 bg-slate-500 rounded-full pt-3 flex justify-center">
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
      <NotificationContainer
        notifications={UploadNotifications}
        setNotifications={setUploadNotifications}
        type={"barcode scanned"}
      />
    </div>
  );
};

export default BarcodeScanner;
