"use client";

import TitleWrapper from "@/components/adminDashboard/TitleWrapper";
import { Button } from "@/components/ui/button";






export default function CreateBarcodePage() {

 const generateBarcode = async () => {
  try {
    const response = await fetch("https://brhex-inventory-management.vercel.app/api/v1/barcode/generate", {
      method: "POST",
    });

    if (!response.ok) throw new Error("Failed to generate barcodes PDF");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "barcodes.pdf";
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading PDF:", error);
  }
};

    return  <div className="text-black font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <TitleWrapper title="Create Barcode" />

      <Button onClick={generateBarcode} className="bg-blue-600 hover:bg-blue-700">
      Generate Barcodes
    </Button>
    </div>
}