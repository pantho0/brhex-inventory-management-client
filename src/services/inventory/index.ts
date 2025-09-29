"use server";
import axiosInstance from "@/lib/AxiosInstance";

export const addInventoryItem = async (inventoryData: any) => {
  try {
    const res = await axiosInstance.post(
      "/inventory/bulk-add-inventory-items",
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

export const getAllInventoryItems = async () => {
  try {
    const res = await axiosInstance.get("/inventory");
    if (!res.data.success) {
      throw new Error(res.data.message || "Error getting inventory items");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Error getting inventory items"
    );
  }
};

export const getAllInventoryItemsByProductId = async (productId: string) => {
  try {
    const res = await axiosInstance.get(`/inventory/product/${productId}`);

    if (!res.data.success) {
      throw new Error(res.data.message || "Error getting inventory items");
    }

    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Error getting inventory items"
    );
  }
};

export const getInventoryItemBySerialNumber = async (serialNumber: string) => {
  try {
    const res = await axiosInstance.get(`/inventory/${serialNumber}`);
    if (!res.data.success) {
      throw new Error(res.data.message || "Error getting inventory item");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Error getting inventory item"
    );
  }
};

export const updateInventoryItem = async (id: string, inventoryData: any) => {
  try {
    const res = await axiosInstance.put(
      `/inventory/update/${id}`,
      inventoryData
    );
    if (!res.data.success) {
      throw new Error(res.data.message || "Error updating inventory item");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Error updating inventory item"
    );
  }
};

export const viewInventory = async () => {
  try {
    const res = await axiosInstance.get("/inventory/show-inventory");
    if (!res.data.success) {
      throw new Error(res.data.message || "Error getting inventory items");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Error getting inventory items"
    );
  }
};
