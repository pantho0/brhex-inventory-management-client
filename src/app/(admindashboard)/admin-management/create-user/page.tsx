"use client";
import TitleWrapper from "@/components/adminDashboard/TitleWrapper";
import CustomForm from "@/components/customform/CustomForm";
import CustomInput from "@/components/customform/CustomInput";
import { Button } from "@/components/ui/button";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

function CreateUserPage() {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <div className="text-black font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <TitleWrapper title="Create User" />
      <div>
        <CustomForm onSubmit={onSubmit}>
          <div className="space-y-4">
            <div>
              <CustomInput
                type="text"
                name="firstName"
                placeholder="First Name"
                label="First Name"
              />
            </div>
            <div>
              <CustomInput
                type="text"
                name="lastName"
                placeholder="Last Name"
                label="Last Name"
              />
            </div>
            <div>
              <CustomInput
                type="email"
                name="email"
                placeholder="Email"
                label="Email"
              />
            </div>
            <div>
              <CustomInput
                type="password"
                name="password"
                placeholder="Password"
                label="Password"
              />
            </div>
          </div>
          <div className="flex justify-center mt-3 w-full">
            <Button size="lg" className="w-full cursor-pointer" type="submit">
              Create User
            </Button>
          </div>
        </CustomForm>
      </div>
    </div>
  );
}

export default CreateUserPage;
