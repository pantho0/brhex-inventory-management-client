import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOrder,
  getAllOrders,
  updateOrder,
} from "../services/order-management";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-order"],
    mutationFn: (orderData: any) => createOrder(orderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-orders"] });
    },
  });
};

export const useGetAllOrders = () => {
  return useQuery({
    queryKey: ["get-all-orders"],
    queryFn: () => getAllOrders(),
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-order"],
    mutationFn: ({ id, orderData }: { id: string; orderData: any }) =>
      updateOrder(id, orderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-orders"] });
    },
  });
};
