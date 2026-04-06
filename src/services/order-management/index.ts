"use server";
import axiosInstance from "@/lib/AxiosInstance";

export const createOrder = async (orderData: any) => {
  try {
    const res = await axiosInstance.post(
      "/order-management/create-order",
      orderData
    );
    if (!res.data.success) {
      throw new Error(res.data.message || "Error creating order");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Error creating order"
    );
  }
};

export const getAllOrders = async () => {
  try {
    const res = await axiosInstance.get("/order-management");
    if (!res.data.success) {
      throw new Error(res.data.message || "Error getting orders");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Error getting orders"
    );
  }
};

export const updateOrder = async (id: string, orderData: any) => {
  try {
    const res = await axiosInstance.patch(
      `/order-management/${id}`,
      orderData
    );
    if (!res.data.success) {
      throw new Error(res.data.message || "Error updating order");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Error updating order"
    );
  }
};
