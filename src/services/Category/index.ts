"use server";
import axiosInstance from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

export const getAllCategory = async () => {
  try {
    const res = await axiosInstance.get("/categories");

    if (!res.data.success) {
      throw new Error(res.data.message || "Error fetching categories");
    }

    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Error fetching data"
    );
  }
};

export const addCategory = async (categoryData: any) => {
  try {
    const res = await axiosInstance.post("/categories", categoryData);
    if (!res.data.success) {
      throw new Error(res.data.message || "Error adding category");
    }
    revalidateTag("categories");
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Error fetching data"
    );
  }
};
