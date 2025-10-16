import {
  createInvoice,
  getAllInvoice,
  getInvoiceById,
  incomeStatement,
  salesSummary,
  updatePayment,
} from "@/services/invoice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateInvoice = () => {
  return useMutation({
    mutationKey: ["create-invoice"],
    mutationFn: async (invoiceData: any) => await createInvoice(invoiceData),
  });
};

export const useGetAllInvoice = (queryParams: Record<string, unknown> = {},  options?: any) => {
  return useQuery({
    queryKey: ["get-all-invoice", queryParams], // query key includes params
    queryFn: () => getAllInvoice(queryParams),
    ...options,
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

export const useIncomeStatement = () => {
  return useMutation({
    mutationKey: ["income-statement"],
    mutationFn: async (periodsData: any) => await incomeStatement(periodsData),
  });
};

export const useUpdatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      invoiceID,
      paymentData,
    }: {
      invoiceID: string;
      paymentData: any;
    }) => updatePayment(invoiceID, paymentData),
    onSuccess: () => {
      // Invalidate the cached invoice list so it refetches
      queryClient.invalidateQueries({ queryKey: ["get-all-invoice"] });
    },
  });
};
