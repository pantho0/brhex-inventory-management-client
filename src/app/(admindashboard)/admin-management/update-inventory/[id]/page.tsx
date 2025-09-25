"use client";
import React from "react";
import {
  useGetInventoryItemBySerialNumber,
  useUpdateInventoryItem,
} from "@/hooks/inventory.hook";
import TitleWrapper from "@/components/adminDashboard/TitleWrapper";
import CustomForm from "@/components/customform/CustomForm";
import CustomSelect from "@/components/customform/CustomSelect";
import CustomInput from "@/components/customform/CustomInput";
import { Button } from "@/components/ui/button";
import { useGetAllProduct } from "@/hooks/product.hook";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function UpdateInventory({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const { data, isPending, isFetching } = useGetInventoryItemBySerialNumber(id);
  const { data: fetchedProducts, isLoading } = useGetAllProduct();
  const { mutate: handleUpdateInventory, isPending: isUpdatePending } =
    useUpdateInventoryItem();
  const router = useRouter();
  const products = fetchedProducts?.data?.map((product: any) => ({
    key: product?._id,
    value: product?._id,
    label: product?.name?.toUpperCase(),
  }));

  const updateDataId = data?.data?._id;

  const defaultValue = {
    product: data?.data?.product?._id,
    serialNumber: data?.data?.serialNumber,
    price: data?.data?.price,
  };

  const onSubmit: SubmitHandler<FieldValues> = (updatedData) => {
    const toastId = toast.loading("Updating inventory item...");
    handleUpdateInventory(
      { id: updateDataId, inventoryData: updatedData },
      {
        onSuccess: () => {
          toast.success("Inventory item updated successfully", { id: toastId });
          router.push("/admin-management/get-all-inventory");
        },
        onError: (error: any) => {
          toast.error(
            error.response?.data?.message ||
              error.message ||
              "Error updating inventory item",
            { id: toastId }
          );
        },
      }
    );
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
      <TitleWrapper title={`Update - ${data?.data?.product?.name}`} />
      <div>
        <CustomForm onSubmit={onSubmit} defaultValues={defaultValue}>
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
            <Button
              disabled={isPending || isUpdatePending}
              type="submit"
              className="bg-primary cursor-pointer"
            >
              Update Inventory Item
            </Button>
          </div>
        </CustomForm>
      </div>
    </div>
  );
}

export default UpdateInventory;
