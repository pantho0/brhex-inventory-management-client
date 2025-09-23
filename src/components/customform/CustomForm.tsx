"use client";
import { ReactNode } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

interface IFormConfig {
  defaultValues?: Record<string, unknown>;
  resolver?: any;
}

interface CustomFormProps extends IFormConfig {
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
}

function CustomForm({
  children,
  onSubmit,
  defaultValues,
  resolver,
}: CustomFormProps) {
  const formConfig: IFormConfig = {};
  if (!!defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (!!resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);
  const handleSubmit = methods.handleSubmit;

  const submit: SubmitHandler<any> = (data: any) => {
    onSubmit(data);
    // methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
}

export default CustomForm;
