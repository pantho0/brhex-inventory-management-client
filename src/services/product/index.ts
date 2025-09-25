"use server";

import axiosInstance from "@/lib/AxiosInstance";

export const addProduct = async (productData: any) => {
  try {
    const res = await axiosInstance.post(
      "/product/create-product",
      productData
    );
    if (!res.data.success) {
      throw new Error(res.data.message || "Error adding product");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Error adding product"
    );
  }
};

export const getAllProduct = async () => {
  try {
    const res = await axiosInstance.get("/product");
    if (!res.data.success) {
      throw new Error(res.data.message || "Error fetching products");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Error fetching products"
    );
  }
};
