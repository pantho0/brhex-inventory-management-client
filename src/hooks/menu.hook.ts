import { IMenu } from "@/interface";
import {
  addMenuItem,
  deleteMenuItems,
  getDeletedMenu,
  getMenu,
  getSingleMenu,
  updateMenu,
} from "@/services/Menu";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetMenu = () => {
  return useMutation({
    mutationKey: ["menu"],
    mutationFn: async (query?: Record<string, unknown>) => getMenu(query),
  });
};

export const useGetSingleMenu = () => {
  return useMutation({
    mutationKey: ["menu"],
    mutationFn: async (id: string) => getSingleMenu(id),
  });
};

export const useUpdateMenu = () => {
  return useMutation({
    mutationKey: ["menu"],
    mutationFn: async (menuData: IMenu) => updateMenu(menuData),
    onSuccess: () => {
      toast.success("Menu item updated successfully", { duration: 2000 });
      window.location.replace("/admin-management/all-items");
    },
    onError: () => {
      toast.error("Failed to update menu item", { duration: 2000 });
    },
  });
};

export const useAddMenuItem = () => {
  return useMutation({
    mutationKey: ["menu"],
    mutationFn: async (menuData: IMenu) => addMenuItem(menuData),
    onSuccess: () => {
      toast.success("Menu item added successfully", { duration: 2000 });
    },
    onError: () => {
      toast.error("Failed to add menu item", { duration: 2000 });
    },
  });
};

export const useGetDeletedMenu = () => {
  return useQuery({
    queryKey: ["menu"],
    queryFn: async () => getDeletedMenu(),
  });
};

export const useDeleteMenu = () => {
  return useMutation({
    mutationKey: ["menu"],
    mutationFn: async (id: string) => deleteMenuItems(id),
  });
};
