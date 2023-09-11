import React, { useRef, useEffect } from "react";
import Quagga from "quagga";
const BarcodeScanner = ({ onDetected }) => {
  const scannerRef = useRef(null);

  useEffect(() => {
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

    return () => {
      Quagga.offDetected();
      Quagga.stop();
    };
  }, [onDetected]);

  return <div ref={scannerRef} id="barcode-scanner" />;
};

export default BarcodeScanner;
