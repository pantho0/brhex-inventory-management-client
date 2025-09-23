import { addCategory, getAllCategory } from "@/services/Category";
import { useMutation, useQuery } from "@tanstack/react-query";

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
  });
};
