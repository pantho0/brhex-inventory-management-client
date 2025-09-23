import {
  addUser,
  changeUserRole,
  changeUserStatus,
  getAllUser,
  getSingleUser,
} from "@/services/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllUser = () => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: getAllUser,
  });
  return query;
};

export const useGetSingleUser = (id: string) => {
  const query = useQuery({
    queryKey: ["user", id],
    queryFn: () => getSingleUser(id),
  });
  return query;
};

export const useAddUser = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["add-user"],
    mutationFn: (user: any) => addUser(user),
  });
};

export const useChangeUserStatus = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["change-user-status"],
    mutationFn: (id: string) => changeUserStatus(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
};

export const useChangeUserRole = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationKey: ["change-user-role"],
    mutationFn: (userRoleInfo: any) => changeUserRole(userRoleInfo),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
};
