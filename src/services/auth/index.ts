"use server";
import axiosInstance from "@/lib/AxiosInstance";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    if (data.success) {
      (await cookies()).set("accessToken", data.data?.accessToken);
      (await cookies()).set("refreshToken", data.data?.refreshToken);
    }

    if (!data.success) {
      throw new Error(data.message || "Error adding category");
    }

    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const logoutUser = async () => {
  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");
  // (await cookies()).set("next-auth.session-token", "");
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
  }

  return {
    userId: decodedToken?.userId,
    fullName: decodedToken?.fullName,
    role: decodedToken?.role,
    email: decodedToken?.email,
    iat: decodedToken?.iat,
    exp: decodedToken?.exp,
  };
};
