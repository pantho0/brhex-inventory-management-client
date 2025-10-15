"use client";

import React, { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useReactToPrint } from "react-to-print";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { numberToWords } from "@/utils/helperFunctions";
import { POSReceipt } from "./PosReceipt";
import Logo from "../../../../../public/images/logo.jpg";

const logo = Logo;

interface InvoiceModalProps {
  invoice: any;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ invoice }) => {
  const a4PrintRef = useRef<HTMLDivElement>(null);
  const posPrintRef = useRef<HTMLDivElement>(null); // Ref for the POS component

  // --- A4 Printing Hook ---
  const handleA4Print = useReactToPrint({
    contentRef: a4PrintRef,
    documentTitle: `Invoice-${invoice?.invoiceNo || "Unknown"}`,
  });

  // --- POS Printing Hook ---
  const handlePosPrint = useReactToPrint({
    contentRef: posPrintRef,
    documentTitle: `Receipt-${invoice?.invoiceNo || "Unknown"}`,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="cursor-pointer">
          View
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-5xl bg-white overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Invoice Preview</DialogTitle>
        </DialogHeader>

        {/* --- A4 Layout (Visible in Modal) --- */}
        <div id="printable-area" ref={a4PrintRef}>
          <div className="invoice-box text-black">
            {/* --- Top Section --- */}
          <div className="border-b-2 border-gray-300 pb-4 mb-[2px] flex justify-between items-center">
    <div className="flex items-center gap-4">
      <Image
        src={logo}
        alt="Logo"
        width={60}
        height={60}
        className="rounded-md border border-gray-200"
      />
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Brothers Computer & Communication
        </h1>
        <p className="text-sm text-gray-600">
          Gokorno Road (Opp. of Homeopathy College), Brahmanbaria
        </p>
        <p className="text-sm text-gray-600">Contact: +880123456789</p>
      </div>
    </div>

    <div className="text-right">
      <h2 className="text-2xl font-bold text-gray-900 tracking-wide">
        INVOICE
      </h2>
      <p className="text-sm text-gray-600">#{invoice?.invoiceNo}</p>
      <p className="text-sm text-gray-600">
        {invoice?.createdAt
          ? new Date(invoice.createdAt).toLocaleDateString()
          : new Date().toLocaleDateString()}
      </p>
    </div>
  </div>

  {/* --- BILLING INFO --- */}
  <div className="grid grid-cols-2 mb-[2px]">
    <div>
      <h3 className="font-semibold text-gray-800 mb-1">Billed To</h3>
      <p className="text-sm">{invoice?.customerName}</p>
      {invoice?.address && <p className="text-sm">{invoice.address}</p>}
      {invoice?.mobile && <p className="text-sm">Mobile: {invoice.mobile}</p>}
    </div>
    <div className="text-right">
      <h3 className="font-semibold text-gray-800 mb-1">Payment Details</h3>
      <p className="text-xs">Method: {invoice?.paymentMethod || "Cash"}</p>
      <p className="text-xs">
        Status:
        <span
          className={`ml-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
            invoice?.dueAmount > 0
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {invoice?.dueAmount > 0 ? "DUE" : "PAID"}
        </span>
      </p>
    </div>
  </div>
            <Separator className="my-2 bg-black" />
            {/* --- Middle, Growing Section --- */}
            <div className="flex-grow">
              <table className="w-full border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2 text-left">#</th>
                    <th className="border p-2 text-left">Product</th>
                    <th className="border p-2 text-left">Serial</th>
                    <th className="border p-2 text-left">Warranty</th>
                    <th className="border p-2 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="text-[12px]">
                  {invoice?.items?.map((item: any, idx: number) => (
                    <tr key={item._id}>
                      <td className="border p-2">{idx + 1}</td>
                      <td className="border p-2">{item.productName}</td>
                      <td className="border p-2">{item.serialNumber}</td>
                      <td className="border p-2">{item.warranty}</td>
                      <td className="border p-2 text-right">
                        {item.price.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* --- Bottom Section --- */}
            <div>
              <div className="mt-4">
                <p className="text-xs font-semibold italic">
                  In Words: {numberToWords(invoice?.total)}
                </p>
              </div>

              <Separator className="my-4 bg-black" />

              <div className="flex justify-between mt-2">
                <div className="flex flex-col gap-16 items-end mt-8 text-sm">
                  <div className="text-center">
                    <div className="border-t border-black w-48 pt-1 font-semibold">
                      Customer&apos;s Signature
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="border-t border-black w-48 pt-1 font-semibold">
                      Seller&apos;s Signature
                    </div>
                  </div>
                </div>
                <div className="w-full max-w-sm space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-semibold">Subtotal:</span>
                    <span>{invoice?.subtotal?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Discount:</span>
                    <span>{invoice?.discount?.toFixed(2) || "0.00"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">
                      Tax: (added as percentage)
                    </span>
                    <span>{invoice?.tax?.toFixed(2) || "0.00"}</span>
                  </div>
                  <hr className="border-gray-400 my-2" />
                  <div className="flex justify-between text-base font-bold">
                    <span>Grand Total:</span>
                    <span>{invoice?.total?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Paid:</span>
                    <span>{invoice?.paidAmount?.toFixed(2)}</span>
                  </div>
                  {invoice?.returnAmount > 0 && (
                    <div className="flex justify-between text-green-600 font-bold">
                      <span>Return:</span>
                      <span>{invoice.returnAmount.toFixed(2)}</span>
                    </div>
                  )}
                  {invoice?.dueAmount > 0 && (
                    <div className="flex justify-between text-red-600 font-bold">
                      <span>Due:</span>
                      <span>{invoice.dueAmount.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-[11px] mt-2 text-black">
                N.B.: Warranty covers manufacturing defects only; physical
                damage, fungus, burn, or misuse is excluded. Product and
                original invoice required for all warranty claims.
              </p>
            </div>
          </div>
        </div>

        {/* --- POS Layout (Hidden, for printing only) --- */}
        <div className="hidden">
          <div id="pos-receipt-printable">
            <POSReceipt invoice={invoice} ref={posPrintRef} />
          </div>
        </div>

        {/* --- Action Buttons --- */}
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={handleA4Print}>Print A4</Button>
          <Button onClick={handlePosPrint} variant="secondary">
            Print POS
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceModal;