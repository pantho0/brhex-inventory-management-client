"use client";
import React, { useState } from "react";
import TitleWrapper from "@/components/adminDashboard/TitleWrapper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllOrders, useUpdateOrder } from "@/hooks/order.hook";
import { toast } from "sonner";
import PaginationComponent from "../../_components/pagination/PaginationComponent";

function ViewAllOrdersPage() {
  const [query, setQuery] = useState<{ page: number } & Record<string, unknown>>({
    page: 1,
    limit: 10,
  });
  const { data: fetchedOrders, isPending } = useGetAllOrders(); // Assuming the backend supports pagination eventually, for now we fetch all
  const { mutate: handleUpdateOrder } = useUpdateOrder();

  // Assuming the backend returns data in a similar structure to invoices
  // If not, we adjust. Based on common patterns in this repo:
  const orders = fetchedOrders?.data?.result || fetchedOrders?.data || [];
  const meta = fetchedOrders?.data?.meta || {
    page: 1,
    limit: 10,
    totalPage: Math.ceil(orders.length / 10),
    total: orders.length,
  };

  const onStatusChange = (id: string, field: string, value: string) => {
    const toastId = toast.loading(`Updating ${field}...`);
    handleUpdateOrder(
      { id, orderData: { [field]: value } },
      {
        onSuccess: () => {
          toast.success(`${field} updated successfully`, { id: toastId });
        },
        onError: (error: any) => {
          toast.error(error.message || `Error updating ${field}`, { id: toastId });
        },
      }
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="text-black font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <TitleWrapper title="View All Orders" />

      {isPending ? (
        <div className="text-center py-10 text-lg font-semibold text-gray-600">
          Loading orders...
        </div>
      ) : !orders || orders.length === 0 ? (
        <div className="text-center py-10 text-gray-600">No orders found.</div>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <Table>
            <TableHeader className="bg-primary text-white">
              <TableRow>
                <TableHead className="text-white">Order Date</TableHead>
                <TableHead className="text-white">Serial No</TableHead>
                <TableHead className="text-white">Arabi Qty</TableHead>
                <TableHead className="text-white">Kuwaiti Qty</TableHead>
                <TableHead className="text-white">Balance</TableHead>
                <TableHead className="text-white">Delivery Date</TableHead>
                <TableHead className="text-white">Entry Status</TableHead>
                <TableHead className="text-white">Saver No</TableHead>
                <TableHead className="text-white">Delivery Status</TableHead>
                <TableHead className="text-white">Call Status</TableHead>
                <TableHead className="text-white">Note</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order: any) => (
                <TableRow key={order._id}>
                  <TableCell>{formatDate(order.orderDate)}</TableCell>
                  <TableCell className="font-medium">{order.serialNo}</TableCell>
                  <TableCell>{order.arabiQty}</TableCell>
                  <TableCell>{order.kuwaitiQty}</TableCell>
                  <TableCell>{order.balance}</TableCell>
                  <TableCell>{formatDate(order.deliveryDate)}</TableCell>

                  <TableCell>
                    <Select
                      defaultValue={order.entryStatus}
                      onValueChange={(value) => onStatusChange(order._id, "entryStatus", value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry</SelectItem>
                        <SelectItem value="delivery">Delivery</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell>{order.saverNo || "N/A"}</TableCell>

                  <TableCell>
                    <Select
                      defaultValue={order.deliveryStatus}
                      onValueChange={(value) => onStatusChange(order._id, "deliveryStatus", value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="delivery">Delivery</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell>
                    <Select
                      defaultValue={order.callStatus}
                      onValueChange={(value) => onStatusChange(order._id, "callStatus", value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="n/a">N/A</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell className="max-w-xs truncate" title={order.note}>
                    {order.note || "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4">
            <PaginationComponent meta={meta} query={query} setQuery={setQuery} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewAllOrdersPage;
