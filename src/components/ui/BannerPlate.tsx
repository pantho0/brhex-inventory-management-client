import React from "react";
import Image from "next/image";
import heroImg from "../../../public/images/hero-1.png";

const BannerPlate = () => {
  return (
    <div className="absolute top-1/2 mt-30 right-0 -translate-y-1/2 2xl:-translate-y-1/2">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 rounded-full -z-10 animate-pulse" />
        <Image
          src={heroImg}
          alt="hero"
          width={400}
          height={400}
          sizes="(max-width: 1024px) 0px, 500px"
          className="custom-animation relative z-0 h-auto w-[400px] lg:w-[400px] xl:w-[400px] 2xl:w-[400px] select-none pointer-events-none"
        />
      </div>
    </div>
  );
};

export default BannerPlate;
