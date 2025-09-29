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

export const getAllInvoice = async (query: Record<string, unknown>) => {
  try {
    const res = await axiosInstance.get("/invoice", { params: query });
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

export const getInvoiceById = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/invoice/${id}`);
    if (!res.data.success) {
      throw new Error(res.data.message || "Error getting invoice by id");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Error getting invoice by id"
    );
  }
};

export const salesSummary = async (periodsData: any) => {
  try {
    const res = await axiosInstance.post("/invoice/sales-summary", periodsData);
    if (!res.data.success) {
      throw new Error(res.data.message || "Error getting sales summary");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Error getting sales summary"
    );
  }
};

export const updatePayment = async (invoiceID: string, paymentData: any) => {
  try {
    const res = await axiosInstance.put(
      `/invoice/payment/${invoiceID}`,
      paymentData
    );
    if (!res.data.success) {
      throw new Error(res.data.message || "Error updating payment");
    }

    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Error updating payment"
    );
  }
};
