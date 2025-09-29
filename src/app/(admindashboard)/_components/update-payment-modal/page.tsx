"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdatePayment } from "@/hooks/invoice.hook";
import { toast } from "sonner";

function UpdatePaymentModal({
  invoiceID,
  open,
  onClose,
}: {
  invoiceID: string;
  open: boolean;
  onClose: () => void;
}) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const { mutate: handleUpdatePayment } = useUpdatePayment();

  const handleSubmit = () => {
    const paymentData = {
      amount: Number(amount),
      method,
    };

    const toastId = toast.loading("Updating payment...");
    handleUpdatePayment(
      {
        invoiceID,
        paymentData,
      },
      {
        onSuccess: () => {
          toast.success("Payment updated successfully", {
            id: toastId,
          });
        },
        onError: (error) => {
          toast.error(error?.message || "Failed to update payment", {
            id: toastId,
          });
        },
      }
    );
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Payment</DialogTitle>
          <DialogDescription>
            Enter payment details for invoice{" "}
            <span className="font-semibold">{invoiceID}</span>.
          </DialogDescription>
        </DialogHeader>

        {/* Amount Input */}
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Amount</label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Payment Method Select */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Payment Method</label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="bkash">bKash</SelectItem>
                <SelectItem value="nagad">Nagad</SelectItem>
                <SelectItem value="rocket">Rocket</SelectItem>
                <SelectItem value="bank">Bank</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UpdatePaymentModal;
