import SalesSummaryCharts from "@/app/(admindashboard)/_components/sales_summary/SalesSummary";
import TitleWrapper from "@/components/adminDashboard/TitleWrapper";
import React from "react";


const SellerManagementPage = () => {
  return (
    <div className="text-black font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <TitleWrapper title="Seller Management" />
      <SalesSummaryCharts />
    </div>
  );
};

export default SellerManagementPage;
