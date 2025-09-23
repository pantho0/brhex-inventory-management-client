import React from "react";

function TitleWrapper({ title }: { title: string }) {
  return (
    <div className="border-l-8 border-primary pl-2 sm:pl-4">
      <h2 className="text-black font-bold text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">
        {title}
      </h2>
    </div>
  );
}

export default TitleWrapper;
