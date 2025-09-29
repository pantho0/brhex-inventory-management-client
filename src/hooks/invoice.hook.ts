import {
  createInvoice,
  getAllInvoice,
  getInvoiceById,
  salesSummary,
} from "@/services/invoice";
import { useMutation } from "@tanstack/react-query";

export const useCreateInvoice = () => {
  return useMutation({
    mutationKey: ["create-invoice"],
    mutationFn: async (invoiceData: any) => await createInvoice(invoiceData),
  });
};

export const useGetAllInvoice = () => {
  return useMutation({
    mutationKey: ["get-all-invoice"],
    mutationFn: async (query: Record<string, unknown>) =>
      await getAllInvoice(query),
  });
};

export const useGetInvoiceById = () => {
  return useMutation({
    mutationKey: ["get-invoice-by-id"],
    mutationFn: async (id: string) => await getInvoiceById(id),
  });
};

export const useSalesSummary = () => {
  return useMutation({
    mutationKey: ["sales-summary"],
    mutationFn: async (periodsData: any) => await salesSummary(periodsData),
  });
};
