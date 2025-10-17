"use client";

import React, { useEffect, useMemo, useState } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { saveAs } from "file-saver";
import { useIncomeStatement } from "@/hooks/invoice.hook";


// CSV Export
const exportToCSV = (data: any[], totalSummary: any, fileName: string) => {
  const headers = ["Date", "Total Purchased", "Profit", "Invoices"];
  const rows = data.map((item) => [
    item.periodLabel,
    item.totalPurchasedPrice,
    item.profit,
    item.invoices,
  ]);

  // Add total summary row
  rows.push([
    "Total Summary",
    totalSummary.totalPurchasedPrice,
    totalSummary.profit,
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

export default function IncomeStatementPage() {
  const { mutate: handleIncomeSummary, data: fetchedData } = useIncomeStatement();
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

  useEffect(() => {
    handleIncomeSummary({ periods: ["daily", "weekly", "monthly", "yearly"] });
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [handleIncomeSummary]);

  const incomeData = fetchedData?.data;

  const filteredData = useMemo(() => {
    if (!incomeData?.summary?.daily) return [];
    return incomeData.summary.daily.filter((d: any) => {
      const date = new Date(d.periodLabel);
      return (
        date.getMonth() === selectedMonth && date.getFullYear() === selectedYear
      );
    });
  }, [incomeData, selectedMonth, selectedYear]);

  const totalSummary = useMemo(() => {
    const totalPurchasedPrice = filteredData.reduce(
      (sum: any, d: any) => sum + d.totalPurchasedPrice,
      0
    );
    const profit = filteredData.reduce((sum: any, d: any) => sum + d.profit, 0);
    const invoices = filteredData.reduce(
      (sum: any, d: any) => sum + d.invoices,
      0
    );
    return { totalPurchasedPrice, profit, invoices };
  }, [filteredData]);

  if (loading) {
    return (
      <Card className="p-6 shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-64 mb-2 bg-primary" />
          </CardTitle>
          <Skeleton className="h-4 w-48 bg-primary" />
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Skeleton className="h-10 w-32 bg-primary" />
            <Skeleton className="h-10 w-24 bg-primary" />
            <Skeleton className="h-10 w-36 bg-primary" />
          </div>
          <div className="space-y-2">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-full rounded-md bg-primary" />
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
            Income Report for {months[selectedMonth]} {selectedYear}
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
                `Daily_Income_Report_${months[selectedMonth]}_${selectedYear}`
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
            <TableRow className="bg-primary text-white">
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Total Purchased</TableHead>
              <TableHead className="text-right">Profit</TableHead>
              <TableHead className="text-right">Invoices</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{item.periodLabel}</TableCell>
                <TableCell className="text-right">
                  {item.totalPurchasedPrice.toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {item.profit.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">{item.invoices}</TableCell>
              </TableRow>
            ))}

            <TableRow className="font-semibold bg-gray-100">
              <TableCell>Total Summary</TableCell>
              <TableCell className="text-right">
                {totalSummary.totalPurchasedPrice.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                {totalSummary.profit.toLocaleString()}
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
