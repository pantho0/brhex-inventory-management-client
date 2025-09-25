"use server";
import axiosInstance from "@/lib/AxiosInstance";

export const addInventoryItem = async (inventoryData: any) => {
  try {
    const res = await axiosInstance.post(
      "/inventory/add-inventory-item",
      inventoryData
    );
    if (!res.data.success) {
      throw new Error(res.data.message || "Error adding inventory item");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Error adding inventory item"
    );
  }
};
