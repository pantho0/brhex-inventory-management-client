"use client";

import React from "react";
import Image from "next/image";
import { numberToWords } from "@/utils/helperFunctions";

// Using a placeholder for the logo
const logo = "https://placehold.co/80x80/png?text=Logo";

interface POSReceiptProps {
  invoice: any;
  ref: React.Ref<HTMLDivElement>;
}

// eslint-disable-next-line react/display-name
export const POSReceipt = React.forwardRef<HTMLDivElement, POSReceiptProps>(
  ({ invoice }, ref) => {
    // Styles for the POS receipt
    const receiptStyles: React.CSSProperties = {
      width: "302px", // Approx 80mm
      fontFamily: "'Courier New', Courier, monospace",
      fontSize: "12px",
      color: "#000",
      padding: "16px",
    };

    const tableStyles: React.CSSProperties = {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "8px",
      marginBottom: "8px",
    };

    const thStyles: React.CSSProperties = {
      borderBottom: "1px dashed #000",
      padding: "4px",
      textAlign: "left",
    };

    const tdStyles: React.CSSProperties = {
      padding: "4px",
    };

    return (
      <div ref={ref} style={receiptStyles}>
        {/* --- Header --- */}
        <div style={{ textAlign: "center", marginBottom: "12px" }}>
          <Image
            src={logo}
            alt="Logo"
            width={60}
            height={60}
            style={{ margin: "0 auto" }}
          />
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              margin: "4px 0 2px",
            }}
          >
            Brothers Computer & Communication
          </h2>
          <p style={{ margin: "0", fontSize: "10px" }}>
            Gokorno Road, Brahmanbaria
          </p>
          <p style={{ margin: "0", fontSize: "10px" }}>
            Contact: +880123456789
          </p>
        </div>

        {/* --- Invoice Info --- */}
        <div
          style={{
            marginBottom: "8px",
            borderTop: "1px dashed #000",
            borderBottom: "1px dashed #000",
            padding: "8px 0",
          }}
        >
          <p style={{ margin: "2px 0" }}>
            <strong>Invoice #:</strong> {invoice?.invoiceNo}
          </p>
          <p style={{ margin: "2px 0" }}>
            <strong>Date:</strong>{" "}
            {new Date(invoice?.createdAt).toLocaleString()}
          </p>
          <p style={{ margin: "2px 0" }}>
            <strong>Billed To:</strong> {invoice?.customerName}
          </p>
        </div>

        {/* --- Items Table --- */}
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={thStyles}>Item</th>
              <th style={{ ...thStyles, textAlign: "right" }}>Price</th>
            </tr>
          </thead>
          <tbody>
            {invoice?.items?.map((item: any) => (
              <tr key={item._id}>
                <td style={tdStyles}>
                  {item.productName}
                  <br />
                  <span style={{ fontSize: "10px" }}>
                    SN: {item.serialNumber}
                  </span>
                  <br />
                  <span style={{ fontSize: "10px" }}>
                    Warranty: {item.warranty}
                  </span>
                </td>
                <td
                  style={{
                    ...tdStyles,
                    textAlign: "right",
                    verticalAlign: "top",
                  }}
                >
                  {item.price.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* --- Totals --- */}
        <div style={{ borderTop: "1px dashed #000", paddingTop: "8px" }}>
          <p
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "2px 0",
            }}
          >
            <span>Subtotal:</span> <span>{invoice?.subtotal?.toFixed(2)}</span>
          </p>
          <p
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "2px 0",
            }}
          >
            <span>Discount:</span> <span>{invoice?.discount?.toFixed(2)}</span>
          </p>
          <p
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "2px 0",
            }}
          >
            <span>Tax:</span> <span>{invoice?.tax?.toFixed(2)}</span>
          </p>
          <hr
            style={{ border: 0, borderTop: "1px dashed #000", margin: "4px 0" }}
          />
          <p
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "2px 0",
              fontWeight: "bold",
            }}
          >
            <span>Grand Total:</span> <span>{invoice?.total?.toFixed(2)}</span>
          </p>
          <p
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "2px 0",
            }}
          >
            <span>Paid:</span> <span>{invoice?.paidAmount?.toFixed(2)}</span>
          </p>
          {invoice?.dueAmount > 0 && (
            <p
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "2px 0",
                fontWeight: "bold",
              }}
            >
              <span>Due:</span> <span>{invoice.dueAmount.toFixed(2)}</span>
            </p>
          )}
        </div>

        {/* --- Footer --- */}
        <div
          style={{
            borderTop: "1px dashed #000",
            marginTop: "12px",
            paddingTop: "8px",
            textAlign: "center",
          }}
        >
          <p style={{ margin: "4px 0", fontStyle: "italic", fontSize: "11px" }}>
            In Words: {numberToWords(invoice?.total)}
          </p>
          <p style={{ margin: "8px 0 2px", fontSize: "10px" }}>
            N.B.: Warranty covers manufacturing defects only; physical damage,
            fungus, burn, or misuse is excluded. Product and original invoice
            required for all warranty claims.
          </p>
          <p style={{ margin: "2px 0", fontSize: "10px", fontWeight: "bold" }}>
            Thank you for your business!
          </p>
        </div>
      </div>
    );
  }
);
