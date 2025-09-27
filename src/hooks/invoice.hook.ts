import {
  createInvoice,
  getAllInvoice,
  getInvoiceById,
} from "@/services/invoice";
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

export const useGetInvoiceById = (id: string) => {
  return useQuery({
    queryKey: ["get-invoice-by-id"],
    queryFn: async () => await getInvoiceById(id),
    enabled: !!id,
  });
};
