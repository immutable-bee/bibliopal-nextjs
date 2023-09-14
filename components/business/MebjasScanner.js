import {
  Html5QrcodeScanner,
  Html5QrcodeSupportedFormats,
  Html5QrcodeScanType,
} from "html5-qrcode";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const MebjasScanner = ({ onClose, handleScan }) => {
  const [isVideoPresent, setIsVideoPresent] = useState(false);

  const checkVideoPresence = () => {
    setIsVideoPresent(!!document.querySelector("video"));
  };

  const scannerRef = useRef(null);

  const config = {
    fps: 30,
    qrbox: { width: 200, height: 125 },
    formatsToSupport: [Html5QrcodeSupportedFormats.EAN_13],
    rememberLastUsedCamera: false,
    supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
  };

  const instantiateScanner = () => {
    const newScanner = new Html5QrcodeScanner(
      "reader",
      config,
      /* verbose= */ false
    );
    scannerRef.current = newScanner;
  };

  const getScannerState = () => {
    return scannerRef.current.getState();
  };

  const onScanSuccess = async (decodedText, decodedResult) => {
    pauseScanner();
    console.log(`Result: ${decodedText}`);
    handleScan(decodedText);
    resumeScanner();
  };

  const onScanFailure = () => {};

  const pauseScanner = () => {
    if (getScannerState() === "SCANNING") {
      scannerRef.current.pause(true);
    }
  };

  const resumeScanner = () => {
    if (getScannerState() === "PAUSED") {
      scannerRef.current.resume();
    }
  };

  useEffect(() => {
    if (!scannerRef.current) {
      instantiateScanner();
      console.log("Scanner started");
    }

    const mutationObserver = new MutationObserver(checkVideoPresence);

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    if (scannerRef.current) {
      scannerRef.current.render(onScanSuccess, onScanFailure);
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
        mutationObserver.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const element = document.getElementById(
      `html5-qrcode-button-camera-permission`
    );
    if (element) {
      element.classList.add(
        `bg-biblioSeafoam`,
        `py-2`,
        `px-2`,
        `rounded-md`,
        `border`,
        `border-black`
      );
      element.textContent = `Grant Camera Access`;
    }
  }, []);

  return (
    <div className="w-full">
      <div className="w-full" id="reader"></div>

      {isVideoPresent && (
        <button
          onClick={onClose}
          className="relative bottom-3/4 mb-10 left-3 py-2 px-2 bg-biblioSeafoam rounded-full"
        >
          <Image
            src="/images/icons/icon-chevron.svg"
            width={24}
            height={24}
            alt="close scanner button"
          />
        </button>
      )}
    </div>
  );
};

export default MebjasScanner;
