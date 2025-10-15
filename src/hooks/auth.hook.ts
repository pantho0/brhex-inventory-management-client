/* eslint-disable @typescript-eslint/no-unused-vars */
import { forgetPassword, loginUser, upDatePassword } from "@/services/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData: FieldValues) => await loginUser(userData),
    onSuccess: () => {
      window.location.href = "/dashboard";
      toast.success("User Logged In Successfully");
    },
    onError: (error: any) => {
      toast.error("Incorrect User Credentials");
    },
  });
};

export const useUpdatePassword = () =>{
  return useMutation({
    mutationKey:["USER_PASS_CHNG"],
    mutationFn:async(Credentials:any)=> upDatePassword(Credentials),
  })
}

export const useForgetPass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["FORGET_PASSWORD"],
    mutationFn: async (forgetPassInfo: FieldValues) =>
      await forgetPassword(forgetPassInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};