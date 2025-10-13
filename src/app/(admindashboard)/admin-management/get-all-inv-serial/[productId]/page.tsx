"use client";

import TitleWrapper from "@/components/adminDashboard/TitleWrapper";
import { useGetAllInventoryItemsByProductId } from "@/hooks/inventory.hook";
import React, { useState, useMemo } from "react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PaginationComponent from "@/app/(admindashboard)/_components/pagination/PaginationComponent";

const GetAllInvByProductSerial = ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = React.use(params);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "in_stock" | "sold">(
    "all"
  );
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const { data, isPending, isFetching } =
    useGetAllInventoryItemsByProductId(productId);

  const products = useMemo(() => data?.data ?? [], [data?.data]);
 
 
  const productName = products?.[0]?.product?.name || "";


  // Filtered & searched products
  const filteredProducts = useMemo(() => {
    let filtered = [...products].reverse(); // latest first

    if (statusFilter !== "all") {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.serialNumber.toUpperCase().includes(searchTerm.toUpperCase())
      );
    }

    return filtered;
  }, [products, searchTerm, statusFilter]);

  // Pagination calculation
  const totalPage = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleReset = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setPage(1);
  };

  if (isPending || isFetching) {
    return (
      <div className="text-center py-10 text-lg font-semibold text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="text-black font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <TitleWrapper title={productName} />

      {/* Search & Filter */}
      <div className="flex gap-2 justify-between mb-4">
        <div className="w-full">
          <label className="text-gray-600">Search</label>
          <Input
            type="text"
            placeholder="Search by serial..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="w-[25%] flex items-end gap-2">
          <div className="w-full">
            <label className="text-gray-600">Status</label>
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value as "all" | "in_stock" | "sold");
                setPage(1);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="in_stock">In Stock</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="mt-6 h-10 px-4 bg-red-500 text-white hover:bg-red-600"
            onClick={handleReset}
          >
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Inventory Table */}
      <Table>
        <TableCaption>A list of your inventory items.</TableCaption>
        <TableHeader className="bg-gray-600 text-white">
          <TableRow>
            <TableHead>SL No.</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>P.Price</TableHead>
            <TableHead>S.Price</TableHead>
            <TableHead>Warranty</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedProducts.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="font-medium text-black">
                {item.serialNumber?.toUpperCase()}
              </TableCell>
              <TableCell className="font-medium text-black">
                {item?.product?.category?.name?.toUpperCase()}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    item?.status === "in_stock" ? "default" : "secondary"
                  }
                  className={
                    item?.status === "in_stock"
                      ? "bg-green-700 hover:bg-green-700/90 text-white"
                      : "bg-yellow-200 hover:bg-yellow-200/90 text-yellow-900"
                  }
                >
                  {item?.status?.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell className="font-medium text-black">
                {item.purchased_price}
              </TableCell>
              <TableCell className="font-medium text-black">
                {item.price}
              </TableCell>
              <TableCell className="font-medium text-black">
                {item.warranty}
              </TableCell>
              <TableCell className="text-right">
                <Link
                  href={`/admin-management/update-inventory/${item.serialNumber}`}
                >
                  <Button
                    className="bg-transparent hover:bg-primary hover:cursor-pointer"
                    variant="outline"
                  >
                    Edit
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalPage > 1 && (
        <div className="mt-4">
          <PaginationComponent
            meta={{ page, totalPage, limit: itemsPerPage }}
            query={{ page }}
            setQuery={(q) => setPage(q.page as number)}
          />
        </div>
      )}
    </div>
  );
};

export default GetAllInvByProductSerial;
