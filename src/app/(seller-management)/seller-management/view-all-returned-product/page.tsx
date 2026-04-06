"use client";

import TitleWrapper from "@/components/adminDashboard/TitleWrapper";
import { useGetAllReturns } from "@/hooks/return-product.hook";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import PaginationComponent from "@/app/(admindashboard)/_components/pagination/PaginationComponent";

function ViewAllReturnedProductPage() {
  const [query, setQuery] = useState<{ page: number; searchTerm?: string }>({
    page: 1,
  });

  const { data: fetchedReturns, isPending } = useGetAllReturns(query);

  const returns = (fetchedReturns as any)?.data || [];
  const meta = (fetchedReturns as any)?.meta || { page: 1, total: returns.length, limit: 10 };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(dateString));
  };

  return (
    <div className="text-black font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <TitleWrapper title="All Returned Products" />
      
      <div className="mb-6">
        <label htmlFor="search" className="text-gray-600 block mb-1">
          Search Return (Invoice No / Serial No)
        </label>
        <Input
          type="text"
          id="search"
          className="w-full max-w-md"
          placeholder="Search..."
          onChange={(e) =>
            setQuery({
              ...query,
              page: 1,
              searchTerm: e.target.value.toUpperCase(),
            })
          }
        />
      </div>

      {isPending ? (
        <div className="text-center py-10 text-lg font-semibold text-gray-600">
          Loading...
        </div>
      ) : returns.length === 0 ? (
        <div className="text-center py-10 text-gray-600 border rounded-lg bg-gray-50">
          No returned products found.
        </div>
      ) : (
        <div className="mt-4 border rounded-lg overflow-hidden">
          <Table>
            <TableCaption>A list of returned products.</TableCaption>
            <TableHeader className="bg-primary text-white">
              <TableRow>
                <TableHead className="text-white">Date</TableHead>
                <TableHead className="text-white">Invoice No</TableHead>
                <TableHead className="text-white">Product Name</TableHead>
                <TableHead className="text-white">Serial Number</TableHead>
                <TableHead className="text-white">Return Meters</TableHead>
                <TableHead className="text-white">Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {returns.map((ret: any) => (
                <TableRow key={ret._id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="font-medium">
                    {formatDate(ret.returnDate)}
                  </TableCell>
                  <TableCell>{ret.invoiceNo}</TableCell>
                  <TableCell>{ret.productId?.name || "N/A"}</TableCell>
                  <TableCell>{ret.serialNumber}</TableCell>
                  <TableCell>{ret.returnMeters || "0"}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
                      {ret.reason}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {meta && meta.total > (meta.limit || 10) && (
            <div className="p-4 border-t">
              <PaginationComponent meta={meta} query={query} setQuery={setQuery} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ViewAllReturnedProductPage;

