"use client";
import React, { useRef } from "react";
import { Star, Store, Soup } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const img1 = "/images/shortbio1.webp";
const img2 = "/images/shortbio2.webp";

const ShortBio = () => {
  const t = useTranslations("ShortBio");
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          toggleActions: "play pause resume reset",
        },
      });

      tl.from(".shortbio-image-1", {
        opacity: 0,
        x: -100,
        duration: 0.8,
        ease: "power2.out",
      });

      tl.from(
        ".shortbio-image-2",
        {
          opacity: 0,
          x: 100,
          duration: 0.8,
          ease: "power2.out",
        },
        "<+0.2"
      );

      tl.from(
        ".shortbio-text-content > *",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
        },
        "<0.3"
      );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="container mx-auto max-w-6xl px-5 md:px-0 py-12 md:py-28 text-white"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left Column: Image Composition */}
        <div className="relative h-[550px] w-full sm:h-[650px] lg:h-[600px] flex justify-center items-center">
          {/* Image-1 */}
          <div className="absolute left-0 top-0 h-2/5 w-2/3 transform transition-transform duration-500 hover:scale-105">
            <Image
              src={img1}
              alt="A delicious gourmet burger with cheese and lettuce"
              width={400}
              height={300}
              className="h-full w-full rounded-lg object-cover shadow-lg shortbio-image-1"
              priority
            />
          </div>

          {/* Image-2 */}
          <div className="absolute bottom-0 right-0 h-4/5 w-4/5 transform transition-transform duration-500 hover:scale-105">
            <Image
              src={img2}
              alt="A chef carefully preparing fresh lettuce on a wooden board"
              width={500}
              height={600}
              className="h-full w-full rounded-lg object-cover shadow-2xl shortbio-image-2"
              priority
            />
          </div>
        </div>

        {/* Right Column: Text Content */}
        <div className="shortbio-text-content flex flex-col justify-center space-y-7">
          <div className="flex items-center space-x-2 text-primary">
          <Star size={18} fill="currentColor" />
          <h3 className="text-sm font-sans uppercase md:text-2xl">
            {t("SectionTitle")}
          </h3>
          <Star size={18} fill="currentColor" />
        </div>

        <h2 className="text-4xl font-elsie font-bold text-primary leading-tight sm:text-5xl lg:text-6xl">
          {t("Title")}
        </h2>

        <p className="text-secondary md:text-lg font-sans">
          {t("Description")}
        </p>

        <div className="space-y-6 pt-4">
          {/* Feature 1: Quiet Environment */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 rounded-full border border-neutral-700 p-3">
              <Store className="text-primary size-20" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="text-3xl font-elsie text-primary font-bold">
                {t("point1")}
              </h4>
              <p className="mt-1 text-secondary text-lg">
                {t("point1Description")}
              </p>
            </div>
          </div>

          {/* Feature 2: Hygienic Food */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 rounded-full border border-neutral-700 p-3">
              <Soup className="text-primary size-20" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="text-3xl font-elsie text-primary font-bold">
                {t("point2")}
              </h4>
              <p className="mt-1 text-secondary text-lg">
                {t("point2Description")}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-center md:justify-start">
          <Button className="bg-primary text-white px-8 py-8 text-base hover:bg-primary/80 hover:border-1  rounded-none hover:cursor-pointer">
            <Link href="/about">{t("ExploreUs")}s</Link>
          </Button>
        </div>
        </div>
      </div>
    </section>
  );
};

export default ShortBio;
