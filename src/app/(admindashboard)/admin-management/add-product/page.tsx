"use client";
import TitleWrapper from "@/components/adminDashboard/TitleWrapper";
import CustomForm from "@/components/customform/CustomForm";
import CustomInput from "@/components/customform/CustomInput";
import CustomSelect from "@/components/customform/CustomSelect";
import { Button } from "@/components/ui/button";
import { useGetCategory } from "@/hooks/category.hook";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

function AddProductPage() {
  const { data: fetchedData, isFetching: categoryLoading } = useGetCategory();

  const categories = fetchedData?.data?.map((cat: any) => ({
    key: cat?._id,
    value: cat?._id,
    label: cat?.name?.toUpperCase(),
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("Submitted", data);
  };

  return (
    <div className="text-black font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <TitleWrapper title="Add New Product" />
      <div>
        <CustomForm onSubmit={onSubmit}>
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
              disabled={false}
            >
              Add Category
            </Button>
          </div>
        </CustomForm>
      </div>
    </div>
  );
}

export default AddProductPage;
