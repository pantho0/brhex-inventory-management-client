import {
  addProduct,
  getAllProduct,
  getProductById,
  updateProduct,
} from "@/services/product";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAddProduct = () => {
  return useMutation({
    mutationKey: ["add_product"],
    mutationFn: async (productData: any) => await addProduct(productData),
  });
};

export const useGetAllProduct = () => {
  return useQuery({
    queryKey: ["get_all_product"],
    queryFn: async () => await getAllProduct(),
  });
};

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ["get_product_by_id"],
    queryFn: async () => await getProductById(id),
  });
};

export const useUpdateProduct = () => {
  return useMutation({
    mutationKey: ["update_product"],
    mutationFn: async ({ id, productData }: any) =>
      await updateProduct(id, productData),
  });
};
