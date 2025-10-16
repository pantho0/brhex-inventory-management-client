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
import { Skeleton } from "@/components/ui/skeleton";
import { saveAs } from "file-saver";
import { useIncomeStatement } from "@/hooks/invoice.hook";

// --- CSV Export Utility ---
const exportToCSV = (data: any[], totalSummary: any, fileName: string) => {
  const headers = ["Date / Period", "Total Purchased", "Profit", "Invoices"];
  const rows = data.map((item) => [
    item.periodLabel,
    item.totalPurchasedPrice.toLocaleString(),
    item.profit.toLocaleString(),
    item.invoices,
  ]);

  rows.push([
    "Total Summary",
    totalSummary.totalPurchasedPrice.toLocaleString(),
    totalSummary.profit.toLocaleString(),
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
  const { mutate: fetchIncomeStatement, data: fetchedData } = useIncomeStatement();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"daily" | "weekly" | "monthly" | "yearly">("daily");

  const companyName = "Brother's Computer & Communication";

  useEffect(() => {
    fetchIncomeStatement({ periods: ["daily", "weekly", "monthly", "yearly"] });
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [fetchIncomeStatement]);

  const statementData = useMemo(() => fetchedData?.data?.summary || {}, [fetchedData]);
 

  // --- Data for the active tab ---
  const filteredData = useMemo(() => statementData[activeTab] || [], [statementData, activeTab]);

  // --- Totals for current tab ---
  const totalSummary = useMemo(() => {
    const totalPurchasedPrice = filteredData.reduce((sum: any, d: any) => sum + d.totalPurchasedPrice, 0);
    const profit = filteredData.reduce((sum: any, d: any) => sum + d.profit, 0);
    const invoices = filteredData.reduce((sum: any, d: any) => sum + d.invoices, 0);
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
          <p className="text-gray-500 text-sm">Income Statement</p>
        </div>

        <Button
          variant="default"
          className="mt-2 sm:mt-0"
          onClick={() =>
            exportToCSV(filteredData, totalSummary, `Income_Statement_${activeTab}`)
          }
        >
          Export as CSV
        </Button>
      </CardHeader>

      {/* Tabs */}
      <div className="flex gap-4 mt-4">
        {["daily", "weekly", "monthly", "yearly"].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "secondary"}
            onClick={() => setActiveTab(tab as any)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </div>

      <CardContent className="mt-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary text-white">
              <TableHead>{activeTab === "daily" ? "Date" : activeTab === "weekly" ? "Week" : activeTab === "monthly" ? "Month" : "Year"}</TableHead>
              <TableHead className="text-right">Total Purchased</TableHead>
              <TableHead className="text-right">Profit</TableHead>
              <TableHead className="text-right">Invoices</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500">
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item: any, index: any) => (
                <TableRow key={index}>
                  <TableCell>{item.periodLabel || "N/A"}</TableCell>
                  <TableCell className="text-right">{item.totalPurchasedPrice.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{item.profit.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{item.invoices}</TableCell>
                </TableRow>
              ))
            )}

            {/* Total Summary Row */}
            <TableRow className="font-semibold bg-gray-100">
              <TableCell>Total Summary</TableCell>
              <TableCell className="text-right">{totalSummary.totalPurchasedPrice.toLocaleString()}</TableCell>
              <TableCell className="text-right">{totalSummary.profit.toLocaleString()}</TableCell>
              <TableCell className="text-right">{totalSummary.invoices}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
