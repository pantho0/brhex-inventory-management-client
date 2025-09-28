"use client";

import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSalesSummary } from "@/hooks/invoice.hook";
import { DollarSign, CheckCircle, AlertCircle } from "lucide-react"; // Importing icons

const SalesSummaryCharts = () => {
  const { mutate: handleSalesSummary, data: fetchedData } = useSalesSummary();

  const data = fetchedData?.data;

  useEffect(() => {
    handleSalesSummary({ periods: ["daily", "weekly", "monthly", "yearly"] });
  }, [handleSalesSummary]);

  if (!data) return <p className="text-center">Loading sales summary...</p>;

  // Helper to format numbers as currency
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value || 0);

  return (
    <div>
      {/* --- START: Summary Cards Section --- */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card className="rounded-2xl shadow-md bg-indigo-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(data.cumulativeTotals.totalSales)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total revenue generated
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-md bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(data.cumulativeTotals.totalPaid)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total amount received
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-md bg-orange-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Due</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(data.cumulativeTotals.totalDue)}
            </div>
            <p className="text-xs text-muted-foreground">
              Outstanding payments
            </p>
          </CardContent>
        </Card>
      </div>
      {/* --- END: Summary Cards Section --- */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Sales (Line Chart) */}
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">Daily Sales</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.summary.daily}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="periodLabel" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="totalSales"
                  stroke="#8884d8"
                  name="Total Sales"
                />
                <Line
                  type="monotone"
                  dataKey="totalPaid"
                  stroke="#82ca9d"
                  name="Total Paid"
                />
                <Line
                  type="monotone"
                  dataKey="totalDue"
                  stroke="#ff7300"
                  name="Total Due"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Sales (Bar Chart) */}
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">Weekly Sales</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.summary.weekly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="periodLabel" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalSales" fill="#8884d8" name="Total Sales" />
                <Bar dataKey="totalPaid" fill="#82ca9d" name="Total Paid" />
                <Bar dataKey="totalDue" fill="#ff7300" name="Total Due" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Sales (Line Chart) */}
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">Monthly Sales</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.summary.monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="periodLabel" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="totalSales"
                  stroke="#8884d8"
                  name="Total Sales"
                />
                <Line
                  type="monotone"
                  dataKey="totalPaid"
                  stroke="#82ca9d"
                  name="Total Paid"
                />
                <Line
                  type="monotone"
                  dataKey="totalDue"
                  stroke="#ff7300"
                  name="Total Due"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Yearly Sales (Bar Chart) */}
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">Yearly Sales</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.summary.yearly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="periodLabel" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalSales" fill="#8884d8" name="Total Sales" />
                <Bar dataKey="totalPaid" fill="#82ca9d" name="Total Paid" />
                <Bar dataKey="totalDue" fill="#ff7300" name="Total Due" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesSummaryCharts;
