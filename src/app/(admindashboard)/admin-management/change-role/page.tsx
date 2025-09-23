"use client"; // This directive is correctly placed

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, Suspense, useEffect } from "react"; // Import Suspense and useEffect
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useChangeUserRole, useGetSingleUser } from "@/hooks/user.hook";

const ChangeRoleContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("userId");

  const router = useRouter();
  const { mutate: changeRole } = useChangeUserRole();

  const { data, isLoading, isError } = useGetSingleUser(id as string);
  const [selectedRole, setSelectedRole] = useState("");
  const userInfo = data?.data;

  useEffect(() => {
    if (userInfo && userInfo.role && selectedRole === "") {
      setSelectedRole(userInfo.role);
    }
  }, [userInfo, selectedRole]);

  if (!id) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>User ID not found in URL.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => router.push("/admin-dashboard/user-management")}
            >
              Go to User Management
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
  };

  const handleUpdateRole = () => {
    const toastId = toast.loading("Changing User Role...");
    const userRoleInfo = {
      id: id,
      role: selectedRole,
    };

    changeRole(userRoleInfo, {
      onSuccess: () => {
        toast.success("User Role Updated Successfully", {
          id: toastId,
          duration: 2000,
        });
        router.push("/admin-management/user-management");
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to update user role.", {
          id: toastId,
        });
      },
    });
  };

  if (isLoading || !userInfo) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Skeleton className="h-4 w-1/4 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-10 w-full mt-4" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>Failed to load user information.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Change User Role</CardTitle>
            <CardDescription>
              Update the role for {userInfo?.fullName?.toUpperCase()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      First Name:
                    </p>
                    <p className="text-sm text-secondary dark:text-gray-400">
                      {userInfo?.fullName?.toUpperCase()}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email:
                    </p>
                    <p className="text-sm text-secondary dark:text-gray-400">
                      {userInfo.email}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Current Role:
                    </p>
                    <p className="text-sm text-secondary dark:text-gray-400">
                      {userInfo?.role?.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="role">Select New Role</label>
                <Select onValueChange={handleRoleChange} value={selectedRole}>
                  <SelectTrigger id="role" className="w-full">
                    <SelectValue
                      placeholder="Select a role"
                      className="w-full"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleUpdateRole}
                className="mt-4 bg-green-700 hover:bg-green-700/90 text-white"
                disabled={selectedRole === userInfo.role}
              >
                Update Role
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

const ChangeRole = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Skeleton className="h-4 w-1/4 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-10 w-full mt-4" />
              </div>
            </CardContent>
          </Card>
        </div>
      }
    >
      <ChangeRoleContent />
    </Suspense>
  );
};

export default ChangeRole;
