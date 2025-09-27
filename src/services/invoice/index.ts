"use server";

import axiosInstance from "@/lib/AxiosInstance";

export const createInvoice = async (invoiceData: any) => {
  try {
    const res = await axiosInstance.post(
      "/invoice/create-invoice",
      invoiceData
    );
    if (!res.data.success) {
      throw new Error(res.data.message || "Error creating invoice");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Error creating invoice"
    );
  }
};

export const getAllInvoice = async () => {
  try {
    const res = await axiosInstance.get("/invoice");
    if (!res.data.success) {
      throw new Error(res.data.message || "Error getting all invoice");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Error getting all invoice"
    );
  }
};
