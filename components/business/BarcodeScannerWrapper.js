import { useEffect } from "react";
import BarcodeScanner from "./BarcodeScanner"; // Path to your Quagga component

const BarcodeScannerWrapper = ({ onDetected, onClose }) => {
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      #barcode-scanner video, #barcode-scanner canvas {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return <BarcodeScanner onDetected={onDetected} onClose={onClose} />;
};

export default BarcodeScannerWrapper;
