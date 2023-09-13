import React, { useEffect, useState } from "react";
import Quagga from "quagga";

const BarcodeScanner = ({ onDetected }) => {
  const [hasCamera, setHasCamera] = useState(false);
  const [quaggaInitialized, setQuaggaInitialized] = useState(false);

  const initializeQuagga = () => {
    Quagga.init(
      {
        inputStream: {
          target: "#barcode-scanner",
          type: "LiveStream",
          constraints: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "environment",
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
    <div className="flex justify-center relative w-full h-full">
      <div id="barcode-scanner" className="w-full h-full"></div>
      <div className="absolute top-1/2 left-0 w-full h-1 bg-red-500 opacity-50 transform -translate-y-1/2"></div>
    </div>
  );
};

export default BarcodeScanner;
