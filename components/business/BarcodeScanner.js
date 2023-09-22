import React, { useEffect, useState, useRef } from "react";
import NotificationContainer from "../containers/NotificationContainer";
import Image from "next/image";
import {
  Html5QrcodeSupportedFormats,
  Html5QrcodeScanType,
  Html5Qrcode,
} from "html5-qrcode";

const BarcodeScanner = ({
  handleScan,
  onClose,
  notifications,
  setNotifications,
}) => {
  const [cameraId, setCameraId] = useState("");
  const [isScannerPaused, setIsScannerPaused] = useState(false);

  const removeNotification = () => {
    setNotifications((prevNotifications) => {
      const newNotifications = [...prevNotifications];
      newNotifications.pop();
      return newNotifications;
    });
  };

  const scanner = useRef();

  const config = {
    fps: 10,
    qrbox: { width: 200, height: 125 },
    rememberLastUsedCamera: false,
    supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
  };

  const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    console.log(decodedText);
    scanner.current.pause(true);
    handleScan(decodedText);
    setTimeout(() => scanner.current.resume(), 1000);
  };

  const qrCodeErrorCallback = () => {};

  const pauseScanner = () => {
    setIsScannerPaused(true);
    scanner.current.pause(true);
  };

  const resumeScanner = () => {
    setIsScannerPaused(false);
    scanner.current.resume();
  };

  const stopScanner = async () => {
    onClose();
  };

  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        setCameraId(devices[0].id);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    if (!cameraId) return;

    scanner.current = new Html5Qrcode("reader", {
      formatsToSupport: [Html5QrcodeSupportedFormats.EAN_13],
    });

    scanner.current
      .start({ facingMode: "environment" }, config, qrCodeSuccessCallback)
      .catch((err) => {
        console.error("Error starting scanner:", err);
      });

    return () => {
      if (scanner.current) {
        scanner.current
          .stop()
          .then(() => {
            console.log("Scanner stopped successfully.");
          })
          .catch((error) => {
            console.error("Error stopping the scanner:", error);
          });
      }
    };
  }, [cameraId]);

  useEffect(() => {
    let intervalId;
    if (notifications.length > 0) {
      intervalId = setInterval(() => {
        removeNotification();
      }, 3000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [notifications]);

  return (
    <div className="flex flex-col items-center w-full shadow-md">
      {notifications.length > 0 && (
        <p className="w-full bg-[#9BCC2C]">{notifications[-1]}</p>
      )}
      <div className="w-full " id="reader"></div>
      <div className="flex justify-center p-3 w-full bg-biblioSeafoam shadow-lg">
        <button
          onClick={stopScanner}
          className="bg-[#fa5252] px-5 py-3 text-white border border-black rounded-full"
        >
          Close Scanner
        </button>
      </div>
    </div>
  );
};

export default BarcodeScanner;
