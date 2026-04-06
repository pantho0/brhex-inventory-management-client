"use server";

import axiosInstance from "@/lib/AxiosInstance";

export const returnProduct = async (returnData: any) => {
  try {
    const res = await axiosInstance.post("/return-product", returnData);
    if (!res.data.success) {
      throw new Error(res.data.message || "Error returning product");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Error returning product"
    );
  }
};

export const getAllReturns = async (query: Record<string, unknown> = {}) => {
  try {
    const res = await axiosInstance.get("/return-product", { params: query });
    if (!res.data.success) {
      throw new Error(res.data.message || "Error getting all returns");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Error getting all returns"
    );
  }
};
