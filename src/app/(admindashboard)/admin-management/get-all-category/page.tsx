"use client";
import TitleWrapper from "@/components/adminDashboard/TitleWrapper";
import { useGetCategory } from "@/hooks/category.hook";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function GetAllCategory() {
  const { data } = useGetCategory();
  const categories = data?.data;
  return (
    <div className="text-black  font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <TitleWrapper title="All Product Category" />

      <div>
        <Table>
          <TableCaption>A list of your categories.</TableCaption>
          <TableHeader className="bg-primary text-white">
            <TableRow>
              <TableHead className="w-[100px] ">Category Name</TableHead>

              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.map((category: any) => (
              <TableRow key={category._id}>
                <TableCell className="font-medium text-black">
                  {category.name.toUpperCase()}
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/admin-management/get-all-category/${category._id}`}
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

export default GetAllCategory;
