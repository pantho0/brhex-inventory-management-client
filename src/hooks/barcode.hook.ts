import { useEffect, useState } from "react";

export function useBarcodeScanner(onScan: (code: string) => void) {
  const [buffer, setBuffer] = useState("");

  useEffect(() => {
    let timeout: any;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (buffer.length > 0) {
          onScan(buffer.trim()); // ✅ send scanned code
          setBuffer(""); // reset buffer
        }
      } else if (e.key.length === 1) {
        // only add printable characters
        setBuffer((prev) => prev + e.key);
      }

      // reset if no activity (scanner always types super fast)
      clearTimeout(timeout);
      timeout = setTimeout(() => setBuffer(""), 100); // shorter delay
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timeout);
    };
  }, [buffer, onScan]);
}
