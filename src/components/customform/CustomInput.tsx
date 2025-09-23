"use client";
import { ReactNode } from "react";
import { Input } from "../ui/input";
import { Controller, useFormContext } from "react-hook-form";

interface CustomInputProps {
  type: string;
  name: string;
  placeholder: string;
  label: ReactNode;
  defaultValue?: string;
  disabled?: boolean;
  fontColor?: string;
}

function CustomInput({
  type,
  name,
  placeholder,
  label,
  defaultValue = "",
  disabled,
  fontColor = "text-black",
}: CustomInputProps) {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <>
            <label
              htmlFor={name}
              className={`block text-sm font-medium ${fontColor} mb-1 font-sans`}
            >
              {label}
            </label>

            <Input
              id={name}
              type={type}
              placeholder={placeholder}
              className="w-full"
              required
              {...field}
              disabled={disabled}
            />
            {errors[name] && (
              <p className="text-red-500 text-sm font-sans">
                {errors[name].message as string}
              </p>
            )}
          </>
        )}
      />
    </>
  );
}

export default CustomInput;
