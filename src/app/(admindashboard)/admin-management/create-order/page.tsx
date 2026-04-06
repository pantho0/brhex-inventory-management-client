"use client";
import TitleWrapper from "@/components/adminDashboard/TitleWrapper";
import CustomForm from "@/components/customform/CustomForm";
import CustomInput from "@/components/customform/CustomInput";
import { Button } from "@/components/ui/button";
import { useCreateOrder } from "@/hooks/order.hook";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

function CreateOrderPage() {
  const { mutate: handleCreateOrder, isPending } = useCreateOrder();

  const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
    const payload = {
      ...data,
      balance: Number(data.balance),
    };

    const toastId = toast.loading("Creating order...");
    handleCreateOrder(payload, {
      onSuccess: () => {
        toast.success("Order created successfully", { id: toastId });
      },
      onError: (error: any) => {
        toast.error(
          error.message || "Error creating order",
          { id: toastId }
        );
      },
    });
  };

  return (
    <div className="text-black font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <TitleWrapper title="Create New Order" />
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <CustomForm onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput
              name="orderDate"
              label="Order Date"
              type="date"
              placeholder="Order Date"
              required={true}
            />

            <CustomInput
              name="serialNo"
              label="Serial No"
              type="text"
              placeholder="Serial Number"
              required={true}
            />

            <CustomInput
              name="arabiQty"
              label="Arabi Qty"
              type="text"
              placeholder="Arabi Quantity"
              required={true}
            />

            <CustomInput
              name="kuwaitiQty"
              label="Kuwaiti Qty"
              type="text"
              placeholder="Kuwaiti Quantity"
              required={true}
            />

            <CustomInput
              name="balance"
              label="Balance"
              type="number"
              placeholder="Balance"
              required={true}
            />

            <CustomInput
              name="deliveryDate"
              label="Delivery Date"
              type="date"
              placeholder="Delivery Date"
              required={true}
            />

            <div className="md:col-span-2">
              <CustomInput
                name="note"
                label="Note"
                type="text"
                placeholder="Additional notes"
              />
            </div>
          </div>

          <Button
            disabled={isPending}
            type="submit"
            className="bg-primary hover:bg-primary/90 text-white cursor-pointer mt-6 w-full md:w-auto"
          >
            {isPending ? "Creating..." : "Create Order"}
          </Button>
        </CustomForm>
      </div>
    </div>
  );
}

export default CreateOrderPage;
