"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { saveAs } from "file-saver";
import { useSalesSummary } from "@/hooks/invoice.hook";
import { Skeleton } from "@/components/ui/skeleton";

// --- Utility: CSV Export ---
const exportToCSV = (data: any[], totalSummary: any, fileName: string) => {
  const headers = ["Date", "Total Paid", "Total Due", "Total Sales", "Invoices"];
  const rows = data.map((item) => [
    item.periodLabel,
    item.totalPaid,
    item.totalDue,
    item.totalSales,
    item.invoices,
  ]);

  // Add total summary row
  rows.push([
    "Total Summary",
    totalSummary.totalPaid,
    totalSummary.totalDue,
    totalSummary.totalSales,
    totalSummary.invoices,
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

  const blob = new Blob([decodeURIComponent(encodeURI(csvContent))], {
    type: "text/csv;charset=utf-8;",
  });
  saveAs(blob, `${fileName}.csv`);
};

export default function SalesStatementPage() {
  const { mutate: handleSalesSummary, data: fetchedData } = useSalesSummary();
  const [loading, setLoading] = useState(true);

  const companyName = "Brother's Computer & Communication";
  const currentYear = new Date().getFullYear();
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // --- Fetch Data using the same hook as SalesSummaryCharts ---
  useEffect(() => {
    handleSalesSummary({ periods: ["daily", "weekly", "monthly", "yearly"] });
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [handleSalesSummary]);

  const salesData = fetchedData?.data;

  // --- Filter Data Based on Month & Year ---
  const filteredData = useMemo(() => {
    if (!salesData?.summary?.daily) return [];
    return salesData.summary.daily.filter((d: any) => {
      const date = new Date(d.periodLabel);
      return (
        date.getMonth() === selectedMonth && date.getFullYear() === selectedYear
      );
    });
  }, [salesData, selectedMonth, selectedYear]);

  // --- Compute Total Summary ---
  const totalSummary = useMemo(() => {
    const totalPaid = filteredData.reduce((sum: any, d: any) => sum + d.totalPaid, 0);
    const totalDue = filteredData.reduce((sum: any, d: any) => sum + d.totalDue, 0);
    const totalSales = filteredData.reduce((sum: any, d: any) => sum + d.totalSales, 0);
    const invoices = filteredData.reduce((sum: any, d: any) => sum + d.invoices, 0);
    return { totalPaid, totalDue, totalSales, invoices };
  }, [filteredData]);

  // --- Skeleton Loader ---
  if (loading) {
    return (
      <Card className="p-6 shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-64 mb-2" />
          </CardTitle>
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-36" />
          </div>
          <div className="space-y-2">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-full rounded-md" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="p-6 shadow-md border border-gray-200">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle className="text-xl font-bold">{companyName}</CardTitle>
          <p className="text-gray-500 text-sm">
            Sales Report for {months[selectedMonth]} {selectedYear}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div>
            <Label className="text-sm">Month</Label>
            <Select
              value={selectedMonth.toString()}
              onValueChange={(v) => setSelectedMonth(parseInt(v))}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((m, i) => (
                  <SelectItem key={i} value={i.toString()}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm">Year</Label>
            <Select
              value={selectedYear.toString()}
              onValueChange={(v) => setSelectedYear(parseInt(v))}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {[currentYear - 1, currentYear, currentYear + 1].map((y) => (
                  <SelectItem key={y} value={y.toString()}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="default"
            className="mt-[16px]"
            onClick={() =>
              exportToCSV(
                filteredData,
                totalSummary,
                `Daily_Sales_Report_${months[selectedMonth]}_${selectedYear}`
              )
            }
          >
            Export as CSV
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-600 text-white">
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Total Paid</TableHead>
              <TableHead className="text-right">Total Due</TableHead>
              <TableHead className="text-right">Total Sales</TableHead>
              <TableHead className="text-right">Invoices</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{item.periodLabel}</TableCell>
                <TableCell className="text-right">
                  {item.totalPaid.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {item.totalDue.toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {item.totalSales.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">{item.invoices}</TableCell>
              </TableRow>
            ))}

            {/* Summary Row */}
            <TableRow className="font-semibold bg-gray-100">
              <TableCell>Total Summary</TableCell>
              <TableCell className="text-right">
                {totalSummary.totalPaid.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                {totalSummary.totalDue.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                {totalSummary.totalSales.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                {totalSummary.invoices}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
