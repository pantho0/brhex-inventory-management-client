"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import heroImg from "../../../../public/images/hero-1.png";

import { useLocale, useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import BannerPlate from "@/components/ui/BannerPlate";
import Link from "next/link";

const Banner = () => {
  const t = useTranslations("Homepage");
  const locale = useLocale();

  useGSAP(() => {
    // Initial fade in
    gsap.fromTo(
      ".custom-animation",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      }
    );

    // Continuous rotation
    gsap.to(".custom-animation", {
      rotation: 360,
      duration: 20,
      ease: "linear",
      repeat: -1,
      transformOrigin: "center",
    });

    // Initial fade in
    gsap.fromTo(
      ".title-animation",
      { y: -150 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        delay: 0.2,
        ease: "power1.out",
      }
    );

    // Initial fade in
    gsap.fromTo(
      ".desc-animation",
      { y: 150 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        ease: "power1.out",
      }
    );
  }, []);

  return (
    <section className="w-full text-white min-h-[calc(100vh-80px)] flex items-center relative banner-section">
      <div className="container mx-auto max-w-6xl px-4 lg:px-8 py-10 relative">
        <div className="flex flex-col justify-center space-y-6 mt-40">
          <div>
            <h2
              className={`font-elsie w-full md:w-[90%] z-50 title-animation text-primary ${
                locale === "fr"
                  ? "md:text-7xl md:text-center lg:text-left text-[28px] text-center"
                  : "md:text-8xl md:text-center lg:text-left text-4xl text-center"
              }`}
            >
              {t("BannerTitle")}
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row items-center space-y-6 md:space-y-0">
            <div className="mr-4 hidden md:hidden lg:block h-2 w-26 bg-primary"></div>
            <div className="block md:block lg:hidden">
              <Image
                src={heroImg}
                alt="hero"
                width={300}
                height={300}
                className="custom-animation relative z-0"
              />
            </div>
            <p className="text-lg font-semibold font-sans text-center text-primary md:text-center lg:text-left desc-animation lg:max-w-1/2">
              {t("BannerDescription")}
            </p>
          </div>
          <div className="flex justify-center md:justify-center lg:justify-start lg:ml-30">
            <Button
              size="lg"
              className="md:text-left bg-primary text-white desc-animation lg:max-w-1/2 w-42 h-16 rounded-none  hover:cursor-pointer hover:bg-accent"
            >
              <Link href="/menu">Explore Menu</Link>
            </Button>
          </div>
          <div className="hidden md:hidden lg:block">
            <BannerPlate />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
