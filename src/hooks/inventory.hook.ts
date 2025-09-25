import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addInventoryItem,
  getAllInventoryItems,
  getAllInventoryItemsByProductId,
  getInventoryItemBySerialNumber,
} from "../services/inventory";

export const useAddInventoryItem = () => {
  return useMutation({
    mutationKey: ["add-inventory-item"],
    mutationFn: (inventoryData: any) => addInventoryItem(inventoryData),
  });
};

export const useGetAllInventoryItems = () => {
  return useQuery({
    queryKey: ["get-all-inventory-items"],
    queryFn: () => getAllInventoryItems(),
  });
};

export const useGetAllInventoryItemsByProductId = (productId: string) => {
  return useQuery({
    queryKey: ["get-all-inventory-items-by-product-id"],
    queryFn: () => getAllInventoryItemsByProductId(productId),
  });
};

export const useGetInventoryItemBySerialNumber = (serialNumber: string) => {
  return useQuery({
    queryKey: ["get-inventory-item-by-serial-number"],
    queryFn: () => getInventoryItemBySerialNumber(serialNumber),
  });
};
