"use client";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormItem, FormLabel, FormMessage } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface OptionType {
  value: string;
  label: string;
}

interface CustomSelectProps {
  name: string;
  label: string;
  options?: OptionType[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

function CustomSelect({
  name,
  label,
  options = [],
  defaultValue,
  onValueChange,
  disabled,
}: CustomSelectProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormItem>
      <FormLabel className="font-sans">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value);
              if (onValueChange) {
                onValueChange(value);
              }
            }}
            defaultValue={defaultValue}
            disabled={disabled}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={`Select a ${label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="font-sans text-black">
                  {label}
                </SelectLabel>
                {options.length > 0 ? (
                  options.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      disabled={option.value === "__placeholder__"}
                    >
                      {option.label}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="__placeholder__" disabled>
                    No options available
                  </SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm font-sans">
          {errors[name].message as string}
        </p>
      )}
      <FormMessage />
    </FormItem>
  );
}

export default CustomSelect;
