"use client";

import TitleWrapper from "@/components/adminDashboard/TitleWrapper";
import { useViewInventory } from "@/hooks/inventory.hook";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

function ShowInventory() {
  const { data, isPending, isFetching } = useViewInventory();
  const inventory = data?.data || [];

  if (isPending || isFetching) {
    return (
      <div className="text-center py-10 text-lg font-semibold text-gray-600">
        Loading inventory...
      </div>
    );
  }

  return (
    <div className="text-black font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <TitleWrapper title="Inventory Report" />

      <Table className="mt-6">
        <TableCaption>
          Summary of all products: in-stock and sold quantities
        </TableCaption>
        <TableHeader className="bg-primary text-white">
          <TableRow>
            <TableHead className="w-[5%]">SL</TableHead>
            <TableHead className="w-[60%]">Product Name</TableHead>
            <TableHead className="w-[15%]">In Stock</TableHead>
            <TableHead className="w-[15%]">Sold</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                No inventory data found.
              </TableCell>
            </TableRow>
          ) : (
            inventory.map((item: any, idx: number) => (
              <TableRow key={item.productId}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell className="font-medium">
                  {item.productName}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={item.in_stock > 0 ? "default" : "destructive"}
                    className={`px-3 py-1 text-sm ${
                      item.in_stock > 0
                        ? "bg-green-600 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {item.in_stock}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={item.sold > 0 ? "default" : "secondary"}
                    className={`px-3 py-1 text-sm ${
                      item.sold > 0
                        ? "bg-yellow-400 text-black"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    {item.sold}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default ShowInventory;
