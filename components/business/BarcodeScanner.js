import React, { useRef, useEffect } from "react";
import Quagga from "quagga";

const BarcodeScanner = ({ onDetected }) => {
  const scannerRef = useRef(null);

  const initializeQuagga = () => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          constraints: {
            width: 480,
            height: 320,
            facingMode: "environment",
          },
          area: {
            top: "0%",
            right: "0%",
            left: "0%",
            bottom: "0%",
          },
          target: scannerRef.current, // Ensuring Quagga uses our ref for rendering
        },
        decoder: {
          readers: ["ean_reader", "ean_8_reader"],
        },
      },
      (err) => {
        if (err) {
          console.error("Initialization error:", err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((data) => {
      const code = data.codeResult.code;
      onDetected(code);
    });
  };

  const checkCameraDevices = () => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const cameras = devices.filter((device) => device.kind === "videoinput");
      if (cameras.length === 0) {
        alert("No camera found on this device.");
      } else {
        checkCameraPermission();
      }
    });
  };

  const checkCameraPermission = () => {
    navigator.permissions.query({ name: "camera" }).then((permissionStatus) => {
      if (permissionStatus.state === "granted") {
        initializeQuagga();
      } else if (permissionStatus.state === "denied") {
        alert(
          "You have denied camera access. Please allow it for barcode scanning."
        );
      } else {
        requestCameraAccess();
      }
    });
  };

  const requestCameraAccess = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        stream.getTracks().forEach((track) => track.stop()); // Stopping the stream right away
        initializeQuagga();
      })
      .catch((error) => {
        alert("Error accessing the camera.");
      });
  };

  useEffect(() => {
    checkCameraDevices();

    return () => {
      Quagga.offDetected();
      Quagga.stop();
    };
  }, [onDetected]);

  return <div ref={scannerRef} id="barcode-scanner" />;
};

export default BarcodeScanner;
