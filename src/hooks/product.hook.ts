import { addProduct } from "@/services/product";
import { useMutation } from "@tanstack/react-query";

export const useAddProduct = () => {
  return useMutation({
    mutationKey: ["add_product"],
    mutationFn: async (productData: any) => await addProduct(productData),
  });
};
