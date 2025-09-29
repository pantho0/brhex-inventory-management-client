"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useGetAllInvoice } from "@/hooks/invoice.hook";
import UpdatePaymentModal from "../../_components/update-payment-modal/page";

export default function UpdatePaymentPage() {
  const [invoiceNo, setInvoiceNo] = useState("");
  const [query, setQuery] = useState<Record<string, unknown>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: fetchedInvoices, isPending } = useGetAllInvoice(query);

  const invoice =
    fetchedInvoices?.data?.result && fetchedInvoices.data.result.length > 0
      ? fetchedInvoices.data.result[0]
      : null;

  console.log(invoice);

  const handleSearch = () => {
    if (invoiceNo.trim()) {
      setQuery({ searchTerm: invoiceNo.toUpperCase() });
    }
  };

  return (
    <div className="p-6 text-black">
      {/* Search Field */}
      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Enter Invoice Number"
          value={invoiceNo}
          onChange={(e) => setInvoiceNo(e.target.value)}
        />
        <Button onClick={handleSearch} disabled={isPending}>
          {isPending ? "Searching..." : "Search"}
        </Button>
      </div>

      {/* Invoice Details */}
      {invoice && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Invoice #{invoice?.invoiceNo}</CardTitle>
            <p className="text-sm">
              Customer: {invoice?.customerName} | Date:{" "}
              {new Date(invoice?.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm">Address : {invoice?.address}</p>
            <p className="text-sm">Mobile : {invoice?.mobile}</p>
          </CardHeader>

          <CardContent>
            {/* Items */}
            <div className="space-y-4">
              {invoice?.items.map((item: any) => (
                <div
                  key={item._id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{item?.productName}</p>
                    <p className="text-sm">Serial: {item?.serialNumber}</p>
                    <p className="text-sm">Warranty: {item?.warranty}</p>
                  </div>
                  <div className="font-bold">৳ {item.price}</div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-6 border-t pt-4 grid grid-cols-2 gap-4">
              <div>
                <Label>Total Amount</Label>
                <p className="font-semibold">৳ {invoice?.total}</p>
              </div>
              <div>
                <Label>Paid</Label>
                <p className="font-semibold">৳ {invoice?.paidAmount}</p>
              </div>
              <div>
                <Label>Due</Label>
                <p className="font-semibold">৳ {invoice?.dueAmount}</p>
              </div>
              <div>
                <Label>Status</Label>
                <p className="font-semibold">{invoice?.paymentStatus}</p>
              </div>
            </div>

            {/* Payment History */}
            {invoice?.paymentHistory?.length > 0 && (
              <div className="mt-6 border-t pt-4">
                <Label>Payment History</Label>
                <div className="space-y-3 mt-2">
                  {invoice.paymentHistory.map((history: any, idx: number) => (
                    <div
                      key={history._id || idx}
                      className="flex justify-between items-center border rounded-md p-3"
                    >
                      <div>
                        <p className="text-sm">
                          Date:{" "}
                          {new Date(history.date).toLocaleDateString("en-GB")}
                        </p>
                        <p className="text-sm">Method: {history.method}</p>
                      </div>
                      <div className="font-semibold">৳ {history.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Update Payment Action */}
            <div className="mt-6 flex justify-center">
              {invoice?.paymentStatus === "paid" ? (
                <Button className="bg-accent" disabled>
                  Already Paid
                </Button>
              ) : (
                <Button onClick={() => setIsModalOpen(true)}>
                  Update Payment
                </Button>
              )}
              <UpdatePaymentModal
                invoiceID={invoice?._id as string}
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
