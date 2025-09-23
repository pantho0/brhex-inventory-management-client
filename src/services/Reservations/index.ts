"use server";
import axiosInstance from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

export const getAllReservations = async (query?: Record<string, unknown>) => {
  try {
    const res = await axiosInstance.get("/reservations/get-all-reservation", {
      params: query,
    });

    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Error fetching data"
    );
  }
};

export const updatReservationStatus = async (reservationData: any) => {
  try {
    const res = await axiosInstance.put(
      `/reservations/update-reservation/${reservationData.id}`,
      reservationData
    );
    if (!res.data.success) {
      throw new Error(res.data.message || "Error updating reservation status");
    }
    revalidateTag("reservation");
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Error fetching data"
    );
  }
};

export const createReservation = async (reservationData: any) => {
  try {
    const res = await axiosInstance.post(
      "/reservations/create-reservation",
      reservationData
    );
    if (!res.data.success) {
      throw new Error(res.data.message || "Error creating reservation");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Error fetching data"
    );
  }
};
