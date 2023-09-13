import React, { useEffect, useState } from "react";
import Quagga from "quagga";
import NotificationContainer from "../containers/NotificationContainer";

const BarcodeScanner = ({ onDetected }) => {
  const [hasCamera, setHasCamera] = useState(false);
  const [quaggaInitialized, setQuaggaInitialized] = useState(false);

  const [UploadNotifications, setUploadNotifications] = useState([]);

  const width = window.innerWidth;
  const height = window.innerHeight;

  setTimeout(() => {
    setUploadNotifications([
      ...UploadNotifications,
      {
        title: "testTitle",
        numberOfOtherBooks: "0",
      },
    ]);
  }, [5000]);

  const initializeQuagga = () => {
    Quagga.init(
      {
        inputStream: {
          target: "#barcode-scanner",
          type: "LiveStream",
          constraints: {
            width: width,
            height: height,
            facingMode: "environment",
            aspectRatio: { min: 1, max: 100 },
          },
          area: {
            top: "0%",
            right: "0%",
            left: "0%",
            bottom: "0%",
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
      onDetected(data);
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
      <div id="barcode-scanner" className="w-full h-screen sm:h-screen"></div>
      <div className="absolute top-1/2 left-0 w-full h-1 bg-red-500 opacity-50 transform -translate-y-1/2"></div>
      <NotificationContainer
        notifications={UploadNotifications}
        setNotifications={setUploadNotifications}
        type={"upload"}
      />
    </div>
  );
};

export default BarcodeScanner;
