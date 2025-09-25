import { useMutation } from "@tanstack/react-query";
import { addInventoryItem } from "../services/inventory";

export const useAddInventoryItem = () => {
  return useMutation({
    mutationKey: ["add-inventory-item"],
    mutationFn: (inventoryData: any) => addInventoryItem(inventoryData),
  });
};
