import { createInvoice, getAllInvoice } from "@/services/invoice";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateInvoice = () => {
  return useMutation({
    mutationKey: ["create-invoice"],
    mutationFn: async (invoiceData: any) => await createInvoice(invoiceData),
  });
};

export const useGetAllInvoice = () => {
  return useQuery({
    queryKey: ["get-all-invoice"],
    queryFn: async () => await getAllInvoice(),
  });
};
