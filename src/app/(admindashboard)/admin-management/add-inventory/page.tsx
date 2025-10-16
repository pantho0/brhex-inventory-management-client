"use client";
import TitleWrapper from "@/components/adminDashboard/TitleWrapper";
import CustomForm from "@/components/customform/CustomForm";
import CustomInput from "@/components/customform/CustomInput";
import CustomSelect from "@/components/customform/CustomSelect";
import { Button } from "@/components/ui/button";
import { useAddInventoryItem } from "@/hooks/inventory.hook";
import { useGetAllProduct } from "@/hooks/product.hook";

import React, { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBarcodeScanner } from "@/hooks/barcode.hook";

function AddInventoryItemPage() {
  const { data: fetchedProducts, isLoading } = useGetAllProduct();
  const { mutate: handleAddInventoryItem, isPending } = useAddInventoryItem();

  const [serials, setSerials] = useState<string[]>([]);
  const [manualSerial, setManualSerial] = useState("");
  console.log(serials);
  // ✅ Capture scanned serials
  useBarcodeScanner((code) => {
    const trimmed = code.trim();
    if (trimmed && !serials.includes(trimmed)) {
      setSerials((prev) => [...prev, trimmed]);
      toast.success(`Scanned: ${trimmed}`);
    } else {
      toast.error("This serial is already added");
    }
  });

  const products = fetchedProducts?.data?.map((product: any) => ({
    key: product?._id,
    value: product?._id,
    label: product?.name?.toUpperCase(),
  }));

  const handleManualAdd = () => {
    if (manualSerial.trim() !== "" && !serials.includes(manualSerial.trim())) {
      setSerials((prev) => [...prev, manualSerial.trim()]);
      setManualSerial("");
    } else {
      toast.error("Invalid or duplicate serial");
    }
  };

  const handleRemoveSerial = (code: string) => {
    setSerials((prev) => prev.filter((s) => s !== code));
  };

  const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
    if (serials.length === 0) {
      toast.error("Please scan or enter at least one serial number");
      return;
    }

    const payload = {
      product: data.product,
      serialNumber: serials, // ✅ send array
      purchased_price: Number(data.purchased_price),
      price: Number(data.price),
      warranty: data.warranty,
    };
    console.log(payload);
    const toastId = toast.loading("Adding inventory items...");
    handleAddInventoryItem(payload, {
      onSuccess: () => {
        toast.success("Inventory items added successfully", { id: toastId });
        setSerials([]);
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Error adding inventory items",
          { id: toastId }
        );
      },
    });
  };

  return (
    <div className="text-black font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <TitleWrapper title="Add New Inventory Items" />
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
              name="purchased_price"
              label="Purchased Price"
              type="number"
              placeholder="Purchased Price"
              required={true}
            />

            <CustomInput
              name="price"
              label="Selling Price"
              type="number"
              placeholder="Price"
              required={true}
            />

            <CustomInput
              name="warranty"
              label="Warranty"
              type="text"
              placeholder="e.g. 1 year"
            />

            {/* ✅ Manual Serial Entry */}
            <div className="flex gap-2">
              <input
                value={manualSerial}
                onChange={(e) => setManualSerial(e.target.value)}
                placeholder="Enter serial manually"
                className="border rounded px-3 py-2 w-full"
              />
              <Button
                type="button"
                onClick={handleManualAdd}
                className="bg-primary"
              >
                Add
              </Button>
            </div>

            {/* ✅ Serial Numbers Table */}
            {serials.length > 0 && (
              <Table className="border mt-4">
                <TableHeader className="bg-slate-500">
                  <TableRow>
                    <TableHead>Serial Number</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {serials.map((code, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{code}</TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveSerial(code)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            <Button
              disabled={isPending}
              type="submit"
              className="bg-primary cursor-pointer mt-4"
            >
              Add Inventory Items
            </Button>
          </div>
        </CustomForm>
      </div>
    </div>
  );
}

export default AddInventoryItemPage;
