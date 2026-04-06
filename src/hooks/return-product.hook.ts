import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllReturns, returnProduct } from "@/services/return-product";

export const useReturnProduct = () => {
    const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["return-product"],
    mutationFn: async (returnData: any) => await returnProduct(returnData),
    onSuccess: () => {
        // Invalidate the cached returns list so it refetches
        queryClient.invalidateQueries({ queryKey: ["get-all-returns"] });
      },
  });
};

export const useGetAllReturns = (queryParams: Record<string, unknown> = {}, options?: any) => {
  return useQuery({
    queryKey: ["get-all-returns", queryParams],
    queryFn: () => getAllReturns(queryParams),
    ...options,
  });
};
