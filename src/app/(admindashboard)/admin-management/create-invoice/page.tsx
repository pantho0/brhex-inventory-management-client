"use client";
import { useState, useMemo } from "react";
import { useBarcodeScanner } from "@/hooks/barcode.hook";
import TitleWrapper from "@/components/adminDashboard/TitleWrapper";
import { getInventoryItemBySerialNumber } from "@/services/inventory";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CreateInvoice() {
  const [cart, setCart] = useState<any[]>([]);
  const [manualSerial, setManualSerial] = useState("");

  // Invoice fields
  const [invoiceNo, setInvoiceNo] = useState("INV-001");
  const [customerName, setCustomerName] = useState("");
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);

  // Add product to cart
  const addToCart = async (code: string) => {
    try {
      const res = await getInventoryItemBySerialNumber(code);

      if (res?.success && res?.data) {
        const product = res.data;

        if (product.status !== "in_stock") {
          alert(`Serial ${product.serialNumber} is not in stock`);
          return;
        }

        setCart((prev) => {
          if (prev.find((item) => item.serialNumber === product.serialNumber)) {
            alert(`Serial ${product.serialNumber} already in cart`);
            return prev;
          }
          return [
            ...prev,
            {
              productId: product.product._id,
              productName: product.product.name,
              serialNumber: product.serialNumber,
              price: product.price,
            },
          ];
        });
      } else {
        alert(`Product ${code} not found`);
      }
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Something went wrong while fetching product.");
    }
  };

  // Barcode scanner support
  useBarcodeScanner(async (code) => {
    await addToCart(code);
  });

  // Manual input submit
  const handleManualAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualSerial.trim()) return;
    await addToCart(manualSerial.trim());
    setManualSerial("");
  };

  // Remove item from cart
  const handleRemoveItem = (serial: string) => {
    setCart((prev) => prev.filter((item) => item.serialNumber !== serial));
  };

  // Totals calculation
  const { subtotal, taxAmount, grandTotal, dueAmount, returnAmount } =
    useMemo(() => {
      const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
      const taxAmount = ((subtotal - discount) * tax) / 100;
      const grandTotal = subtotal - discount + taxAmount;
      const dueAmount = Math.max(grandTotal - paidAmount, 0);
      const returnAmount = Math.max(paidAmount - grandTotal, 0);
      return { subtotal, taxAmount, grandTotal, dueAmount, returnAmount };
    }, [cart, discount, tax, paidAmount]);

  // Submit invoice
  const handleSubmitInvoice = async () => {
    const invoicePayload = {
      invoiceNo,
      customerName,
      items: cart,
      discount: Number(discount),
      tax: Number(tax),
      paidAmount: Number(paidAmount),
    };

    console.log("Sending Invoice Payload:", invoicePayload);
    // await createInvoice(invoicePayload) <-- your backend API call
  };

  return (
    <div className="text-black font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <TitleWrapper title="Create New Invoice" />

      {/* Invoice Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <Label htmlFor="invoiceNo">Invoice No</Label>
          <Input
            id="invoiceNo"
            value={invoiceNo}
            onChange={(e) => setInvoiceNo(e.target.value)}
            placeholder="Invoice No"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="customerName">Customer Name</Label>
          <Input
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Customer Name"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="discount">Discount</Label>
          <Input
            id="discount"
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            placeholder="Discount"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="tax">Tax (%)</Label>
          <Input
            id="tax"
            type="number"
            value={tax}
            onChange={(e) => setTax(Number(e.target.value))}
            placeholder="Tax"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="paidAmount">Paid Amount</Label>
          <Input
            id="paidAmount"
            type="number"
            value={paidAmount}
            onChange={(e) => setPaidAmount(Number(e.target.value))}
            placeholder="Paid Amount"
          />
        </div>
      </div>

      {/* Manual Serial Input */}
      <form onSubmit={handleManualAdd} className="flex gap-2 mb-6">
        <Input
          type="text"
          value={manualSerial}
          onChange={(e) => setManualSerial(e.target.value)}
          placeholder="Enter Serial Number"
        />
        <Button type="submit">Add</Button>
      </form>

      {/* Cart Table */}
      <Table>
        <TableCaption>Scanned/Added Products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Serial Number</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>{item.productName}</TableCell>
              <TableCell>{item.serialNumber}</TableCell>
              <TableCell className="text-right">
                ${item.price.toFixed(2)}
              </TableCell>
              <TableCell className="text-center">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveItem(item.serialNumber)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Subtotal</TableCell>
            <TableCell className="text-right">${subtotal.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3}>Discount</TableCell>
            <TableCell className="text-right">
              -${discount.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3}>Tax ({tax}%)</TableCell>
            <TableCell className="text-right">
              +${taxAmount.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} className="font-bold">
              Grand Total
            </TableCell>
            <TableCell className="text-right font-bold">
              ${grandTotal.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3}>Paid Amount</TableCell>
            <TableCell className="text-right">
              ${paidAmount.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3}>Due Amount</TableCell>
            <TableCell className="text-right">
              ${dueAmount.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3}>Return Amount</TableCell>
            <TableCell className="text-right text-green-600">
              ${returnAmount.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <div className="mt-6">
        <Button
          onClick={handleSubmitInvoice}
          className="bg-green-600 text-white"
        >
          Submit Invoice
        </Button>
      </div>
    </div>
  );
}
