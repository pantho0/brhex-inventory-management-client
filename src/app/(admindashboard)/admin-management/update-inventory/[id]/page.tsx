import React from "react";

function UpdateInventory({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  return <div>UpdateInventory {id}</div>;
}

export default UpdateInventory;
