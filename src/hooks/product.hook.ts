import { addProduct, getAllProduct } from "@/services/product";
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
