import { useEffect, useState } from "react";

export function useBarcodeScanner(onScan: (code: string) => void) {
  const [buffer, setBuffer] = useState("");

  useEffect(() => {
    let timeout: any;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (buffer.length > 0) {
          onScan(buffer); // send scanned code
          setBuffer(""); // reset buffer
        }
      } else {
        // add typed char to buffer
        setBuffer((prev) => prev + e.key);

        // reset if no activity (e.g. 200ms gap → new scan)
        clearTimeout(timeout);
        timeout = setTimeout(() => setBuffer(""), 200);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timeout);
    };
  }, [buffer, onScan]);
}
