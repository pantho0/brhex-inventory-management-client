import {
  addCategory,
  getAllCategory,
  getSingleCategory,
} from "@/services/Category";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getAllCategory(),
  });
};

export const useGetSingleCategory = (id: string) => {
  return useQuery({
    queryKey: ["category"],
    queryFn: async () => await getSingleCategory(id),
    enabled: !!id,
  });
};

export const useAddCategory = () => {
  return useMutation({
    mutationKey: ["category"],
    mutationFn: async (categoryData: any) => await addCategory(categoryData),
  });
};
