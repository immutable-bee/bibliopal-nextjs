import {
  Html5QrcodeScanner,
  Html5QrcodeSupportedFormats,
  Html5QrcodeScanType,
} from "html5-qrcode";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const MebjasScanner = ({ onClose, handleScan, isProcessingScan }) => {
  const [isVideoPresent, setIsVideoPresent] = useState(false);
  const [isCameraSelectVisible, setIsCameraSelectVisible] = useState(false);
  const canScan = useRef(true);

  const checkVideoPresence = () => {
    setIsVideoPresent(!!document.querySelector("video"));
  };

  const captureSnapshot = (videoElement) => {
    const canvas = document.createElement("canvas");
    canvas.width = videoElement.clientWidth;
    canvas.height = videoElement.clientHeight;
    canvas.getContext("2d").drawImage(videoElement, 0, 0);

    canvas.style.position = "absolute";
    canvas.style.top = videoElement.offsetTop + "px";
    canvas.style.left = videoElement.offsetLeft + "px";
    canvas.style.zIndex = "1000";

    videoElement.parentElement.appendChild(canvas);
    return canvas;
  };

  const scannerRef = useRef(null);

  const config = {
    fps: 30,
    qrbox: { width: 200, height: 125 },
    formatsToSupport: [Html5QrcodeSupportedFormats.EAN_13],
    rememberLastUsedCamera: false,
    supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    cameraFacingMode: "environment",
  };

  const instantiateScanner = () => {
    const newScanner = new Html5QrcodeScanner("reader", config);
    scannerRef.current = newScanner;
  };

  const getScannerState = () => {
    return scannerRef.current.getState();
  };

  const onScanSuccess = async (decodedText, decodedResult) => {
    if (isProcessingScan.current || !canScan.current) {
      return;
    }

    canScan.current = false;

    if (decodedText.length !== 13) {
      canScan.current = true;
      return;
    }

    pauseScanner();

    const videoElement = document.querySelector("video");
    const canvasOverlay = captureSnapshot(videoElement);

    console.log(`Result: ${decodedText}`);
    await handleScan(decodedText);

    canvasOverlay.remove();
    resumeScanner();

    setTimeout(() => {
      canScan.current = true;
    }, 1000);
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
    const containerElement = document.getElementById(`reader__scan_region`);

    if (containerElement) {
      containerElement.classList.add(`flex`, `justify-center`);
    }
  }, []);

  useEffect(() => {
    const selectElement = document.getElementById("html5-qrcode-select-camera");

    if (selectElement) {
      const options = selectElement.querySelectorAll("option");
      options.forEach((option) => {
        if (
          option.textContent &&
          option.textContent.toLowerCase().includes("front")
        ) {
          option.remove();
        }
      });
    }
  }, [isCameraSelectVisible]);

  useEffect(() => {
    const observeForButton = () => {
      const buttonElement = document.getElementById(
        `html5-qrcode-button-camera-permission`
      );
      if (buttonElement) {
        buttonElement.addEventListener("click", setIsCameraSelectVisible(true));

        buttonElement.classList.add(
          `bg-biblioSeafoam`,
          `py-2`,
          `px-2`,
          `rounded-md`,
          `border`,
          `border-black`
        );
        buttonElement.textContent = `Grant Camera Access`;

        observer.disconnect();
      }
    };

    const observer = new MutationObserver(observeForButton);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      // Cleanup - disconnect the observer
      observer.disconnect();
    };
  }, []);

  const handleBackButton = () => {
    setIsCameraSelectVisible(false);
    onClose();
  };

  return (
    <div className="w-full">
      <div className="w-full" id="reader"></div>

      <button
        onClick={handleBackButton}
        className="relative bottom-3/4 left-3 py-2 px-2 bg-biblioSeafoam rounded-full"
      >
        <Image
          src="/images/icons/icon-chevron.svg"
          width={24}
          height={24}
          alt="close scanner button"
        />
      </button>
    </div>
  );
};

export default MebjasScanner;
