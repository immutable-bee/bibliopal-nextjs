import React, { useEffect, useState, useRef } from "react";
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
  const [validCameras, setValidCameras] = useState([]);
  const [activeCameraId, setActiveCameraId] = useState("");
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
    fps: 20,
    qrbox: { width: 175, height: 100 },
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
    scanner.current.stop();
    onClose();
  };

  const handleCameraChange = (event) => {
    const newCameraId = event.target.value;
    scanner.current
      .stop()
      .then(() => {
        console.log("Scanner stopped successfully.");
        setActiveCameraId(newCameraId);
      })
      .catch((error) => {
        console.error("Error stopping the scanner:", error);
      });
  };

  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices.length > 1) {
          let counter = 1;
          const updatedDevices = devices.map((device) => {
            if (device.label.includes("back")) {
              return { ...device, label: `Back Camera ${counter++}` };
            }
            return device;
          });
          const backCameras = updatedDevices.filter((device) =>
            device.label.includes("Back Camera")
          );
          setValidCameras(backCameras);
        } else {
          setActiveCameraId(devices[0].id);
        }
      })
      .catch((err) => {
        console.error("Error getting cameras:", err);
      });
  }, []);

  useEffect(() => {
    if (validCameras.length > 0) {
      setActiveCameraId(validCameras[0].id);
    }
  }, [validCameras]);

  useEffect(() => {
    if (!activeCameraId) return;

    scanner.current = new Html5Qrcode("reader", {
      formatsToSupport: [Html5QrcodeSupportedFormats.EAN_13],
    });

    scanner.current
      .start(activeCameraId, config, qrCodeSuccessCallback)
      .catch((err) => {
        console.error("Error starting scanner:", err);
      });

    setTimeout *=
      (() => {
        scanner.current.applyVideoContstraints({
          focusMode: "continuous",
          //width: 1980,
          //height: 1080,
        });
      },
      [2000]);

    return () => {
      if (scanner.current) {
        const scannerState = scanner.current.getState();
        if (scannerState === "SCANNING") {
          scanner.current
            .stop()
            .then(() => {
              console.log("Scanner stopped successfully.");
            })
            .catch((error) => {
              console.error("Error stopping the scanner:", error);
            });
        }
      }
    };
  }, [activeCameraId]);

  useEffect(() => {
    if (notifications.length > 1) {
      removeNotification();
    }
  }, [notifications]);

  return (
    <div className="relative flex flex-col items-center w-full shadow-md">
      {notifications.length > 0 && (
        <div className="flex flex-col justify-center absolute top-0 left-0 z-10 w-full h-10">
          <p className="pt-2 w-full bg-[#9BCC2C] text-white text-center h-10">
            {notifications[notifications.length - 1]}
          </p>
        </div>
      )}
      <div className="relative w-full " id="reader"></div>
      <div className="flex justify-around p-3 w-full bg-biblioSeafoam shadow-lg">
        <select
          value={activeCameraId}
          onChange={handleCameraChange}
          className="w-1/4 rounded-full"
        >
          {validCameras.length > 0 &&
            validCameras.map((camera) => {
              return (
                <option key={camera.id} value={camera.id}>
                  {camera.label}
                </option>
              );
            })}
        </select>
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
