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
import { useGetAllInventoryItemsByProductId } from "@/hooks/inventory.hook";
import Link from "next/link";
import React from "react";

const GetAllInvByProductSerial = ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = React.use(params);
  const { data, isPending, isFetching } =
    useGetAllInventoryItemsByProductId(productId);

  if (isPending || isFetching) {
    return (
      <div className="text-center py-10 text-lg font-semibold text-gray-600">
        Loading...
      </div>
    );
  }

  const ProductName = data?.data?.map((item: any) => item.product.name)[0];
  const products = data?.data;

  return (
    <div className="text-black font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <TitleWrapper title={ProductName} />
      <div>
        <Table>
          <TableCaption>A list of your products.</TableCaption>
          <TableHeader className="bg-gray-600 text-white">
            <TableRow>
              <TableHead>SL No.</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product: any) => (
              <TableRow key={product._id}>
                <TableCell className="font-medium text-black">
                  {product?.serialNumber?.toUpperCase()}
                </TableCell>
                <TableCell className="font-medium text-black">
                  {product?.product?.category?.name?.toUpperCase()}
                </TableCell>
                <TableCell className="font-medium text-black">
                  {product?.price}
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/admin-management/update-inventory/${product.serialNumber}`}
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
};

export default GetAllInvByProductSerial;
