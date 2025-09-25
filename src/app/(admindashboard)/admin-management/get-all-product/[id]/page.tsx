"use client";
import TitleWrapper from "@/components/adminDashboard/TitleWrapper";
import CustomForm from "@/components/customform/CustomForm";
import CustomInput from "@/components/customform/CustomInput";
import CustomSelect from "@/components/customform/CustomSelect";
import { Button } from "@/components/ui/button";
import { useGetCategory } from "@/hooks/category.hook";
import { useGetProductById, useUpdateProduct } from "@/hooks/product.hook";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

function UpdateProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const { data: productById, isFetching: productByIdLoading } =
    useGetProductById(id);

  const { data: fetchedData, isFetching: categoryLoading } = useGetCategory();

  const { mutate: updateProduct, isPending } = useUpdateProduct();

  const categories = fetchedData?.data?.map((cat: any) => ({
    key: cat?._id,
    value: cat?._id,
    label: cat?.name?.toUpperCase(),
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!data.name || !data.category) {
      return toast.error("Please fill all the fields");
    }
    const toastId = toast.loading("Updating product...");
    updateProduct(
      { id, productData: data },
      {
        onSuccess: () => {
          toast.success("Product updated successfully", { id: toastId });
        },
        onError: (error: any) => {
          toast.error(
            error.response?.data?.message ||
              error.message ||
              "Error updating product",
            { id: toastId }
          );
        },
      }
    );
  };
  return (
    <div className="text-black font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      {productByIdLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <TitleWrapper title="Update Product Category" />

          <div>
            <CustomForm
              onSubmit={onSubmit}
              defaultValues={{
                name: productById?.data?.name,
                category: productById?.data?.category?._id || "",
              }}
            >
              <div className="flex flex-col gap-4">
                <CustomInput
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  label="Product Name"
                />

                <CustomSelect
                  name="category"
                  label="Category"
                  options={categories || []}
                  disabled={categoryLoading}
                />

                <Button
                  type="submit"
                  className="bg-primary cursor-pointer"
                  disabled={isPending}
                >
                  Update Product
                </Button>
              </div>
            </CustomForm>
          </div>
        </>
      )}
    </div>
  );
}

export default UpdateProductPage;
