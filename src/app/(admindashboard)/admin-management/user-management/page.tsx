"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useChangeUserStatus, useGetAllUser } from "@/hooks/user.hook";
import Link from "next/link";

const UserManagement = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useGetAllUser();
  const { mutate: changeUserStatus } = useChangeUserStatus();

  const users = data?.data;

  const changeDeleteStatus = (id: string) => {
    console.log(id);
    const toastId = toast.loading("Updating User Delete Status...");
    changeUserStatus(id, {
      onSuccess: () => {
        toast.success("User delete status updated", { id: toastId });
      },
      onError: () => {
        toast.error("Failed to change user delete status", { id: toastId });
      },
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">User Management</h1>
        <div className="hidden md:block">
          <div className="border rounded-md p-4">
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:hidden">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-10 text-center text-red-500">
        <h1 className="text-3xl font-bold mb-6">User Management</h1>
        <p>Failed to load users. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 text-black">
      <div className="border-l-8 border-primary pl-2 sm:pl-4">
        <h2 className="text-black font-bold text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">
          User Management
        </h2>
      </div>
      <div className="flex justify-end py-4 bg-green">
        <Link href="/admin-management/add-user">
          <Button className="bg-green-700 hover:bg-green-700/90 cursor-pointer">
            Create User
          </Button>
        </Link>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader
            className={`border-b transition-colors ${"bg-gray-200"} text-black`}
          >
            <TableRow>
              <TableHead className="text-black">Email</TableHead>
              <TableHead className="text-black">Role</TableHead>
              <TableHead className="text-black">Deleted</TableHead>
              <TableHead className="text-right text-black">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users && users.length > 0 ? (
              users?.map((user: any, index: any) => (
                <TableRow
                  key={user._id}
                  className={`border-b transition-colors hover:bg-muted/50 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>

                  <TableCell>
                    <Badge
                      className="text-white"
                      variant={user.isDeleted ? "destructive" : "secondary"}
                    >
                      {user.isDeleted ? "Deleted" : "Active"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => changeDeleteStatus(user._id)}
                        >
                          {user.isDeleted ? "Restore User" : "Delete User"}
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(
                              `/admin-management/change-role?userId=${user._id}`
                            )
                          }
                        >
                          Change Role
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {users?.map((user: any) => (
          <Card key={user._id}>
            <CardHeader>
              <CardTitle>{user.email}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <strong>Role:</strong> {user.role}
              </p>
              <p>
                <strong>Blocked:</strong>{" "}
                <Badge variant={user.isBlocked ? "destructive" : "outline"}>
                  {user.isBlocked ? "Blocked" : "Active"}
                </Badge>
              </p>
              <p>
                <strong>Deleted:</strong>{" "}
                <Badge variant={user.isDeleted ? "destructive" : "outline"}>
                  {user.isDeleted ? "Deleted" : "Active"}
                </Badge>
              </p>
              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => changeDeleteStatus(user._id)}
                >
                  {user.isDeleted ? "Restore User" : "Delete User"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    router.push(
                      `/admin-management/change-role?userId=${user._id}`
                    )
                  }
                >
                  Change Role
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
