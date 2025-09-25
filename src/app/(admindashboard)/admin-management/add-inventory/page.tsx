"use client";
import TitleWrapper from "@/components/adminDashboard/TitleWrapper";
import CustomForm from "@/components/customform/CustomForm";
import CustomInput from "@/components/customform/CustomInput";
import CustomSelect from "@/components/customform/CustomSelect";
import { Button } from "@/components/ui/button";
import { useGetAllProduct } from "@/hooks/product.hook";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

function AddInventoryItemPage() {
  const { data: fetchedProducts, isLoading } = useGetAllProduct();

  const products = fetchedProducts?.data?.map((product: any) => ({
    key: product?._id,
    value: product?._id,
    label: product?.name?.toUpperCase(),
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
    console.log(data);
  };

  return (
    <div className="text-black font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <TitleWrapper title="Add New Inventory Item" />
      <div>
        <CustomForm onSubmit={onSubmit}>
          <div className="flex flex-col gap-4">
            <CustomSelect
              name="product"
              label="Product"
              options={products || []}
              disabled={isLoading}
            />

            <CustomInput
              name="serialNumber"
              label="Serial Number"
              type="text"
              placeholder="Serial Number"
            />

            <CustomInput
              name="price"
              label="Price"
              type="number"
              placeholder="Price"
            />
            <Button type="submit" className="bg-primary cursor-pointer">
              Add Inventory Item
            </Button>
          </div>
        </CustomForm>
      </div>
    </div>
  );
}

export default AddInventoryItemPage;
