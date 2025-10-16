/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import TitleWrapper from "@/components/adminDashboard/TitleWrapper";
import { useGetAllInvoice } from "@/hooks/invoice.hook";
import React, { useState } from "react";
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
import InvoiceModal from "../../_components/invoice_modal/InvoiceModal";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import PaginationComponent from "../../_components/pagination/PaginationComponent";

function GetAllInvoicePage() {
  const [query, setQuery] = useState<{ page: number } & Record<string, unknown>>({
    page: 1,
  });

  const { data: fetchedInvoices, isPending } = useGetAllInvoice(query);

  // @ts-ignore
  const invoices = fetchedInvoices?.data?.result;

  // @ts-ignore
  const meta = fetchedInvoices?.data?.meta;

  const formatNumber = (num: number | undefined) => {
    if (num === undefined || num === null) return "0.00";
    return new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num);
  };

  return (
    <div className="text-black font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <TitleWrapper title="All Invoices" />
      <div className="flex gap-2 justify-between">
        <div className="w-full">
          <label htmlFor="search" className="text-gray-600">
            Search
          </label>
          <Input
            type="text"
            className="w-full"
            placeholder="Search invoice..."
            defaultValue="BCC-INV"
            onChange={(e) =>
              setQuery({
                ...query,
                page: 1,
                searchTerm: e.target.value.toUpperCase(),
              })
            }
          />
        </div>
        <div className="w-[25%] flex items-center gap-2">
          <div>
            <label htmlFor="status" className="text-gray-600">
              Status
            </label>
            <Select
              defaultValue="BCC-INV"
              onValueChange={(value) =>
                setQuery({
                  ...query,
                  page: 1,
                  paymentStatus: value === "all" ? undefined : value.toLowerCase(),
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="due">Due</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Button
              variant="outline"
              size="sm"
              className="mt-6 h-10 px-4 bg-red-500 text-white hover:bg-red-600 cursor-pointer"
              onClick={() => {
                setQuery({ page: 1 });
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </div>
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
                <TableHead className="text-right">Subtotal</TableHead>
                <TableHead className="text-right">Discount</TableHead>
                <TableHead className="text-right">Tax</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Total Purchased</TableHead>
                <TableHead className="text-right">Profit</TableHead>
                <TableHead className="text-right">Paid</TableHead>
                <TableHead className="text-right">Due/Return</TableHead>
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
                    <TableCell className="font-medium text-black">{idx + 1}</TableCell>
                    <TableCell className="font-medium text-black">{inv?.invoiceNo}</TableCell>
                    <TableCell className="text-black">{inv?.customerName}</TableCell>
                    <TableCell className="text-black">{(inv?.items || []).length} item(s)</TableCell>
                    <TableCell className="text-right text-black">{formatNumber(inv?.subtotal)}</TableCell>
                    <TableCell className="text-right text-black">{formatNumber(inv?.discount)}</TableCell>
                    <TableCell className="text-right text-black">{formatNumber(inv?.tax)}</TableCell>
                    <TableCell className="text-right font-semibold text-black">{formatNumber(inv?.total)}</TableCell>
                    <TableCell className="text-right text-black font-medium">{formatNumber(inv?.totalPurchasedPrice)}</TableCell>
                    <TableCell
                      className={`text-right font-medium ${
                        (inv?.profit ?? 0) >= 0 ? "text-green-700" : "text-red-600"
                      }`}
                    >
                      {formatNumber(inv?.profit)}
                    </TableCell>
                    <TableCell className="text-right text-black">{formatNumber(inv?.paidAmount)}</TableCell>
                    <TableCell className="text-right">
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
                          ? `Return ${formatNumber(Math.abs(due))}`
                          : due > 0
                          ? `Due ${formatNumber(due)}`
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
                      <InvoiceModal invoice={inv} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div>
            <PaginationComponent meta={meta} query={query} setQuery={setQuery} />
          </div>
        </div>
      )}
    </div>
  );
}

export default GetAllInvoicePage;
