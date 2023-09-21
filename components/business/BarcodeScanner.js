import React, { useEffect, useState, useRef } from "react";
import NotificationContainer from "../containers/NotificationContainer";
import Image from "next/image";
import {
  Html5QrcodeSupportedFormats,
  Html5QrcodeScanType,
  Html5Qrcode,
} from "html5-qrcode";

const BarcodeScanner = ({ onDetected, onClose }) => {
  const [cameraId, setCameraId] = useState("");

  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        setCameraId(devices[0].id);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    if (!cameraId) return;

    const scanner = new Html5Qrcode("reader", {
      formatsToSupport: [Html5QrcodeSupportedFormats.EAN_13],
    });

    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
      console.log(decodedText);
    };

    const config = {
      fps: 30,
      qrbox: { width: 200, height: 125 },
      rememberLastUsedCamera: false,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    };

    scanner
      .start({ facingMode: "environment" }, config, qrCodeSuccessCallback)
      .catch((err) => {
        console.error("Error starting scanner:", err);
      });

    return () => {
      scanner.stop();
    };
  }, [cameraId]);

  return <div className="w-1/2 h-1/2" id="reader"></div>;
};

export default BarcodeScanner;
