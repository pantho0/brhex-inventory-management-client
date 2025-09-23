"use server";

import axiosInstance from "@/lib/AxiosInstance";

export const getAllUser = async () => {
  try {
    const response = await axiosInstance.get("/users");
    if (!response.data.success) {
      throw new Error(response.data.message || "Error fetching users");
    }
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Error fetching data"
    );
  }
};

export const getSingleUser = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message || "Error fetching user");
    }
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Error fetching data"
    );
  }
};

export const addUser = async (user: any) => {
  try {
    const response = await axiosInstance.post("/users", user);
    if (!response.data.success) {
      throw new Error(response.data.message || "Error adding user");
    }
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Error fetching data"
    );
  }
};

export const changeUserStatus = async (id: string) => {
  try {
    const response = await axiosInstance.patch(`/users/delete-user`, { id });
    if (!response.data.success) {
      throw new Error(response.data.message || "Error changing user status");
    }
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Error fetching data"
    );
  }
};

export const changeUserRole = async (userRoleInfo: any) => {
  try {
    const response = await axiosInstance.patch(
      `/users/change-role`,
      userRoleInfo
    );
    if (!response.data.success) {
      throw new Error(response.data.message || "Error changing user role");
    }
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Error fetching data"
    );
  }
};
