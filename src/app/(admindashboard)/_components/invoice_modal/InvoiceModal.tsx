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
import Logo from "../../../../../public/images/logo.jpg";

const logo = Logo;

interface InvoiceModalProps {
  invoice: any;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ invoice }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Invoice-${invoice?.invoiceNo || "Unknown"}`,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Invoice</Button>
      </DialogTrigger>

      <DialogContent className="max-w-5xl bg-white overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Invoice Preview</DialogTitle>
        </DialogHeader>

        <div id="printable-area" ref={printRef}>
          <div className="invoice-box text-black">
            {/* --- Top Section --- */}
            <div>
              <div className="flex flex-row items-center justify-center text-center gap-4">
                <Image
                  src={logo}
                  alt="Logo"
                  width={40}
                  height={40}
                  className="w-[40px] h-[40px]"
                />
                <h1 className="text-2xl font-bold">
                  Brothers Computer and Communication
                </h1>
              </div>
              <div className="text-center mb-8">
                <p className="text-xs">
                  Gokorno Road (opposite of Homeopathy College), Brahmanbaria
                </p>
                <p className="text-xs">Contact No: +880123456789</p>
              </div>

              <div className="flex justify-between text-sm">
                <div>
                  <p className="font-semibold mb-1">Billed To:</p>
                  <p>{invoice?.customerName}</p>
                  {invoice?.address && <p>{invoice.address}</p>}
                  {invoice?.mobile && <p>Mobile: {invoice.mobile}</p>}
                </div>
                <div className="text-right">
                  <p>
                    <span className="font-semibold">Invoice No:</span>{" "}
                    {invoice?.invoiceNo}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {invoice?.createdAt
                      ? new Date(invoice.createdAt).toLocaleString()
                      : new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <Separator className="my-4 bg-black" />
            {/* --- Middle, Growing Section --- */}
            <div className="flex-grow">
              <table className="w-full border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2 text-left">#</th>
                    <th className="border p-2 text-left">Product</th>
                    <th className="border p-2 text-left">Serial</th>
                    <th className="border p-2 text-right">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice?.items?.map((item: any, idx: number) => (
                    <tr key={item._id}>
                      <td className="border p-2">{idx + 1}</td>
                      <td className="border p-2">{item.productName}</td>
                      <td className="border p-2">{item.serialNumber}</td>
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

              <div className="flex justify-end mt-2">
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
            </div>
            <p className="text-[11px] mt-2 text-black">
              N.B.: Warranty covers manufacturing defects only; physical damage,
              fungus, burn, or misuse is excluded. Product and original invoice
              required for all warranty claims.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={handlePrint}>Print Invoice</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceModal;
