import { addCategory, getAllCategory } from "@/services/Category";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getAllCategory(),
  });
};

export const useAddCategory = () => {
  return useMutation({
    mutationKey: ["category"],
    mutationFn: async (categoryData: any) => await addCategory(categoryData),
    onSuccess: () => {
      toast.success("Category added successfully", { duration: 2000 });
    },
    onError: () => {
      toast.error("Failed to add category", { duration: 2000 });
    },
  });
};
