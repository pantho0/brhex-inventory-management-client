import React from "react";

const GetAllInvByProductSerial = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = React.use(params);
  console.log(id);
  return <div>GetAllInvByProductSerial</div>;
};

export default GetAllInvByProductSerial;
