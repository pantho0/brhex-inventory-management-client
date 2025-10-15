"use client";
import CustomForm from "@/components/customform/CustomForm";
import CustomInput from "@/components/customform/CustomInput";
import { Button } from "@/components/ui/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useLogin } from "@/hooks/auth.hook";
import Logo from "../../../public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/context/user.provider";
import { useRouter } from "next/navigation";



const LoginPage = () => {
  const { mutate: handleLogin } = useLogin();
  const {user} = useUser()
  const router = useRouter()


  if(user?.role){
  router.push("/dashboard")
  }


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleLogin(data);
  };

  return (
    <div className="bg-black">
      <div className="container  max-w-6xl mx-auto h-screen flex items-center flex-col justify-center">
       <div className="border py-10 px-30 rounded-lg">
         <div className="flex flex-col justify-center gap-4 mb-5">
          <div className="flex justify-center">
            <Image src={Logo} alt="Logo" width={180} height={180} />
          </div>
          <h2 className="text-center text-white text-2xl">
            Inventory Management
          </h2>
        </div>
        <div className="flex flex-col gap-4 w-[400px] mx-auto ">
          <CustomForm onSubmit={onSubmit}>
            <div className="space-y-4">
              <div className="text-white">
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="User Email"
                  label="User Email"
                  fontColor="text-white"
                />
              </div>
              <div>
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="User Password"
                  label="User Password"
                  fontColor="text-white"
                />
              </div>


              <p className="text-right text-pretty">Forgot Password? <Link href="/reset-password" className="text-primary">Click Here</Link></p>

              <Button type="submit" className="mt-6 w-full cursor-pointer">
                Login
              </Button>
            </div>
          </CustomForm>
        </div>
       </div>
      </div>
    </div>
  );
};

export default LoginPage;
