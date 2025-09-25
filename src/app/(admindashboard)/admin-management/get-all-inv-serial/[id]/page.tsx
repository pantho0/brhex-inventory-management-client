import TitleWrapper from "@/components/adminDashboard/TitleWrapper";
import React from "react";

const GetAllInvByProductSerial = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = React.use(params);
  console.log(id);
  return (
    <div className="text-black  font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <TitleWrapper title="Get Inventory By Serial" />
    </div>
  );
};

export default GetAllInvByProductSerial;
