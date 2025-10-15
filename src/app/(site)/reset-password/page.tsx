"use client";

import CustomForm from "@/components/customform/CustomForm";
import CustomInput from "@/components/customform/CustomInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Logo from "../../../../public/images/logo.png";

import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useForgetPass } from "@/hooks/auth.hook";

const ForgetPasswordPage = () => {
  const { mutate: handleForgetPass } = useForgetPass();
  const router = useRouter();

  const handleSubmit: SubmitHandler<FieldValues> = (forgetPassInfo) => {
  
    const toastId = toast.loading("Sending reset link...");
    handleForgetPass(forgetPassInfo, {
      onSuccess: () => {
        router.push("/");
        toast.success(
          "Reset link sent to your email. Check inbox/spam folder please",
          {
            id: toastId,
            duration: 4000,
          }
        );
      },
      onError: (error) => {
        toast.error(error.message, {
          id: toastId,
          duration: 4000,
        });
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="flex flex-col justify-center gap-4 mb-5">
          <div className="flex justify-center">
            <Image src={Logo} alt="Logo" width={180} height={180} />
          </div>
          <h2 className="text-center text-white text-2xl">
            Inventory Management
          </h2>
        </div>
      <Card className="w-full max-w-md bg-transparent">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-white">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email below to receive a password reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CustomForm onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <CustomInput
                name="email"
                label="Email"
                type="email"
                placeholder="m@example.com"
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

export default ForgetPasswordPage;
