"use server";

import axiosInstance from "@/lib/AxiosInstance";


export const getAllUser = async () => {
  try {
    const response = await axiosInstance.get("/user");
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
    const response = await axiosInstance.get(`/user/${id}`);
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
    const response = await axiosInstance.post("/user/create-user", user);
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
    const response = await axiosInstance.put(`/user/delete-user`, { id });
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


export const changeUserBlockStatus = async (id: string) => {
  try {
    const response = await axiosInstance.put(`/user/block-user`, { id });
    if (!response.data.success) {
      throw new Error(response.data.message || "Error changing user block status");
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
    const response = await axiosInstance.put(
      `/user/change-role`,
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
