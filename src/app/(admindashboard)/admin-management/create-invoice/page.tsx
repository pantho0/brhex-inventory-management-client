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
import { useCreateInvoice } from "@/hooks/invoice.hook";
import { toast } from "sonner";
import { generateInvoiceNo } from "@/utils/helperFunctions";

export default function CreateInvoice() {
  const [cart, setCart] = useState<any[]>([]);
  const [manualSerial, setManualSerial] = useState("");

  const { mutate: createInvoice } = useCreateInvoice();

  const invoiceNo = generateInvoiceNo("BCC").toString().toUpperCase();

  // Invoice fields
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);

  // Add product to cart
  const addToCart = async (code: string) => {
    try {
      const toastId = toast.loading("Adding Product...");
      const res = await getInventoryItemBySerialNumber(code);

      if (res?.success && res?.data) {
        const product = res.data;

        if (product.status !== "in_stock") {
          toast.error(`Serial ${product.serialNumber} is not in stock`, {
            id: toastId,
          });
          return;
        }

        setCart((prev) => {
          if (prev.find((item) => item.serialNumber === product.serialNumber)) {
            toast.error(`Serial ${product.serialNumber} already in cart`, {
              id: toastId,
            });
            return prev;
          }
          toast.success("Product added to cart", { id: toastId });
          return [
            ...prev,
            {
              productId: product.product._id,
              productName: product.product.name,
              serialNumber: product.serialNumber,
              warranty: product.warranty,
              purchased_price: product.purchased_price,
              price: product.price,
              totalMeters: product.totalMeters,
              remainingMeters: product.remainingMeters,
              saleMeters: product.totalMeters !== undefined ? 0 : undefined,
            },
          ];
        });
      } else {
        toast.error(`Product ${code} not found`, { id: toastId });
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

  // Handle sale meters change
  const handleSaleMeterChange = (serial: string, value: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.serialNumber === serial ? { ...item, saleMeters: value } : item
      )
    );
  };

  // Totals calculation
  const { subtotal, taxAmount, grandTotal, dueAmount, returnAmount } =
    useMemo(() => {
      const subtotal = cart.reduce((acc, item) => {
        const itemTotal =
          item.totalMeters !== undefined
            ? item.price * (item.saleMeters || 0)
            : item.price;
        return acc + itemTotal;
      }, 0);
      const taxAmount = ((subtotal - discount) * tax) / 100;
      const grandTotal = subtotal - discount + taxAmount;
      const dueAmount = Math.max(grandTotal - paidAmount, 0);
      const returnAmount = Math.max(paidAmount - grandTotal, 0);
      return { subtotal, taxAmount, grandTotal, dueAmount, returnAmount };
    }, [cart, discount, tax, paidAmount]);

  // Submit invoice
  const handleSubmitInvoice = async () => {
    const toastId = toast.loading("Creating Invoice...");
    const invoicePayload = {
      invoiceNo,
      customerName,
      address,
      mobile,
      items: cart,
      discount: Number(discount),
      tax: Number(tax),
      paidAmount: Number(paidAmount),
    };

    createInvoice(invoicePayload, {
      onSuccess: () => {
        toast.success("Invoice created successfully", { id: toastId });
        setCart([]);
        setCustomerName("");
        setAddress("");
        setMobile("");
        setDiscount(0);
        setTax(0);
        setPaidAmount(0);
      },
      onError: (error) => {
        toast.error(error?.message || "Failed to create invoice", {
          id: toastId,
        });
      },
    });
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
            disabled
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
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="mobile">Mobile</Label>
          <Input
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Mobile"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="discount">Discount</Label>
          <Input
            id="discount"
            type="number"
            value={discount}
            onWheel={(e) => e.currentTarget.blur()}
            onChange={(e) => setDiscount(Number(e.target.value))}
            placeholder="Discount"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="tax">Tax (%)</Label>
          <Input
            id="tax"
            type="number"
            onWheel={(e) => e.currentTarget.blur()}
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
            onWheel={(e) => e.currentTarget.blur()}
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
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white">Product Name</TableHead>
            <TableHead className="text-white">Serial Number</TableHead>
            <TableHead className="text-white">Total Meter</TableHead>
            <TableHead className="text-white">Remaining Meter</TableHead>
            <TableHead className="text-white">Unit Price</TableHead>
            <TableHead className="text-white">Sale Meter</TableHead>
            <TableHead className="text-right text-white">Price</TableHead>
            <TableHead className="text-center text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>{item.productName}</TableCell>
              <TableCell>{item.serialNumber}</TableCell>
              <TableCell>{item.totalMeters ?? "N/A"}</TableCell>
              <TableCell>{item.remainingMeters ?? "N/A"}</TableCell>
              <TableCell>৳{item.price.toFixed(2)}</TableCell>
              <TableCell>
                {item.totalMeters !== undefined ? (
                  <Input
                    type="number"
                    min={0}
                    max={item.remainingMeters}
                    value={item.saleMeters}
                    onChange={(e) =>
                      handleSaleMeterChange(
                        item.serialNumber,
                        Number(e.target.value)
                      )
                    }
                    className="w-20"
                  />
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell className="text-right">
                ৳
                {(item.totalMeters !== undefined
                  ? item.price * (item.saleMeters || 0)
                  : item.price
                ).toFixed(2)}
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
            <TableCell colSpan={6}>Subtotal</TableCell>
            <TableCell className="text-right">৳{subtotal.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={6}>Discount</TableCell>
            <TableCell className="text-right">
              -৳{discount.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={6}>Tax ({tax}%)</TableCell>
            <TableCell className="text-right">
              +৳{taxAmount.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={6} className="font-bold">
              Grand Total
            </TableCell>
            <TableCell className="text-right font-bold">
              ৳{grandTotal.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={6}>Paid Amount</TableCell>
            <TableCell className="text-right">
              ৳{paidAmount.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={6}>Due Amount</TableCell>
            <TableCell className="text-right">
              ৳{dueAmount.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={6}>Return Amount</TableCell>
            <TableCell className="text-right text-green-600">
              ৳{returnAmount.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <div className="mt-6 flex justify-center">
        <Button
          onClick={handleSubmitInvoice}
          className="bg-primary cursor-pointer text-white"
        >
          Submit Invoice
        </Button>
      </div>
    </div>
  );
}
