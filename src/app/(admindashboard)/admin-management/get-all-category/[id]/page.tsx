"use client";
import TitleWrapper from "@/components/adminDashboard/TitleWrapper";
import CustomForm from "@/components/customform/CustomForm";
import CustomInput from "@/components/customform/CustomInput";
import { Button } from "@/components/ui/button";
import { useGetSingleCategory, useUpdateCategory } from "@/hooks/category.hook";
import React from "react";
import { toast } from "sonner";

function UpdateCategory({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  const { data: singleCategory, isLoading } = useGetSingleCategory(id);
  const { mutate: updateCategory, isPending } = useUpdateCategory();

  const onSubmit = (data: any) => {
    const toastId = toast.loading("Updating category...");
    const updatedData = {
      name: data.name.toLowerCase(),
    };
    updateCategory(
      { id, categoryData: updatedData },
      {
        onSuccess: () => {
          toast.success("Category updated successfully", {
            id: toastId,
            duration: 2000,
          });
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Failed to update category",
            { id: toastId, duration: 2000 }
          );
        },
      }
    );
  };

  return (
    <div className="text-black font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <TitleWrapper title="Update Product Category" />
          <div className="">
            <CustomForm
              onSubmit={onSubmit}
              defaultValues={{ name: singleCategory?.data?.name }}
            >
              <div className="flex flex-col gap-4">
                <CustomInput
                  type="text"
                  name="name"
                  placeholder="Category Name"
                  label="Category Name"
                />
                <Button
                  type="submit"
                  className="bg-primary cursor-pointer"
                  disabled={isPending}
                >
                  Update Category
                </Button>
              </div>
            </CustomForm>
          </div>
        </>
      )}
    </div>
  );
}

export default UpdateCategory;
