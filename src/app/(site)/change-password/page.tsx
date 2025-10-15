"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomForm from "@/components/customform/CustomForm";
import CustomInput from "@/components/customform/CustomInput";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const PasswordResetContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [defaultValue, setDefaultValues] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  useEffect(() => {
    if (email) {
      setDefaultValues({ email: email });
      setLoading(false);
    }
  }, [searchParams, setLoading, loading, email]);

  const handleSubmit: SubmitHandler<FieldValues> = async (resetPassInfo) => {
    try {
      const toastId = toast.loading("Resetting password...");
      const res = await fetch(
        `http://localhost:5000/api/v1/auth/reset-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token as string,
          },
          body: JSON.stringify(resetPassInfo),
        }
      );
      const data = await res.json();

      if (res.status === 401) {
        toast.error("Invalid or expired request", {
          id: toastId,
        });
      }
      if (data.success) {
        toast.success("Password reset successfully", {
          id: toastId,
        });
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <p>Please wait</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email below to receive a password reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CustomForm onSubmit={handleSubmit} defaultValues={defaultValue}>
            <div className="grid gap-2">
              <CustomInput
                name="email"
                label="Your Email"
                type="email"
                placeholder="m@example.com"
                disabled={true}
              />
            </div>
            <div className="grid gap-2">
              <CustomInput
                name="newPassword"
                label="New Password"
                type="password"
                placeholder="Enter new password"
              />
            </div>
            <Button type="submit" className="w-full mt-5">
              Send Reset Link
            </Button>
          </CustomForm>
        </CardContent>
      </Card>
    </div>
  );
};

const PasswordResetPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading reset password form...</div>}>
      <PasswordResetContent />
    </Suspense>
  );
};

export default PasswordResetPage;
