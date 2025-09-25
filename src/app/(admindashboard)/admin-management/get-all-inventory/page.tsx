"use client";
import TitleWrapper from "@/components/adminDashboard/TitleWrapper";
import { useGetAllInventoryItems } from "@/hooks/inventory.hook";
import React from "react";

function ViewAllInventoryItems() {
  const { data } = useGetAllInventoryItems();
  const inventoryItems = data?.data;
  console.log(inventoryItems);
  return (
    <div className="text-black font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <TitleWrapper title="View All Inventory Items" />
    </div>
  );
}

export default ViewAllInventoryItems;
