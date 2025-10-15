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
    firstName: decodedToken?.firstName,
    lastName: decodedToken?.lastName,
    role: decodedToken?.role,
    email: decodedToken?.email,
    iat: decodedToken?.iat,
    exp: decodedToken?.exp,
  };
};

export async function clearAuthCookies() {
  (await cookies()).set("accessToken", "", { expires: new Date(0), path: "/" });
  (await cookies()).set("refreshToken", "", {
    expires: new Date(0),
    path: "/",
  });
}



export const upDatePassword = async (updatedCredentials: FieldValues) => {
  try {
    const { data } = await axiosInstance.put(
      "/auth/change-password",
      updatedCredentials
    );
    if (!data.success) {
      throw new Error(
        data.errorSources?.[0].messsage || "Password update failed"
      );
    }
    await clearAuthCookies();
    return data;
  } catch (error: any) {
    console.error("Password update error:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "An error occurred during password update"
    );
  }
};


export const forgetPassword = async (forgetPassInfo: FieldValues) => {
  try {
    const res = await axiosInstance.post(
      "/auth/forget-password",
      forgetPassInfo
    );
    if (!res.data.success) {
      throw new Error(
        res.data.message || "Failed to create forget password request to server"
      );
    }
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.message || "Failed to create forget password request to server"
    );
  }
};




