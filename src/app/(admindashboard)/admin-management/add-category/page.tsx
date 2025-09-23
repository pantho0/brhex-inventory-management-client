"use client";

import CustomForm from "@/components/customform/CustomForm";
import CustomInput from "@/components/customform/CustomInput";
import { Button } from "@/components/ui/button";
import { useAddCategory } from "@/hooks/category.hook";
import { useRouter } from "next/navigation";

function AddCategoryPage() {
  const { mutate: handleAddCategory, isPending, isSuccess } = useAddCategory();
  const router = useRouter();
  const onSubmit = (data: any) => {
    const catName = data.catName.toLowerCase();
    handleAddCategory({ catName });
    if (isSuccess) {
      router.push("/admin-management/all-items");
    }
  };
  return (
    <div className="text-black font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <div className="border-l-8 border-primary pl-2 sm:pl-4">
        <h2 className="text-black font-bold text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">
          Add New Menu Category
        </h2>
      </div>
      <div className="">
        <CustomForm onSubmit={onSubmit}>
          <div className="flex flex-col gap-4">
            <CustomInput
              type="text"
              name="catName"
              placeholder="Category Name"
              label="Category Name"
            />
            <Button
              type="submit"
              className="bg-green-700 hover:bg-green-700/90 cursor-pointer"
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
