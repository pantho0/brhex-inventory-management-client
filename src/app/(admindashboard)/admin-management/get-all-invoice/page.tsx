"use client";
import TitleWrapper from "@/components/adminDashboard/TitleWrapper";
import { useGetAllInvoice } from "@/hooks/invoice.hook";
import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InvoiceModal } from "../../_components/invoice_modal/InvoiceModal";

function GetAllInvoicePage() {
  const { data: fetchedInvoices, isPending } = useGetAllInvoice();

  const invoices = fetchedInvoices?.data;

  return (
    <div className="text-black font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <TitleWrapper title="All Invoices" />
      {isPending ? (
        <div className="text-center py-10 text-lg font-semibold text-gray-600">
          Loading...
        </div>
      ) : !invoices || invoices.length === 0 ? (
        <div className="text-center py-10 text-gray-600">
          No invoices found.
        </div>
      ) : (
        <div className="mt-4">
          <Table>
            <TableCaption>A list of your invoices.</TableCaption>
            <TableHeader className="bg-gray-600 text-white">
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Invoice No</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Subtotal</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Tax</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Due/Return</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices?.map((inv: any, idx: number) => {
                const due = inv?.dueAmount ?? 0;
                const isReturn = due < 0;
                const status: string = (inv?.paymentStatus || "").toLowerCase();

                return (
                  <TableRow key={inv?._id || idx}>
                    <TableCell className="font-medium text-black">
                      {idx + 1}
                    </TableCell>
                    <TableCell className="font-medium text-black">
                      {inv?.invoiceNo}
                    </TableCell>
                    <TableCell className="text-black">
                      {inv?.customerName}
                    </TableCell>
                    <TableCell className="text-black">
                      {(inv?.items || []).length} item(s)
                    </TableCell>
                    <TableCell className="text-black">
                      {inv?.subtotal}
                    </TableCell>
                    <TableCell className="text-black">
                      {inv?.discount}
                    </TableCell>
                    <TableCell className="text-black">{inv?.tax}</TableCell>
                    <TableCell className="font-semibold text-black">
                      {inv?.total}
                    </TableCell>
                    <TableCell className="text-black">
                      {inv?.paidAmount}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          isReturn
                            ? "bg-blue-100 text-blue-800 border-blue-200"
                            : due > 0
                            ? "bg-red-100 text-red-800 border-red-200"
                            : "bg-green-100 text-green-800 border-green-200"
                        }
                      >
                        {isReturn
                          ? `Return ${Math.abs(due)}`
                          : due > 0
                          ? `Due ${due}`
                          : "Clear"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={status === "paid" ? "default" : "secondary"}
                        className={
                          status === "paid"
                            ? "bg-green-700 hover:bg-green-700/90 text-white"
                            : status === "partial"
                            ? "bg-yellow-200 hover:bg-yellow-200/90 text-yellow-900"
                            : "bg-gray-200 hover:bg-gray-200/90 text-gray-900"
                        }
                      >
                        {(inv?.paymentStatus || "").toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <InvoiceModal inv={inv._id} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default GetAllInvoicePage;
