"use client";

import TitleWrapper from "@/components/adminDashboard/TitleWrapper";
import CustomForm from "@/components/customform/CustomForm";
import CustomInput from "@/components/customform/CustomInput";
import { Button } from "@/components/ui/button";
import { useAddCategory } from "@/hooks/category.hook";
import { toast } from "sonner";

function AddCategoryPage() {
  const { mutate: handleAddCategory, isPending } = useAddCategory();

  const onSubmit = (data: any) => {
    const toastID = toast.loading("Adding category...");
    handleAddCategory(data, {
      onSuccess: () => {
        toast.success("Category added successfully", {
          id: toastID,
          duration: 2000,
        });
      },
      onError: () => {
        toast.error("Failed to add category", { id: toastID, duration: 2000 });
      },
    });
  };
  return (
    <div className="text-black font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <TitleWrapper title="Add New Product Category" />
      <div className="">
        <CustomForm onSubmit={onSubmit}>
          <div className="flex flex-col gap-4">
            <CustomInput
              type="text"
              name="name"
              placeholder="Category Name"
              label="Category Name"
            />
            <Button
              type="submit"
              className="bg-primary cursor-pointer"
              disabled={isPending}
            >
              Add Category
            </Button>
          </div>
        </CustomForm>
      </div>
    </div>
  );
}

export default AddCategoryPage;
