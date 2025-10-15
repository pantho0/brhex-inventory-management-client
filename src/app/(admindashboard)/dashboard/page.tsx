import TitleWrapper from "@/components/adminDashboard/TitleWrapper";
import React from "react";
import SalesSummaryCharts from "../_components/sales_summary/SalesSummary";


const DashboardPage = () => {
  return (
    <div className="text-black font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <TitleWrapper title="Dashboard" />
      <SalesSummaryCharts />
    </div>
  );
};

export default DashboardPage;
