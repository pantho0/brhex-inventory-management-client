"use client";
import TitleWrapper from "@/components/adminDashboard/TitleWrapper";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllProduct } from "@/hooks/product.hook";
import Link from "next/link";
import React from "react";

function GetAllProductPage() {
  const { data } = useGetAllProduct();
  const products = data?.data;

  return (
    <div className="text-black font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <TitleWrapper title="View All Products" />
      <div>
        <Table>
          <TableCaption>A list of your products.</TableCaption>
          <TableHeader className="bg-gray-600 text-white">
            <TableRow>
              <TableHead className="">Product Name</TableHead>
              <TableHead className="">Category</TableHead>

              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product: any) => (
              <TableRow key={product._id}>
                <TableCell className="font-medium text-black">
                  {product?.name?.toUpperCase()}
                </TableCell>
                <TableCell className="font-medium text-black">
                  {product?.category?.name?.toUpperCase()}
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/admin-management/get-all-product/${product._id}`}
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
      </div>
    </div>
  );
}

export default GetAllProductPage;
