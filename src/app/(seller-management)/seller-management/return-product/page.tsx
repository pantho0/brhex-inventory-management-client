"use client";

import TitleWrapper from "@/components/adminDashboard/TitleWrapper";
import CustomForm from "@/components/customform/CustomForm";
import CustomInput from "@/components/customform/CustomInput";
import CustomSelect from "@/components/customform/CustomSelect";
import { Button } from "@/components/ui/button";
import { useReturnProduct } from "@/hooks/return-product.hook";
import { toast } from "sonner";

const returnReasons = [
  { value: "Defective", label: "Defective" },
  { value: "Customer changed mind", label: "Customer changed mind" },
  { value: "Wrong item", label: "Wrong item" },
  { value: "Damaged", label: "Damaged" },
  { value: "Other", label: "Other" },
];

function ReturnProductPage() {
  const { mutate: handleReturnProduct, isPending } = useReturnProduct();

  const onSubmit = (data: any, methods: any) => {
    const toastID = toast.loading("Processing return...");
    
    const payload = {
        ...data,
        returnMeters: data.returnMeters ? Number(data.returnMeters) : ""
    }
    
    handleReturnProduct(payload, {
      onSuccess: () => {
        toast.success("Product returned successfully", {
          id: toastID,
          duration: 2000,
        });
        methods.reset();
      },
      onError: (error: any) => {
        toast.error(error?.message || "Failed to return product", {
          id: toastID,
          duration: 2000,
        });
      },
    });
  };

  return (
    <div className="text-black font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-2xl mx-auto">
      <TitleWrapper title="Return Product" />
      <div className="mt-8">
        <CustomForm onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <CustomInput
              type="text"
              name="invoiceNo"
              placeholder="Invoice Number (e.g. BCC-INV-...)"
              label="Invoice Number"
              required={true}
            />
            <CustomInput
              type="text"
              name="serialNumber"
              placeholder="Serial Number"
              label="Serial Number"
              required={true}
            />
            <CustomInput
              type="number"
              name="returnMeters"
              placeholder="Return Meters (Optional)"
              label="Return Meters"
            />
            <CustomSelect
              name="reason"
              label="Reason for Return"
              options={returnReasons}
            />
            <Button
              type="submit"
              className="bg-primary cursor-pointer w-full"
              disabled={isPending}
            >
              {isPending ? "Processing..." : "Submit Return"}
            </Button>
          </div>
        </CustomForm>
      </div>
    </div>
  );
}

export default ReturnProductPage;
